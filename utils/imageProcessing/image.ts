import Jimp from 'jimp'
import { NftEffectType, NFT_EFFECT_BLUR, NFT_EFFECT_PROTECT } from 'interfaces'

export async function imgToBlur(image: Jimp, blurredValue: number) {
  try {
    const blurred = new Jimp(image.getWidth(), image.getHeight(), '#ffffff')
    blurred.composite(image, 0, 0)
    blurred.blur(blurredValue)
    return await blurred.getBase64Async(image.getMIME())
  } catch (err) {
    console.log(err)
  }
}

export async function imgToWatermark(image: Jimp) {
  try {
    const imageWidth = image.getWidth()
    const imageHeight = image.getHeight()
    const ratio = imageWidth / imageHeight

    let watermark = await Jimp.read('/TernoaWatermark.png')
    const watermarkSize = Math.min((ratio > 1 ? imageHeight : imageWidth) / 4, 90)
    const margin = watermarkSize * 0.2

    watermark = watermark.resize(watermarkSize, watermarkSize)

    const xPos = imageWidth / 2 + margin
    const yPos = imageHeight / 2 + watermarkSize - margin

    const protectedImage = new Jimp(imageWidth, imageHeight, '#ffffff')
    protectedImage.composite(image, 0, 0)
    protectedImage.composite(watermark, xPos, yPos)
    return await protectedImage.getBase64Async(image.getMIME())
  } catch (err) {
    console.log(err)
  }
}

export const processFile = async (
  rawFile: File,
  effect: NftEffectType,
  setError: (error: string) => void,
  blurredValue?: number
) => {
  try {
    const file = new File([rawFile], 'NFT', {
      type: rawFile.type,
    })

    let res
    let image = await Jimp.read(URL.createObjectURL(file))
    image = image.resize(Jimp.AUTO, 400)

    if (effect === NFT_EFFECT_BLUR && blurredValue) {
      res = await imgToBlur(image, blurredValue)
    } else if (effect === NFT_EFFECT_PROTECT) {
      res = await imgToWatermark(image)
    }

    const blob = await (await fetch(res as string)).blob()
    const newprocessedFile = new File([blob], rawFile.name, {
      type: rawFile.type,
    })

    return await newprocessedFile
  } catch (err) {
    if (String(err).includes('maxMemoryUsageInMB')) {
      setError('Something went wrong, please try again with another file format or a smaller file size.')
      return null
    }
    console.log(err)
    return undefined
  }
}

export const generateVideoThumbnail = (file: File, thumbnailTimecode: number) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')
    video.autoplay = false
    video.muted = true
    video.playsInline = true
    video.src = URL.createObjectURL(file)
    const timecode = thumbnailTimecode < 0.1 ? 0.1 : thumbnailTimecode
    video.currentTime = timecode
    video.preload = 'metadata'
    video.onloadeddata = async () => {
      if (video.currentTime === timecode) {
        const ctx = canvas.getContext('2d')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        if (ctx) {
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          canvas.toBlob(
            async (imgBlob) => {
              if (imgBlob) {
                const imgFile = new File([imgBlob], 'preview_image')
                window.URL.revokeObjectURL(video.src)
                return resolve(imgFile)
              } else {
                window.URL.revokeObjectURL(video.src)
                return reject('Could not generate thumbnail')
              }
            },
            'image/png',
            1
          )
        } else {
          window.URL.revokeObjectURL(video.src)
          return reject('No canvas context found to generate thumbnail')
        }
      }
    }
  })
}

export const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f29fff" offset="20%" />
          <stop stop-color="#878cff" offset="50%" />
          <stop stop-color="#f29fff" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f29fff" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `

export const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)
