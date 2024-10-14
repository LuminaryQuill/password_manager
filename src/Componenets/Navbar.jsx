import React from 'react';

const Navbar = () => {
  return (
    <div className='bg-slate-800 text-white'>
      <div className="w-full mx-auto flex flex-row justify-between items-center px-4 py-5 h-14">
        <div className='logo font-bold text-white text-2xl flex items-center'>
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
        </div>
        <button className='text-white bg-green-800 rounded-full flex justify-between items-center px-4 py-2 ring-white ring-2'>
          <img className='invert w-5 mr-2' src="/github.png" alt="Github logo" />
          Github
        </button>
      </div>
      {/* 
        <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='#'>About</a>
            <a className='hover:font-bold' href='#'>Contact</a>
          </li>
        </ul>
      */}
    </div>
  );
}

export default Navbar;
