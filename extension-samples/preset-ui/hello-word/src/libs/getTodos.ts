interface Item {
  userId: number
  id: number
  title: string
  completed: boolean
}

export async function getTodos(limit = 20) {
  let url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`

  const items: Item[] = await fetch(url).then((response) => response.json())
  return items
}
