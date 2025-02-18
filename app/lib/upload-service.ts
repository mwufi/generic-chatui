import { storage } from '@/app/lib/storage'
import type { UploadedFile } from '@/app/lib/storage/types'

// Runs in the server (API route)
export class UploadService {
    static async uploadFile(file: File): Promise<UploadedFile> {
        const { url } = await storage.upload(file)

        return {
            name: file.name,
            url,
            size: file.size,
            type: file.type
        }
    }

    static async deleteFile(url: string) {
        await storage.delete(url)
    }
} 