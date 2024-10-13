import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadFileService {
  saveFiles(files: Array<Express.Multer.File>): Promise<string[]> {
    const fileSavePromises = files.map((file) => {
      const uploadDir = join(__dirname, '..', 'uploads');
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = join(uploadDir, file.originalname);
      const writeStream = createWriteStream(filePath);
      return new Promise<string>((resolve, reject) => {
        writeStream.write(file.buffer);
        writeStream.end();

        writeStream.on('finish', () => {
          resolve('Finish');
        });

        writeStream.on('error', (err) => {
          reject(err);
        });
      });
    });

    return Promise.all(fileSavePromises);
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
