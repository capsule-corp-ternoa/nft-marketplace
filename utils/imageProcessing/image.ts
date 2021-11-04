import Jimp from 'jimp';

export async function imgToBlur(NFT: File | null) {
  try {
    let image = await Jimp.read(URL.createObjectURL(NFT));
    let blurred = new Jimp(image.getWidth(), image.getHeight(), '#ffffff')
    blurred.composite(image,0,0)
    blurred.blur(5)
    return await blurred.getBase64Async(image.getMIME());
  } catch (err) {
    console.log(err);
  }
}

export async function imgToWatermark(NFT: File | null) {
  const image = await Jimp.read(URL.createObjectURL(NFT));
  let watermark = await Jimp.read('/TernoaWatermark.png');
  const imageWidth = image.getWidth()
  const imageHeight = image.getHeight()
  const bgColor = '#ffffff'
  const protectedImage = new Jimp(imageWidth, imageHeight, bgColor)
  const waterMarkSize = (imageWidth > imageHeight ? imageHeight : imageWidth)/5
  const waterMarkMargin = waterMarkSize / 3.5
  const wTruncated = 5/8 * imageHeight;
  const hTruncated = 5/8 * imageWidth;
  let xPos = 0
  let yPos = 0
  watermark = watermark.resize(waterMarkSize, waterMarkSize);
  if (imageWidth > imageHeight) {
    xPos = imageWidth / 2 + wTruncated / 2 - (waterMarkMargin + waterMarkSize);
    yPos = imageHeight - (waterMarkSize + waterMarkMargin);
  } else {
    xPos = imageWidth - (waterMarkSize + waterMarkMargin);
    yPos = imageHeight / 2 + hTruncated / 2 - (waterMarkMargin + waterMarkSize);
  }
  protectedImage.composite(image,0,0)
  protectedImage.composite(watermark, xPos, yPos);
  return await protectedImage.getBase64Async(image.getMIME());
}
