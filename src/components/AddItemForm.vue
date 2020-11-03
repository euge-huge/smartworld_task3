<template>
  <form class="form-inline">
  <div class="form-group">
    <label for="new-task" class="sr-only">Новая задача</label>
    <input type="text" class="form-control" id="new-task" placeholder="Введите новую задачу" v-model="title">
  </div>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="importance-check" value="option1" >
  <label class="form-check-label" for="importance-check">Срочное</label>
</div>
  <button type="submit" class="btn btn-primary" @click.prevent="addNew" :disabled="!currentList" >Добавить</button>
</form>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  data: () => ({
    title: ""
  }),
  computed: {
    ...mapState(['currentList'])
  },
  methods: {
    ...mapMutations(['addNewTask']),

    addNew() {
      if (this.title.trim()) {
        let toAdd = {
        newTask: {id: Date.now(), title: this.title, completed: false, createdAt: Date.now()},
        idOfList: this.currentList.id
      }
      this.addNewTask(toAdd);
      this.title = ""
      }
    }
  }

}
</script>

<style>
  .form-inline {
    padding: 30px 0px;
    margin: 20px;
    justify-content: center;
    border-top: 1px solid #eee;
  }
</style>