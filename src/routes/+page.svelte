<script lang="ts">
	import type { Todo } from './+page';
	import { create_new_todo, task_done } from '../lib/service';

	import type { PageData  } from './$types';

	export let data: PageData;
	let todos = data.todos;

	let new_todo = '';

	async function create_todo() {
		if (new_todo === '') {
			return;
		}

		const response = await create_new_todo({
			item: new_todo,
			done: false
		});

		todos = [...todos, response];
	}

	async function mark_done(todo: Todo) {
		const response = await task_done(todo.id)
		todos = todos.map((x) => {
			if (x.id === todo.id) {
				return response;
			}
			return x;
		})
	}

</script>

<section>
	<h1>TODO Application</h1>

	<div class="todo-list">
		<div class="todo-item">
			<input class="enter-todo" placeholder="Add Todo" bind:value={new_todo} />
			<button class="new-button" on:click={create_todo}>New</button>
		</div>
		{#each todos as todo}
			<div class="todo-item">
				<p>{todo.item}</p>

				{#if !todo.done}
					<button class="done-button" on:click={() => mark_done(todo)}>Done</button>
				{:else}
					<span>Hurray</span>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style lang="css">
	section {
		background: '#F2F4F3';
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		flex-direction: column;
	}

	.todo-list {
		display: flex;
		flex-direction: column;
		gap: 4pt;
	}

	.todo-item {
		display: grid;
		grid-template-columns: 200pt auto;
		gap: 8pt;
		border: 1pt solid #eee;
		padding: 8pt;
		background-color: white;
		border-radius: 8pt;
	}

	.done-button,
	.new-button {
		background-color: #ad6a6c;
		border: none;
		border-radius: 4pt;
		color: white;
		cursor: pointer;
	}

	.todo-item p {
		margin: 0;
		width: 100%;
	}

	.enter-todo {
		width: 100%;
		padding: 8pt;
		box-sizing: border-box;
		font: inherit;
	}
</style>
