import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addtopastes: (state,action) => {
        const newpaste = action.payload;
        state.pastes.push(newpaste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste added successfully");
    },
    updatetopastes: (state,action) => {
        const paste = action.payload;
        const idx = state.pastes.findIndex((p) => p._id === paste._id);
        if(idx >= 0){
            state.pastes[idx] = paste;
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste updated successfully");
        }
    },
    removefrompastes: (state, action) => {
        const paste = action.payload;
        const idx = state.pastes.findIndex((p) => p._id === paste);
        if(idx >= 0){
            state.pastes.splice(idx, 1);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste removed successfully");
        }else{
            toast.error("Paste not found");
        }
    },
    resetallpastes: (state,action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtopastes, updatetopastes, removefrompastes, resetallpastes } = pasteSlice.actions

export default pasteSlice.reducer