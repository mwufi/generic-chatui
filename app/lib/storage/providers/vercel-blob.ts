import { put, del } from '@vercel/blob'
import { StorageProvider } from '@/app/lib/storage/types'

export class VercelBlobProvider implements StorageProvider {
    async upload(file: File) {
        const blob = await put(file.name, file, {
            access: 'public',
        })
        return { url: blob.url }
    }

    async delete(url: string) {
        await del(url)
    }
} 