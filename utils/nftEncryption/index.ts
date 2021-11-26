import * as openpgp from 'openpgp'
import mime from 'mime-types'
import TernoaIpfsApi from './ipfs.helper'
import { ipfsGatewayUri } from './ipfs.const';

const ipfsApi = new TernoaIpfsApi();

const cryptFilePgp = async (file: File, publicPGP: string) => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer);
  const content = buffer.toString("base64");
  const message = await openpgp.Message.fromText(content)
  const publicKey = await openpgp.readKey({ armoredKey: publicPGP })
  console.log(publicPGP)
  /*console.log(publicKey)
  console.log(publicKey.getCreationTime())
  console.log(await publicKey.getExpirationTime())
  console.log(publicKey.toPublic())
  console.log(publicKey.getUserIds())
  console.log(publicKey.getKeyIds())
  console.log(publicKey.isPublic())
  console.log(publicKey.isPrivate())
  console.log(publicKey.toPublic())
  console.log(await publicKey.getPrimaryUser())*/
  const encrypted = await openpgp.encrypt({
    message,
    publicKeys: publicKey
  })
  return encrypted
}

export const cryptAndUploadNFT = async (
  secretNFT: File, 
  secretNFTType: string, 
  publicPGP: string, 
  setProgressData?: Function,
  progressIndex?:number
) => {
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
        uploadIPFS(nftFile, setProgressData, progressIndex),
        uploadIPFS(pgpFile)
      ])
      resolve([encryptedUploadReponse, pgpUploadRemonse])
    } catch (err) {
      reject(err)
    }
  })
}

export const uploadIPFS = async(file: File, setProgressData?: Function, progressIndex?:number, getLink: boolean=false) => {
  try{
    const mediaType = mime.lookup(file.name);
    const result = await ipfsApi.addFile(file, setProgressData, progressIndex);
    if (result && (result as any).Hash) {
      return {
        hashOrURL: getLink ? `${ipfsGatewayUri}/${(result as any).Hash}` : (result as any).Hash,
        mediaType
      };
    } else {
      throw new Error('Hash not retrieved from IPFS');
    }

  }catch(err){
    throw err
  }
}
