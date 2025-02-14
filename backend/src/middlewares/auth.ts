import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
  res.status(401).json({ message: 'Authentication required' });
  return
  }
  try {
    if(token==="test"){
        req.userId="c0e8005a-f840-4a62-b05f-900c8f414d6c"
        next();
    }else{
        res.status(401).json({message:"Token not matched"});
    }
    return;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};