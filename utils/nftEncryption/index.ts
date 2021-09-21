import crypto from 'crypto'
import gen from 'random-seed'
import * as openpgp from 'openpgp'
import mime from 'mime-types'
import TernoaIpfsApi from './ipfs.helper'
import { ipfsGatewayUri } from './ipfs.const';

const ipfsApi = new TernoaIpfsApi();

export const generateSeriesId = (fileHash: string) => {
  const serieGen = gen.create(fileHash)
  const serieId = serieGen.intBetween(0, 4294967295)
  return serieId
}

export const getFilehash = async (file: File) => {
  const hash = crypto.createHash('sha256');
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  hash.update(buffer)
  const fileHash = hash.digest('hex');
  return fileHash;
}

const cryptFilePgp = async (file: File, publicPGP: string) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer);
  const content = buffer.toString("base64");
  const message = await openpgp.Message.fromText(content)
  const publicKey = await openpgp.readKey({ armoredKey: publicPGP })
  const encrypted = await openpgp.encrypt({
    message,
    publicKeys: publicKey
  })
  return encrypted
}

export const cryptAndUploadNFT = async (secretNFT: File, secretNFTType: string, publicPGP: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      //NFT Data
      const encryptedSecretNft = await cryptFilePgp(secretNFT, publicPGP)
      const nftBlob = new Blob([encryptedSecretNft], { type: secretNFTType });
      const nftFile = new File([nftBlob], "encrypted nft");
      //PGP Data
      const pgpBlob = new Blob([publicPGP], { type: 'text/plain' });
      const pgpFile = new File([pgpBlob], "pgp public key");
      const [encryptedUploadReponse, pgpUploadRemonse] = await Promise.all([
        uploadIPFS(nftFile),
        uploadIPFS(pgpFile)
      ])
      resolve([encryptedUploadReponse, pgpUploadRemonse])
    } catch (err) {
      reject(err)
    }
  })
}

export const uploadIPFS = async(file: File) => {
  try{
    const mediaType = mime.lookup(file.name);
    const result = await ipfsApi.addFile(file);
    if (result && result.Hash) {
      return {
        url: `${ipfsGatewayUri}/${result.Hash}`,
        mediaType
      };
    } else {
      throw new Error('Hash not retrieved from IPFS');
    }

  }catch(err){
    throw err
  }
}
