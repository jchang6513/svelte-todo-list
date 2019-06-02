<script>
	export let name = 'set dafault';

	let toDo = '';
	let toDos = [
		{content: 'todo1', checked: true},
		{content: 'todo1', checked: false},
	];

	function addToDo(event) {
		toDos = toDos.concat({content: toDo, checked: false})
	}
</script>

<style>

</style>

<div class="container">
	<h1>To-Do List</h1>

	<form on:submit|preventDefault={addToDo}>
		<input type="text" name="to-do" bind:value={toDo}>
		<button>Submit</button>
	</form>
	<div>
		{#each toDos as {content, checked}, index}
			<div class="form-check">
				<input
					id={`item-${index}`}
					class="form-check-input"
					type="checkbox"
					value=""
					bind:value={content}
					checked={checked}
				>
				<label
					class="form-check-label"
					for={`item-${index}`}
				>
					{content}
				</label>
			</div>
		{/each}
	</div>
</div>
