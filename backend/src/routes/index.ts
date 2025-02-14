import  { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middlewares/auth';
import '../types/index';

const prisma = new PrismaClient();
export const router=Router();

// Login Route
router.post('/login',async(req, res) => {
  const { username, password }=req.body;
  try{
  if(username==="test" && password==="test"){
    const user=await prisma.user.findUnique({ where: {id:"23c343dd-639c-40a2-ac01-4195f850bd0e" } });
    req.userId="23c343dd-639c-40a2-ac01-4195f850bd0e";
    res.status(200).json({ message: 'Login successful',user });
  }
}catch(err:any){
    console.log(err);
    res.status(500).json({error:err})
}
  
});
//demo user hardcoded
router.get('/demo/user', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        id: '23c343dd-639c-40a2-ac01-4195f850bd0e',
        username: 'test',
        password: 'test'
      }
    });
    res.status(200).json({ message: 'User created successfully', user });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
// Quiz Routes
router.post('/quizzes', authenticate, async (req, res) => {
  const { title, description } = req.body;
  try{
  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      teacherId: req.userId as string
    }
  });
  res.status(200).json(quiz);
}catch(err:any){
    console.log(err);
    res.status(500).json({error:err})
}
});

router.get('/quizzes', authenticate, async (req, res) => {
    try{
  const quizzes = await prisma.quiz.findMany({
    where: { teacherId: req.userId },
    select: { id: true, title: true, description: true , createdat:true}
  });
  res.status(200).json(quizzes);
}catch(err:any){
    console.log(err);
    res.status(500).json({error:err})
}
});

router.get('/quizzes/:id', authenticate, async (req, res) => {
    try{
  const quiz = await prisma.quiz.findFirst({
    where: { id: (req.params.id), teacherId: req.userId }
  });
  quiz ? res.status(200).json(quiz) : res.status(404).json({ message: 'Quiz not found' });
}catch(err:any){
    console.log(err);
    res.status(500).json({error:err})
}
});

router.put('/quizzes/:id', authenticate, async (req, res) => {
    try{
  const { title, description } = req.body;
  const quiz = await prisma.quiz.updateMany({
    where: { id: (req.params.id), teacherId: req.userId },
    data: { title, description }
  });
  quiz.count>0? res.status(200).json({ message: 'Quiz updated' }) : res.status(404).json({ message: 'Quiz not found' });
    }catch(err:any){
        console.log(err);
        res.status(500).json({error:err})
    }
});

router.delete('/quizzes/:id', authenticate, async (req, res) => {
    try{
  const quiz = await prisma.quiz.deleteMany({
    where: { id: (req.params.id), teacherId: req.userId }
  });
  quiz.count > 0 ? res.status(200).json({ message: 'Quiz deleted' }) : res.status(404).json({ message: 'Quiz not found' });
    }catch(err:any){
        console.log(err);
        res.status(500).json({error:err})
    }
});
