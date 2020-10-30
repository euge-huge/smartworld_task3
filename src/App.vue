<template>
  <div>
    <div class="app-wrapper">
      <Sidebar/>
      <div class="app-content">
        <div class="tasks">
          <div class="task-item" v-for="task in currentList[0].tasks" :key="task.id">
            <div>
              <input type="checkbox">
              <span>{{task.title}}</span> 
            </div>
            
            <div>
              <span>12.05.2018 12:00</span>
              <button class="btn btn-danger">&times;</button>
            </div>
          </div>
          <TaskItem/>
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
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    Sidebar,
    TaskItem,
    AddItemForm
  },
  data: () => ({
    
  }),
  computed: {
    ...mapState(['currentList'])
  },
  beforeMount() {
    this.setCurrentList(1)
  },
  methods: {
    ...mapMutations(['setCurrentList'])
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
