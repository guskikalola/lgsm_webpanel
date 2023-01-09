// Utilities
import { defineStore } from "pinia";

const useAppStore = defineStore("theme", {
  state: () => ({
    drawer: true,
    theme: undefined
  }),
  getters: {
    getTheme: (state) => state.theme,
  },
  actions: {
    injectTheme(theme) {
      this.theme = theme;
    },
    toggleTheme() {
      let themeName = this.theme.global.name;
      this.theme.global.name = themeName == "dark" ? "light" : "dark";
    },
  },
});

export default useAppStore;