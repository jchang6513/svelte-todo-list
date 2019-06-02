<script>
	let todo = '';
	let todos = [
		{content: 'todo1', checked: true},
		{content: 'todo2', checked: false},
	];

	let types = [
		{text: 'All', value: 1},
		{text: 'todo', value: 2},
		{text: 'Accomplished', value: 3},
	];
	let type = {text: 'All', value: 1};

	function addTodo(event) {
		todos = todos.concat({content: todo, checked: false})
	}

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
		<input type="text" name="to-do" bind:value={todo}>
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
						value=""
						bind:value={content}
						checked={todo.checked}
					>
					<label
						class="form-check-label"
						for={`item-${index}`}
					>
						{todo.content}
					</label>
				</div>
			{/if}
		{/each}
	</div>
</div>
