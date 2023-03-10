import { UserDao } from '@server/dao/models/Users/UserDao';
import express from 'express';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Users } from '@libs/Users/Users';
const router = express.Router();

const userDao = new UserDao(MongoDBConn);
let users:Users;
userDao.init().then(()=>{
  users = new Users(userDao);
});

router.post('/signin', async (req, res)=> {
  try {
    const {email, password} = req.body;
    const newUser = await users.newUser(email, password);
    return res.status(200).json({msg:`User Created with id ${newUser._id}`});
  } catch (error) {
    console.error("/signin error", error);
    return res.status(505).json({error: "Error to create new user"});
  }
});

router.post('/signon', async (req, res)=>{
  try {
    const {email, password} = req.body;
    const token = await users.loginUser(email, password);
    return res.status(200).json({token});
  } catch (error) {
    console.error("/signin error", error);
    return res.status(505).json({error: "Error to signon user"});
  }
});

export default router;
