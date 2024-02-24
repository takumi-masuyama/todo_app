'use client';
import { ComponentProps, useEffect, useState } from 'react';
import { addDoc, getDocs, Timestamp, deleteDoc } from 'firebase/firestore';
import { Button, TextInput } from '@tremor/react';
import { auth, fetchTodoListQuery, todoColRef, todoDocRef } from '@/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Header } from './_components/Header';
type Todo = {
  id: string;
  todo: string;
  isDone: boolean;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    console.log('auth effect');
    return onAuthStateChanged(getAuth(), (user: User | null) => {
      setUser(user);
    });
  }, []);
  useEffect(() => {
    console.log('effect');
    fetchTodos();
  }, [user]);

  const fetchTodos = async (): Promise<void> => {
    console.log(user ? auth.currentUser?.uid : 'guest');
    const data = await getDocs(
      fetchTodoListQuery(user ? auth.currentUser?.uid : 'guest')
    );
    setTodoList(
      data.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        isDone: doc.data().isDone,
      }))
    );
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
      fetchTodos();
    } catch (e) {
      console.error(e);
      alert('ドキュメントの追加に失敗しました。');
    }
    setTodoInput('');
  };

  const handleChangeInput: ComponentProps<'input'>['onChange'] = (event) => {
    setTodoInput(event.target.value);
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(todoDocRef(id));
    fetchTodos();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />

      <section className="overflow-y-auto p-3 h-full bg-gradient-to-r from-green-200 to-blue-300">
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id} className="flex py-1">
                <TextInput
                  checked
                  value={todo.todo}
                  className="w-full h-12 rounded-none focus:border-none"
                  readOnly
                />
                <Button
                  className="h-12 p-1 rounded-none bg-gradient-to-r from-pink-500 to-red-400 border-none"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  DONE
                </Button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <TextInput
              placeholder="Todoを入力..."
              value={todoInput}
              onChange={(e) => {
                handleChangeInput(e);
              }}
              className="bg-slate-100 rounded-none h-10"
            />
            <Button
              variant="primary"
              className="p-2 rounded-none active:opacity-80 select-none bg-gradient-to-r from-sky-300 to-blue-500 border-none"
            >
              ADD
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
