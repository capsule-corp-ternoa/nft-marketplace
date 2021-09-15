import crypto from 'crypto'
import fileToArrayBuffer from 'file-to-array-buffer';
import gen from 'random-seed'
import * as openpgp from 'openpgp'


export const generateSeriesId = (fileHash: string) => {
  const serieGen = gen.create(fileHash)
  const serieId = serieGen.intBetween(0, 4294967295)
  return serieId
}

export const getFilehash = async (file: File) => {
  const hash = crypto.createHash('sha256');
  const buffer = Buffer.from(await fileToArrayBuffer(file))
  hash.update(buffer)
  const fileHash = hash.digest('hex');
  return fileHash;
}

const cryptFilePgp = async (file: File, publicPGP: string) => {
  const buffer = Buffer.from(await fileToArrayBuffer(file))
  const message = await openpgp.Message.fromText(buffer.toString())
  const publicKey = await openpgp.readKey({ armoredKey: publicPGP })
  const encrypted = await openpgp.encrypt({
    message,
    publicKeys: publicKey
  })
  return encrypted
}

export const cryptAndUploadNFT = async (secretNFT: File, secretNFTType: string, publicPGP: string) => {
  return new Promise(async (resolve, reject) => {
    try{
      //NFT Data
      const nftData = new FormData()
      const encryptedSecretNft = await cryptFilePgp(secretNFT, publicPGP)
      const nftFile = new Blob([encryptedSecretNft], {type: secretNFTType});
      nftData.append('file', nftFile)
      //PGP Data
      const pgpData = new FormData()
      const pgpFile = new Blob([publicPGP], {type: 'text/plain'});
      pgpData.append('file', pgpFile)
      const [encryptedUploadReponse, pgpUploadRemonse] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_SDK_URL}/api/uploadIM`,
          {
            method: 'POST',
            body: nftData,
          }
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_SDK_URL}/api/uploadIM`,
          {
            method: 'POST',
            body: pgpData,
          }
        ),
      ]) 
      resolve([encryptedUploadReponse, pgpUploadRemonse])
    }catch(err){
      reject(err)
    }
  })
}
