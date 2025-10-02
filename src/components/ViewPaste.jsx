import { useState } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtopastes, updatetopastes } from "../Redux/PasteSlice.js";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const {id} = useParams();
  const allpastes = useSelector((state) => state.paste.pastes);
  const paste = allpastes.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-2xl">
        <input
          type="text"
          placeholder="Enter title"
          disabled
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={paste.title}
          onChange  = {(e)=>setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Write your paste here..."
          disabled
          className="w-full h-[80vh] p-4 mt-4 border-2 border-gray-300 rounded-2xl resize-none focus:outline-none focus:border-blue-500"
          value = {paste.content}
          onChange = {(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ViewPaste
