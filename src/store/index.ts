import Vuex from "vuex";
import * as template from "./namespaces/template.ts";
import * as imput from "./namespaces/input.ts";

// Modules
// https://vuex.vuejs.org/guide/modules.html#namespacing
// https://scrimba.com/scrim/cqKK4psq?pl=pnyzgAP

export const store = new Vuex.Store({
  modules: {
    input: imput.store,
    template: template.store,
  },
});
