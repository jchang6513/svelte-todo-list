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

<style>
	.select, .select:hover {
		background-color: red;
		border-color: red;
	}
</style>

<div class="container">
	<h1>todo List</h1>

	<form class="mb-3" on:submit|preventDefault={addTodo}>
		<input type="text" name="to-do" bind:value={todoTitle}>
		<button>Submit</button>
	</form>

	{#each types as {text, value}, index}
		<button
			type="button"
			class="btn btn-primary mr-2"
			class:select={value === type.value}
			value={value}
			on:click={changType}
		>
			{text}
		</button>
	{/each}


	<div class="mt-3">
		{#each todos as todo, index}
			{#if isTypeOf(todo)}
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
					<button
						on:click={() => removeTodo(todo)}
					>
						X
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
