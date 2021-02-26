export type InputType = "text" | "texterea" | "radio" | "checkbox" | "number";
export type Version = "v1";

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

export type InputVersion = "v1";

export interface Input {
  readonly id: string;
  readonly form_id: string;
  readonly version: Version;
  sort_order: number;
  readonly type: InputType;
  label: string;
  value: number | string | boolean | undefined | string[] | number[];
  required: boolean;
  validation?: validation | undefined;
  description: string;
  options: Option[];
}

export interface Option {
  id: string;
  form_id: string;
  input_id: string;
  version: Version;
  label: string;
  value: string;
}
