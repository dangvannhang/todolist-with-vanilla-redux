// step to setup redux
// step1: state
// step2: reducer
// step3: store
const { createStore } = window.Redux

const initialState = []

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newList = [...state]
      newList.push(action.payload)
      return newList
    }
    default:
      return state
  }
}

const toDoStore = createStore(toDoReducer)

// create li elements to render for all todo tasks
const renderHobbyList = (toDoList) => {
  if (!Array(toDoList) || toDoList.length === 0) return

  const ulElement = document.querySelector("#todolist-wrapper")
  if (!ulElement) return

  ulElement.innerHTML = ""

  for (const toDo of toDoList) {
    const liElement = document.createElement("li")
    liElement.textContent = toDo
    ulElement.appendChild(liElement)
  }
}

// handle form submit
const formElement = document.querySelector("#formElement")
if (formElement) {
  const addTask = (e) => {
    e.preventDefault()

    const inputElement = document.querySelector("#inputElement")

    if (!formElement || !inputElement) return
    toDoStore.dispatch({ type: "ADD_TASK", payload: inputElement.value })
    formElement.reset()
  }

  formElement.addEventListener("submit", addTask)
}

toDoStore.subscribe(() => {
  const newHobbyList = toDoStore.getState()
  renderHobbyList(newHobbyList)
})
