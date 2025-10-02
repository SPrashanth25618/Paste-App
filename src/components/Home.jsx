import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtopastes, updatetopastes } from "../Redux/PasteSlice.js";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams,setsearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if(pasteId){
      const paste = allpastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setContent(paste.content);
    }
  },[pasteId]);

  function handleclick(){
    const data ={
      title: title,
      content: content,
      _id : pasteId || Date.now().toString(36).substring(2),
      createdon : new Date().toISOString(),
    }
    if(pasteId){
      dispatch(updatetopastes(data))
    }else{
      dispatch(addtopastes(data))
    }
    setTitle("");
    setContent("");
    setsearchParams({});
  }
  return (
    <div>
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-2xl">
        <input
          type="text"
          placeholder="Enter title"
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange  = {(e)=>setTitle(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
          onClick={handleclick}
        >
         { (pasteId) ? "Update Paste ": "Create Paste"}
        </button>
      </div>
      <div>
        <textarea
          placeholder="Write your paste here..."
          className="w-full h-[80vh] p-4 mt-4 border-2 border-gray-300 rounded-2xl resize-none focus:outline-none focus:border-blue-500"
          value = {content}
          onChange = {(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
