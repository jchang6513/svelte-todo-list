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
      margin-bottom: 25px;
      padding-bottom: 15px;
      &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
      }
      .checkbox-group, .checkbox, .checkbox-label {
        color: #565656;
        cursor: pointer;
        font-size: 16px;
      }
      .checkbox {
        position: relative;
        margin: 0 10px;
        outline: none;
        &:before {
          background-color: #dcdcdc;
          border-radius: 100%;
          content: '';
          height: 28px;
          left: -10px;
          position: absolute;
          top: -8px;
          width: 28px;
        }
        &:checked {
          &:before {
            background-color: #00d7de;
          }
          &:after {
            border: solid white;
            border-width: 0 0 4px 4px;
            content: '';
            height: 9px;
            left: -4px;
            position: absolute;
            top: 0px;
            transform: rotateZ(-45deg);
            width: 15px;
          }
          & ~ .checkbox-label {
            color: #a0a0a0;
            text-decoration: line-through;
          }
        }
      }
      .remove {
        background: none;
        border: none;
        cursor: pointer;
        padding-top: 0px;
        outline: none;
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
        class="remove"
        on:click={() => onRemove(todo.id)}
      >
        &#x2715
      </button>
    </div>
  {/each}
</div>
