import { useState, useCallback, KeyboardEvent } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type Todo = {
  id: number
  title: string
}

interface TodoProps {
  title: string
  className?: string
  todo: Todo
  deleteFunc: Function
}

const Todo = ({ title, className, todo, deleteFunc }: TodoProps) => {
  const [isDone, setIsDone] = useState<boolean>(false)
  return (
    <div className='flex gap-x-1' id={`${todo.id}`}>
      <div
        onClick={() => setIsDone(prev => !prev)}
        className={
          className +
          ' border-2 border-white py-1 px-2 rounded-md flex justify-start cursor-pointer'
        }
      >
        <span className={`${isDone && 'line-through'} hover:line-through`}>
          {title}
        </span>
      </div>
      {/* trash bin */}
      <div
        className='border-2 border-white py-1 px-2 rounded-md flex justify-center items-center cursor-pointer'
        onClick={() => deleteFunc(todo)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
          />
        </svg>
      </div>
      {/* edit */}
      <div
        className='border-2 border-white py-1 px-2 rounded-md flex justify-center items-center cursor-pointer'
        onClick={() => {}}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
          />
        </svg>
      </div>
    </div>
  )
}

const App = () => {
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputTodoName, setInputTodoName] = useState<string>('')
  
  const addNewTodo = () => {
    if (inputTodoName) {
      setTodos([...todos, { title: inputTodoName, id: todos.length + 2 }])
    } else {
      console.error('You have to enter a todo name!')
    }
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' ? addNewTodo() : console.log(e.key)
  }

  const handleClick = useCallback(() => {
    addNewTodo()
    setInputTodoName('')
  }, [todos])

  useHotkeys(
    'Backspace',
    () => {
      setTodos([])
    },
    [todos]
  )

  useHotkeys(
    't',
    () => {
      setIsOpen(prev => !prev)
    },
    [isOpen]
  )
  
  const handleDelete = (todo: Todo) => {
    const index = todos.indexOf(todo)
    console.log(index)
    if (index > -1) {
      setTodos(() => todos.splice(index, 1))
    }
    console.log(todos)
  }
  return (
    <>
      <div
        id='root2'
        className='w-full h-full'
      >
        <button
          className='top-5 left-5 absolute py-4 px-5 peer transition border-2 rounded-md text-lg bg-inherit text-white border-white flex gap-x-2 items-center justify-center'
          onClick={() => setIsOpen(prev => !prev)}
        >
          <svg
            width='22'
            height='22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='peer-hover:fill-white fill-transparent'
          >
            <path
              d='M8 4.75v-3m0 3H3.75a2 2 0 0 0-2 2v5.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-5.5a2 2 0 0 0-2-2H8Zm-2.25 6.5h4.5m-5.5-3h.5m2.5 0h.5m2.5 0h.5'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
          <span>{isOpen ? 'Close' : 'Open'} Keyboard Shortcuts</span>
        </button>
        {isOpen && (
          <div className='bg-black border-2 absolute border-white top-24 left-5 p-5 rounded-md text-lg flex flex-col'>
            <span>
              <strong>Enter</strong> (When typing in input): Add todo
            </span>
            <span>
              <strong>Backspace</strong>: Delete All Todos
            </span>
            <span>
              <strong>T</strong>: Toggle Keyboard Shortcuts menu
            </span>
          </div>
        )}
        <div className='flex justify-around text-3xl text-center w-full h-full items-center'>
          <div>
            <span className='flex flex-col gap-y-3'>
              {todos.length === 0 ? 'No todos yet' : 'Todos: '}{' '}
              {todos.map(todo => (
                <Todo
                  title={todo.title}
                  todo={todo}
                  deleteFunc={handleDelete}
                />
              ))}
            </span>
          </div>
          <input
            onKeyUp={handleEnter}
            onChange={e => setInputTodoName(e.currentTarget.value)}
            className='bg-gray-800 border-2 border-gray-400 focus:border-white rounded-md outline-none transition py-2 px-4 text-white'
            placeholder='Add a todo'
          />
          <button
            className='py-4 px-5 transition border-2 rounded-md text-xl bg-inherit text-white border-white'
            onClick={() => handleClick()}
          >
            Add Todo
          </button>
          <button
            className='py-4 px-5 transition border-2 rounded-md text-xl bg-inherit text-white border-white'
            onClick={() => setTodos([])}
          >
            Clear Todos
          </button>
        </div>
      </div>
    </>
  )
}

export default App
