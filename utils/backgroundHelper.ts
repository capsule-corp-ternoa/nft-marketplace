
export async function fetchBackground(url: string){
    let res
    // if (process.env.NODE_ENV !== "development" && process.env.BASE_URL!==undefined){
    //     res = await fetch(process.env.BASE_URL+"/.netlify/functions/fetch-background?url="+encodeURIComponent(url))
    // }else{
    //     res = await fetch(url)
    // }
    res = await fetch(process.env.BASE_URL+"/.netlify/functions/fetch-background?url="+encodeURIComponent(url))
    return res
}