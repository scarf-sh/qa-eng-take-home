import Image from 'next/image';

import ToDoList from '@/components/ToDoList';

export default function Home() {
  return (
    <main className='max-w-lg mx-auto pt-10'>
      <header>
        <h1 className='text-3xl font-bold mb-4 text-center'>To Do List</h1>
      </header>

      <ToDoList />
    </main>
  );
}
