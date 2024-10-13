import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      await this.uploadFileService.saveFile(file);
      res.status(HttpStatus.OK).send('File uploaded successfully');
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(`File upload failed ${err}`);
    }
  }

  @Post('stream')
  async uploadFileStream(@Req() req: Request, @Res() res: Response) {
    try {
      await this.uploadFileService.saveFileStream(req);
      res.status(HttpStatus.OK).send('File uploaded successfully');
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(`File upload failed ${err}`);
    }
  }
}
