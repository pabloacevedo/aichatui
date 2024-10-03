import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare, Settings } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ThemeToggle } from '@/themeToggle'

interface Message {
    content: string
    role: 'user' | 'assistant'
}

interface Conversation {
    id: string
    title: string
    messages: Message[]
}

interface SidebarProps {
    onNewConversation: () => void
    conversations: Conversation[]
    currentConversationId: string
    onSelectConversation: (id: string) => void
    setDarkMode: (mode: string) => void
    darkMode: string
}

export default function Sidebar({
    onNewConversation,
    conversations,
    currentConversationId,
    onSelectConversation,
    setDarkMode,
    darkMode
}: SidebarProps) {
    return (
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
    )
}