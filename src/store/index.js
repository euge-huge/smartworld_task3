import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      
    ],
    currentList: null,

    listsLoading: false,
    listsBtnLoading: false,
    tasksLoading: false,
    tasksBtnLoading: false,
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
    setLists(state, lists) {
      state.lists = lists;
    },
    addNewList(state, toAdd) {
      let lists = state.lists
      lists.push(toAdd)
      state.lists = lists
    },
    deleteList(state, id) {
      state.lists = state.lists.filter(list => list._id !== id)
    },

    setCurrentList(state, id) {
      state.currentList = state.lists.find(list => list._id == id)
    },
       

    setTasks(state, {tasks, id}) {
      state.lists.find((list) => (list._id == id)).tasks = tasks
    },

    addNewTask(state, toAdd) { 
      let tasks = state.lists.find((list) => (list._id == toAdd.list)).tasks
      tasks.push(toAdd)
      state.lists.find((list) => (list._id == toAdd.list)).tasks = tasks
    },

    updateTask(state, toUpdate) {
      state.lists.find((list) => (list._id == toUpdate.currentListId)).tasks.find(task => task._id == toUpdate.taskId).completed = toUpdate.completed
    },

    deleteTask(state, toDelete) {
      state.lists.find((list) => (list._id == toDelete.currId)).tasks = state.lists.find((list) => (list._id == toDelete.currId)).tasks.filter(task => task._id != toDelete.taskId)
    },


    setListsLoading(state, status) {
      state.listsLoading = status
    },

    setTasksLoading(state, status) {
      state.tasksLoading = status
    },

    setTasksBtnLoading(state, status) {
      state.tasksBtnLoading = status
    },

    setListsBtnLoading(state, status) {
      state.listsBtnLoading = status
    }
  },
  actions: {
    async fetchLists({commit, dispatch}) {
      commit('setListsLoading', true)
      const all = await axios.get("http://localhost:5000/api/list/all")
      commit('setLists', all.data)
      all.data.map(list => {
        dispatch("fetchTasks", list._id)
      })
      commit('setListsLoading', false)
    },
    async addNewList({commit}, newList) {
      commit("setListsBtnLoading", true)
      let toAdd = await axios.post("http://localhost:5000/api/list/create", {title: newList.title})
      commit('addNewList', toAdd.data);
      commit("setListsBtnLoading", false)
    },
    async deleteList({commit}, id) {
      commit("setListsBtnLoading", true)
      await axios.delete(`http://localhost:5000/api/list/delete/` + id)
      commit('deleteList', id);
      commit("setListsBtnLoading", false)
    },
    async fetchTasks({commit}, id) {
      commit("setTasksLoading", true)
      const tasks = await axios.get("http://localhost:5000/api/task/" + id)
      commit("setTasks", {tasks: tasks.data, id})
      commit("setTasksLoading", false)
    },
    async addTask({commit}, newTask) {
      commit("setTasksBtnLoading", true)
      let toAdd = await axios.post('http://localhost:5000/api/task/add', newTask)
      commit("addNewTask", toAdd.data)
      commit("setTasksBtnLoading", false)
    },
    async updateTask({commit}, toUpdate) {
      await axios.put('http://localhost:5000/api/task/update/' + toUpdate.taskId, {completed: toUpdate.completed})
      commit("updateTask", toUpdate)
    },
    async deleteTask({commit}, toDelete) {
      commit("setTasksBtnLoading", true)
      await axios.delete("http://localhost:5000/api/task/delete/" + toDelete.taskId)
      commit("deleteTask", toDelete)
      commit("setTasksBtnLoading", false)
    }
  },
  modules: {}
});
