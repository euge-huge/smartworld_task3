<template>
  <div>
    <div class="app-wrapper">
      <Sidebar/>
      <div class="app-content">
        <div v-if="currentList" class="tasks">
          <span v-if="!currentList.tasks.length">Задач пока нет!</span>
          <TaskItem v-for="task in currentList.tasks" :key="task.id" :task="task" />
        </div>
        
        <div v-else class="no-tasks">
          Выберите список слева
        </div>
        <AddItemForm/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import TaskItem from "./components/TaskItem.vue";
import AddItemForm from "./components/AddItemForm.vue";
import {mapState} from 'vuex'
export default {
  components: {
    Sidebar,
    TaskItem,
    AddItemForm
  },
  computed: {
    ...mapState(['currentList'])
  }
}
</script>

<style lang="less">
  @import url("./assets/css/bootstrap.min.css");

  .app-wrapper {
    display: flex;
  }

  .app-content {
    padding-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
