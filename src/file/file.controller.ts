import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const editFileName = (req, file, callback) => {
  const fileExtName = file.originalname
  callback(null, fileExtName);
};

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    })
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
  }

  @Get(':fileName')
  downloadFile(
    @Param('fileName') file,
    @Res() res) {
    return res.sendFile(file, { root: 'files' });
  }

}


