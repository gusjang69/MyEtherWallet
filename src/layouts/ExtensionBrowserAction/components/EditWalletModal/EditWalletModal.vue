<template>
  <div>
    <b-modal
      ref="editModal"
      hide-footer
      class="bootstrap-modal"
      title="Edit Modal"
      centered
    >
      <div class="modal-contents">
        <form>
          <div class="input-container">
            <label for="walletName"> Wallet Name </label>
            <input
              v-model="locName"
              placeholder="Please add a wallet nickname"
              name="walletName"
            />
          </div>
          <button
            class="submit-button large-round-button-green-filled"
            type="submit"
            @click.prevent="saveWallet"
          >
            Submit
          </button>
          <button
            class="remove-button large-round-button-white-filled"
            @click.stop.prevent="removeWallet"
          >
            Remove Wallet
          </button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { Toast, ExtensionHelpers } from '@/helpers';
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    removeWallet: {
      type: Function,
      default: () => {}
    },
    address: {
      type: String,
      default: ''
    },
    wallet: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      locName: this.name
    };
  },
  methods: {
    saveWallet() {
      const wallet = Object.assign({}, this.wallet);
      ExtensionHelpers.addWalletToStore(
        this.address,
        wallet.priv,
        this.locName,
        wallet.type,
        'edit',
        this.saveWalletCb
      );
    },
    saveWalletCb() {
      this.$refs.editModal.hide();
      Toast.responseHandler('Wallet successfully updated!', Toast.SUCCESS);
    }
  }
};
</script>

<style scoped lang="scss">
@import 'EditWalletModal.scss';
</style>
