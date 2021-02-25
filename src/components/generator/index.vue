<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <div>
      <Selector :inputs="inputs" />
    </div>
    <div>
      <a-button v-on:click="submit" type="primary">Submit</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Selector from "./selector.vue";
import * as types from "../../types";
import { useStore } from "vuex";

export default defineComponent({
  components: { Selector },
  props: {
    form: {
      type: Object as PropType<types.Form>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // 初期化処理
    props.form.Inputs.forEach((input) => {
      // store.commit('a/increment', {
      store.commit("input/set", {
        form_id: input.form_id,
        input_id: input.id,
        value: input.value,
      });
    });

    const submit = () => {
      console.log("submit!");
    };

    const inputs = props.form.Inputs.sort(function (a, b) {
      if (a.sort_order < b.sort_order) return -1;
      if (a.sort_order > b.sort_order) return 1;
      return 0;
    });
    return {
      title: props.form.title,
      inputs,
      submit,
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
