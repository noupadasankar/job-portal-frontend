import React, { useEffect, useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { messageService } from "@/services/messageService";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

const Messages = () => {
  const { user } = useAuthStore();

  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await messageService.getConversations();
      setConversations(data.conversations || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUser) => {
    try {
      setSelectedUser(otherUser);
      setMessagesLoading(true);
      const data = await messageService.getMessages(otherUser._id);
      setMessages(data.messages || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!selectedUser || !content.trim()) return;

    try {
      const data = await messageService.sendMessage({
        receiverId: selectedUser._id,
        content,
      });

      setMessages((prev) => [...prev, data.data]);
      setContent("");
      fetchConversations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-gray-500 mt-1">Chat with employers and candidates.</p>
      </div>

      <Card className="glass-hover overflow-hidden">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 h-[650px]">
          <div className="border-r overflow-y-auto">
            <div className="p-4 border-b font-semibold">Conversations</div>

            {!conversations.length ? (
              <EmptyState
                icon={MessageSquare}
                title="No Conversations"
                description="Your messages will appear here."
              />
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.user._id}
                  onClick={() => fetchMessages(conv.user)}
                  className={`w-full text-left p-4 flex gap-3 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                    selectedUser?._id === conv.user._id ? "bg-primary/10" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={conv.user.avatar?.url} />
                    <AvatarFallback>{getInitials(conv.user.name)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate">{conv.user.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {conv.lastMessage?.content}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>

          <div className="md:col-span-2 flex flex-col">
            {!selectedUser ? (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={MessageSquare}
                  title="Select a conversation"
                  description="Choose a user from the left side to start messaging."
                />
              </div>
            ) : (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedUser.avatar?.url} />
                    <AvatarFallback>{getInitials(selectedUser.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedUser.name}</p>
                    <p className="text-sm text-gray-500">{selectedUser.role}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messagesLoading ? (
                    <LoadingSpinner />
                  ) : (
                    messages.map((msg) => {
                      const isMine =
                        msg.sender?._id?.toString() === user?._id?.toString();

                      return (
                        <div
                          key={msg._id}
                          className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isMine
                                ? "bg-primary text-white"
                                : "bg-gray-100 dark:bg-slate-800"
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Button type="submit">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;