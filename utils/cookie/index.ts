import { getUser } from 'actions/user';
import cryptoJs from 'crypto-js'
import Cookies from 'js-cookie';

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

export const setUserFromDApp = async (setWalletUser:Function, setIsUserFromDapp?:Function) => {
    const params = new URLSearchParams(window.location.search);
    if (window.isRNApp && window.walletId && (!Cookies.get('token') || decryptCookie(Cookies.get('token') as string) !== window.walletId)) {
        if (params.get('walletId') && params.get('walletId') !== window.walletId) {
            setWalletUser(null);
        }
        Cookies.remove('token');
        const user = await getUser(window.walletId);
        setWalletUser(user);
        Cookies.set('token', encryptCookie(window.walletId));
        if (setIsUserFromDapp) setIsUserFromDapp(true)
    }
    if (!window.isRNApp && params.get('walletId')) {
        setWalletUser(null);
        if (setIsUserFromDapp) setIsUserFromDapp(false)
    }
}