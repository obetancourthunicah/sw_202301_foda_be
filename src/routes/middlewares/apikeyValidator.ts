import { Request, Response } from "express";
const apiKeyValue = process.env.API_KEY;

export const validateKey = (key:string)=>{
  return apiKeyValue === key;
}

export const validateKeyMiddleWare = (req:Request, res:Response, next)=> {
  console.log(req.headers);
  const {apikey = 'NA'} = req.headers as {apikey: string};
  if(apikey === 'NA') {
    return res.status(401).json({error: 'Api Key Must be Provided'});
  }
  if(!validateKey(apikey)){
    return res.status(401).json({error: 'Api Key provided failed'});
  }
  return next();
}
