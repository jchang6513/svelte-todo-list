<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let todos;

	function onCheck(id, value) {
    dispatch('check', { id, value });
  }
  function onRemove(id) {
		dispatch('remove',{ id });
  }

</script>

<style type="text/sass">
  .todo-items {
    height: calc(100% - 145px);
    margin: 0 30px;
    overflow:  scroll;
    padding-top: 10px;
    padding-right: 5px;
    position: relative;
    top: 65px;
    width: calc(100% - 50px);
    .todo-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .checkbox-group, .checkbox, .checkbox-label {
        color: #565656;
        cursor: pointer;
        font-size: 16px;
      }
      .checkbox {
        position: relative;
        margin: 0 10px;
        &:before {
          background-color: #dcdcdc;
          border-radius: 100%;
          content: '';
          height: 25px;
          left: -10px;
          position: absolute;
          top: -7px;
          width: 25px;
        }
        &:checked {
          &:before {
            background-color: #0cd478;
          }
          &:after {
            border: solid white;
            border-width: 0 0 4px 4px;
            content: '';
            height: 9px;
            left: -5px;
            position: absolute;
            top: 0px;
            transform: rotateZ(-45deg);
            width: 16px;
          }
          & ~ .checkbox-label {
            color: #a0a0a0;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  @media (max-width: 576px) {
    .todo-items {
      height: calc(100% - 160px);
      top: 100px;
    }
  }
</style>

<div class="todo-items">
  {#each todos as todo, index}
    <div class="todo-item">
      <div class="checkbox-group">
        <input
          id={`item-${index}`}
          class="checkbox"
          type="checkbox"
          checked={todo.checked}
          on:click={() => onCheck(todo.id, {checked: !todo.checked})}
        >
        <label
          class="checkbox-label"
          for={`item-${index}`}
        >
          {todo.title}
        </label>
      </div>
      <button
        class="btn"
        on:click={() => onRemove(todo.id)}
      >
        X
      </button>
    </div>
  {/each}
</div>
