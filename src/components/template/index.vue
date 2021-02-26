<template>
  <div class="box">
    <h1>Form Template View</h1>
    <div class="inner_box">
      <label>Title</label>
      <input type="text" v-model="title" />
    </div>
    <div class="selecor">
      <Selecor :inputs="inputs" />
    </div>
    <div class="footer">
      <select v-model="select">
        <option value="none">Select</option>
        <option value="text">Add Text</option>
        <option value="texterea">Add Texterea</option>
        <option value="radio">Add Radio</option>
        <option value="checkbox">Add Checkbox</option>
        <option value="number">Add Number</option>
      </select>
      <a-button v-on:click="submit" type="primary">Submit</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import Selecor from "./selecor.vue";
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { Selecor },
  data() {
    return {
      title: "",
    };
  },
  setup() {
    const select = ref("");
    const title = ref("");
    const store = useStore();

    select.value = "none";

    watch(select, (value, oldValue) => {
      if (value !== "none") {
        store.commit("template/add", {
          id: uuidv4(),
          type: value,
          sort_order: store.state.template.form.Inputs.length + 1,
        });
      }
    });

    watch(title, (value, oldValue) => {
      store.commit("template/setForm", {
        title: value,
      });
    });

    const submit = () => {
      console.log("submit!");
      console.log(store.state.template.form);
    };

    return {
      select,
      submit,
      inputs: store.state.template.form.Inputs,
      title,
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

.inner_box {
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
}

.footer {
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
}

.footer * {
  margin-right: 20px;
}

.selecor {
  border: solid 1px #eee;
  margin: 20px;
  padding: 10px;
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
  border-width: 1px;
}
</style>
