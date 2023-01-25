// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth:'secret_qVRMKoaMgglo2xMR7VM8j3b9Hr71I2IvZ3C7moXJEdt'
})

const databaseId = '117f840829574e8b86b0be61f38bd617'


async function getItems(){
  try{
    const response = await notion.databases.query({
      database_id:databaseId,
      /* sorts:[
        {
          property:'price',
          direction:'ascending',
        }
      ] */
    })
    console.log(response)
    return response
  }catch(error){
    console.error(JSON.stringify(error))
  }
}


type Data = {
  items?:any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    const response = await getItems()
    res.status(200).json({items:response?.results, message:'Success'})
  }catch(error){
    res.status(400).json({message:`failed`})
  }
}
