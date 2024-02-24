'use client';
import { auth } from '@/firebase';
import { Button } from '@tremor/react';
import { User, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  user?: User | null;
};

export const Header = (props: Props) => {
  const router = useRouter();
  const signOutGoogle = () => {
    signOut(auth).then(() => {
      router.push('/');
    });
  };

  const { user } = props;

  return (
    <header className="grid grid-cols-3  bg-gradient-to-r from-green-300 to-blue-500">
      <Link href="/" className="text-gray-600 text-3xl w-full px-3">
        TODO APP
      </Link>

      {user ? (
        <>
          <div></div>
          <div className="flex justify-end">
            <div className="flex items-center px-2">
              <Button
                onClick={signOutGoogle}
                className="rounded-sm shadow-lg active:opacity-85 h-12"
              >
                ログアウト
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-end">
            <span>※ゲストモード</span>
            <span>(共有アカウント）</span>
          </div>
          <div className="flex justify-end">
            <Link href={'/login'} className="flex items-center px-2">
              <Button className="rounded-sm shadow-lg active:opacity-85 h-12">
                ログイン
              </Button>
            </Link>
          </div>
        </>
      )}
    </header>
  );
};
