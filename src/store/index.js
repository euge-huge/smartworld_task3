import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      {id: 1, title: "Список дел на 21.12", tasks: [
        {id: 11, title: "Купить молоко", important: true, createdAt: 1327611110417 ,completed: false},
        {id: 12, title: "Сделать домашку", important: false, createdAt: 1327611110417 ,completed: true},
        {id: 13, title: "Сходить в кино", important: true, createdAt: 1327611110417 ,completed: false},
      ]},
      {id: 2, title: "Купить в магазине", tasks: [
        {id: 21, title: "Мороженное", important: false, createdAt: 1327611110417 ,completed: true},
        {id: 22, title: "Хлеб", important: true, createdAt: 1327611110417 ,completed: true},
        {id: 23, title: "Корм для рыбки", important: false, createdAt: 1327611110417 , completed: true},
      ]}
    ],

    currentList: null,
  },
  getters: {
    getAllLists: s => s.lists,
    getCurrentList: s => s.currentList,
    getDoneLists: s => s.lists.filter(list => {
      if (!list.tasks.find(task => task.completed == false) && list.tasks.length != 0) return true
    }),
    getNotDoneLists: s => s.lists.filter(list => {
      if (list.tasks.find(task => task.completed == false) && list.tasks.length != 0) return true
    })
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

    updateTask(state, toUpdate) {
      state.lists.find((list) => (list.id == toUpdate.currentListId)).tasks.find(task => task.id == toUpdate.taskId).completed = toUpdate.completed
    },

    deleteTask(state, toDelete) {
      state.lists.find((list) => (list.id == toDelete.currId)).tasks = state.lists.find((list) => (list.id == toDelete.currId)).tasks.filter(task => task.id != toDelete.taskId)
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
