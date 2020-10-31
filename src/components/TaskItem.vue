<template>
  <div class="task-item">
    <div>
      <input type="checkbox">
      <span>{{task.title}}</span> 
    </div>
    
    <div>
      <span>12.05.2018 12:00</span>
      
      <button class="delete-task btn btn-danger" @click.prevent="deleteTaskBtn(task.id)">
				<span>&times;</span> 
			</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    task: Object
  },
  computed: {
    ...mapState(['currentList'])
  },
  methods: {
    ...mapMutations(['deleteTask']),
    deleteTaskBtn(id) {
      let toDelete = {
        currId: this.currentList.id,
        taskId: id
      }
      this.deleteTask(toDelete)
    }
  }
}
</script>

<style lang='less'>
  .task-item {
    width: 80%;
    margin: 0 auto;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 3px;

    .delete-task {
			margin: 0;
			padding: 2px;
			width: 17px;
			height: 17px;
			display: none;
			justify-content: center;
			align-items: center;
			color:rgb(255, 200, 211);
			border-radius: 50%;

			span {
				font-size: 12px;
				line-height: 0.8;
				vertical-align: middle;	
			}

				
		}

		&:hover .delete-task {
			display: inline-flex;
    }
    
    
  }

  
</style>