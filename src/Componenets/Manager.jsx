import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("/cross-eye.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/cross-eye.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    // if(form.site.length >3 && form.site.username >3 && form.site.password >3){
    const updatedArray = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
    toast('Password Saved!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  
    setForm({ site: "", username: "", password: "" });
  
  // else{
  //   toast('Error:Password not saved');
  // }
  };

  const deletePassword = (id) => {
    const confirmDelete = window.confirm("Do you really want to delete this password?");
    if (confirmDelete) {
      const updatedArray = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);
    setForm(passwordToEdit);
    const updatedArray = passwordArray.filter(item => item.id !== id);
    setPasswordArray(updatedArray);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="bg-slate-100 container mx-auto py-10 px-4">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'>&lt;</span>PASS
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>

        <div className="flex flex-col p-4 gap-6 items-center w-full">
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" name="site" id="" />
          <div className="flex w-full gap-3">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" name="username" id="" />

            <div className="relative w-full">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="password" name="password" id="" />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full gap-3 hover:bg-green-300 px-4 py-2 w-fit border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover">
            </lord-icon>
            Save
          </button>
        </div>
      </div>
      <div className='container mx-auto px-4'>
        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
        {passwordArray.length === 0 && <div>No Passwords to show</div>}
        {passwordArray.length !== 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2 w-1/4'>Site</th>
                <th className='py-2 w-1/4'>Username</th>
                <th className='py-2 w-1/4'>Password</th>
                <th className='py-2 w-1/4'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                        <div className='size-4 cursor-pointer mr-2' onClick={() => copyText(item.site)}>
                          <img src="/copy.png" alt="copy" />
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        {item.username}
                        <div className='size-4 cursor-pointer mr-2' onClick={() => copyText(item.username)}>
                          <img src="/copy.png" alt="copy" />
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        {item.password}
                        <div className='size-4 cursor-pointer mr-2' onClick={() => copyText(item.password)}>
                          <img src="/copy.png" alt="copy" />
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center gap-8'>
                        <span className='cursor-pointer size-4' onClick={() => { editPassword(item.id) }}><img src="/edit.png" alt="edit" /></span>
                        <span className='cursor-pointer size-4' onClick={() => { deletePassword(item.id) }}><img src="/delete.png" alt="delete" /></span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Manager;
