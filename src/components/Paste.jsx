import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../Redux/pasteSlice";
import toast from "react-hot-toast";
import edit from "../images/edit.png";
import research from "../images/research.png";
import delete1 from "../images/delete.png";
import copy1 from "../images/copy.png";
import share1 from "../images/share.png";
import search1 from "../images/search1.png"

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState(null);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCodeClick(pasteId) {
    setActiveButtonId(pasteId);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Code feature coming soon! 🚀", {
        style: {
          border: '1px solid #3f3f46',
          padding: '16px',
          color: '#fff',
          background: '#1f2937'
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#FFFAEE',
        },
        duration: 3000,
      });
      setActiveButtonId(null);
    }, 800);
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full text-white">
      
    <div className="relative flex items-center w-full max-w-[800px] bg-black border border-zinc-800 rounded-lg mt-5 mb-5 hover:border-white transition-colors shadow-xl shadow-white/20 p-1 rounded-xl" >
      <div className="flex items-center pl-4">
        <img src={search1} alt="" className="w-5 h-5" />
      </div>
      <input 
        className="w-full p-3 pl-2 bg-transparent border-0 outline-none text-white"
        type="search"
        placeholder="Search question here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

      <div className="border border-slate-600 p-4 flex-1 w-full max-w-[600px] overflow-y-auto">
        <h1 className="flex items-start mb-5 font-serif text-3xl font-bold border-b border-gray-500">
          All Pastes
        </h1>

        <div className="flex flex-col gap-5 min-w-[500px] border-[1px] border-gray-800">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div
                  className="border border-gray-700 flex flex-row justify-between p-5 bg-gray-900 rounded"
                  key={paste._id}
                >
                  <div className="text-left">
                    <div className="text-xl font-semibold mb-1">{paste.title}</div>
                    <div className="text-gray-300">{paste.content}</div>
                  </div>

                  <div className="relative flex flex-col items-end">
                    <div className="flex flex-row gap-2 bg-transparent">
                      <button className="h-8 w-8 bg-gray-800 rounded hover:bg-gray-700 transition-colors bg-white">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <img src={edit} className="w-5 h-5 mx-auto" alt="" />
                        </a>
                      </button>

                      <button className="h-8 w-8 bg-gray-800 rounded hover:bg-gray-700 transition-colors bg-white">
                        <a href={`/pastes/${paste?._id}`}>
                          <img src={research} className="w-5 h-5 mx-auto" alt="" />
                        </a>
                      </button>

                      <button
                        className="h-8 w-8 bg-gray-800 rounded hover:bg-gray-700 transition-colors bg-white"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <img src={delete1} className="w-5 h-5 mx-auto" alt="" />
                      </button>

                      <button
                        className="h-8 w-8 bg-gray-800 rounded hover:bg-gray-700 transition-colors bg-white"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("copied to clipboard");
                        }}
                      >
                        <img src={copy1} className="w-5 h-5 mx-auto" alt="" />
                      </button>

                      <button
                        className="h-8 w-8 bg-gray-800 rounded hover:bg-gray-700 transition-colors bg-white"
                        onClick={() => {
                          const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                          
                          if (navigator.share) {
                            navigator.share({
                              title: paste.title,
                              text: paste.content,
                              url: shareUrl,
                            })
                            .then(() => toast.success("Shared successfully"))
                            .catch((error) => {
                              console.error("Error sharing:", error);
                              toast.error("Could not share");
                            });
                          } else {
                            navigator.clipboard.writeText(shareUrl);
                            toast.success("Share link copied to clipboard");
                          }
                        }}
                      >
                        <img src={share1} className="w-5 h-5 mx-auto" alt="" />
                      </button>
                    </div>

                    <div className="mt-4 text-gray-400">
                      {paste.createdAt ? new Date(paste.createdAt).toLocaleDateString() : ""}
                    </div>
                    
                    <button 
                      className={`mt-2 px-4 py-1 bg-green-800 text-white rounded hover:bg-green-700 transition-all duration-300 ${loading && activeButtonId === paste._id ? 'opacity-70 scale-95' : ''}`}
                      onClick={() => handleCodeClick(paste._id)}
                      disabled={loading && activeButtonId === paste._id}
                    >
                      {loading && activeButtonId === paste._id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : "CODE"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Paste;
