<template>
  <div class="quick-send-container">
    <div class="quick-send-header">
      <p v-show="step === 1">Quick Send</p>
      <p v-show="step === 4">Success!</p>
      <p v-show="step > 1 && step < 4" class="clickable" @click="back">
        <img src="@/assets/images/icons/arrow-left.svg" />
        Back
      </p>
      <p v-show="step !== 4" class="clickable" @click="actualCancel">Cancel</p>
    </div>
    <b-progress
      :value="perc"
      :max="100"
      class="custom-progress"
      variant="success"
    />
    <div class="quick-send-step-contents">
      <h4 v-show="step < 4" class="title">
        STEP {{ step }}. {{ steps[step] }}
      </h4>
      <form v-show="step === 1" @submit.prevent="next">
        <div class="from-text">
          <p>From</p>
          <p @click="switchWallet">Change</p>
        </div>
        <wallet-view-component
          :usd="usd"
          :address="selectedWallet.address"
          :name="selectedWallet.nick"
          :balance="selectedWallet.balance"
        />
        <div class="password-container">
          <label for="walletPassword"> Password </label>
          <div class="password-input">
            <input
              v-model="password"
              :type="show ? 'text' : 'password'"
              placeholder="Enter your password"
              name="walletPassword"
            />
            <img :src="show ? showIcon : hide" @click.prevent="show = !show" />
          </div>
          <span class="error">
            {{ error }}
          </span>
        </div>
      </form>
      <form v-show="step === 2" @submit.prevent="next">
        <div class="to-address-container">
          <label for="toAddress"> To Address </label>
          <div class="to-address-input">
            <textarea
              v-model="toAddress"
              type="text"
              placeholder="Enter address"
              name="toAddress"
            />
            <div class="blockie-container">
              <blockie
                v-show="toAddress !== ''"
                :address="toAddress"
                width="30px"
                height="30px"
              />
              <div
                v-show="toAddress === ''"
                :address="toAddress"
                class="blockie-temp"
              />
            </div>
          </div>
        </div>
        <div class="to-amount-container">
          <label for="amountToSend">
            <p>Amount To Send</p>
            <p @click="entireBalance">Entire Balance</p>
          </label>
          <div class="to-amount-input">
            <input
              v-model="value"
              type="number"
              placeholder="Enter address"
              name="amountToSend"
            />
          </div>
        </div>
      </form>
      <div v-show="step === 3" class="confirmation-container">
        <div class="confirmation-amount">
          <p><b>Amount</b></p>
          <p>{{ value }} {{ network.type.name }}</p>
        </div>
        <p><b>From</b></p>
        <wallet-view-component
          :usd="usd"
          :address="selectedWallet.address"
          :name="selectedWallet.nick"
          :balance="selectedWallet.balance"
        />
        <p><b>To Address</b></p>
        <div class="to-address-confirmation">
          <div>
            <blockie :address="toAddress" width="50px" height="50px" />
          </div>
          <div>
            {{ toAddress }}
          </div>
        </div>
      </div>
      <div v-show="step === 4" class="success-container">
        <div class="check-icon">
          <i class="fa fa-check" aria-hidden="true" />
        </div>
        <h3>Success</h3>
        <p>Your TxHash</p>
        <a :href="txLinkAndHash" target="_blank" rel="noopener noreferrer">{{
          txHash | concatAddr
        }}</a>
      </div>
    </div>
    <div :class="[isValid ? '' : 'disabled', 'next-button']" @click="next">
      <p v-show="step === 1 || step === 2">
        <span v-show="!loading">Next</span>
        <i v-show="loading" class="fa fa-spinner fa-spin" />
      </p>
      <p v-show="step === 3">
        <span v-show="!loading">Confirm & Send</span>
        <i v-show="loading" class="fa fa-spinner fa-spin" />
      </p>
      <p v-show="step === 4">Done</p>
    </div>
  </div>
</template>

<script>
/* eslint no-console:0 */
import WalletViewComponent from '../../components/WalletViewComponent';
import hide from '@/assets/images/icons/hide-password.svg';
import showIcon from '@/assets/images/icons/show-password.svg';
import BigNumber from 'bignumber.js';
import { isAddress } from '@/helpers/addressUtils';
import walletWorker from 'worker-loader!@/workers/wallet.worker.js';
import { WalletInterface } from '@/wallets';
import { KEYSTORE as keyStoreType } from '@/wallets/bip44/walletTypes';
import Blockie from '@/components/Blockie';
import { Misc } from '@/helpers';
import { mapState } from 'vuex';
import { ETH } from '@/networks/types';
import ethUnit from 'ethjs-unit';
import { CX_SEND_SIGNED_TX } from '@/builds/mewcx/cxHelpers/cxEvents';

