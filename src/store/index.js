import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      {id: 1, title: "Список дел на 21.12", tasks: [
        {id: 1, title: "Купить че-то", completed: false},
        {id: 2, title: "Купить че-то 2", completed: false},
        {id: 3, title: "Купить че-то 3", completed: false},
      ]},
      {id: 2, title: "Купить в магазине", tasks: [
        {id: 1, title: "2Купить че-то", completed: false},
        {id: 2, title: "2Купить че-то 2", completed: false},
        {id: 3, title: "2Купить че-то 3", completed: false},
      ]}
    ],

    currentList: null,
  },
  getters: {
    getLists: s => s.lists,
    getCurrentList: s => s.currentList
   },
  mutations: {
    deleteList(state, id) {
      state.lists = state.lists.filter(list => list.id !== id)
    },

    addNewList(state, newList) {
      let lists = state.lists
      lists.push(newList)
      state.lists = lists
    },

    addNewTask(state, toAdd) {
      let tasks = state.lists.find((list) => (list.id == toAdd.idOfList)).tasks
      tasks.push(toAdd.newTask)
      state.lists.find((list) => (list.id == toAdd.idOfList)).tasks = tasks
    },

    deleteTask(state, toDelete) {
      state.lists.find((list) => (list.id == toDelete.currId)).tasks = state.lists.find((list) => (list.id == toDelete.currId)).tasks.filter(task => task.id != toDelete.taskId)
      console.log(tasks)
    },

    setCurrentList(state, id) {
      state.currentList = state.lists.find(list => list.id == id)
    }
  },
  actions: {
    deleteList({commit}, id) {
      commit('deleteList', id);
    },
    addNewList({commit}, newList) {
      commit('addNewList', newList);
    }
  },
  modules: {}
});
