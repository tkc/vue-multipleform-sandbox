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

  test("set", () => {
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

    event.value = "updatedValue";
    templateState.set(state, event);
    expect(state.form.Inputs[0].value).toBe(event.value);
    expect(state.form.Inputs.length).toBe(1);

    event.description = "updatedDescription";
    templateState.set(state, event);
    expect(state.form.Inputs[0].description).toBe(event.description);
    expect(state.form.Inputs.length).toBe(1);
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

  test("set&dell", () => {
    const state = createNewMockState();

    const event1: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "text",
      label: "test1",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };
    templateState.add(state, event1);
    expect(state.form.Inputs.length).toBe(1);

    const event2: templateState.TemplateEvent = {
      id: uuidv4(),
      version: "v1",
      sort_order: 1,
      type: "text",
      label: "test2",
      value: undefined,
      required: true,
      description: "",
      radioOptions: [],
    };
    templateState.add(state, event2);
    expect(state.form.Inputs.length).toBe(2);

    templateState.del(state, event1.id);
    expect(state.form.Inputs.length).toBe(1);
    expect(state.form.Inputs[0].label).toBe(event2.label);
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

    templateState.updateRadioOption(state, {
      id: updateEvent.id,
      form_id: "",
      input_id: updateEvent.input_id,
      version: updateEvent.version,
      label: updateEvent.label,
      value: updateEvent.value,
    });

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

    // TOOD : use speciality event interface for delete.
    const delEvent = state.form.Inputs[0].radioOptions[0];
    templateState.delRadioOption(state, {
      id: delEvent.id,
      form_id: "",
      input_id: delEvent.input_id,
      version: delEvent.version,
      label: delEvent.label,
      value: delEvent.value,
    });
    expect(state.form.Inputs[0].radioOptions.length).toBe(0);
  });

  test("setFormTitle", () => {
    const state = createNewMockState();
    const title = faker.name.firstName();
    templateState.setFormTitle(state, title);
    expect(state.form.title).toBe(title);
  });
});
