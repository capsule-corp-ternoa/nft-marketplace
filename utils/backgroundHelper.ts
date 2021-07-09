
export async function fetchBackground(url: string){
    let res
    // if (process.env.NODE_ENV === "development"){
    //     res = await fetch(url)
    // }else{
    //     res = await fetch("http://localhost:8888/.netlify/functions/fetch-background?url="+encodeURIComponent(url))
    // }
    res = await fetch("http://localhost:8888/.netlify/functions/fetch?url="+encodeURIComponent(url))
    return res
}