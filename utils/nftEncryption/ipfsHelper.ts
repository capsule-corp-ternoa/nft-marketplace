
//import fs from 'fs'
import { ipfsBaseUrl } from  "./ipfsConst"

const defaultBaseurl = `${ipfsBaseUrl}/api/v0`;

export default class TernoaIpfsApi {
    baseUrl = defaultBaseurl;
    constructor() {
    }
    async addFile(file: File) {
        //let stream = null, tempPath = null
        try {
            /*if (file.mv) {
                tempPath = './uploads/' + file.name;
                await file.mv(tempPath).catch((e) => {
                    throw new Error(e)
                });
                stream = fs.createReadStream(tempPath);
            } else {
                stream = file;
            }*/
            const formData = new FormData();
            //formData.append('file', stream);
            formData.append('file', file);
            const response = await fetch(`${this.baseUrl}/add`, {
                method: 'POST',
                body: formData,
            }).catch((e: any) => {
                throw new Error(e)
            });
            return await response.json().catch((e: any) => {
                throw new Error(e)
            });
        } catch (e: any) {
            console.error('addFile error', e)
            throw new Error(e);
        }/* finally {
            if (tempPath) {
                fs.unlinkSync(tempPath);
            }
        }*/
    }
    async getPinList() {
        try {
            const response = await fetch(`${this.baseUrl}/pin/ls`, {
                method: 'POST',
            }).catch(e => {
                throw new Error(e)
            });
            return await response.json().catch(e => {
                throw new Error(e)
            });
        } catch (e: any) {
            console.error('getPinList error', e)
            throw new Error(e);
        }
    }
}
exports.TernoaIpfsApi = TernoaIpfsApi;