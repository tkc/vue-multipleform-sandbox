<template>
  <div class="wraper">
    <h3>Checkbox</h3>
    <div class="box">
      <label for="">Label</label>
      <input type="text" v-model="label" />
      <label for="">Description</label>
      <textarea v-model="description"></textarea>
    </div>
    <a-button v-on:click="del">Delete Checkbox</a-button>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, PropType } from "vue";
import * as types from "../../../types";
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
    const label = ref("");
    const description = ref("");

    watch(label, (value, oldValue) => {
      store.commit("template/set", {
        id: props.input.id,
        label: value,
      });
    });

    watch(description, (value, oldValue) => {
      store.commit("template/set", {
        id: props.input.id,
        description: value,
      });
    });

    const del = () => store.commit("template/del", props.input.id);

    return {
      label,
      description,
      input: props.input,
      del,
    };
  },
});
</script>

<style scoped>
.wraper {
  margin: 30px 0px;
}

.box {
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
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
}

input {
  margin-right: 10px;
  height: 25px;
  border-width: 1px;
}
</style>
