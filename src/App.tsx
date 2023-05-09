import { useState, useCallback, KeyboardEvent } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

interface TodoProps {
  title: string
  className?: string
}

const Todo = ({ title, className }: TodoProps) => {
  const [isDone, setIsDone] = useState<boolean>(false)
  return (
    <div>
      <div onClick={() => setIsDone(prev => !prev)} className={ className + ' border-2 border-white py-1 px-2 rounded-md flex justify-start cursor-pointer'}>
        <span className={`${isDone && 'line-through'}`}>{title}</span>
      </div>
    </div>
  )
}

const App = () => {
  const [todos, setTodos] = useState<Array<string>>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputTodoName, setInputTodoName] = useState<string>('')
  const addNewTodo = () => {
    if (inputTodoName) {
      setTodos([...todos, inputTodoName])
    } else {
      console.error('You first need to enter a todo name!')
      console.log('💀')
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
  return (
    <>
      <div
        id='root2'
        className='w-full h-full'
      >
        <button
          className='top-5 left-5 absolute py-4 px-5 peer transition border-2 rounded-md text-lg bg-white text-black hover:bg-black hover:text-white border-white flex gap-x-2 items-center'
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
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
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
                <Todo title={todo} />
              ))}
            </span>
          </div>
          <input
            onKeyUp={handleEnter}
            onChange={e => setInputTodoName(e.target.value)}
            className='bg-black border-2 border-gray-400 focus:border-white rounded-md outline-none transition py-2 px-4 text-white'
            placeholder='Add a todo'
          />
          <button
            className='py-4 px-5 transition border-2 rounded-md text-xl bg-white text-black hover:bg-black hover:text-white border-white'
            onClick={() => handleClick()}
          >
            Add Todo
          </button>
          <button
            className='py-4 px-5 transition border-2 rounded-md text-xl bg-white text-black hover:bg-black hover:text-white border-white'
            onClick={() => setTodos([])}
          >
            Delete All Todos
          </button>
        </div>
      </div>
    </>
  )
}

export default App
