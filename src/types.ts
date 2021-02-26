export type InputType = "text" | "texterea" | "radio" | "checkbox" | "number";
export type Version = "v1" | "v2";

export interface Form {
  readonly id: string;
  readonly Version: Version;
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
  readonly id: string;
  readonly form_id: string;
  readonly version: Version;
  sort_order: number;
  readonly type: InputType;
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
