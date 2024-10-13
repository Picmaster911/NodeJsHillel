import { Logger, Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {
  private readonly logger = new Logger(UploadFileModule.name);

  constructor() {
    this.logger.log('UploadFileModule initialized');
  }
}
