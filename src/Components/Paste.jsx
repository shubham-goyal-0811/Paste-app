import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

function Paste() {

  const pastes = useSelector((state)=>state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm,setSearchTerm] = useState("");
  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));  
  }

  

  return (
    <div>
      <input
      className='p-2 rounded-2xl min-w-[600px] mt-5'
       type="search"
      placeholder='search here'
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)} />


      <div className='flex flex-col gap-5'>
        {
          filteredData.length > 0 && 
          filteredData.map(
            (paste) => {
              return (
                <div className='border'>
                  <div>
                  {paste.title}
                  </div>

                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      Edit
                    </button>
                    <button>
                      View
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied");
                    }}>
                      Copy
                    </button>
                    <button>
                      Share
                    </button>
                  </div>

                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
