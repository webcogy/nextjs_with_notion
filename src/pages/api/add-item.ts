// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth:'secret_qVRMKoaMgglo2xMR7VM8j3b9Hr71I2IvZ3C7moXJEdt'
})
const databaseId = '117f840829574e8b86b0be61f38bd617'


async function addItem(name: string, title:string, detail:string){
  try{
    const response = await notion.pages.create({
      parent:{database_id:databaseId},
      properties:{
        title:[
          {
            text:{
              content:title,
            }
          }
        ],
        name:[
          {
            text:{
              content:name,
            }
          }
        ],
        detail:[
          {
            text:{
              content:detail,
            }
          }
        ],
      }
    })
    console.log(response)
  }catch(error){
    console.error(JSON.stringify(error))
  }
}


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {name, title, detail} = req.query

  if(name == null){
    return res.status(400).json({message:'No name'})
  }
  if(title == null){
    return res.status(400).json({message:'No title'})
  }
  if(detail == null){
    return res.status(400).json({message:'No detail'})
  }

  try{
    await addItem(String(name), String(title), String(detail))
    res.status(200).json({message:`Success added`})
  }catch(error){
    res.status(200).json({ message:`Failed added`})
  }

}
