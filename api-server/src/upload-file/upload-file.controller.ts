import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    files.forEach((file) => console.log(file.originalname));
    try {
      await this.uploadFileService.saveFiles(files);
      res.status(HttpStatus.OK).send('File uploaded successfully');
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(`File upload failed ${err}`);
    }
  }

  @Post('upload-stream')
  async uploadFileStream(@Req() req: Request, @Res() res: Response) {
    try {
      await this.uploadFileService.saveFileStream(req);
      res.status(HttpStatus.OK).send('File uploaded successfully');
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(`File upload failed ${err}`);
    }
  }
}
