<template>
  <div>
    <div class="app-wrapper">
      <Sidebar/>
      <div class="app-content">
        <div v-if="currentList" class="tasks">
          <MessageLog v-if="!currentList.tasks.length" msg="Задач пока нет" sub="Добавьте новую, используя форму ниже"/>
          <TaskItem v-for="task in currentList.tasks" :key="task._id" :task="task"/>
        </div>
        <div v-else class="tasks no">
          <MessageLog msg="Нет активного списка" sub="Выберите список слева, или создайте новый, если его нет"/>
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
import MessageLog from "./components/MessageLog.vue";
import {mapState, mapActions} from 'vuex'
export default {
  components: {
    Sidebar,
    TaskItem,
    AddItemForm,
    MessageLog
  },
  computed: {
    ...mapState(['currentList'])
  },
  methods: {
    ...mapActions(['fetchLists'])
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

  .tasks {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
