import { SignInParams } from "@/services";
import authenticationService from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
