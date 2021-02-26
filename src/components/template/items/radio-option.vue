<template>
  <div class="box">
    <label>Option</label>
    <input type="text" v-model="label" />
    <a-button size="small" v-on:click="del">Delete</a-button>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, PropType } from "vue";
import * as types from "../../../types";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    input: {
      type: Object as PropType<types.Radio>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const label = ref(props.input.label);

    watch(label, (value, oldValue) => {
      store.commit("template/updateRadioOption", {
        ...props.input,
        label: value,
      });
    });

    const del = () => store.commit("template/delRadioOption", props.input);

    return {
      label,
      input: props.input,
      del,
    };
  },
});
</script>

<style scoped>
.box {
  padding: 10px;
  margin: 10px;
  display: flex;
}

label {
  margin-right: 10px;
  border: solid 1px #0000;
  padding: 2px 14px;
  background: black;
  color: #fff;
  border-radius: 4px;
  font-size: 10px;
  height: 20px;
  display: flex;
  justify-content: center;
}

input {
  margin-right: 10px;
  height: 25px;
  border-width: 1px;
}
</style>
