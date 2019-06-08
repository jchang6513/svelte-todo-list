<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

	export let typeCollapse;
	export let type;
  export let types;

	function onToggle() {
		dispatch('toggle');
  }
  function onChange(value) {
		dispatch('change',{ value });
	}
</script>

<style type="text/sass">
  .header {
    background-color: #fff;
    border-radius: 10px;
    color: #565656;
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
      outline: none;
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
  @media (max-width: 576px) {
    .header {
      background-color: #1fc8db;
      background-image: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
      border-color: #fff;
      border-radius: 0;
      color: #fff;
      width: 100%;
      .title {
        line-height: 80px;
        margin: 0px;
      }
      .btn-toggle {
        top: 30px;
        &:after, &:before {
          border-color: #fff;
        }
      }
    }
  }
</style>

<div class="header">
  <h5 class="title">{type.text} Tasks</h5>
  <button
    class="btn-toggle"
    class:show={typeCollapse}
    on:click={() => onToggle()}
  >
  </button>
  <div
    class="type-group"
    class:show={typeCollapse}
  >
    {#each types as {text, value}, index}
      <p
        class="type-item"
        on:click={() => onChange(value)}
      >
        {text} Tasks
      </p>
    {/each}
  </div>
</div>
