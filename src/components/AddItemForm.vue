<template>
  <form class="form-inline">
  <div class="form-group mx-sm-3 mb-2">
    <label for="new-task" class="sr-only">New Task</label>
    <input type="text" class="form-control" id="new-task" placeholder="Введите новую задачу" v-model="title">
  </div>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" >
  <label class="form-check-label" for="inlineCheckbox1">Срочное</label>
</div>
  <button type="submit" class="btn btn-primary mb-2" @click.prevent="addNew">Добавить</button>
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
      console.log(this.currentList[0])
      let toAdd = {
        newT: {id: Date.now(), title: this.title, completed: false},
        id: this.currentList[0].id
      }
      this.addNewTask(toAdd);
      this.title = ""
    }
  }

}
</script>

<style>
  .form-inline {
    justify-content: center;
  }
</style>