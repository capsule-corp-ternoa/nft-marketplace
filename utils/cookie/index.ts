import cryptoJs from 'crypto-js'

export const encryptCookie = (cookie: string) => {
    try{
        if (!process.env.NEXT_PUBLIC_SECRET_COOKIE) return cookie
        return cryptoJs.AES.encrypt(cookie, process.env.NEXT_PUBLIC_SECRET_COOKIE).toString()
    }catch{
        return ""
    }
    
}

export const decryptCookie = (cookie: string) => {
    try{
        if (!process.env.NEXT_PUBLIC_SECRET_COOKIE) return cookie
        let bytes = cryptoJs.AES.decrypt(cookie, process.env.NEXT_PUBLIC_SECRET_COOKIE)
        let decryptedCookie = bytes.toString(cryptoJs.enc.Utf8)
        return decryptedCookie
    }catch(err){
        return ""
    }
}