import { UserModel } from "../../db/models";
import { ClientResponse } from "../../net/responses";
import { ValidatedSignUpReqBody } from "./models";

export const signUp = async (req, res) => {
  try {
    const userRegData = req.body as ValidatedSignUpReqBody;
    const userModel = new UserModel(userRegData);
    const result = await userModel.save();
    res.status(200).json(new ClientResponse('success', result));
  } catch (e) {
    const err = e as Error;
    console.log({ err, e });
    res.status(500).json(new ClientResponse('error', null, err.message))
  }
}