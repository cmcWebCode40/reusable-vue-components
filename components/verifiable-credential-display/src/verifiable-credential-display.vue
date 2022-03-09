<template>
  <div class="verifiable-credential-display">
    <h2>Credential Details</h2>
    <div v-for="(value, key) in credential" :key="key">
      <span>{{ caseBreakTitle(key) }}:</span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import * as _ from "underscore";
import { keysToTitle } from "./helpers/";

interface IData {
  credential: any;
}

export default /*#__PURE__*/ defineComponent({
  name: "VerifiableCredentialDisplay", // vue component name
  props: {
    data: {
      type: Object,
      required: true,
      default: {},
    },
    schema: {
      type: Object,
      required: false,
      default: {},
    },
    styles: {
      type: String,
      required: false,
    },
  },
  data(): IData {
    return {
      credential: {},
    };
  },
  computed: {},
  beforeMount() {
    if (this.schema.properties) {
      if (this.schema.layouts.view) {
        let fields = this.schema.layouts.view;

        // extract layouts views defined matching object  from schema properties
        const layoutViews = _.pick(this.schema.properties, ...fields);

        // get the object keys
        const layoutViewKeys = _.allKeys(layoutViews);

        //use object keys to filter our layout views keys/values only
        this.credential = _.pick(this.data, ...layoutViewKeys);
      }
    } else {
      this.credential = this.data;
    }
  },
  methods: {
    caseBreakTitle(str: string) {
      return keysToTitle(str);
    },
  },
});
</script>



<style scoped>
.verifiable-credential-display {
  display: block;
  padding: 25px;
}

.verifiable-credential-display h2 {
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #060520;
}

.verifiable-credential-display div {
  display: flex;
}

.verifiable-credential-display div span:nth-child(1) {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  text-align: left;
  text-transform: uppercase;
  color: rgba(6, 5, 32, 0.51);
  display: block;
  margin: 0px 8px;
}

.verifiable-credential-display div span:nth-child(2) {
  font-size: 14px;
  line-height: 150%;
  text-align: left;
  color: #060520;

  display: block;
  margin: 0px 8px;
}
</style>
