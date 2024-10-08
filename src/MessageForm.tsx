import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageFormProps {
    onSendMessage: (message: string) => void
}

export default function MessageForm({ onSendMessage }: MessageFormProps) {
    const [inputMessage, setInputMessage] = useState('')

    const handleSendMessage = () => {
        if (inputMessage.trim() && typeof onSendMessage === 'function') {
            onSendMessage(inputMessage)
            setInputMessage('')
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
            }}
            className="flex space-x-2"
        >
            <div className="w-full mx-auto p-4">
                <div className="relative flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 text-gray-400 hover:text-gray-300 rounded-full"
                    >
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Adjuntar archivo</span>
                    </Button>
                    <Input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        className="w-full pl-12 pr-12 py-6 rounded-full text-gray-300 placeholder-gray-500 focus:ring-0 "
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        autoFocus={true}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 text-gray-400 hover:text-gray-300 rounded-full"
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Enviar mensaje</span>
                    </Button>
                </div>
            </div>

        </form>
    )
}