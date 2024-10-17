"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Moon, Send, Star, User } from "lucide-react"
import { chatService, ChatMessage } from "@/lib/chatService"
import { v4 as uuidv4 } from 'uuid'

// Helper function to format the reading content
const formatReadingContent = (content: string) => {
  // Split the content into sections based on **
  const sections = content.split('**').filter(Boolean)
  
  return sections.map((section, index) => {
    if (section.startsWith('Celestial Guide')) {
      return (
        <h1 key={index} className="text-2xl font-bold text-purple-200 mb-4">
          {section}
        </h1>
      )
    }
    
    // Check if the section is a main heading (contains ':')
    if (section.includes(':')) {
      const [heading, content] = section.split(':')
      return (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-2">
            {heading.trim()}:
          </h2>
          <div className="pl-4 text-purple-100">
            {content.split('*').map((part, i) => (
              <p key={i} className="mb-2">
                {part.trim().startsWith('•') ? (
                  <span className="flex items-start">
                    <span className="mr-2">•</span>
                    {part.slice(1).trim()}
                  </span>
                ) : (
                  part.trim()
                )}
              </p>
            ))}
          </div>
        </div>
      )
    }

    // Regular content
    return (
      <p key={index} className="text-purple-100 mb-4">
        {section.trim()}
      </p>
    )
  })
}

const MessageContent = ({ content, type }: { content: string; type: 'user' | 'assistant' }) => {
  if (type === 'user') {
    return <p className="text-purple-100">{content}</p>
  }

  return (
    <div className="prose prose-invert max-w-none">
      {formatReadingContent(content)}
    </div>
  )
}

export default function ChatWithAstro() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [sessionId, setSessionId] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [initialReading, setInitialReading] = useState<string | null>(null) // New state for initial reading

  useEffect(() => {
    // Generate or retrieve session and user IDs
    const storedSessionId = localStorage.getItem('chatSessionId')
    const storedUserId = localStorage.getItem('userId')
    
    const newSessionId = storedSessionId || uuidv4()
    const newUserId = storedUserId || uuidv4()
    
    setSessionId(newSessionId)
    setUserId(newUserId)
    
    if (!storedSessionId || !storedUserId) {
      localStorage.setItem('chatSessionId', newSessionId)
      localStorage.setItem('userId', newUserId)
    }

    // Load initial reading from localStorage
    const savedData = localStorage.getItem('astroReading')
    if (savedData) {
      const { reading } = JSON.parse(savedData)
      setInitialReading(reading) // Store reading in state
      // Do not add the initial reading to messages
    }

    // Subscribe to real-time updates
    const unsubscribe = chatService.subscribeToMessages(newSessionId, (updatedMessages) => {
      setMessages(updatedMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    try {
      // Add user message
      await chatService.addMessage({
        type: 'user',
        content: inputMessage,
        sessionId,
        userId
      })

      setInputMessage("")

      // Add assistant response (you might want to call your API here)
      await chatService.addMessage({
        type: 'assistant',
        content: 'I understand your question about the cosmic energies. Let me consult the stars...',
        sessionId,
        userId
      })
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="flex h-[93vh] bg-gradient-to-b from-indigo-900 to-purple-900 text-purple-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-950 bg-opacity-50 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4 text-purple-200">Cosmic Journeys</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2">
            {["Aries Rising", "Venus in Pisces", "Saturn Return", "Moon Phases", "Natal Chart"].map((chat, i) => (
              <Button key={i} variant="ghost" className="w-full justify-start text-purple-200 hover:text-purple-100 hover:bg-indigo-800">
                <Star className="mr-2 h-4 w-4" />
                {chat}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {initialReading && ( // Render initial reading only once
              <Card
                className='bg-indigo-950 bg-opacity-50 border-indigo-700'
              >
                <CardContent className="p-4">
                  <MessageContent content={initialReading} type='assistant' />
                </CardContent>
              </Card>
            )}
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`${
                  message.type === 'assistant'
                    ? 'bg-indigo-950 bg-opacity-50 border-indigo-700'
                    : 'bg-purple-950 bg-opacity-50 border-purple-700'
                }`}
              >
                <CardContent className="p-4 flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback
                      className={message.type === 'assistant' ? 'bg-purple-700' : 'bg-indigo-700'}
                    >
                      {message.type === 'assistant' ? (
                        <Moon className="text-yellow-200" size={20} />
                      ) : (
                        <User className="text-purple-200" size={20} />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <p className="text-sm font-medium text-purple-200">
                      {message.type === 'assistant' ? 'Celestial Guide' : 'You'}
                    </p>                 
                    <MessageContent content={message.content} type={message.type} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-indigo-700">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input 
              className="flex-1 bg-indigo-950 bg-opacity-50 border-indigo-700 text-purple-100 placeholder-purple-300" 
              placeholder="Ask the stars..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button type="submit" size="icon" className="bg-purple-700 hover:bg-purple-600">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
