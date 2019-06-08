<script>
	import Store from './store.js';
	import Header from './Header.svelte'
	import TodoItem from './TodoItem.svelte'

	let typeCollapse = false;
	let type = {text: 'All', value: 1};
	let types = [
		{text: 'All', value: 1},
		{text: 'Todo', value: 2},
		{text: 'Accomplished', value: 3},
	];

	let todoTitle = ''
	let todos = Store.isExist('todoList') ?
		Store.get('todoList') :
		[
			{id: timeId(), title: 'todo1', checked: true},
			{id: timeId(), title: 'todo2', checked: false}
		];

	function timeId() {
		const trailing = 10**5;
		return parseInt(trailing*(Date.now()+Math.random()))
	}

// todo type
	function toggleType() {
		typeCollapse = !typeCollapse
	}
	function changType(value) {
		type = types.find(type => {
			return type.value === value
		})
		toggleType()
	}

// todo CRUD

	function addTodo() {
		todos = todos.concat({id: timeId(), title: todoTitle, checked: false});
		todoTitle = '';
		Store.set('todoList', todos);
		forceUpdate = true;
	}

	function getTodos(type, todos) {
		return todos.filter((todo) => {
			switch (type.value) {
				case 1: // All
					return true
				case 2: // todo
					return todo.checked === false
				case 3: // Accomplished
					return todo.checked === true
			}
		})
	}

	function updateTodo(todoId, value) {
		todos = todos.map((todo) => {
			if (todo.id === todoId) { todo = {...todo, ...value}; }
			return todo;
		})
		Store.set('todoList', todos);
		return 1
	}

	function removeTodo(todoId) {
		let todoIndex = -1;
		todos.find((todo, index) => {
			if (todo.id === todoId) {
				todoIndex = index;
				return index;
			}
		})
		if (todoIndex >= 0 ) {
			todos.splice(todoIndex, 1);
			Store.set('todoList', todos);
			todos = todos;
		}
	}

</script>

<style type="text/sass">
	@import url('https://fonts.googleapis.com/css?family=Arimo|Lobster&display=swap');
	* {
		font-family: 'Arimo', sans-serif;
		outline: none !important;
	}
	.todo-list {
		background-color: white;
		border-radius: 5px;
		height: 80%;
		margin: calc(10% - 22px) auto;
		padding: 0;
		position: relative;
		width: 350px;
		.todo-form {
			margin: 80px 30px 0;
			position: relative;
			width: calc(100% - 55px);
			.todo-title {
				border: none;
				border-bottom: 1px solid #c6c6c6;
				outline: none;
				width: calc(100% - 50px);
			}
			.todo-submit {
				background: none;
				background-color: #00d7de;
				border: none;
				border-radius: 100%;
				bottom: 0px;
				color: #fff;
				font-size: 25px;
				font-weight: bold;
				height: 40px;
				line-height: 40px;
				outline: none;
				padding: 0px;
				position: absolute;
				right: 0px;
    		width: 40px;
				transition: all .3s;
				&:hover, &:focus {
					outline: none;
				}
			}
		}
		@media (max-width: 576px) {
			border-radius: 0px;
			height: 100%;
			margin: 0px;
			position: absolute;
			top: 0px;
			width: 100%;
			.todo-form {
				margin-top: 100px;
			}
		}
	}
</style>

<div class="todo-list">
	<Header
		typeCollapse={typeCollapse}
		type={type}
		types={types}
		on:toggle={()=>toggleType()}
		on:change={(event)=>changType(event.detail.value)}
	/>

	<TodoItem
		todos={getTodos(type, todos)}
		on:check={(event)=>updateTodo(event.detail.id, event.detail.value)}
		on:remove={(event)=>removeTodo(event.detail.id)}
	/>

	<form class="todo-form" on:submit|preventDefault={addTodo}>
		<input class="todo-title" type="text" name="to-do" bind:value={todoTitle}>
		<button class="todo-submit" disabled={todoTitle === ''}>＋</button>
	</form>
</div>
