'use client';

import { auth, provider } from '@/firebase';
import { User, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const router = useRouter();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      router.push('/', { scroll: false });
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-r from-green-200 to-blue-300">
      <div className="h-[70vh] flex flex-col items-center justify-center ">
        <h2 className="pb-4 text-center text-2xl text-gray-600  border-b  underline">
          ログイン方法を選択
        </h2>
        <ul>
          <li className="flex justify-center">
            <button
              onClick={loginWithGoogle}
              className="flex bg-white  items-center rounded-lg border border-sky-800 px-10 py-2.5 text-center text-lg  font-medium text-sky-800 duration-300 hover:border-white hover:bg-sky-500 hover:text-white  active:bg-sky-800"
            >
              <FcGoogle />
              <span className="pl-1">Googleアカウント</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
