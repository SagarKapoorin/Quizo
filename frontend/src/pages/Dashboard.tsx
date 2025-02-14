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
import { useEffect } from 'react';

export default function Dashboard() {
  const {user, logout, quizzes, setQuizzes, getQuiz} = useAuth();
//   console.log(user)
  const navigate=useNavigate();
//   console.log(quizzes)

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete=(id: string)=>{
    if (confirm('Are you sure you want to delete this quiz?')) {
      // Deleting from backend
      fetch(`${import.meta.env.VITE_BACKEND_URL}quizzes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer test`,
        },
      })
        .then((response) => {
          if (!response.ok) {
        throw new Error('Failed to delete quiz');
          }
          setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting quiz:', error);
        });
      console.log('Deleting quiz:', id);
    }
  };
  useEffect(() => {
   getQuiz();
  }, []);

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
          {quizzes.length>0 && quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {quiz.description}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {new Date(quiz.createdat).toLocaleDateString()}
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