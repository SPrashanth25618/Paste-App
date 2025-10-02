import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removefrompastes } from "../Redux/PasteSlice.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Allpastes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleShare() {
    const shareData = {
      title: "My Paste",
      text: "Check out this paste!",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((err) => toast.error("Error sharing paste: " + err.message));
    } else {
      toast.error("Web Share API not supported in this browser.");
    }
  }
  return (
    <div className="p-4 border rounded-2xl w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search pastes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <p className="font-bold font-serif text-3xl">All Pastes</p>
      <div className="flex flex-col gap-2">
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => {
            return (
              <div
                className="p-4 border rounded-lg shadow-sm bg-white flex flex-row gap-4 hover:shadow-md transition-all duration-200 overflow-hidden"
                key={paste._id}
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="font-bold text-lg md:text-xl text-blue-700 truncate">
                    {paste.title}
                  </div>
                  <div className="text-gray-700 text-sm md:text-base line-clamp-2">
                    {paste.content}
                  </div>
                </div>

                <div className="flex flex-col justify-between ml-auto items-end gap-2 flex-shrink-0">
                  <div className="flex flex-wrap gap-1">
                    <button className="text-xs md:text-sm px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                      <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                    </button>
                    <button
                      className="text-xs md:text-sm px-1.5 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      onClick={() => dispatch(removefrompastes(paste?._id))}
                    >
                      Delete
                    </button>
                    <button
                      className="text-xs md:text-sm px-1.5 py-0.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                      onClick={handleShare}
                    >
                      Share
                    </button>
                    <button className="text-xs md:text-sm px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                      <Link to={`/pastes/${paste?._id}`}>View</Link>
                    </button>
                    <button
                      className="text-xs md:text-sm px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Content copied to clipboard");
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm">
                    {new Date(paste.createdon).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(paste.createdon).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No pastes found</div>
        )}
      </div>
    </div>
  );
};

export default Allpastes;
