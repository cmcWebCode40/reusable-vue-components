<script lang="ts">
import { defineComponent } from "vue";
import VdaAccount from "@/vda-account.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    VdaAccount,
  },
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: any) {
      console.log("App Context", response);
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
    onLogout() {},
  },
});
</script>

<template>
  <div id="app">
    <vda-account
      :logo="logo"
      :contextName="contextName"
      :onError="onError"
      :onSuccess="onSuccess"
    />
  </div>
</template>
