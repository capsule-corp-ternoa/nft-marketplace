
import { Handler } from '@netlify/functions'
import fetch from "node-fetch"

const handler: Handler = async (event) => {
  try {
    if (event?.queryStringParameters?.url){
      const response = await fetch(event.queryStringParameters.url);
      const data = await response.json();
      if (data){
        return { statusCode: 200, body: JSON.stringify(data) };
      }else{
        throw new Error()
      }
    }else{
      throw new Error()
    }
  } catch (error) {
    return{
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}

export { handler }