import { Todo } from '@/types';
import { Button } from '@tremor/react';
import { Dispatch, SetStateAction } from 'react';

type TodoProps = {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
};

export const Sort = (props: TodoProps) => {
  const { todoList, setTodoList } = props;

  const sortByTodoLower = () => {
    const newTodoList = Array.from(todoList);
    newTodoList.sort((a, b) => (b.todo < a.todo ? -1 : 1));
    setTodoList(newTodoList);
  };
  const sortByTodoUpper = () => {
    const newTodoList = Array.from(todoList);
    newTodoList.sort((a, b) => (b.todo > a.todo ? -1 : 1));
    setTodoList(newTodoList);
  };
  const sortByCreatedAtUpper = () => {
    const newTodoList = Array.from(todoList);
    newTodoList.sort((a, b) =>
      b.created_at.toDate().getTime() - a.created_at.toDate().getTime() ? -1 : 1
    );
    setTodoList(newTodoList);
  };
  const sortByCreatedAtLower = () => {
    const newTodoList = Array.from(todoList);
    newTodoList.sort((a, b) =>
      a.created_at.toDate().getTime() - b.created_at.toDate().getTime() ? -1 : 1
    );
    setTodoList(newTodoList);
  };

  return (
    <>
      <section className=" p-3 bg-gradient-to-r from-green-200 to-blue-300">
        <ul>
          <div>
            TODO <Button onClick={sortByTodoUpper}>昇順</Button>{' '}
            <Button onClick={sortByTodoLower}>降順</Button> 登録日{' '}
            <Button onClick={sortByCreatedAtUpper}>昇順</Button>{' '}
            <Button onClick={sortByCreatedAtLower}>降順</Button>
          </div>
        </ul>
      </section>
    </>
  );
};
