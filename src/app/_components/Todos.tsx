import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@tremor/react';
import { ImBin } from 'react-icons/im';

import { deleteTodo, updateTodo } from '@/firebase';
import { User } from 'firebase/auth';

import { TodoDetail } from './TodoDetail';
import { Todo } from '@/types';

type TodoProps = {
  user: User | null;
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
};

export const Todos = (props: TodoProps) => {
  const { user, todoList, setTodoList } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<Todo | undefined>(undefined);

  const handleCheckbox = (isChecked: boolean, id: string) => {
    const newTodoList = todoList.map((todo) => {
      const newTodo = { ...todo };
      if (todo.id === id) {
        newTodo.isDone = isChecked;
        updateTodo(todo.id, { isDone: newTodo.isDone });
      }
      return newTodo;
    });
    setTodoList(newTodoList);
  };

  return (
    <>
      <section className="overflow-y-auto p-3 h-full bg-gradient-to-r from-green-200 to-blue-300">
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id} className="flex py-1 items-center ">
                <div className="h-12 p-2 bg-white flex items-center">
                  <input
                    type="checkbox"
                    className="rounded-md text-green-300 focus:ring-offset-green-300 border-green-300"
                    checked={todo.isDone}
                    onChange={(e) => {
                      handleCheckbox(e.target.checked, todo.id);
                    }}
                  />
                </div>
                <div
                  className="w-full h-12 rounded-none focus:border-none bg-white flex items-center px-2"
                  onClick={() => {
                    setIsOpen(true);
                    setTarget(todo);
                  }}
                >
                  {todo.todo}
                </div>
                <Button
                  className="h-12 p-4 rounded-none bg-gradient-to-r from-pink-500 to-red-400 border-none"
                  onClick={() => {
                    deleteTodo(todo.id, user, setTodoList);
                  }}
                >
                  <ImBin />
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
      <TodoDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        target={target}
        user={user}
        setTodoList={setTodoList}
      />
    </>
  );
};
