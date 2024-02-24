import { Header } from '../_components/Header';

const SignIn = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-r from-green-200 to-blue-300">
      <Header />
      {children}
    </div>
  );
};

export default SignIn;
