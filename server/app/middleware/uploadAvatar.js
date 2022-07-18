import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

export const uploadAvatar = multer({
  limits: {
    fileSize: 1000000
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/avatars')

    },
    filename: (req, file , cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext)
    }
  }),

  fileFilter(req, file, cb) {
    // if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
    //   return cb(new Error('Please upload an image'))
    // }
     const isValid = !!MIME_TYPE_MAP[file.mimetype];
     let error = isValid ? null : new Error('Please upload an image')
    cb(error, isValid);
  }
})