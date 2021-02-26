import * as types from "../../types";

export interface UpdateEvent
  extends Pick<types.Input, "form_id" | "id" | "value"> {}

export interface UpdateState {
  events: UpdateEvent[];
}

export const store = {
  namespaced: true,
  state: {
    events: [],
  },
  mutations: {
    reset(state: UpdateState, event: UpdateEvent[]) {
      reset(state, event);
    },
    set(state: UpdateState, event: UpdateEvent) {
      set(state, event);
    },
  },
};

export function reset(state: UpdateState, event: UpdateEvent[]) {
  state.events.splice(0, state.events.length);
  event.forEach((e, i) => {
    state.events.splice(i, 1, e);
  });
}

export function set(state: UpdateState, event: UpdateEvent) {
  state.events.filter((e: UpdateEvent) => e.id === event.id).length > 0
    ? state.events.forEach((e, index) =>
        e.id === event.id ? state.events.splice(index, 1, event) : null
      )
    : state.events.push(event);
}
