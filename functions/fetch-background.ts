
import { Handler } from '@netlify/functions'
import fetch from "node-fetch"

const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

const handler: Handler = async (event) => {
  try {
    if (event?.queryStringParameters?.url){
      const response = await fetch(event.queryStringParameters.url);
      const data = await response.json();
      if (data){
        await timer(11000)
        return { 
          statusCode: 200, 
          body: JSON.stringify(data) ,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST",
          },
        };
      }else{
        throw new Error()
      }
    }else{
      throw new Error()
    }
  } catch (error) {
    return{
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed fetching data', error: error }),
    }
  }
}

export { handler }