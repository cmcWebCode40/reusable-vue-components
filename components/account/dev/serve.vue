
<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-interface */
import { defineComponent } from "vue";

export default defineComponent({
  name: "ServeDev",
  data() {
    return {
      contextName: "Verida: New Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: any) {
      //@ts-ignore
      // this.$vdaClient.initUser(response);
      console.log(response);
    },
    onError() {},
    onLogout() {},
  },
});
</script>

<template>
  <div id="app">
    <vda-account
      :logo="logo"
      :onError="onError"
      :onSuccess="onSuccess"
      :contextName="contextName"
      :onLogout="onLogout"
    />
    <vda-login
      :onError="onError"
      :onSuccess="onSuccess"
      :contextName="contextName"
      :logo="logo"
      loginText="Verida Vue Component"
      :onLogout="onLogout"
    />
  </div>
</template>
