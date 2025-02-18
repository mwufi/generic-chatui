import { NextResponse } from 'next/server'
import { UploadService } from '@/app/lib/upload-service'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        const uploadedFile = await UploadService.uploadFile(file)
        return NextResponse.json(uploadedFile)
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
} 