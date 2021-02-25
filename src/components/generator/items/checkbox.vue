<template>
  <div>
    <h3>{{ input.label }}</h3>
    <input
      type="checkbox"
      true-value="true"
      false-value="false"
      v-model="model"
    />
    <p>{{ input.description }}</p>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, PropType } from "vue";
import * as types from "../../../types";
import { UpdateEvent } from "../../../store/namespaces/input";
import { useStore } from "vuex";
import input from "ant-design-vue/lib/input";

export default defineComponent({
  props: {
    input: {
      type: Object as PropType<types.Input>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const model = ref(false);

    // 初期値
    model.value = props.input.value as boolean;

    watch(model, (value, oldValue) => {
      const e: UpdateEvent = {
        form_id: props.input.form_id,
        id: props.input.id,
        value: value,
      };
      store.commit("input/set", e);
    });
    return {
      model,
      input: props.input,
    };
  },
});
</script>
