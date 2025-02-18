import { StorageProvider } from './types'
import { VercelBlobProvider } from './providers/vercel-blob'
import { R2Provider } from './providers/cloudflare-r2'
import { S3Provider } from './providers/s3'

function getStorageProvider(): StorageProvider {
    const provider = process.env.STORAGE_PROVIDER?.toLowerCase() || 'vercel'

    switch (provider) {
        case 'r2':
            return new R2Provider()
        case 's3':
            return new S3Provider()
        case 'vercel':
        default:
            return new VercelBlobProvider()
    }
}

export const storage: StorageProvider = getStorageProvider()