# verida user account component

Open Source Vue Components for Verida

- This component can be customized to suite your application styles and themes .

NB: This supports vue 3 only

## Usage

```
yarn add  @verida/vue-account3

```

The `@verida/vue-account` component library registration  enables the `vda-account` and vda-login` component to be accessed across your application and share some global state.

main.js

```js
import { createApp } from 'vue';
import App from './App.vue';
import Account from '@verida/vue-account';


const app = createApp(App);

app.use(Account);

app.mount('#app');

```

- NOTE : You can retrieve the user application `context` from the parameter of the `onSuccess` function passed as a prop .

This works for both the `vda-login` and `vda-account`

### Using the `vda-login` component

This component is used to handle SSO (Single Sign on) login it leverages our `@verida/client-ts` and `@verida/account-web-vault` packages under the hood.

```vue
<template>
  <div id="app">
    <vda-login
      :onError="onError"
      :onSuccess="onSuccess"
      :contextName="contextName"
      :logo="logo"
      :onLogout="onLogout"
      :loginText: 'LOGIN_TEXT',
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
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
  },
});
</script>

```

### Using the `vda-account` component

This component is used to display a logged-in user profile details such as `name` , `did`and  `avatar` this happens after the `vda-login` component has been used for performing and SSO (Single Sign on) Login .

```vue

<template>
  <div id="app">
    <vda-account 
      :logo="logo"
      :contextName="contextName"
      :onLogout="onLogout" 
      :onError="onError"
      :onSuccess="onSuccess" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onLogout() {
      console.log("hello");
    },
    onSuccess(response: any) {
      // The response is the application context of the connected user..
      console.log(response)
    },
    onError(error) {
      console.log("Login Error", error);
    },
  },
});
</script>

```

### Props

1. `vda-account`

| Props           | Type     | Required | Description                                                                                                                                 |
| --------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------                                                                                                        |
| styles          | string   | false    |
| loaderIconColor | string   | false    | a Hexa-decimal color e.g (#0000)                                                                                                            |
| logo            | string   | false    | 170x170 png file                                                                                                                            |
| contextName     | string   | true     | application name e.g `Verida : My APP`                                                                                                      |
| onLogout        | function | true     | a callback function to perform logout action                                                                                                |

2. `vda-login`

| Props           | Type     | Required | Description                                                                                                                                 |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| onSuccess       | function | true     | a callback function that will return the application `context` will be passed as an argument to this function after a successful SSO login. |
| onError         | function | true     | a callback function that log errors                                                                                                                                                                                                                    |
| logo            | string   | false    | 170x170 png file                                                                                                                            |
| contextName     | string   | true     | application name e.g `Verida : My APP`                                                                                                      |                                                                                               |
| loginText     | string   | false     | Login Screen Text                              |                                                                                               |
