'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import type { UploadedFile } from '@/app/lib/storage/types'

interface Message {
    id: string
    text?: string
    files?: UploadedFile[]
}

export function FileUploadTest() {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files?.length) return

        setIsUploading(true)
        try {
            const uploadedFiles: UploadedFile[] = []
            for (const file of Array.from(files)) {
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error('Upload failed')
                }

                const uploadedFile = await response.json()
                uploadedFiles.push(uploadedFile)
            }

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                files: uploadedFiles
            }])
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload file(s)')
        } finally {
            setIsUploading(false)
            // Clear the input
            e.target.value = ''
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputText.trim()) return

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: inputText.trim()
        }])
        setInputText('')
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col h-[600px]">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="bg-muted rounded-lg p-3">
                                {message.text && <p>{message.text}</p>}
                                {message.files && (
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {message.files.map((file, index) => (
                                            <div key={index} className="relative aspect-square">
                                                {file.type.startsWith('image/') ? (
                                                    <Image
                                                        src={file.url}
                                                        alt={file.name}
                                                        fill
                                                        className="object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full bg-background border rounded-md">
                                                        <span className="text-sm text-muted-foreground">
                                                            {file.name}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
                    <Input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="file-upload"
                        disabled={isUploading}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                    <Button type="submit" disabled={!inputText.trim()}>
                        Send
                    </Button>
                </form>
            </div>
        </Card>
    )
} 