import axios from 'axios';

import type { Todo } from "../routes/+page";


export type TodoWithoutId = Omit<Todo, "id">;

export async function create_new_todo(todo: TodoWithoutId) {

	console.log(todo)
	const response = await axios.post<Todo>('http://127.0.0.1:3000/', todo);
	return response.data;
}

export async function load_todo() {
	const response = await axios.get<Todo[]>('http://127.0.0.1:3000/')
	return response.data;
}

export async function task_done(id: number) {
	const response = await axios.get<Todo>(`http://127.0.0.1:3000/done/${id}`)
	return response.data;
}