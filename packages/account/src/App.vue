<template>
  <div id="app">
    <vda-account :logo="logo" :contextName="contextName" :onLogout="onLogout" />
    <vda-login
      :onError="onError"
      :onSuccess="onSuccess"
      :contextName="contextName"
      :logo="logo"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VdaAccount from "./components/VdaAccount.vue";
import VdaLogin from "./components/VdaLogin.vue";

export default Vue.extend({
  components: { VdaLogin, VdaAccount },
  name: "App",
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.$vdaClient.initUser(response);
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
    onLogout() {
      console.log("hello");
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
