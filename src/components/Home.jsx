import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  // Load existing paste data when editing
  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = allPastes.find((paste) => paste._id === pasteId);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }
  }, [pasteId, allPastes]);

  function createpaste() {
    const paste = {
        title: title,
        content: value,
        _id: pasteId ||
            Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }

    if(pasteId){
        //update
        dispatch(updateToPastes(paste));
    }
    else{
        //create
        dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams('');
  }

  return (
    <div >
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2  w-[66%] pl-4 bg-gray
          hover:border border-purple transition-all duration-100
          hover:shadow-xl/20 shadow-white transition-all duration-400
          "
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button 
        onClick={createpaste}
        className="p-2 rounded-2xl mt-2 bg-maked">
          {pasteId ? "update My paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 bg-gray
          hover:border border-purple transition-all duration-100
          "
          value={value}
          placeholder="Enter Content Here"
          name=""
          id=""
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
