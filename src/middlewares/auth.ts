import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res
      .status(401)
      .render("unauthorized", { message: "Unauthorized access" });
  }
};
