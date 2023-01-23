import { load_todo } from "$lib/service";
import type { PageLoad } from "./$types";

export type Todo = {
	id: number;
	item: string;
	done: boolean;
}


export const load = (async () => {

	const todos = await load_todo()
	return {
		todos: todos
	}
}) satisfies PageLoad