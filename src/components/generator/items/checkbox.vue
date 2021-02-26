<template>
  <div>
    <h3>{{ input.label }}</h3>
    <div v-for="(option, key) in input.options" :key="key">
      <input type="checkbox" :value="option.label" v-model="model" />
      <label :for="option.label">{{ option.label }}</label>
    </div>
    <p>{{ input.description }}</p>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, PropType } from "vue";
import * as types from "../../../types";
import { UpdateEvent } from "../../../store/namespaces/input";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    input: {
      type: Object as PropType<types.Input>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const model = ref((props.input.value));

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
