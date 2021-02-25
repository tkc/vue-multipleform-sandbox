const faker = require("faker");
import * as templateState from "./template";
import { v4 as uuidv4 } from "uuid";

function createNewMockState(): templateState.TemplateState {
  return {
    form: {
      Version: "v1",
      title: "",
      Inputs: [],
    },
  };
}

describe("TemplateState", () => {
  test("add", () => {
    const state = createNewMockState();
    const event1: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "text",
      label: "",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };

    templateState.add(state, event1);
    expect(state.form.Inputs[0].type).toBe(event1.type);
    expect(state.form.Inputs.length).toBe(1);

    const event2: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "text",
      label: "",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };

    templateState.add(state, event2);
    expect(state.form.Inputs[0].type).toBe(event2.type);
    expect(state.form.Inputs.length).toBe(2);
  });

  test("dell", () => {
    const state = createNewMockState();
    const event: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "text",
      label: "",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };

    templateState.add(state, event);
    expect(state.form.Inputs[0].type).toBe(event.type);
    expect(state.form.Inputs.length).toBe(1);
    templateState.del(state, state.form.Inputs[0].id);
    expect(state.form.Inputs.length).toBe(0);
  });

  test("addRadioOption", () => {
    const state = createNewMockState();
    const event: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "radio",
      label: "",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };

    templateState.add(state, event);
    expect(state.form.Inputs[0].type).toBe(event.type);
    expect(state.form.Inputs.length).toBe(1);
    templateState.addRadioOption(state, event.id);
    expect(state.form.Inputs[0].radioOptions.length).toBe(2);
  });

  test("updateRadioOption", () => {
    const state = createNewMockState();
    const event: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "radio",
      label: "",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };

    templateState.add(state, event);
    expect(state.form.Inputs[0].type).toBe(event.type);
    expect(state.form.Inputs.length).toBe(1);

    const updateEvent = state.form.Inputs[0].radioOptions[0];
    templateState.updateRadioOption(state, updateEvent);
    expect(state.form.Inputs[0].radioOptions[0].value).toBe(updateEvent.label);
    expect(state.form.Inputs[0].radioOptions.length).toBe(1);
  });

  test("delRadioOption", () => {
    const state = createNewMockState();
    const event: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "radio",
      label: "",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };

    templateState.add(state, event);
    expect(state.form.Inputs[0].type).toBe(event.type);
    expect(state.form.Inputs.length).toBe(1);

    const delEvent = state.form.Inputs[0].radioOptions[0];
    templateState.delRadioOption(state, delEvent);
    expect(state.form.Inputs[0].radioOptions.length).toBe(0);
  });

  test("setFormTitle", () => {
    const state = createNewMockState();
    const title = faker.name.firstName();
    templateState.setFormTitle(state, title);
    expect(state.form.title).toBe(title);
  });
});
