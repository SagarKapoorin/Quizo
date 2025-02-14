import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
  res.status(401).json({ message: 'Authentication required' });
  return
  }
  try {
    if(token==="test"){
        req.userId="23c343dd-639c-40a2-ac01-4195f850bd0e"
        next();
    }else{
        res.status(401).json({message:"Token not matched"});
    }
    return;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};