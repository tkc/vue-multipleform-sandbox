<template>
  <div>
    <h3>{{ input.label }}</h3>
    <div>
      <input type="text" v-model="model" />
      <p>{{ input.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { UpdateEvent } from "../../../store/namespaces/input";
import * as types from "../../../types";

export default defineComponent({
  props: {
    input: {
      type: Object as PropType<types.Input>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const model = ref(props.input.value as string);

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
