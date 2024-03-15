'use client';
import { useEffect, useState } from 'react';

import { fetchTodos } from '@/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import { Header } from './_components/Header';
import { RegTodoForm } from './_components/RegTodoForm';
import { Todos } from './_components/Todos';
import { Todo } from '@/types';
import { Sort } from './_components/Sort';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    console.log('auth effect');
    return onAuthStateChanged(getAuth(), (user: User | null) => {
      setUser(user);
    });
  }, []);
  useEffect(() => {
    console.log('effect');
    fetchTodos(user, setTodoList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <Sort todoList={todoList} setTodoList={setTodoList} />
      <Todos user={user} todoList={todoList} setTodoList={setTodoList} />
      <RegTodoForm user={user} setTodoList={setTodoList} />
    </div>
  );
}
