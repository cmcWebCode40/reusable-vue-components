<template>
  <div class="user-menu" :key="connected">
    <div class="loading" v-if="loading">Loading....</div>
    <div v-else-if="profile.name" class="user-menu-widget" :style="styles">
      <div class="m-dropdown">
        <span>{{ profile.name }}</span>
        <div
          @click="toggleDropdown"
          :class="[isOpened ? 'm-dropdown-top-active' : 'm-dropdown-top']"
        >
          <img
            height="40"
            v-if="profile.avatar"
            alt="user-avatar"
            :src="profile.avatar"
          />
          <img
            v-else
            height="40"
            src="https://s3.us-west-2.amazonaws.com/assets.verida.io/avatar.svg"
            alt="user-avatar"
          />
        </div>
        <div v-show="isOpened" class="m-dropdown-logout">
          <div>
            <span>
              <a
                :href="`https://verida.network/did/${profile.did}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ truncateDID(profile.did) }}...</a
              >
            </span>
            <img
              height="20"
              @click="copyToClipBoard(profile.did)"
              src="https://s3.us-west-2.amazonaws.com/assets.verida.io/copy.png"
              alt="icon"
              title="Copy to clipboard"
            />
          </div>
          <div @click="logout">
            <span> Log out </span>
            <img
              height="20"
              src="https://s3.us-west-2.amazonaws.com/assets.verida.io/logout.svg"
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
    <button v-else class="login-section" @click="login">
      <span>Login with Verida</span>
      <img
        alt="Vue logo"
        src="https://s3.us-west-2.amazonaws.com/assets.verida.io/arrow.svg"
      />
    </button>
    <!-- <div v-if="error" class="error">{{ error }}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VeridaHelper from "../helpers/VeridaHelper";

interface Data {
  profile: any;
  error: any;
  isOpened: boolean;
  connected: boolean;
  loading: boolean;
}

export default /*#__PURE__*/ defineComponent({
  name: "VdaAccount",
  components: {},
  data(): Data {
    return {
      isOpened: false,
      connected: false,
      profile: {},
      loading: false,
      error: null,
    };
  },
  props: {
    styles: {
      type: String,
      required: false,
    },
    loaderIconColor: {
      type: String,
      required: false,
    },
    onLogout: {
      type: Function,
      required: true,
    },
    contextName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    onError: {
      type: Function,
      required: false,
    },
    onSuccess: {
      type: Function,
      required: false,
    },
  },

  async created() {
    await this.autoLogin();
  },
  methods: {
    copyToClipBoard(value: string) {
      //@ts-ignore
      this.$copyText(value);
    },
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
    truncateDID(did: string) {
      return did && did.slice(0, 13);
    },
    async login() {
      try {
        this.loading = true;
        if (!this.contextName) {
          return (this.error = "Context Name is required");
        }
        await VeridaHelper.connect({
          contextName: this.contextName,
          logo: this.logo,
        });
        await this.loadProfile();
      } catch (error) {
        this.handleError(error);
        this.loading = false;
      }
    },
    async loadProfile() {
      try {
        await VeridaHelper.initProfile();
        if (this.onSuccess) {
          this.onSuccess(VeridaHelper.context);
        }
        this.profile = VeridaHelper.profile;
        if (this.profile.avatar && this.profile.avatar.uri) {
          this.profile.avatar = this.profile.avatar.uri;
        }
        this.loading = false;
      } catch (error) {
        this.handleError(error);
        this.loading = false;
      }
    },
    handleError(error: any) {
      this.error = error.toString();
      if (this.onError) {
        this.onError(this.error);
      }
    },
    async logout() {
      await VeridaHelper.logout();
      this.connected = false;
      this.onLogout();
    },
    async autoLogin() {
      if (
        VeridaHelper.hasSession(this.contextName) &&
        VeridaHelper.context !== undefined
      ) {
        this.loading = true;
        await this.loadProfile();
        this.loading = false;
      } else if (VeridaHelper.hasSession(this.contextName)) {
        await this.login();
      }
    },
  },
});
</script>
<style  scoped>
.user-menu {
  font-family: "Sora";
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-section {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;
}

.login-section > * {
  margin: 0 0.4rem;
}

.user-menu-widget {
  position: relative;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-menu-widget-title {
  margin: 0 1.5rem;
  padding: auto;
}

.m-dropdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 2;
}

.m-dropdown span {
  margin: 0.7rem 1rem 0 0;
}

.m-dropdown span a {
  color: black;
  margin-left: -0.2rem;
}

.m-dropdown-top {
  background: #3333;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.m-dropdown-top img {
  border-radius: 50%;
}

.m-dropdown-top-active img {
  border-radius: 50%;
}

.m-dropdown-logout {
  position: absolute;
  top: 3.6rem;
  right: 0;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 3px 4px #bbbbbb;
}

.m-dropdown-logout div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 11rem;
  padding: 0.7rem 1rem;
  border-top: 1px solid rgba(12, 11, 11, 0.04);
  border-left: none;
  border-bottom: none;
  border-right: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
}

.m-dropdown-logout div:hover {
  background: rgba(12, 11, 11, 0.04);
}
.m-dropdown-logout div img:hover {
  background: rgb(163, 163, 163);
  border-radius: 50%;
}
</style>
