<template>
  <div class="account-to-print">
    <div class="top-container">
      <div class="left-section">
        <div class="blockie-contianer">
          <div>
            <blockie
              :address="address"
              class="blockie"
              width="50px"
              height="50px"
            />
          </div>
          <div class="text-container">
            <h3>{{ header }}</h3>
            <span> {{ subheader }} </span>
          </div>
        </div>
        <div>
          <h4 class="left-text">
            {{ content.text1 }} <span> {{ content.red1 }} </span>
            {{ content.text2 }} <span> {{ content.red2 }} </span>
            {{ content.text3 }}
          </h4>
        </div>
        <div class="link-container">
          <p>
            <img
              height="15px"
              src="~@/assets/images/icons/support.svg"
              alt="Support"
            />
            {{ link1 }}
          </p>
          <p>
            <img
              height="15px"
              src="~@/assets/images/icons/web-solution-white.svg"
              alt
            />
            {{ link2 }}
          </p>
        </div>
      </div>
      <div class="right-section">
        <div class="header-text">
          <b>
            <img
              src="~@/assets/images/short-hand-logo-white.png"
              height="30px"
              alt
            />
            {{ mew }}
          </b>
          <span class="header-line" /> <span> {{ paper }} </span>
        </div>

        <div class="qr-code-container">
          <qrcode :value="address" :options="{ size: 100 }" />
          <div class="text-container">
            <h4>{{ myAddress }}</h4>
            <span>
              {{ address }}
            </span>
          </div>
        </div>
      </div>
      <img
        src="~@/assets/images/background/404bg.jpg"
        width="100%"
        class="floating-img"
        alt
      />
      <img
        src="~@/assets/images/etc/access-spaceman.png"
        width="100%"
        class="floating-spaceman"
        alt="Spaceman"
      />
    </div>
    <div class="between">
      <div class="text">
        <img height="15px" src="~@/assets/images/icons/scissor.svg" alt /> Cut
        Here
      </div>
      <div class="dash"></div>
    </div>
    <div class="bottom-container">
      <div class="header-container">
        <blockie :address="address" width="55px" height="55px" />
        <div class="header-content">
          <h3>{{ myAddress }}</h3>
          <p>{{ subheader }}</p>
        </div>
      </div>
      <div class="body-container">
        <h3>
          {{ content.text1 }} <span> {{ content.red1 }} </span>
          {{ content.text2 }} <span> {{ content.red2 }} </span>
          {{ content.text3 }}
        </h3>
      </div>
      <div class="my-address-container">
        <div class="text-container">
          <h3>{{ myAddress }}</h3>
          <p>{{ address }}</p>
        </div>
        <div class="my-address-qrcode">
          <qrcode :value="address" :options="{ size: 120 }" />
        </div>
      </div>
      <div v-if="!!wallet && !wallet.isPubOnly" class="my-priv-container">
        <div class="text-container">
          <h3>{{ myPriv }}</h3>
          <p>{{ wallet.getPrivateKeyString() }}</p>
        </div>
        <qrcode
          :value="wallet.getPrivateKeyString()"
          :options="{ size: 120 }"
        />
      </div>
    </div>
    <div class="footer-container">
      <div class="link-container">
        <p>
          <img
            height="17px"
            src="~@/assets/images/icons/support.svg"
            alt="Support"
          />
          {{ link1 }}
        </p>
        <p>
          <img
            height="15px"
            src="~@/assets/images/icons/web-solution.svg"
            alt
          />
          {{ link2 }}
        </p>
      </div>
      <div class="logo-container">
        <img
          :src="require(`@/assets/images/short-hand-logo-${buildType}.png`)"
          height="25px"
          alt
        />
        <p class="border-line"></p>
        <p>{{ paper }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Blockie from '@/components/Blockie';
import { mapState } from 'vuex';

export default {
  components: {
    blockie: Blockie
  },
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      header: 'MY ADDRESS ICON',
      subheader: 'Always look for this icon when sending to this wallet',
      mew: 'MyEtherWallet',
      paper: 'Paper Wallet',
      link1: 'support@myetherwallet.com',
      link2: 'https://www.myetherwallet.com',
      myAddress: 'MY ADDRESS',
      myPriv: 'MY PRIVATE KEY',
      content: {
        text1: 'Please Keep Your Paper Wallet at a',
        text2: 'Place! Please',
        text3: 'Share Your Private Key With Anyone!',
        red1: 'SAFE',
        red2: 'DO NOT'
      },
      buildType: BUILD_TYPE
    };
  },
  computed: {
    ...mapState(['wallet'])
  }
};
</script>
<style lang="scss" scoped>
@import 'AccountContentToPrint.scss';
</style>
