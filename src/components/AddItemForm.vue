<template>
  <form class="form-inline">
  <div class="new-task-group form-group">
    <label for="new-task" class="sr-only">Новая задача</label>
    <input type="text" class="form-control" id="new-task" placeholder="Введите новую задачу" v-model="title">
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="importance-check" v-model="important">
    <label class="form-check-label" for="importance-check">Срочно</label>
  </div>
  <button v-if="!tasksBtnLoading" type="submit" class="btn btn-primary" @click.prevent="addNew" :disabled="!currentList" >Добавить</button>
  <button v-else class="btn btn-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button>
</form>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import axios from 'axios'
export default {
  data: () => ({
    title: "",
    important: false
  }),
  computed: {
    ...mapState(['currentList', 'tasksBtnLoading'])
  },
  methods: {
    ...mapActions(['addTask']),

    async addNew() {
      if (this.title.trim()) {
        let toAdd = {
        newTask: { title: this.title, important: this.important, completed: false},
        idOfList: this.currentList._id
      }
      await this.addTask(toAdd);
      this.title = ""
      this.important = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
  .form-inline {
    padding: 30px 0px;
    margin: 20px auto 0 auto;
    display: flex;
    width: 70%;
    justify-content: space-around;
    border-top: 1px solid #eee;
  }

.new-task-group {
  width: 50%;
  input {
    width: 100%;
  }
}
</style>