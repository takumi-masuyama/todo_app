import { auth, fetchTodos, todoColRef } from '@/firebase';
import { Todo } from '@/types';
import { Button, TextInput } from '@tremor/react';
import { GrAdd } from 'react-icons/gr';
import { User } from 'firebase/auth';
import { Timestamp, addDoc } from 'firebase/firestore';
import { ComponentProps, Dispatch, SetStateAction, useState } from 'react';

type RegTodoFormProps = {
  user: User | null;
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
};
export const RegTodoForm = (props: RegTodoFormProps) => {
  const { user, setTodoList } = props;
  const [todoInput, setTodoInput] = useState('');
  const handleChangeInput: ComponentProps<'input'>['onChange'] = (event) => {
    setTodoInput(event.target.value);
  };
  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault();
    if (todoInput.length === 0) return;

    try {
      await addDoc(todoColRef, {
        author: {
          id: user ? auth.currentUser?.uid : 'guest',
        },
        todo: todoInput,
        isDone: false,
        created_at: Timestamp.now(),
      });
      fetchTodos(user, setTodoList);
    } catch (e) {
      console.error(e);
      alert('ドキュメントの追加に失敗しました。');
    }
    setTodoInput('');
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <TextInput
            placeholder="Todoを入力..."
            value={todoInput}
            onChange={(e) => {
              handleChangeInput(e);
            }}
            className="bg-slate-100 rounded-none h-12"
          />
          <Button
            variant="primary"
            className="p-4 rounded-none active:opacity-80 select-none bg-gradient-to-r from-sky-300 to-blue-500 border-none"
          >
            <GrAdd />
          </Button>
        </div>
      </form>
    </section>
  );
};
