import { useState, useRef, useEffect } from 'react'
import { Send, Plus, MessageSquare, User2, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ThemeToggle } from './themeToggle'
import { detectDarkMode } from './lib/utils'
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
    const [inputMessage, setInputMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [shouldScroll, setShouldScroll] = useState(false)
    const [darkMode, setDarkMode] = useState(detectDarkMode())
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (shouldScroll) {
            scrollToBottom()
            setShouldScroll(false)
        }
    }, [shouldScroll])

    const handleSendMessage = () => {
        if (inputMessage.trim() && typeof onSendMessage === 'function') {
            onSendMessage(inputMessage)
            setInputMessage('')
            setShouldScroll(true)
        }
    }

    return (
        <div className={`flex h-screen bg-background ${darkMode}`}>
            {/* Sidebar */}
            <div className="w-64 bg-secondary p-4 flex flex-col">
                <Button onClick={onNewConversation} className="mb-4">
                    <Plus className="mr-2 h-4 w-4" /> Nueva Conversación
                </Button>
                <ScrollArea className="flex-grow">
                    {conversations.map((conv) => (
                        <Button
                            key={conv.id}
                            variant={conv.id === currentConversationId ? "secondary" : "ghost"}
                            className="w-full justify-start mb-2"
                            onClick={() => onSelectConversation(conv.id)}
                        >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {conv.title}
                        </Button>
                    ))}
                </ScrollArea>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="mt-4 dark:hover:bg-white/10">
                            <Settings className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                            <span className="sr-only">Abrir configuración</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                        <div className="flex flex-col space-y-4">
                            <h3 className="font-medium leading-none">Configuración</h3>
                            <div className="flex items-center space-x-2">
                                <span>Tema:</span>
                                <ThemeToggle setDarkMode={setDarkMode} theme={darkMode} />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

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
                                        <AvatarFallback>AI</AvatarFallback>
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
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                        <AvatarFallback><User2 className="h-4 w-4" /></AvatarFallback>
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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSendMessage()
                        }}
                        className="flex space-x-2"
                    >
                        <Input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-grow dark:text-white/80"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Enviar mensaje</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}