export default {
  components: {
    'wallet-view-component': WalletViewComponent,
    blockie: Blockie
  },
  props: {
    cancel: {
      type: Function,
      default: () => {}
    },
    switchWallet: {
      type: Function,
      default: () => {}
    },
    selectedWallet: {
      type: Object,
      default: () => {
        return {};
      }
    },
    usd: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      step: 1,
      steps: {
        1: 'Access Wallet',
        2: 'Send To',
        3: 'Confirm'
      },
      show: false,
      hide: hide,
      showIcon: showIcon,
      password: '',
      toAddress: '',
      value: 0,
      txHash: '',
      unlockedAccount: {},
      error: '',
      loading: false,
      rawTx: {},
      gasPrice: 0,
      gasLimit: 0,
      signedTx: {},
      txLink: ETH.blockExplorerTX
    };
  },
  computed: {
    ...mapState(['web3', 'network']),
    txLinkAndHash() {
      return this.txLink.replace('[[txHash]]', this.txHash);
    },
    isValid() {
      if (this.step === 1) {
        return this.password !== '' && this.password.length > 7;
      } else if (this.step === 2) {
        const walletBalance = new BigNumber(this.selectedWallet.balance);
        const valToSend = new BigNumber(this.value);
        return !valToSend.gt(walletBalance) && isAddress(this.toAddress);
      }
      return true;
    },
    perc() {
      return this.step * 30;
    }
  },
  watch: {
    toAddress() {
      this.getGasPrice();
      this.estimateGas();
      this.error = '';
    },
    password() {
      this.error = '';
    }
  },
  methods: {
    back() {
      switch (this.step) {
        case 2:
          this.clearWallet();
          break;
        case 3:
          this.clearTransaction();
          break;
      }
    },
    next() {
      switch (this.step) {
        case 1:
          this.unlockWallet();
          break;
        case 2:
          this.createTransaction();
          break;
        case 3:
          this.sendTransaction();
          break;
        case 4:
          this.actualCancel();
          break;
      }
    },
    clearWallet() {
      this.loading = false;
      this.unlockedAccount = {};
      this.password = '';
      this.show = false;
      this.step -= 1;
    },
    clearTransaction() {
      this.loading = false;
      this.toAddress = '';
      this.value = 0;
      this.rawTx = {};
      this.gasPrice = 0;
      this.gasLimit = 0;
      this.signedTx = {};
      this.step -= 1;
    },
    unlockWallet() {
      this.loading = true;
      const worker = new walletWorker();
      const file = JSON.parse(this.selectedWallet.priv);
      worker.postMessage({
        type: 'unlockWallet',
        data: [file, this.password]
      });
      worker.onmessage = e => {
        this.unlockedAccount = new WalletInterface(
          Buffer.from(e.data._privKey),
          false,
          keyStoreType
        );
        this.loading = false;
        this.step += 1;
      };
      worker.onerror = e => {
        this.loading = false;
        this.error = e.message;
      };
    },
    async getGasPrice() {
      this.web3.eth.getGasPrice().then(res => {
        this.gasPrice = new BigNumber(ethUnit.fromWei(res, 'gwei')).toString();
      });
    },
    async estimateGas() {
      const params = {
        from: this.selectedWallet.address,
        value: this.value,
        to: this.toAddress,
        gasPrice: Misc.sanitizeHex(
          ethUnit.toWei(this.gasPrice, 'gwei').toString(16)
        ),
        data: '0x'
      };
      if (this.toAddress !== '') {
        this.web3.eth
          .estimateGas(params)
          .then(gasLimit => {
            this.gasLimit = gasLimit;
          })
          .catch(e => {
            // eslint-disable-no-console
            console.error(e);
          });
      }
    },
    entireBalance() {
      const gasPrice = new BigNumber(ethUnit.fromWei(this.gasPrice, 'gwei'));
      const gasLimitAndGasPrice = gasPrice.times(this.gasLimit).toString();
      const convertedLimitAndPrice = ethUnit.fromWei(
        gasLimitAndGasPrice,
        'ether'
      );
      const walletBalance = new BigNumber(this.selectedWallet.balance);
      this.value = walletBalance.minus(convertedLimitAndPrice).toString();
    },
    async createTransaction() {
      const nonce = await this.web3.eth.getTransactionCount(
        this.selectedWallet.address
      );
      this.raw = {
        nonce: nonce,
        to: this.toAddress,
        from: this.selectedWallet.address,
        value: Misc.sanitizeHex(
          ethUnit.toWei(this.value, 'ether').toString(16)
        ),
        gasPrice: Misc.sanitizeHex(
          ethUnit.toWei(this.gasPrice, 'gwei').toString(16)
        ),
        gas: Misc.sanitizeHex(new BigNumber(this.gasLimit).toString(16)),
        data: '0x'
      };

      this.signedTx = await this.unlockedAccount.signTransaction(this.raw);
      this.step += 1;
    },
    async sendTransaction() {
      this.loading = true;
      const chrome = window.chrome;
      chrome.storage.sync.get(null, res => {
        if (res.hasOwnProperty('knownAddresses')) {
          const arr = JSON.parse(res['knownAddresses']);
          arr.push(this.toAddress);

          chrome.storage.sync.set({
            knownAddresses: JSON.stringify(arr)
          });
        } else {
          const newArr = [this.toAddress];
          chrome.storage.sync.set({
            knownAddresses: JSON.stringify(newArr)
          });
        }
      });
      const payload = {
        signedTx: this.signedTx.rawTransaction,
        raw: this.raw
      };
      window.chrome.runtime.sendMessage(
        window.chrome.runtime.id,
        { event: CX_SEND_SIGNED_TX, payload: payload },
        {},
        res => {
          // eslint-disable-next-line
          if (!!res && !res.hasOwnProperty('message')) {
            this.txHash = res;
            this.step += 1;
          }
        }
      );
    },
    actualCancel() {
      this.step = 1;
      this.loading = false;
      this.password = '';
      this.show = false;
      this.toAddress = '';
      this.value = 0;
      this.txHash = '';
      this.unlockedAccount = {};
      this.error = '';
      this.rawTx = {};
      this.signedTx = {};
      this.cancel();
    }
  }
};
</script>

<style lang="scss">
.quick-send-dropdown {
  color: black;
  height: 72px;
  width: 45px;
}
.quick-send-from-modal {
  .modal-dialog {
    bottom: 0;
    margin: 0 !important;
    position: absolute;
    width: 100%;
  }

  .modal-content {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .modal-body {
    padding: 0 !important;
  }
}
</style>
<style lang="scss" scoped>
@import 'QuickSendContainer.scss';
</style>
