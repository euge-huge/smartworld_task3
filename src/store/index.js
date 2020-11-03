import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      {id: 1, title: "Список дел на 21.12", tasks: [
        {id: 1, title: "Купить молоко", createdAt: 1327611110417 ,completed: false},
        {id: 2, title: "Сделать домашку", createdAt: 1327611110417 ,completed: false},
        {id: 3, title: "Сходить в кино", createdAt: 1327611110417 ,completed: false},
      ]},
      {id: 2, title: "Купить в магазине", tasks: [
        {id: 1, title: "Мороженное", createdAt: 1327611110417 ,completed: true},
        {id: 2, title: "Хлеб", createdAt: 1327611110417 ,completed: true},
        {id: 3, title: "Корм для рыбки", createdAt: 1327611110417 , completed: false},
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

    updateTask(state, toUpdate) {
      console.log(toUpdate)
      console.log(state.lists.find(list => (list.id == toUpdate.currentListId)).tasks.find(task => task.id = toUpdate.taskToUpdate.id))

      //state.lists.find(list => (list.id == toUpdate.currentListId)).tasks.find(task => task.id = toUpdate.taskToUpdate.id) = toUpdate.taskToUpdate
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
