import Jimp from 'jimp';
import { NftEffectType, NFT_EFFECT_BLUR, NFT_EFFECT_PROTECT } from 'interfaces';

export async function imgToBlur(image: Jimp, blurredValue: number) {
  try {
    let blurred = new Jimp(image.getWidth(), image.getHeight(), '#ffffff');
    blurred.composite(image, 0, 0);
    blurred.blur(blurredValue);
    return await blurred.getBase64Async(image.getMIME());
  } catch (err) {
    console.log(err);
  }
}

export async function imgToWatermark(image: Jimp) {
  const imageWidth = image.getWidth();
  const imageHeight = image.getHeight();
  const ratio = imageWidth / imageHeight;

  let watermark = await Jimp.read('/TernoaWatermark.png');
  const watermarkSize = Math.min(
    (ratio > 1 ? imageHeight : imageWidth) / 4,
    90
  );
  const margin = watermarkSize * 0.2;

  watermark = watermark.resize(watermarkSize, watermarkSize);

  let xPos = imageWidth / 2 + margin;
  let yPos = imageHeight / 2 + watermarkSize - margin;

  const protectedImage = new Jimp(imageWidth, imageHeight, '#ffffff');
  protectedImage.composite(image, 0, 0);
  protectedImage.composite(watermark, xPos, yPos);
  return await protectedImage.getBase64Async(image.getMIME());
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
    });

    let res;
    let image = await Jimp.read(URL.createObjectURL(file));
    image = image.resize(Jimp.AUTO, 400);

    if (effect === NFT_EFFECT_BLUR && blurredValue) {
      res = await imgToBlur(image, blurredValue);
    } else if (effect === NFT_EFFECT_PROTECT) {
      res = await imgToWatermark(image);
    }

    const blob = await (await fetch(res as string)).blob();
    const newprocessedFile = new File([blob], rawFile.name, {
      type: rawFile.type,
    });

    return await newprocessedFile;
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
    video.autoplay = false;
    video.muted = true;
    video.playsInline = true
    video.src = URL.createObjectURL(file);
    const timecode = thumbnailTimecode < 0.1 ? 0.1 : thumbnailTimecode
    video.currentTime = timecode
    video.preload = "metadata"
    video.onloadeddata = async () => {
      if (video.currentTime === timecode){
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        if (ctx){
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          canvas.toBlob(async (imgBlob) => {
            if (imgBlob){
              const imgFile = new File([imgBlob], "preview_image");
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
      }
    };
  });
}

export function blobToDataURL(blob: Blob, callback: Function) {
  var a = new FileReader();
  a.onload = function(e) {if (e?.target) callback(e.target.result);}
  a.readAsDataURL(blob);
}


