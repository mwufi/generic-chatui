import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { StorageProvider } from '@/app/lib/storage/types'

export class S3Provider implements StorageProvider {
  private client: S3Client
  private bucket: string

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
    this.bucket = process.env.AWS_BUCKET_NAME!
  }

  async upload(file: File) {
    const key = `uploads/${Date.now()}-${file.name}`
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: file.type,
    }))

    return {
      url: `https://${this.bucket}.s3.amazonaws.com/${key}`
    }
  }

  async delete(url: string) {
    const key = url.split('.com/')[1]
    await this.client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    }))
  }
} 