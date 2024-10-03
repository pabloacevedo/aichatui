import { useState } from 'react'
import { Send } from 'lucide-react'
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
    )
}