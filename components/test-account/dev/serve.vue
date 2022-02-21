<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TestAccountSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  TestAccountSample,
  // }
});
</script>

<template>
  <div id="app">
    <test-account-sample />
  </div>
</template>
