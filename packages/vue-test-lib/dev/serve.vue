
<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-interface */
import Vue from "vue";

interface IData {
  contextName: string;
  logo: string;
  $vdaClient?: any;
}

interface IProps {}
interface IComputed {}
interface IMethods {}
export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: "ServeDev",
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: any) {
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

<template>
  <div id="app">
    <vue-test-lib-sample />
    <vda-account :logo="logo" :contextName="contextName" :onLogout="onLogout" />
    <vda-login
      :onError="onError"
      :onSuccess="onSuccess"
      :contextName="contextName"
      :logo="logo"
      :onLogout="onLogout"
    />
  </div>
</template>
