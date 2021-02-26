<template>
  <div v-for="(input, key) in inputs" :key="key">
    <textInput
      :key="input.id"
      :input="input"
      v-if="input.version === 'v1' && input.type === 'text'"
    />
    <texterea
      :key="input.id"
      :input="input"
      v-if="input.version === 'v1' && input.type === 'texterea'"
    />
    <number
      :key="input.id"
      :input="input"
      v-if="input.version === 'v1' && input.type === 'number'"
    />
    <radio
      :key="input.id"
      :input="input"
      v-if="input.version === 'v1' && input.type === 'radio'"
    />
    <checkbox
      :key="input.id"
      :input="input"
      v-if="input.version === 'v1' && input.type === 'checkbox'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import textInput from "./items/text.vue";
import texterea from "./items/texterea.vue";
import number from "./items/number.vue";
import radio from "./items/radio.vue";
import checkbox from "./items/checkbox.vue";
import * as types from "../../types";

export default defineComponent({
  components: { textInput, texterea, number, radio, checkbox },
  props: {
    inputs: {
      type: Object as PropType<types.Input[]>,
      required: true,
    },
  },
  setup(props) {
    return {
      inputs: props.inputs,
    };
  },
});
</script>

<style scoped>
.box {
  border: solid 2px #eee;
  padding: 10px;
  margin: 10px;
}
</style>
