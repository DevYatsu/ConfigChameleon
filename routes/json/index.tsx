import { Handlers } from "$fresh/server.ts";
type Todo = {
  "userId": number;
  "id": number;
  "title": string;
  "completed": boolean;
};

export const handler: Handlers<Todo> = {
  async GET(_req, ctx) {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/250")
      .then((response) => response.json());
    if (!data) {
      return new Response("Todo not found", { status: 404 });
    }

    return new Response(JSON.stringify(data));
  },
};
