import * as types from "../../types";
import { v4 as uuidv4 } from "uuid";

export interface FormEvent extends Omit<types.Form, "id" | "Inputs"> {
  Inputs: TemplateEvent[];
}

export interface TemplateEvent extends Omit<types.Input, "form_id"> {}

export interface TemplateState {
  form: FormEvent;
}

export const InitialState: TemplateState = {
  form: {
    Version: "v1",
    title: "",
    Inputs: [],
  },
};

export const store = {
  namespaced: true,
  state: {
    form: {
      Inputs: [],
    },
  },
  mutations: {
    add(state: TemplateState, event: TemplateEvent) {
      add(state, event);
    },
    set(state: TemplateState, event: TemplateEvent) {
      set(state, event);
    },
    del(state: TemplateState, id: string) {
      // 【Vue】配列の追加・削除には注意が必要
      // https://qiita.com/_masa_u/items/f9076777b044673eea2a
      del(state, id);
    },
    addRadioOption(state: TemplateState, inputID: string) {
      addRadioOption(state, inputID);
    },
    updateRadioOption(state: TemplateState, event: types.Radio) {
      updateRadioOption(state, event);
    },
    delRadioOption(state: TemplateState, event: types.Radio) {
      delRadioOption(state, event);
    },
    setForm(state: TemplateState, event: FormEvent) {
      setFormTitle(state, event.title);
    },
  },
};

export function setFormTitle(state: TemplateState, title: string) {
  state.form.title = title;
}

export function add(state: TemplateState, event: TemplateEvent) {
  switch (event.type) {
    case "text":
    case "texterea":
      state.form.Inputs.push({
        id: event.id,
        version: "v1",
        sort_order: event.sort_order,
        type: event.type,
        label: event.type,
        value: "",
        required: true,
        validation: undefined,
        description: "",
        radioOptions: [],
      });
      break;
    case "number":
      state.form.Inputs.push({
        id: event.id,
        version: "v1",
        sort_order: event.sort_order,
        type: event.type,
        label: event.type,
        value: 0,
        required: true,
        validation: undefined,
        description: "",
        radioOptions: [],
      });
      break;
    case "checkbox":
      state.form.Inputs.push({
        id: event.id,
        version: "v1",
        sort_order: event.sort_order,
        type: event.type,
        label: event.type,
        value: true,
        required: true,
        validation: undefined,
        description: "",
        radioOptions: [],
      });
      break;
    case "radio":
      const options: types.Radio[] = [
        {
          id: uuidv4(),
          form_id: "",
          input_id: event.id,
          version: "v1",
          label: "radio1",
          value: "radio1",
        },
      ];
      state.form.Inputs.push({
        id: event.id,
        version: "v1",
        sort_order: event.sort_order,
        type: event.type,
        label: event.type,
        value: options[0].value,
        required: true,
        validation: undefined,
        description: "",
        radioOptions: options,
      });
      break;
    default:
  }
}

export function set(state: TemplateState, event: TemplateEvent) {
  state.form.Inputs.filter((e: TemplateEvent) => e.id === event.id).length > 0
    ? (state.form.Inputs = state.form.Inputs.map((e: TemplateEvent) =>
        e.id === event.id
          ? {
              ...event,
              label: event.label ? event.label : e.label,
              value: event.value ? event.value : e.value,
              description: event.description
                ? event.description
                : e.description,
              radioOptions: event.radioOptions
                ? event.radioOptions
                : e.radioOptions,
            }
          : e
      ))
    : null;
}

export function del(state: TemplateState, id: string) {
  state.form.Inputs.forEach((e, index) =>
    e.id == id ? state.form.Inputs.splice(index, 1) : null
  );
}

//【Vue】配列の追加・削除には注意が必要
// https://qiita.com/_masa_u/items/f9076777b044673eea2a

export function addRadioOption(state: TemplateState, inputID: string) {
  state.form.Inputs.forEach((e: TemplateEvent, index: number) =>
    e.id === inputID
      ? state.form.Inputs[index].radioOptions.splice(
          state.form.Inputs[index].radioOptions.length,
          1,
          {
            id: uuidv4(),
            form_id: "",
            input_id: state.form.Inputs[index].id,
            version: "v1",
            label: "",
            value: "",
          }
        )
      : null
  );
}

export const updateRadioOption = (state: TemplateState, event: types.Radio) =>
  state.form.Inputs.forEach((e: TemplateEvent, index1: number) =>
    e.id === event.form_id
      ? e.radioOptions.forEach((o, index2) =>
          o.id === event.id
            ? state.form.Inputs[index1].radioOptions.splice(
                index2,
                1,
                updatedRadioOptionValue(o, event)
              )
            : null
        )
      : null
  );

export const delRadioOption = (state: TemplateState, event: types.Radio) => {
  const inputs = state.form.Inputs;
  inputs.forEach((i, index1) =>
    i.radioOptions.forEach((r, index2) => {
      state.form.Inputs[index1].radioOptions.splice(
        0,
        state.form.Inputs[0].radioOptions.length
      );
      r.id === event.id ? inputs[index1].radioOptions.splice(index2, 1) : null;
    })
  );
};

const updatedRadioOptionValue = (
  origin: types.Radio,
  updated: types.Radio
): types.Radio => {
  const label = updated.label.length > 0 ? updated.label : origin.label;
  return {
    ...origin,
    label: label,
    value: label,
  };
};