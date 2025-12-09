import imageCompression from 'browser-image-compression'
import { ClassValue, clsx } from 'clsx'
import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeLink(link?: string) {
  if (!link) return ''

  return link
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*()_+\-=[\]{};':"\\|,ˆ.<>/?]+/, '')
    .toLocaleLowerCase()
}

export async function compressFiles(files: File[]) {
  const compressPromise = files.map(async (file) => {
    try {
      return await compressImage(file)
    } catch (error) {
      console.log(error)
      return null
    }
  })

  return (await Promise.all(compressPromise)).filter((file) => file !== null)
}

export async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: 'image/png',
    }

    imageCompression(file, options)
      .then((compressedFile) => {
        resolve(compressedFile)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function formatUrl(url: string) {
  const formatterUrl = url?.startsWith('http') ? url : `http://${url}`
  return formatterUrl
}

export function triggerImageInput(id: string) {
  document.getElementById(id)?.click()
}

export function handleImageInput(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]
  if (file) {
    const imageUrl = URL.createObjectURL(file)
    return imageUrl
  }

  return null
}
