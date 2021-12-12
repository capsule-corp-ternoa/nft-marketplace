import Jimp from 'jimp';
import { NftEffectType, NFT_EFFECT_BLUR, NFT_EFFECT_PROTECT } from 'interfaces';
import { timer } from 'utils/functions';
const NFT_CARD_SIZE_RATIO = 0.625;

export async function imgToBlur(NFT: File | null, blurredValue: number) {
  try {
    if (NFT){
      let image = await Jimp.read(URL.createObjectURL(NFT));
      let blurred = new Jimp(image.getWidth(), image.getHeight(), '#ffffff');
      blurred.composite(image, 0, 0);
      blurred.blur(blurredValue);
      return await blurred.getBase64Async(image.getMIME());
    }
  } catch (err) {
    console.log(err);
  }
}

export async function imgToWatermark(NFT: File | null) {
  if (NFT){
    const image = await Jimp.read(URL.createObjectURL(NFT));
    let watermark = await Jimp.read('/TernoaWatermark.png');
    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();
    const ratio = imageWidth / imageHeight;
    const coeff = (ratio > 1 ? 1 / ratio : ratio) * NFT_CARD_SIZE_RATIO;
    const bgColor = '#ffffff';
    const protectedImage = new Jimp(imageWidth, imageHeight, bgColor);
    const waterMarkSize =
      ((ratio > 1 ? imageWidth / ratio : imageHeight) * NFT_CARD_SIZE_RATIO) / 4;
    const waterMarkMargin = waterMarkSize * NFT_CARD_SIZE_RATIO;
    const waterMarkMarginFromCenter = (ratio > 1 ? imageWidth : imageHeight) / 4;
  
    watermark = watermark.resize(waterMarkSize, waterMarkSize);
    if (ratio < 0.4) {
      watermark = watermark.resize(waterMarkSize / 2, waterMarkSize / 2);
    }
  
    const xPos =
      imageWidth / 2 +
      ((waterMarkMarginFromCenter - waterMarkMargin) * coeff) / 2;
  
    let yPos = imageHeight / 2;
    if (ratio > 1) {
      yPos = yPos + waterMarkMarginFromCenter * coeff;
    } else {
      yPos = yPos + (waterMarkMarginFromCenter - waterMarkMargin) * coeff * 2;
    }
  
    protectedImage.composite(image, 0, 0);
    protectedImage.composite(watermark, xPos, yPos);
    return await protectedImage.getBase64Async(image.getMIME());
  }
}

export const processFile = async (
  NFT: File,
  effect: NftEffectType,
  setError: (error: string) => void,
  blurredValue?: number
) => {
  try {
    const newProcessedFile = new File([NFT], 'NFT', {
      type: NFT.type,
    });
    let res;

    if (effect === NFT_EFFECT_BLUR && blurredValue) {
      res = await imgToBlur(newProcessedFile, blurredValue);
    } else if (effect === NFT_EFFECT_PROTECT) {
      res = await imgToWatermark(newProcessedFile);
    }

    const blob = await (await fetch(res as string)).blob();
    const file = new File([blob], NFT.name, {
      type: NFT.type,
    });

    return await file;
  } catch (err) {
    setError('Please try again.');
    console.log(err);
    return null;
  }
};

export const generateVideoThumbnail = (file: File, thumbnailTimecode: number) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);
    video.onseeked = async () => {
      let ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (ctx){
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob(async (imgBlob) => {
          if (imgBlob){
            const imgFile = new File([imgBlob], "preview_image");
            blobToDataURL(imgBlob, (r: any) => console.log(r))
            window.URL.revokeObjectURL(video.src);
            return resolve(imgFile);
          }else{
            window.URL.revokeObjectURL(video.src);
            return reject("Could not generate thumbnail")
          }
        },'image/png', 1)
      }else{
        window.URL.revokeObjectURL(video.src);
        return reject("No canvas context found to generate thumbnail")
      }
    };
    video.currentTime = thumbnailTimecode || 0 
  });
}

export function blobToDataURL(blob: Blob, callback: Function) {
  var a = new FileReader();
  a.onload = function(e) {if (e?.target) callback(e.target.result);}
  a.readAsDataURL(blob);
}


