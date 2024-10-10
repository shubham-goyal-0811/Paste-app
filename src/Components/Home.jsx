import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams,setSeacrhParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

    const dispatch = useDispatch();

  function createPaste (e){
    e.preventDefault();
    const paste = {
        title : title,
        content : value,
        _id : pasteId || Date.now().toString(36),
        createdAt : new Date().toISOString(),
    }

    if(pasteId){
        //update paste
        dispatch(updateToPastes(paste));
    }
    else{
        //create paste
        dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('')
    setSeacrhParams({});
  }

  return (
    <>
    <div className='flex flex-row gap-7 place-content-between'>
      <input
        className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
        type="text"
        placeholder="Enter title of your note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
        {pasteId ? "Update paste" : "Create My paste"}
      </button>
    </div>

    <div className='mt-8'>
        <textarea
        className='rounded-2xl mt- min-w-[500px] p-4'
        value = {value}
        placeholder='Enter content here'
        onChange={(e)=>setValue(e.target.value)}
        rows = {20}
        />
    </div>
    </>
  );
}

export default Home;
