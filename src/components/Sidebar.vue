<template>
	<div id="lists-sidebar">
		<div class="lists-filter input-group mb-3">
			<select class="custom-select" id="inputGroupSelect01">
				<option value="all" selected>Все</option>
				<option value="done">Выполненные</option>
				<option value="not-done">Незавершенные</option>
			</select>
		</div>

		<ul class="list-group">
			<li class="list-link list-group-item " v-for="list in lists" :key="list.id" @click="listClick(list.id)">
				{{list.title}}
				<button class="delete-list btn btn-danger" @click.prevent="deleteList(list.id)">
					<span>&times;</span> 
				</button>
			</li>
		</ul>

		<form class="create-list-form">
			<div class="form-group">
				<label for="createListItem">Название нового списка</label>
				<input type="text" class="form-control" id="createListItem" v-model="titleOfNewList">
			</div>
			<button type="submit" class="btn btn-primary" @click.prevent="createListBtn" >Создать</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
	name: 'sidebar-menu',
	data: () => ({
		titleOfNewList: "",
	}),
	computed: {
		...mapState(['lists'])
	},
	methods: {
		...mapActions(['deleteList', 'addNewList']),
		...mapMutations(['setCurrentList']),

		listClick(id) {
        console.log(id);
			this.setCurrentList(id)
			// e.target.parentElement.children.forEach(i => {
			// 	console.log(i.className)
			// 	i.className = i.className.replaceAll('active', "")
			// })
			// e.target.className = e.target.className.concat('active')

		},
		createListBtn() {
			if (this.titleOfNewList.trim()) {
				const listToAdd = {
					id: Date.now(),
					title: this.titleOfNewList,
					tasks: []
				}

				this.addNewList(listToAdd);

				this.titleOfNewList = ""
			}
		}
	}
}
</script>

<style lang="less" scoped>
	#lists-sidebar {
		padding: 20px 0;
		width: 400px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow-y: scroll;
		background-color: #eeeeee;

	}

	.lists-filter {
		width: 80%;
		margin: 0 auto;
	}


	.list-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;

		.delete-list {
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

		&:hover .delete-list {
			display: flex;
		}
	}

	.create-list-form {
		width: 80%;
		margin: 0 auto;
		text-align: center;
	}
</style>