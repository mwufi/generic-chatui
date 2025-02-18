import { useState } from 'react'

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFiles = async (fileList: FileList) => {
    setIsUploading(true)
    setError(null)
    
    try {
      const newFiles = Array.from(fileList)
      const validFiles = newFiles.filter(file => {
        const isValidSize = !options.maxSize || file.size <= options.maxSize
        const isValidType = !options.allowedTypes?.length || options.allowedTypes.includes(file.type)
        return isValidSize && isValidType
      })

      const uploads = await Promise.all(
        validFiles.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)
          
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          
          if (!res.ok) throw new Error('Upload failed')
          
          const data = await res.json()
          return {
            name: file.name,
            url: data.url,
            size: file.size,
            type: file.type
          }
        })
      )

      setFiles(prev => [...prev, ...uploads])
      return uploads
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      throw err
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files => files.filter((_, i) => i !== index))
  }

  return {
    files,
    isUploading,
    error,
    uploadFiles,
    removeFile
  }
} 