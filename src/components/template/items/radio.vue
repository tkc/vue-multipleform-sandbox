<template>
  <div class="wraper">
    <h3>Radio</h3>
    <div class="box">
      <div>
        <div class="inner_box">
          <label>Label</label>
          <input type="text" v-model="label" />
          <label>Description</label>
          <textarea v-model="description"></textarea>
        </div>
        <Option :input="option" v-for="(option, key) in options" :key="key" />
      </div>
      <div class="footer">
        <a-button v-on:click="add">Add Option</a-button>
        <a-button v-on:click="del">Delete</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, PropType } from "vue";
import * as types from "../../../types";
import Option from "./option.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { Option },
  props: {
    input: {
      type: Object as PropType<types.Input>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const label = ref(props.input.label);
    const description = ref(props.input.description);

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

    const add = () => store.commit("template/addRadioOption", props.input.id);
    const del = () => store.commit("template/del", props.input.id);

    return {
      add,
      del,
      label,
      description,
      options: props.input.options,
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
  justify-content: flex-start;
}

.inner_box {
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
  justify-content: center;
}

input {
  margin-right: 10px;
  height: 25px;
  border-width: 1px;
}

.footer {
  margin-top: 30px;
}

.footer button {
  margin-right: 20px;
}
</style>
