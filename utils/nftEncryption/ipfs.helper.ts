import { ipfsBaseUrl } from "./ipfs.const";

const defaultBaseurl = `${ipfsBaseUrl}/api/v0`;
export default class TernoaIpfsApi {
    baseUrl = defaultBaseurl;
    constructor() {
    }
    async addFile(file: File | Blob) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${this.baseUrl}/add`, {
                method: 'POST',
                body: formData,
            }).catch(e => {
                throw new Error(e)
            });
            return await response.json().catch(e => {
                throw new Error(e)
            });
        } catch (e) {
            console.error('addFile error', e)
            throw new Error(e as string);
        }
    }
}