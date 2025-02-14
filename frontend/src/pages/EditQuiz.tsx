import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';


export default function EditQuiz() {
  const { id } = useParams();
//   console.log(id)
  const navigate=useNavigate();
  const { quizzes, setQuizzes}=useAuth();
  const quiz = quizzes.find((quiz) => quiz.id === id);
  const [title, setTitle] = useState(quiz?.title||'');
  const [description, setDescription] = useState(quiz?.description||'');
  const [error,setError] = useState('');
// console.log(description)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Please fill in all fields');
      return;
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer test`,
      },
      body: JSON.stringify({ title, description }),
    })
    .then(response => response.json())
    .then(data => {
      setQuizzes((prevQuizzes) => 
        prevQuizzes.map((quiz) => 
          quiz.id === id ? { ...quiz, title, description } : quiz
        )
      );
    })
    .catch(error => {
      console.error('Error updating quiz:', error);
      setError('Failed to update quiz');
    });
    console.log({ title, description });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit Quiz</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Quiz Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter quiz description"
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}