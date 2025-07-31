import multer from "multer";
import path from "path";
import { Request } from "express";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    const { project_name }: { project_name: string } = req.body;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeProjectName = project_name.replace(/\s+/g, "-").toLowerCase();
    const ext = path.extname(file.originalname);
    cb(null, `${safeProjectName}-${uniqueSuffix}${ext}`);
  },
});

const uploadMulter = multer({ storage: storage });
export default uploadMulter.single("image_upload");
