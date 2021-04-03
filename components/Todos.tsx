import { auth } from "../pages"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { db } from "../pages"
import { useState } from "react"
import firebase from "firebase"

const logout = () => {
  auth.signOut()
}

interface ITodo {
  name: string
  id: string
  createdAt: any
  done: boolean
}

const Todos = () => {
  const [textInput, setTextInput] = useState("")

  const todosRef = db.collection("todos")
  const query = todosRef.orderBy("createdAt")

  const [todos] = useCollectionData<ITodo>(query, { idField: "id" })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!textInput) return

    todosRef.add({
      done: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: textInput,
    })
    setTextInput("")
  }

  return todos ? (
    <>
      <div className="relative w-1/2 border-2 border-blue-500 h-1/2 rounded-2xl">
        <div className="relative flex items-center justify-center w-full bg-blue-500 h-1/6 rounded-t-xl">
          <span className="text-xl font-bold text-gray-100">Todos</span>
          <button
            className="absolute right-0 mr-4 text-gray-100"
            onClick={logout}
          >
            Log out
          </button>
        </div>
        <div className="overflow-scroll h-4/6">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center justify-between m-4"
            >
              <p className="">{todo.name}</p>
              <input
                className=""
                type="checkbox"
                onChange={() => {
                  console.log("tu")
                  todosRef.doc(todo.id).update({
                    done: !todo.done,
                  })
                }}
                checked={todo.done}
              />
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between w-full my-4">
            <input
              className="w-full mx-4 outline-none focus:border-blue-800"
              placeholder="Add new Todo"
              type="text"
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
            />
            <button
              className="px-6 py-1 mx-4 text-gray-100 bg-blue-500 focus:outline-none hover:bg-blue-800 rounded-xl"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <p>Loading..</p>
  )
}

export default Todos
