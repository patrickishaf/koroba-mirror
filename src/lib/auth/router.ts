import { Router } from 'express';
import { validateLoginReqData } from './validators';
import UsersDB from '../users/usersDB';
import { User } from '../users/models';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
  try {
    const result = UsersDB.saveUser(req.body as User);
    res.status(200).write('user saved successfully')
    res.json(result);
  } catch (e) {
    console.log('ran into an error =>', e);
    const err = e as Error;
    res.status(500).write('failed to save user');
    res.json(err);
  }
});

authRouter.post('/login', validateLoginReqData, (_, res) => {
  res.send('login successful');
});

export default authRouter;