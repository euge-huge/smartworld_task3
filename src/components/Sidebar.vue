<template>
	<div id="lists-sidebar">
		<div class="lists-filter input-group mb-3">
			<select v-model="selectFilter" @change="filterList" class="custom-select" id="list-filter" >
				<option value="all" selected>Все</option>
				<option value="done">Завершенные</option>
				<option value="not-done">Незавершенные</option>
			</select>
		</div>

		<div v-if="listsLoading" class="d-flex justify-content-center align-items-center">
			<div class="spinner-grow text-primary" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>

		<ul v-else-if="lists.length" class="list-group">
			<li class="list-link list-group-item " v-for="list in lists" :key="list._id" @click="listClick(list._id, $event)">
				{{list.title}}
				<div class="cl-btn-7" @click.prevent="deleteListBtn(list._id)">
				</div>
			</li>
		</ul>

		<div v-else class="text-center text-muted">
			Списков пока нет
		</div>

		<form class="create-list-form">
			<div class="form-group">
				<label for="createListItem">Создайте список</label>
				<input type="text" class="form-control" id="createListItem" v-model="titleOfNewList">
			</div>
			<button  v-if="!listsBtnLoading" type="submit" class="btn btn-primary" @click.prevent="createListBtn" >Создать</button>
			<button v-else class="btn btn-primary" type="button" disabled>
				<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
				Loading...
			</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
	name: 'sidebar-menu',
	data: () => ({
		titleOfNewList: "",
		selectFilter: "all",
		lists: []
	}),
	computed: {
		...mapState(['listsLoading', 'listsBtnLoading']),
		...mapGetters(['getAllLists','getDoneLists','getNotDoneLists'])
	},
	async beforeMount() {
		await this.fetchLists();
		this.lists = this.getAllLists
	},
	methods: {
		...mapActions(['deleteList', 'addNewList', "fetchLists", "fetchTasks"]),
		...mapMutations(['setCurrentList']),

		filterList() {
			this.setCurrentList(null); 
			switch (this.selectFilter) {
				case "all":
					this.lists = this.getAllLists
					break;
				case "done":
					this.lists = this.getDoneLists
					break;
				case "not-done":
					this.lists = this.getNotDoneLists
					break;
			}
		},

		async listClick(id, event) {
			this.setCurrentList(id)
			event.target.parentElement.children.forEach(i => {
				i.className = i.className.replaceAll('active', "")
			})
			event.target.className = event.target.className.concat('active')

		},

		async deleteListBtn(id) {
			await this.deleteList(id);
			this.filterList()
		},
		async createListBtn() {
			if (this.titleOfNewList.trim()) {
				const listToAdd = {
					id: Date.now(),
					title: this.titleOfNewList,
					tasks: []
				}

				await this.addNewList(listToAdd);

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

		&:hover .cl-btn-7 {
			display: inline-block;
		}
	}

	.create-list-form {
		width: 80%;
		margin: 20px auto 0 auto;
		text-align: center;
	}

	.cl-btn-7 {
    display: none;
    width: 20px;
    height: 20px;
    border-radius: 40px;
    position: relative;
    z-index: 1;
    cursor: pointer;
}
.cl-btn-7:before {
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
.cl-btn-7:after {
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
.cl-btn-7:hover:after {
    transform: scale(1);
}
.cl-btn-7:hover:before {
    transform: scale(0.8) rotate(45deg);
    color: #fff;
}
</style>