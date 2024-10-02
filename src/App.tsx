import { useState } from 'react'
import OpenAI from "openai/index.mjs";
import './App.css'
import ChatInterface from './chatUI'

interface Message {
    content: string
    role: 'user' | 'assistant'
}

interface Conversation {
    id: string
    title: string
    messages: Message[]
}

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    baseURL: import.meta.env.VITE_OPENAI_BASE_URL,
    defaultHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
});

export default function ChatApp() {
    const [conversations, setConversations] = useState<Conversation[]>([
        { id: '1', title: 'Conversación 1', messages: [] }
    ])
    const [currentConversationId, setCurrentConversationId] = useState('1')
    const [isTyping, setIsTyping] = useState(false)

    const getCurrentConversation = () => {
        return conversations.find(conv => conv.id === currentConversationId) || conversations[0]
    }

    const handleSendMessage = async (message: string) => {
        const updatedConversations = conversations.map(conv => {
            if (conv.id === currentConversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, { role: 'user', content: message }]
                }
            }
            return conv
        })
        setConversations(updatedConversations as Conversation[])

        setIsTyping(true)
        try {
            const response = await LLMResponse(message)
            const conversationsWithResponse = updatedConversations.map(conv => {
                if (conv.id === currentConversationId) {
                    return {
                        ...conv,
                        messages: [...conv.messages, { role: 'assistant', content: response }]
                    }
                }
                return conv
            })
            setConversations(conversationsWithResponse as Conversation[])
        } catch (error) {
            console.error('Error al obtener respuesta del LLM:', error)
        } finally {
            setIsTyping(false)
        }
    }

    const handleNewConversation = () => {
        const newId = (conversations.length + 1).toString()
        const newConversation: Conversation = {
            id: newId,
            title: `Conversación ${newId}`,
            messages: []
        }
        setConversations([...conversations, newConversation])
        setCurrentConversationId(newId)
    }

    const handleSelectConversation = (id: string) => {
        setCurrentConversationId(id)
    }

    const LLMResponse = async (message: string): Promise<string> => {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: import.meta.env.VITE_OPENAI_MODEL,
        });
        const response = chatCompletion
        return response.choices[0].message.content ?? '';
    }

    return (
        <ChatInterface
            onSendMessage={handleSendMessage}
            onNewConversation={handleNewConversation}
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={handleSelectConversation}
            messages={getCurrentConversation().messages}
            isTyping={isTyping}
        />
    )
}