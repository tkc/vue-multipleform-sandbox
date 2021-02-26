import * as types from "../../types";
import { v4 as uuidv4 } from "uuid";

export interface FormEvent extends Omit<types.Form, "id" | "Inputs"> {
  Inputs: TemplateEvent[];
  valid: boolean;
}

export interface TemplateOption extends Omit<types.Option, "form_id"> {
  valid: boolean;
}

export interface TemplateEvent
  extends Omit<types.Input, "form_id" | "options"> {
  options: TemplateOption[];
  valid: boolean;
}

export interface TemplateState {
  form: FormEvent;
  valid: boolean;
}

export const InitialState: TemplateState = {
  form: {
    Version: "v1",
    title: "",
    Inputs: [],
    valid: false,
  },
  valid: false,
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
    // TODO : rename addRadioOption to Option
    addRadioOption(state: TemplateState, inputID: string) {
      addOption(state, inputID);
    },
    updateRadioOption(state: TemplateState, event: TemplateOption) {
      updateOption(state, event);
    },
    delRadioOption(state: TemplateState, event: TemplateOption) {
      delOption(state, event);
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
        label: event.label,
        value: "",
        required: true,
        validation: undefined,
        description: "",
        options: [],
        valid: false,
      });
      break;
    case "number":
      state.form.Inputs.push({
        id: event.id,
        version: "v1",
        sort_order: event.sort_order,
        type: event.type,
        label: event.label,
        value: 0,
        required: true,
        validation: undefined,
        description: "",
        options: [],
        valid: false,
      });
      break;
    case "radio":
    case "checkbox":
      const options: TemplateOption[] = [
        {
          id: uuidv4(),
          input_id: event.id,
          version: "v1",
          label: "",
          value: "",
          valid: false,
        },
      ];
      state.form.Inputs.push({
        id: event.id,
        version: "v1",
        sort_order: event.sort_order,
        type: event.type,
        label: event.label,
        value: options[0].value,
        required: true,
        validation: undefined,
        description: "",
        options: options,
        valid: false,
      });
      break;
    default:
  }
}

export function set(state: TemplateState, event: TemplateEvent) {
  state.form.Inputs.filter((e: TemplateEvent) => e.id === event.id).length > 0
    ? state.form.Inputs.forEach((e, index) =>
        e.id === event.id
          ? state.form.Inputs.splice(index, 1, setTemplateValue(e, event))
          : null
      )
    : null;
  // valid
  state.valid = validteState(state);
}

function setTemplateValue(
  origin: TemplateEvent,
  update: TemplateEvent
): TemplateEvent {
  const label = update.label ? update.label : origin.label;
  const description = update.description
    ? update.description
    : origin.description;
  return {
    ...origin,
    label: label,
    description: description,
    options: update.options ? update.options : origin.options,
  };
}

export function del(state: TemplateState, id: string) {
  const inputs = JSON.parse(JSON.stringify(state.form.Inputs));
  state.form.Inputs.splice(0, state.form.Inputs.length);
  inputs.forEach((e: TemplateEvent) => {
    if (e.id !== id) {
      state.form.Inputs.push(e);
    }
  });
  // valid
  state.valid = validteState(state);
}

//【Vue】配列の追加・削除には注意が必要
// https://qiita.com/_masa_u/items/f9076777b044673eea2a

export function addOption(state: TemplateState, inputID: string) {
  state.form.Inputs.forEach((e: TemplateEvent, index: number) =>
    e.id === inputID
      ? state.form.Inputs[index].options.splice(
          state.form.Inputs[index].options.length,
          1,
          {
            id: uuidv4(),
            input_id: state.form.Inputs[index].id,
            version: "v1",
            label: "",
            value: "",
            valid: false,
          }
        )
      : null
  );
  // valid
  state.valid = validteState(state);
}

export const updateOption = (state: TemplateState, event: TemplateOption) => {
  state.form.Inputs.forEach((e: TemplateEvent, index1: number) =>
    e.id === event.input_id
      ? e.options.forEach((o, index2) =>
          o.id === event.id
            ? state.form.Inputs[index1].options.splice(
                index2,
                1,
                updatedRadioOptionValue(o, event)
              )
            : null
        )
      : null
  );
  // valid
  state.valid = validteState(state);
};

export const delOption = (state: TemplateState, event: TemplateOption) => {
  // TODO : if options length is 1 dont remove option
  const inputs = state.form.Inputs;
  inputs.forEach((i, index1) =>
    i.options.forEach((o, index2) => {
      // TODO : fix bug
      o.id === event.id ? inputs[index1].options.splice(index2, 1) : null;
    })
  );
  // valid
  state.valid = validteState(state);
};

const updatedRadioOptionValue = (
  origin: TemplateOption,
  updated: TemplateOption
): TemplateOption => {
  const label = updated.label.length > 0 ? updated.label : origin.label;
  return {
    ...origin,
    label: label,
    value: label,
    valid: label.length > 0,
  };
};

// TODO : Check all elemnts and update each state
const validteState = (state: TemplateState): boolean => {
  let valid = true;
  state.form.Inputs.forEach((i) => {
    if (!i.label || !i.description) {
      valid = false;
    }
    i.options.forEach((o) => {
      if (!o.label) {
        valid = false;
      }
    });
  });
  return valid;
};
