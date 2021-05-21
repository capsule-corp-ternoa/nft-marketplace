import Jimp from 'jimp';

export async function imgToBlur(NFT: File | null) {
  try {
    const image = await Jimp.read(URL.createObjectURL(NFT));
    image.blur(20);
    const buffer = await image.getBufferAsync('image/jpeg');
    return 'data:image/jpeg;base64,' + buffer.toString('base64');
  } catch (err) {
    console.log(err);
  }
}

export async function imgToWatermark(NFT: File | null) {
  let watermark = await Jimp.read('/TernoaWatermark.png');
  const image = await Jimp.read(URL.createObjectURL(NFT));

  if (image.getWidth() > image.getHeight()) {
    const waterMarkSize = image.getHeight() / 5;
    const waterMarkMargin = waterMarkSize / 3.5;
    const wTruncated = (500 * image.getHeight()) / 800;
    const xPos =
      image.getWidth() / 2 + wTruncated / 2 - (waterMarkMargin + waterMarkSize);
    const yPos = image.getHeight() - (waterMarkSize + waterMarkMargin);

    watermark = watermark.resize(waterMarkSize, waterMarkSize);

    watermark = await watermark;

    image.composite(watermark, xPos, yPos, {
      mode: Jimp.BLEND_OVERLAY,
      opacityDest: 0.1,
      opacitySource: 1,
    });
  } else {
    const waterMarkSize = image.getWidth() / 5;
    const waterMarkMargin = waterMarkSize / 3.5;
    const hTruncated = (800 * image.getWidth()) / 500;
    const xPos = image.getWidth() - (waterMarkSize + waterMarkMargin);
    const yPos =
      image.getHeight() / 2 +
      hTruncated / 2 -
      (waterMarkMargin + waterMarkSize);

    watermark = watermark.resize(waterMarkSize, waterMarkSize);

    watermark = await watermark;

    image.composite(watermark, xPos, yPos, {
      mode: Jimp.BLEND_OVERLAY,
      opacityDest: 0.1,
      opacitySource: 1,
    });
  }
  const buffer = await image.getBufferAsync('image/jpeg');
  return 'data:image/jpeg;base64,' + buffer.toString('base64');
}
