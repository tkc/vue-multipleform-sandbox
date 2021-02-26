<template>
  <FormGenerator :form="FormA" />
  <hr />
  <FormTemplate />
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { defineComponent } from "vue";
import FormGenerator from "./components/generator/index.vue";
import FormTemplate from "./components/template/index.vue";
import { Form } from "./types";

const craateMockForm = (): Form => {
  const formID = uuidv4();
  const radioInputID = uuidv4();
  return {
    id: uuidv4(),
    Version: "v1",
    title: "SampleForm",
    Inputs: [
      {
        id: uuidv4(),
        form_id: formID,
        version: "v1",
        sort_order: 1,
        type: "text",
        label: "Text",
        value: "test...",
        required: true,
        validation: undefined,
        options: [],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
      },
      {
        id: uuidv4(),
        form_id: formID,
        version: "v1",
        sort_order: 2,
        type: "texterea",
        label: "Texterea",
        value: "texterea...",
        required: true,
        validation: undefined,
        options: [],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
      },
      {
        id: uuidv4(),
        form_id: formID,
        version: "v1",
        sort_order: 3,
        type: "number",
        label: "Number",
        value: 100,
        required: true,
        validation: undefined,
        options: [],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
      },
      {
        id: uuidv4(),
        form_id: formID,
        version: "v1",
        sort_order: 5,
        type: "radio",
        label: "Radio",
        value: "radio1",
        required: true,
        validation: undefined,
        options: [
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radioOptions1",
            value: "radio1",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radioOptions2",
            value: "radio2",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radioOptions3",
            value: "radio3",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radioOptions4",
            value: "radio4",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radioOptions5",
            value: "radio5",
          },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
      },
      {
        id: radioInputID,
        form_id: formID,
        version: "v1",
        sort_order: 4,
        type: "checkbox",
        label: "Checkbox",
        value: ["radio1"],
        required: true,
        validation: undefined,
        options: [
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radio1",
            value: "radio1",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radio2",
            value: "radio2",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radio3",
            value: "radio3",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radio4",
            value: "radio4",
          },
          {
            id: uuidv4(),
            form_id: formID,
            input_id: radioInputID,
            version: "v1",
            label: "radio5",
            value: "radio5",
          },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
      },
    ],
  };
};

export default defineComponent({
  components: { FormGenerator, FormTemplate },
  setup() {
    return {
      FormA: craateMockForm(),
    };
  },
});
</script>
