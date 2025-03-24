import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    const allowedfileTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedfileTypes.includes(file.mimetype)) {
      cb(new Error("this filetype is not acccepted"));
      return;
    }
    cb(null, "./src/uploads");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { multer, storage };
