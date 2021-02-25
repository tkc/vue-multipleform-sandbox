// https://developer.mozilla.org/ja/docs/Web/HTML/Element/input
import { v4 as uuidv4 } from "uuid";

export type InputType = "text" | "texterea" | "radio" | "checkbox" | "number";

export type Version = "v1" | "v2";

export interface Form {
  id: string;
  Version: Version;
  title: string;
  Inputs: Input[];
}

export interface validation {
  Range: {
    Min: number;
    Max: number;
  };
}

export type InputVersion = "v1" | "v2";

export interface Input {
  id: string;
  form_id: string;
  version: Version;
  sort_order: number;
  type: InputType;
  label: string;
  value: number | string | boolean | undefined;
  required: boolean;
  validation?: validation | undefined;
  description: string;
  radioOptions: Radio[];
}

export interface Radio {
  id: string;
  form_id: string;
  input_id: string;
  version: Version;
  label: string;
  value: string;
}

export const formID = uuidv4();
export const radioInputID = uuidv4();

export const FormA: Form = {
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
      radioOptions: [],
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
      radioOptions: [],
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
      radioOptions: [],
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
      radioOptions: [
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
      value: true,
      required: true,
      validation: undefined,
      radioOptions: [],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
    },
  ],
};
