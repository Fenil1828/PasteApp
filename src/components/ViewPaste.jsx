import React from 'react'


import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";


const ViewPaste = () => {

  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  // Find the paste with matching _id 
  const paste = allPastes.find((p) => p._id === id);

  // Handle case where paste is not found
  if (!paste) {
    return <div className="text-center p-10">Paste not found</div>;
  }

  return (
    <div >
    <div className="flex flex-row gap-7 place-content-between">
      <input
        className="p-1 rounded-2xl mt-2  w-[66%] pl-4 bg-gray
        hover:border border-purple transition-all duration-100
        "
        type="text"
        placeholder="Enter Title Here"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* <button 
      onClick={createpaste}
      className="p-2 rounded-2xl mt-2 bg-maked">
        {pasteId ? "update My paste" : "Create My Paste"}
      </button> */}
    </div>

    <div className="mt-8">
      <textarea
        className="rounded-2xl mt-4 min-w-[500px] p-4 bg-gray
        hover:border border-purple transition-all duration-100
        "
        value={paste.content}
        placeholder="Enter Content Here"
        name=""
        id=""
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      ></textarea>
    </div>
  </div>
  )
}

export default ViewPaste
