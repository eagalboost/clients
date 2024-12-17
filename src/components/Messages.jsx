import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showLoading, hideLoading } from "../redux/loadingSlice";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    const fetchConversations = async () => {
      dispatch(showLoading());
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/conversations`,
          { withCredentials: true }
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast.error("Error fetching conversations, please try again.");
      } finally {
        dispatch(hideLoading());
      }
    };

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      toast("You aren't authenticated");
      navigate("/login");
      return;
    }

    setIsAdmin(userData.isAdmin === true);
    if (userData) {
      fetchConversations();
    }
  }, [dispatch, navigate]);

  const handleRowClick = (conversationId) => {
    navigate(`/messages/${conversationId}`);
  };

  const handleReadBy = async (convId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/conversations/${convId}`,
        {},
        { withCredentials: true }
      );
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === convId ? { ...conv, ...response.data } : conv
        )
      );
      toast.success("Conversation marked as read.");
    } catch (error) {
      console.error("Error updating read status:", error);
      toast.error("Error updating read status, please try again.");
    }
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-primaryText">Loading conversations...</p>
    );
  }

  if (!isLoading && conversations.length === 0) {
    return (
      <p className="text-center mt-10 text-primaryText">
        You have no conversations at the moment.
      </p>
    );
  }

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col bg-gray-900 text-gray-200"
    >
      <div className="bg-gray-800 text-white p-4 text-lg font-bold shadow-md">
        Conversations
      </div>

      <div className="flex-grow overflow-y-auto p-2 lg:p-4">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 font-base font-roboto border-b border-gray-700">
                Sender
              </th>
              <th className="p-3 font-base font-roboto border-b border-gray-700">
                Preview
              </th>
              <th className="p-3 font-base font-roboto border-b border-gray-700">
                Time
              </th>
              {conversations.some((conv) =>
                isAdmin ? !conv.readByAdmin : !conv.readByBuyer
              ) && (
                <th className="p-3 border-b border-gray-700">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv) => (
              <tr
                key={conv._id}
                className="hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleRowClick(conv._id)}
              >
                <td className="p-3 border-b text-sm lg:text-lg border-gray-700">
                  {isAdmin ? conv.buyerId : "Admin"}
                </td>
                <td className="p-3 border-b border-gray-700 text-sm lg:text-lg">
                  {conv.lastMessage}
                </td>
                <td className="p-3 border-b border-gray-700 text-sm lg:text-lg">
                  {new Date(conv.updatedAt).toLocaleDateString()}{" "}
                  {new Date(conv.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                {(isAdmin ? !conv.readByAdmin : !conv.readByBuyer) && (
                  <td className="p-3 border-b border-gray-700">
                    <button
                      aria-label="Mark conversation as read"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadBy(conv._id);
                      }}
                      className="bg-[rgb(232,0,151)] text-white py-1 px-3 rounded hover:bg-pink-700 transition"
                    >
                      Mark as Read
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
