export interface StorageProvider {
  upload: (file: File) => Promise<{ url: string }>
  delete: (url: string) => Promise<void>
  // Add other methods as needed
}

export interface UploadedFile {
  name: string
  url: string
  size: number
  type: string
} 