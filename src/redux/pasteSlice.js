import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: (() => {
    try {
      const storedPastes = localStorage.getItem("pastes");
      return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
      console.error("Failed to parse pastes from localStorage:", error);
      return [];
    }
  })()
}

const notify = (msg) => toast(msg);

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste Created");
      
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id );

      if(index >=0){
        state.pastes[index] = paste;
        localStorage.setItemz("pastes",JSON.stringify(state.pastes));

        toast.success("paste updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");

    },
    removeFromPastes : (state, action) =>{
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item)=> item._id === pasteId);
      if(index >=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer