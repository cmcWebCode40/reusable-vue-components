# vue-verida-account-component

Open Source Vue Components for Verida

- This component can be customized to suite your application styles and themes .

## Usage

### Props

| Props           | Type     | Required | Description                                                                                                                                 |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| onSuccess       | function | true     | a callback function that will return the application `context` will be passed as an argument to this function after a successful SSO login. |
| onError         | function | true     | a callback function that log errors                                                                                                         |
| styles          | string   | false    |
| loaderIconColor | string   | false    | a Hexa-decimal color e.g (#0000)                                                                                                            |
| logo            | string   | false    | 170x170 png file                                                                                                                            |
| contextName     | string   | true     | application name e.g `Verida : My APP`                                                                                                      |

### Styles class

here are the class names you can customize

```cs
.m-dropdown-top img {}

..m-dropdown-logout {}
```

## Project setup

```
Yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
