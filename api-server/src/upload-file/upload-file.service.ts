import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadFileService {
  saveFile(file: Express.Multer.File) {
    const filePath = join(__dirname, '..', 'uploads', file.originalname);
    const writeStream = createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      writeStream.write(file.buffer);
      writeStream.end();

      writeStream.on('finish', () => {
        resolve('Finish');
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  async saveFileStream(req: any): Promise<void> {
    const contentDisposition = req.headers['content-disposition']; //Content-Disposition: attachment; filename="example.txt"
    const fileName =
      this.getFileNameFromDisposition(contentDisposition) || 'default-file.txt';
    const filePath = join(__dirname, '..', 'uploads', fileName);
    const writeStream = createWriteStream(filePath);
    req.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }
  private getFileNameFromDisposition(
    disposition: string | undefined,
  ): string | null {
    if (!disposition) return null;
    const fileNameMatch = disposition.match(/filename="(.+?)"/); //(.+?) Catch text betwen ' '
    return fileNameMatch ? fileNameMatch[1] : null;
  }
}
