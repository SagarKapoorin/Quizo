import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ClipboardList,
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

// Demo data
const demoQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Mathematics Basics',
    description: 'Test fundamental math concepts including arithmetic and algebra',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Science Quiz',
    description: 'General science knowledge covering physics, chemistry, and biology',
    createdAt: '2024-03-14',
  },
];

export default function Dashboard() {
  const {user, logout} = useAuth();
//   console.log(user)
  const navigate=useNavigate();
  const [quizzes]=useState<Quiz[]>(demoQuizzes);
//   console.log(quizzes)
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete=(id: string)=>{
    if (confirm('Are you sure you want to delete this quiz?')) {
      //deleting from backend
      console.log('Deleting quiz:', id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ClipboardList className="w-6 h-6" />
            <h1 className="text-xl font-bold">Quiz Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.username}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Your Quizzes</h2>
          <Button onClick={() => navigate('/create-quiz')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {quiz.description}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {new Date(quiz.createdAt).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(quiz.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}