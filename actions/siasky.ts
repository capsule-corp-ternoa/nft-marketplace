import { SkynetClient } from 'skynet-js';
import { blake2AsHex } from '@polkadot/util-crypto';
import { useState } from 'react';
import JSZip from 'jszip';
import asmCrypto from 'asmcrypto-lite';
const openpgp = require('openpgp');

const client = new SkynetClient('https://siasky.net');

export const useSkynetUpload = () => {
  const [skylink, setSkylink] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const uploadFile = async (file: File): Promise<string> => {
    try {
      setStatus('uploading');
      const response = await client.uploadFile(file);

      const portalUrl = client.getSkylinkUrl(response.skylink);

      setSkylink(portalUrl);
      setStatus('completed');
      return portalUrl;
    } catch (error) {
      setStatus('error');
      throw error;
    }
  };

  return [skylink, status, uploadFile] as const;
};

export const cryptFile = async (file: File) => {
  try {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const hash = blake2AsHex(result);

    const { publicKeyArmored } = await openpgp.generateKey({
      curve: 'curve25519',
      userIds: [{ name: 'yourname', email: 'johndoe@ternoa.com' }],
      passphrase: hash,
    });

    const hashFile = asmCrypto.SHA256.hex(await file.arrayBuffer());
    const fileArrayBuffer: ArrayBuffer = await file.arrayBuffer();
    const fileForOpenpgpjs: Uint8Array = new Uint8Array(fileArrayBuffer);
    const pkeys = (await openpgp.key.readArmored(publicKeyArmored)).keys;

    const encryptionResponse = await openpgp.encrypt({
      message: openpgp.message.fromBinary(fileForOpenpgpjs),
      publicKeys: pkeys,
    });

    const value = encryptionResponse.data;

    const zip = new JSZip();
    zip.file(file.name + '.ternoa', value);

    const blob = await zip.generateAsync({
      type: 'blob',
    });
    const f = new File([blob], file.name + '-' + hashFile + '.ternoa.zip');
    return f;
  } catch (err) {
    return null;
  }
};

interface uploadExParams {
  internalid: string;
  name: string;
  description: string;
  media: string;
  mediaType: string;
  cryptedMedia: string;
  cryptedMediaType: string;
}

export const getNftJson = ({
  name,
  description,
  media,
  mediaType,
  cryptedMedia,
  cryptedMediaType,
}: uploadExParams) => {
  let modifiedData = {
    internalid: 'c18',
    name,
    description,
    media: {
      url: media,
      mediaType: mediaType,
    },
    cryptedMedia: {
      url: cryptedMedia,
      cryptedMediaType: cryptedMediaType,
    },
  };

  const s = JSON.stringify(modifiedData);
  const b = new Blob([s]);
  const f = new File([b], 'ok', { type: 'application/json' });

  return f;
};
