<script>
	import Store from './store.js';
	import Header from './Header.svelte'

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
		background-color: white;
		border-radius: 5px;
		height: 80%;
		margin: calc(10% - 22px) auto;
		padding: 0 30px 30px;
		position: relative;
		width: 350px;
		.todo-form {
			margin: 30px 0;
			padding-top: 80px;
			position: relative;
			width: 100%;
			.todo-title {
				border: none;
				border-bottom: 1px solid #e6e6e6;
				outline: none;
				width: 100%;
			}
			.todo-submit {
				background: none;
				border: none;
				bottom: 0px;
				color: #565656;
				outline: none;
				position: absolute;
				right: 0px;
				&:disabled {
					color: #a0a0a0;
				}
				&:hover, &:focus {
					outline: none;
				}
			}
		}
		.todo-items {
			height: 380px;
			overflow:  scroll;
			padding-right: 5px;
			width: 100%;
			.todo-item {
				display: flex;
				justify-content: space-between;
				.checked {
					label {
						color: #a0a0a0;
						text-decoration: line-through;
					}
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
				padding-top: 50px;
			}
			.todo-items {
				height: calc(100% - 140px);
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
	<form class="todo-form" on:submit|preventDefault={addTodo}>
		<input class="todo-title" type="text" name="to-do" bind:value={todoTitle}>
		<button class="todo-submit" disabled={todoTitle === ''}>SUBMIT</button>
	</form>

	<div class="todo-items">
		{#each todos as todo, index}
			{#if isTypeOf(todo)}
				<div class="todo-item">
					<div
						class="form-check"
						class:checked={todo.checked}
					>
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
