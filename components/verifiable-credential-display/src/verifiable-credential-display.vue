<template>
  <div class="vda-vc-display" :style="styles">
    <h2>Credential Details</h2>
    <div class="vda-vc-content" v-for="(value, key) in credential" :key="key">
      <span class="vda-vc-content-title">{{ caseBreakTitle(key) }}:</span>
      <span class="vda-vc-content-value">{{ value }}</span>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import * as _ from "underscore";
import { keysToTitle } from "./helpers";

interface IData {
  credential: any;
}

export default /*#__PURE__*/ defineComponent({
  name: "VerifiableCredentialDisplay", // vue component name
  props: {
    data: {
      type: Object,
      required: true,
    },
    schema: {
      type: Object,
      required: false,
      default: {},
    },
    styles: {
      type: Object,
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
.vda-vc-display {
  display: block;
  padding: 1.2rem;
  width: 100%;
  word-break: break-all;
}

.vda-vc-display h2 {
  font-weight: 600;
  font-size: 1rem;
  line-height: 150%;
  color: #060520;
}

.vda-vc-content {
  display: flex;
}

.vda-vc-content-title {
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 150%;
  text-align: left;
  text-transform: uppercase;
  color: rgba(6, 5, 32, 0.51);
  display: block;
  margin: 0 0.5rem 0 0;
}

.vda-vc-content-value {
  font-size: 0.9rem;
  line-height: 150%;
  text-align: left;
  color: #060520;
  display: block;
  margin: 0 0.5rem;
}
</style>
