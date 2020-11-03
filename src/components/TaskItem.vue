<template>
  <div class="task-item" :class="{done : task.completed}" ref="task">
    <div class="pre">
      <input type="checkbox"  :checked="task.completed" v-model="completed" @change="changeComplete($event)" >
      <span> {{ task.title }} </span>
    </div>
    
    <div class="post">
      <span>{{ new Date(task.createdAt).toLocaleDateString("ru-RU", {hour: 'numeric', minute: 'numeric', second: 'numeric'}) }}</span>
      <div class="delete-btn" @click="deleteTaskBtn(task.id)" ></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    task: Object
  },
  data: () => ({
    completed: ''
  }),
  mounted() {
    this.completed = this.task.completed
  },
  computed: {
    ...mapState(['currentList']),
  },
  methods: {
    ...mapMutations(['deleteTask', 'updateTask']),
    deleteTaskBtn(id) {
      let toDelete = {
        currId: this.currentList.id,
        taskId: id
      }
      this.deleteTask(toDelete);
    },
    changeComplete(event) {
      this.$refs.task.classList.toggle('done')
      let taskToUpdate = {
        ...this.task,
        completed: this.completed,
      }
      let toUpdate = {
        currentListId: this.currentList.id,
        taskToUpdate
      }
      this.updateTask(toUpdate)
    },
  }
}
</script>

<style lang='less'>
  .task-item {
    width: 80%;
    margin: 10px auto;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 3px;

    .post {
      display: flex;
      align-items: center;

      span {
        color: #6c757d;
        margin-right: 30px;
      }
    }

    &:hover {
      .delete-btn {
        display: inline-block;
      }

      .post span {
        margin-right: 0px;
      }
    }

    }

    .done {
      background-color: #28a745;
      color: #e4e4e4;
      text-decoration: line-through;
      span {
        color: #e4e4e4 !important;
      }
    }
    
  .delete-btn {
    margin-left: 10px;
    display: none;
    width: 20px;
    height: 20px;
    border-radius: 40px;
    position: relative;
    z-index: 1;
    cursor: pointer;
}
.delete-btn:before {
    content: '+';
    color: #dc3545;
    position: absolute;
    z-index: 2;
    transform: rotate(45deg);
    font-size: 25px;
    line-height: 1;
    top: -2px;
    left: 3px;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.2, 0.85);
}
.delete-btn:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: #dc3545;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.2, 0.85);
    transform: scale(0.01);
}
.delete-btn:hover:after {
    transform: scale(1);
}
.delete-btn:hover:before {
    transform: scale(0.8) rotate(45deg);
    color: #fff;
}
    
    

  
</style>