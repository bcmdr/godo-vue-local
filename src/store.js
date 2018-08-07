import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const STORAGE_KEY = "godo-vue";

const localStoragePlugin = store => {
  store.subscribe((mutation, { tasks }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  });
};

export default new Vuex.Store({
  state: {
    tasks: []
  },
  plugins: [createPersistedState(), localStoragePlugin],
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1);
    },
    editTask(
      state,
      {
        task,
        isActive = task.isActive,
        startedAt = task.startedAt,
        stoppedAt = task.stoppedAt,
        completed = task.completed
      }
    ) {
      (task.isActive = isActive),
        (task.stoppedAt = stoppedAt),
        (task.startedAt = startedAt),
        (task.completed = completed);
    }
  },
  actions: {
    addTask({ commit }, title) {
      commit("addTask", {
        title,
        createdAt: new Date(),
        startedAt: null,
        stoppedAt: null,
        isActive: false,
        completed: false,
        times: 0
      });
    },

    removeTask({ commit }, task) {
      commit("removeTask", task);
    },

    startTask({ commit }, task) {
      commit("editTask", {
        task,
        isActive: true,
        startedAt: new Date()
      });
    },

    stopTask({ commit }, task) {
      task.times = task.times + 1;
      commit("editTask", {
        task,
        isActive: false,
        stoppedAt: new Date(),
        completed: true,
        times: task.times
      });
    }
  }
});
