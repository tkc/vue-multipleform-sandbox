import * as input from "./input";
import { v4 as uuidv4 } from "uuid";

function createNewMockState(): input.UpdateState {
  return {
    events: [],
  };
}

describe("InputState", () => {
  test("set", () => {
    const state = createNewMockState();
    const event: input.UpdateEvent = {
      id: uuidv4(),
      form_id: uuidv4(),
      value: undefined,
    };

    input.set(state, event);
    expect(state.events.length).toBe(1);
    expect(state.events[0].value).toBe(event.value);

    event.value = "updatedLabelName";
    input.set(state, event);
    expect(state.events[0].value).toBe(event.value);
  });
});
