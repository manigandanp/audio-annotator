import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as fileUpload from 'express-fileupload'

@Injectable()
export class UploaderMiddleware implements NestMiddleware {
  // use = fileUpload()
  use = (req: Request, res: Response, next: NextFunction) => {
    // fileUpload()(req, req, next)
    console.log('Request...');
    // console.log(fileUpload()(req, req, next))
    // console.log(req)
    console.log(req.file)
    console.log(req.files)
    next();
  }
}
