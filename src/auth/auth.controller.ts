import express from "express";

import AuthService from "./auth.service";
import { logger } from "../common/logger";
import { IHttpResponse, statusResponse } from "../common/response.interface";

class AuthController {
  async register(req: express.Request, res: express.Response) {
    let response: IHttpResponse;

    try {
      await AuthService.register(req.body);
      response = {
        status: statusResponse.Success,
        code: 201,
        error: "",
        data: null,
      };
      res.status(response.code).send(response);
    } catch (error: any) {
      logger.error(`auth controller: ${error}`);
      response = {
        status: statusResponse.BadRequest,
        code: 400,
        error: error instanceof Error ? error.message : "fail to register",
        data: null,
      };
      res.status(response.code).send(response);
    }
  }
}

export default new AuthController();
