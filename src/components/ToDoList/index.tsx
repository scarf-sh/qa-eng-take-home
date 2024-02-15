'use client';

import React, { useState } from 'react';
import DeleteIcon from '@/assets/trash.svg'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');
  const [viewFilter, setViewFilter] = useState<string>('all'); // ['all', 'completed', 'incomplete']

  const addTask = (): void => {
    if (input.trim() === '') return; // Prevent adding empty tasks
    const newTask: Task = { id: tasks.length + 1, text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput(''); // Clear input after adding
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id: number): void => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <article>
      <div className='flex flex-col'>
        <input
          className='appearance-none rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full h-[56px]'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add a new task'
        />
        <button
          className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full mt-2 h-[44px] shrink self-end w-[124px]'
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <section className='mt-10'>
        <header className='flex justify-between items-end'>
          <h2 className='text-2xl font-bold'>Tasks</h2>

          <div className='flex'>
            <p className='font-bold mr-2'>Show:</p>

            <label className='cursor-pointer' onClick={() => setViewFilter('all')}>
              <input type='radio' name='view-filter' className='peer h-0 w-0 invisible' checked={viewFilter === 'all'} />
              <span className='peer-checked:text-teal-400'>All</span>
            </label>
            <span>&nbsp;/&nbsp;</span>
            <label className='cursor-pointer' onClick={() => setViewFilter('completed')}>
              <input type='radio' name='view-filter' className='peer h-0 w-0 invisible' checked={viewFilter === 'completed'} />
              <span className='peer-checked:text-teal-400'>Completed</span>
            </label>
            <span>&nbsp;/&nbsp;</span>
            <label className='cursor-pointer' onClick={() => setViewFilter('incomplete')}>
              <input type='radio' name='view-filter' className='peer h-0 w-0 invisible' checked={viewFilter === 'incomplete'} />
              <span className='peer-checked:text-teal-400'>Incomplete</span>
            </label>
          </div>
        </header>

        {tasks.length === 0 ? null : (
          <ul className="mt-4 bg-zinc-900 rounded overflow-hidden">
            {tasks.map(task => (
              <li key={task.id} className={`flex items-center h-[54px] justify-between p-5 odd:bg-zinc-800 ${task.completed ? 'text-gray-500' : 'text-gray-300'} ${viewFilter === 'incomplete' && task.completed ? 'hidden' : ''}`}>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-6 w-6'
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  <span className='ml-2'>{task.text}</span>
                </div>
                <button
                  className='h-[20px] w-[20px]'
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section >
    </article >
  );
};

export default ToDoList;