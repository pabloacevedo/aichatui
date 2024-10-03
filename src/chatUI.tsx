import { useState, useRef, useEffect } from 'react'
import { User2 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { detectDarkMode } from './lib/utils'
import Sidebar from '@/Sidebar'
import MessageForm from './MessageForm'

interface Message {
    content: string
    role: 'user' | 'assistant'
}

interface Conversation {
    id: string
    title: string
    messages: Message[]
}

interface ChatInterfaceProps {
    onSendMessage: (message: string) => void
    onNewConversation: () => void
    conversations: Conversation[]
    currentConversationId: string
    onSelectConversation: (id: string) => void
    messages: Message[]
    isTyping: boolean
}

export default function ChatInterface({
    onSendMessage,
    onNewConversation,
    conversations = [],
    currentConversationId,
    onSelectConversation,
    messages = [],
    isTyping
}: ChatInterfaceProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [darkMode, setDarkMode] = useState(detectDarkMode())
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
        console.log(messages)
    }, [messages])

    return (
        <div className={`flex h-screen bg-background ${darkMode}`}>
            <Sidebar
                onNewConversation={onNewConversation}
                conversations={conversations}
                currentConversationId={currentConversationId}
                onSelectConversation={onSelectConversation}
                setDarkMode={setDarkMode}
                darkMode={darkMode}
            />
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                {message.role === 'assistant' && (
                                    <Avatar className="mr-2">
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
                                        <AvatarFallback className="dark:text-white">AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={`max-w-[70%] p-2 rounded-lg ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground'
                                        }`}
                                >
                                    {message.content}
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="ml-2">
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" className="dark:text-white" />
                                        <AvatarFallback className="dark:text-white">
                                            <User2 className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-start">
                                <Avatar className="mr-2">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="bg-secondary text-secondary-foreground p-2 rounded-lg">
                                    Escribiendo...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <MessageForm onSendMessage={onSendMessage} />
                </div>
            </div>
        </div>
    )
}