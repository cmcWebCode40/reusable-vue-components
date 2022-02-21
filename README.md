# Verida Vue Component Library (Monorepo)

- This project leverages the following frameworks and libraries

- Storybook : This helps to test and visualize component in isolation

- Lerna : Manages different component and publish them independently

- Vue-SFC-Rollup: This creates a Vue project setup that help develop each components and also creates amm optimized build for npm publish.

## Development mode for storybook

View and interact with components using storybook

run the following commands

Install packages for all components:

```
  yarn install
```

Storybook support is comming. 

## Development for SFC (Single file component)

cd into the component you want to run the dev mode locally and run this command

```

yarn && yarn serve 

```

## Create a new component folder

Using the `vue-sfc-rollup` run these command

```
 yarn create-sfc
```

> NB: enter npm package name using this prefix e.g `@verida/vue-my-component`

in the cmd options select the project directory to be `./component/name-of-the-component`
