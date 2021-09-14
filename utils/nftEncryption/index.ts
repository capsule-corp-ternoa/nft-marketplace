import { v4 as uuid } from 'uuid';
import mime from 'mime-types'
import TernoaIpfsApi from './ipfsHelper';
import { ipfsGatewayUri } from  "./ipfsConst"

const ipfsApi = new TernoaIpfsApi();

export const uploadIM = async (file: File) => {
    try {
      const fileName = `${uuid()}_${file.name}`
      //const destPath = './uploads/' + fileName
      /*await new Promise<void>((success, reject) => {
        file.mv(destPath, async function (err: Error) {
          console.log('uploadIM uploaded to', destPath)
          if (err) {
            console.error('uploadIM file moved err:' + err);
            reject(err);
          } else {
            success();
          }  
        });
      }).catch(e => {
        throw new Error(e);
      });*/
      //const mediaType = mime.lookup(destPath);
      const mediaType = mime.lookup(fileName);
      console.log('mediaType', mediaType)
      //const uploadFile = fs.createReadStream(destPath);
      //const result = await ipfsApi.addFile(uploadFile);
      const result = await ipfsApi.addFile(file);
      console.log('uploadIM success', result, fileName)
      if (result && result.Hash) {
        return {
          url: `${ipfsGatewayUri}/${result.Hash}`,
          mediaType
        };
      } else {
        throw new Error('Hash not retrieved from IPFS');
      }
    } catch (err) {
      console.log('pinFileToIPFS error:' + err);
      return err;
    }
  
  };

// export const cryptFile = async (file: File, pgp: string) => {
//     const cryptedMediaType = mime.lookup(file.name);
//     const destName = `${file.name}_${uuid()}`
//     /*file.mv('./tmp/' + destName, async function (err) {
//       if (err) {
//         throw err;
//       }*/
  
//       let filePath = './tmp/' + destName; // source file path
//       const fileHashPayload = req.body.fileHash;
//       /* generate key */
//       //var ENCRYPTION_KEY = generateKey(32); //Secret Key
//       var ENCRYPTION_KEY = pgp; //Secret Key
//       const [fileHash, keyPath] = await getChecksum(filePath); //uniq original hash of file
//       const IV_LENGTH = 16;
//       let iv = crypto.randomBytes(IV_LENGTH);
  
//       fs.writeFileSync('./nftkeys/' + keyPath + '.key', ENCRYPTION_KEY + ':' + iv.toString('hex')); //write secret Key on localStorate
  
//       /* encrypt */
//       let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
//       var input = fs.createReadStream(filePath);
//       var output = fs.createWriteStream('./tmp/' + keyPath + '_' + destName + '.ternoa'); //write encrypted File
//       input.pipe(cipher).pipe(output);
  
//       output.on('finish', function () {
  
//         var zip = new AdmZip();
//         zip.addLocalFile('./tmp/' + keyPath + '_' + destName + '.ternoa');
//         zip.writeZip('./tmp/' + keyPath + '_' + destName + '.ternoa.zip');
  
//         try {
//           (async function () {
//             input.pipe(cipher).pipe(output);
//             const keyFile = fs.createReadStream('./tmp/' + keyPath + '_' + destName + '.ternoa.zip');
//             const result = await ipfsApi.addFile(keyFile);
//             res.json({
//               file: `${ipfsGatewayUri}/${result.Hash}`, //Encrypted secret hosted on Skynet
//               fileHash: fileHashPayload || fileHash,
//               keyPath, //hash of orginal file for search purpose
//               cryptedMediaType,
//             });
  
//             //Clean tmp folder
//             if (fs.existsSync(filePath)) {
//               fs.unlinkSync(filePath);
//             }
//             if (fs.existsSync('./tmp/' + keyPath + '_' + destName + '.ternoa')) {
//               fs.unlinkSync('./tmp/' + keyPath + '_' + destName + '.ternoa');
//             }
//             if (fs.existsSync('./tmp/' + keyPath + '_' + destName + '.ternoa.zip')) {
//               fs.unlinkSync('./tmp/' + keyPath + '_' + destName + '.ternoa.zip');
//             }
//           })();
//         } catch (err) {
//           res.status(404).send(err);
//         }
//       });
//     //});
// };