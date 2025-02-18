import { StorageProvider } from '@/app/lib/storage/types'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export class R2Provider implements StorageProvider {
    private endpoint: string
    private accessKeyId: string
    private secretAccessKey: string
    private bucket: string
    private client: S3Client
    private publicUrlBase: string

    constructor() {
        this.endpoint = process.env.R2_ENDPOINT!
        this.accessKeyId = process.env.R2_ACCESS_KEY_ID!
        this.secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!
        this.bucket = process.env.R2_BUCKET_NAME!

        // Convert the internal endpoint to public URL format
        // From: https://<hash>.r2.cloudflarestorage.com
        // To: https://<custom-domain>.r2.dev or your custom domain
        this.publicUrlBase = process.env.R2_PUBLIC_URL || this.endpoint.replace('r2.cloudflarestorage.com', 'r2.dev')

        this.client = new S3Client({
            endpoint: this.endpoint,
            region: 'auto',
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey,
            }
        })
    }

    async upload(file: File) {
        const key = `uploads/${Date.now()}-${file.name}`
        const arrayBuffer = await file.arrayBuffer()

        await this.client.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: Buffer.from(arrayBuffer),
            ContentType: file.type,
        }))

        // Use the public URL format
        return {
            url: `${this.publicUrlBase}/${key}`
        }
    }

    async delete(url: string) {
        // Extract the key from the URL
        const urlObj = new URL(url)
        const key = urlObj.pathname.substring(1) // Remove leading slash

        await this.client.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        }))
    }
} 