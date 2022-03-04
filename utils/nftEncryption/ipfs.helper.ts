import axios from 'axios'
import { ipfsBaseUrl } from './ipfs.const'

type ProgressDataNominalSetState = React.Dispatch<React.SetStateAction<number[]>>

const defaultBaseurl = `${ipfsBaseUrl}/api/v0`
export default class TernoaIpfsApi {
  baseUrl = defaultBaseurl
  async addFile(file: File | Blob, setProgressData?: ProgressDataNominalSetState, progressIndex?: number) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios
        .request({
          method: 'post',
          url: `${this.baseUrl}/add`,
          data: formData,
          onUploadProgress: (progressEvent) => {
            if (setProgressData && progressIndex !== undefined && !isNaN(progressIndex)) {
              setProgressData((prevState: number[]) => {
                const newArray = [...prevState]
                newArray[progressIndex] = Math.ceil((progressEvent.loaded / progressEvent.total) * 100)
                return newArray
              })
            }
          },
        })
        .catch((e) => {
          throw new Error(e)
        })
      return response.data
    } catch (e) {
      console.error('addFile error', e)
      throw new Error(e as string)
    }
  }
}
