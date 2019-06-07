<script>
	import Store from './store.js';

	let types = [
		{text: 'All', value: 1},
		{text: 'todo', value: 2},
		{text: 'Accomplished', value: 3},
	];

	let type = {text: 'All', value: 1};

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
	function changType(event) {
		const value = parseInt(event.target.value);
		type = types.find(type => {
			return type.value === value
		})
	}

	$: isTypeOf = (todo) => {
		switch (type.value) {
			case 1: // All
				return true
			case 2: // todo
				return todo.checked === false
			case 3: // Accomplished
				return todo.checked === true
		}
	}

// todo CRUD
	function addTodo() {
		todos = todos.concat({id: timeId(), title: todoTitle, checked: false});
		todoTitle = '';
		Store.set('todoList', todos);
	}

	function updateTodo(todo, value) {
		const id = todo.id
		todos = todos.map((todo) => {
			if (todo.id === id) { todo = {...todo, ...value}; }
			return todo;
		})
		Store.set('todoList', todos);
	}

	function removeTodo(todo) {
		const id = todo.id;
		let todoIndex = -1;
		todos.find((todo, index) => {
			if (todo.id === id) {
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
	@import url('https://fonts.googleapis.com/css?family=Arimo&display=swap');
	* {
		font-family: 'Arimo', sans-serif;
		outline: none !important;
	}
	.todo-list {
		border: 1px solid #e6e6e6;
		height: 80%;
		margin: 10% auto;
		padding: 30px;
		width: 350px;
		.title {
			color: #565656;
		}
		.todo-form {
			margin: 20px 0 30px;
			position: relative;
			width: 100%;
			.todo-title {
				border: none;
				border-bottom: 1px solid #e6e6e6;
				outline: none;
				width: 100%;
			}
			.todo-submit {
				bottom: 0px;
				color: #a0a0a0;
				position: absolute;
				right: 0px;
				&:hover, &:focus {
					outline: none;
				}
			}
		}
		.type-group {
			border-bottom: 1px solid #efefef;
			margin-bottom: 30px;
			.btn-type {
				border: 1px solid #efefef;
				border-radius: 5px 5px 0 0;
				&:hover, &:focus {
					outline: none;
				}
				&.select {
					border-color: #565656;
				}
			}
		}
		.todo-items {
			overflow:  scroll;
			width: 100%;
		}
		.todo-item {
			display: flex;
			justify-content: space-between;
		}
	}
</style>

<div class="todo-list">
	<h3 class="title">Todo List</h3>

	<form class="todo-form" on:submit|preventDefault={addTodo}>
		<input class="todo-title" type="text" name="to-do" bind:value={todoTitle}>
		<button class="btn todo-submit">SUBMIT</button>
	</form>
	<div class="type-group">
		{#each types as {text, value}, index}
			<button
				type="button"
				class="btn btn-type"
				class:select={value === type.value}
				value={value}
				on:click={changType}
			>
				{text}
			</button>
		{/each}
	</div>


	<div class="todo-items">
		{#each todos as todo, index}
			{#if isTypeOf(todo)}
				<div class="todo-item">
					<div class="form-check">
					<input
						id={`item-${index}`}
						class="form-check-input"
						type="checkbox"
						checked={todo.checked}
						on:click={() => updateTodo(todo,{checked: !todo.checked})}
					>
					<label
						class="form-check-label"
						for={`item-${index}`}
					>
						{todo.title}
					</label>
					</div>
					<button
						class="btn"
						on:click={() => removeTodo(todo)}
					>
						X
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
