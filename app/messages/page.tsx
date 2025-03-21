"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

// Mock data for messages
const mockConversations = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: {
      content: "Hi there! I'm interested in learning web development from you.",
      timestamp: "2025-03-20T14:30:00Z",
      isRead: true,
    },
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: {
      content: "When are you available for our Spanish lesson?",
      timestamp: "2025-03-19T10:15:00Z",
      isRead: false,
    },
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: {
      content: "Thanks for the yoga session yesterday!",
      timestamp: "2025-03-18T16:45:00Z",
      isRead: true,
    },
  },
]

const mockMessages = {
  user1: [
    {
      id: "msg1",
      senderId: "user1",
      content: "Hi there! I'm interested in learning web development from you.",
      timestamp: "2025-03-20T14:30:00Z",
    },
    {
      id: "msg2",
      senderId: "currentUser",
      content: "Hello! I'd be happy to teach you. What specific areas are you interested in?",
      timestamp: "2025-03-20T14:35:00Z",
    },
    {
      id: "msg3",
      senderId: "user1",
      content:
        "I'm mainly interested in frontend development with React. I have some basic HTML and CSS knowledge already.",
      timestamp: "2025-03-20T14:40:00Z",
    },
  ],
  user2: [
    {
      id: "msg4",
      senderId: "user2",
      content: "When are you available for our Spanish lesson?",
      timestamp: "2025-03-19T10:15:00Z",
    },
  ],
  user3: [
    {
      id: "msg5",
      senderId: "user3",
      content: "Thanks for the yoga session yesterday!",
      timestamp: "2025-03-18T16:45:00Z",
    },
    {
      id: "msg6",
      senderId: "currentUser",
      content: "You're welcome! I hope you found it helpful.",
      timestamp: "2025-03-18T17:00:00Z",
    },
    {
      id: "msg7",
      senderId: "user3",
      content: "Definitely! I feel much more relaxed. Can we schedule another session next week?",
      timestamp: "2025-03-18T17:10:00Z",
    },
  ],
}

export default function Messages() {
  const router = useRouter()
  const { session } = useSupabase()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [conversations, setConversations] = useState(mockConversations)
  const [currentMessages, setCurrentMessages] = useState<any[]>([])

  useEffect(() => {
    if (!session) {
      router.push("/login")
      return
    }

    // Set the first conversation as selected by default
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].user.id)
      setCurrentMessages(mockMessages[conversations[0].user.id as keyof typeof mockMessages] || [])
    }
  }, [session, router, conversations, selectedConversation])

  const handleSelectConversation = (userId: string) => {
    setSelectedConversation(userId)
    setCurrentMessages(mockMessages[userId as keyof typeof mockMessages] || [])

    // Mark conversation as read
    setConversations(
      conversations.map((conv) =>
        conv.user.id === userId ? { ...conv, lastMessage: { ...conv.lastMessage, isRead: true } } : conv,
      ),
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !selectedConversation) return

    const newMessage = {
      id: `msg${Date.now()}`,
      senderId: "currentUser",
      content: messageInput,
      timestamp: new Date().toISOString(),
    }

    // Add message to current conversation
    setCurrentMessages([...currentMessages, newMessage])

    // Update last message in conversations list
    setConversations(
      conversations.map((conv) =>
        conv.user.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                content: messageInput,
                timestamp: new Date().toISOString(),
                isRead: true,
              },
            }
          : conv,
      ),
    )

    setMessageInput("")
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  if (!session) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${
                    selectedConversation === conversation.user.id ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleSelectConversation(conversation.user.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {!conversation.lastMessage.isRead && conversation.user.id !== selectedConversation && (
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">{conversation.user.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(conversation.lastMessage.timestamp)}</p>
                    </div>
                    <p
                      className={`text-sm truncate ${!conversation.lastMessage.isRead && conversation.user.id !== selectedConversation ? "font-medium" : "text-muted-foreground"}`}
                    >
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-0 h-[600px] flex flex-col">
            {selectedConversation ? (
              <>
                <div className="border-b p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={conversations.find((c) => c.user.id === selectedConversation)?.user.avatar}
                        alt={conversations.find((c) => c.user.id === selectedConversation)?.user.name}
                      />
                      <AvatarFallback>
                        {conversations.find((c) => c.user.id === selectedConversation)?.user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {conversations.find((c) => c.user.id === selectedConversation)?.user.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "currentUser" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "currentUser" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "currentUser" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

