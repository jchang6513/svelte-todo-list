<script>
	import Store from './store.js';

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
		.header {
			background-color: #fff;
			border-radius: 10px;
			color: #565656;
			margin: 0 -30px;
			position: fixed;
			text-align: center;
			width: 350px;
			z-index: 100;
			.title {
				line-height: 60px;
				margin: 0px;
			}
			.btn-toggle {
				background-color: transparent;
				border: none;
				height: 20px;
				padding: 0px;
				position: absolute;
				right: 20px;
				top: 20px;
				width: 20px;
				&:after, &:before {
					border: solid #565656;
					content: "";
					height: 8px;
					left: 0px;
					position: absolute;
					transition: all .2s;
					width: 20px;
				}
				&:after {
					border-width: 1px 0 0;
					top: 2px;
				}
				&:before {
					border-width: 1px 0;
					top: 10px;
				}
				&.show {
					&:after {
						border-width: 1px 0 0;
						left: -2px;
						top: 8px;
						transform: rotateZ(45deg);
					}
					&:before {
						border-width: 0 0 1px;
						height: 0px;
						left: 1px;
						top: 9px;
						transform: rotateZ(-45deg);
					}
				}
			}
			.type-group {
				max-height: 0px;
				overflow: hidden;
				transition: all .3s;
				&.show {
					max-height: 120px;
				}
				.type-item {
					cursor: pointer;
				}
			}
		}
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
				bottom: 0px;
				color: #a0a0a0;
				position: absolute;
				right: 0px;
				&:hover, &:focus {
					outline: none;
				}
			}
		}
		type-group {
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
	}
</style>

<div class="todo-list">
	<div class="header">
		<h5 class="title">{type.text} tasks</h5>
		<button
			class="btn-toggle"
			class:show={typeCollapse}
			on:click={() => toggleType()}
		>
		</button>
		<div
			class="type-group"
			class:show={typeCollapse}
		>
			{#each types as {text, value}, index}
				<p
					class="type-item"
					class:select={value === type.value}
					on:click={() => changType(value)}
				>
					{text} tasks
				</p>
			{/each}
		</div>
	</div>

	<form class="todo-form" on:submit|preventDefault={addTodo}>
		<input class="todo-title" type="text" name="to-do" bind:value={todoTitle}>
		<button class="btn todo-submit">SUBMIT</button>
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
