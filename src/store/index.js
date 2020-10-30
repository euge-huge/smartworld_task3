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
      ]},
      {id: 3, title: "На отдых", tasks: []},
      {id: 4, title: "Сделать На учебе", tasks: []},
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
      newList.tasks = []
      let lists = state.lists
      lists.push(newList)
      state.lists = lists
    },

    addNewTask(state, toAdd) {
      let list = state.lists.filter(list => list.id == toAdd.id)[0].tasks
      list.push(toAdd.newT)

      state.lists.filter(list => list.id == toAdd.id)[0].tasks = list
      console.log(list)
      console.log(toAdd.newT)
    },
    setCurrentList(state, id) {
      state.currentList = state.lists.filter(list => list.id == id)
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
