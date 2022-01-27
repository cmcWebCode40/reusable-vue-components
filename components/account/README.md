# vue-verida-account-component

Open Source Vue Components for Verida

- This component can be customized to suite your application styles and themes .

## Usage

```
yarn add  @verida/vue-user-account

```

```js
<script lang="ts">
	import VdaUserAccount from '@/vda-account.vue';

	export default ({
		name: 'MyComponent',
		components: {
			VdaUserAccount,
		},
		data() {
			return {
				contextName: 'Verida: Account Component',
				logo: 'https://assets.verida.io/verida_login_request_logo_170x170.png',
			};
		},
		methods: {
			onSuccess(response: any) {
				console.log('App Context', response);
			},
			onError(error: Error) {
				console.log('Login Error', error);
			},
			onLogout() {},
		},
	});
</script>

<template>
	<div id="app">
		<vda-user-account
			:logo="logo"
			:contextName="contextName"
			:onError="onError"
			:onSuccess="onSuccess"
		/>
	</div>
</template>
```

### Props

| Props           | Type     | Required | Description                                                                                                                                 |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| onSuccess       | function | true     | a callback function that will return the application `context` will be passed as an argument to this function after a successful SSO login. |
| onError         | function | true     | a callback function that log errors                                                                                                         |
| styles          | string   | false    |
| loaderIconColor | string   | false    | a Hexa-decimal color e.g (#0000)                                                                                                            |
| logo            | string   | false    | 170x170 png file                                                                                                                            |
| contextName     | string   | true     | application name e.g `Verida : My APP`                                                                                                      |
| onLogout        | function | true     | a callback function to perform logout action                                                                                                |

```

```
