//auth route , jsx components
//context component warap all components in it to provide auth user data
import { createContext, useContext, useState, useEffect } from "react";
interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  login:(username: string, password: string) => Promise<void>;
  logout: () => void;
  quizzes: Quiz[] | [];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  getQuiz: () => void;
}
interface Quiz {
  id: string;
  title: string;
  description: string;
  createdat: Date;
}
interface User {
  id: string;
  username: string;
}
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // console.log("auth-hit")
  const [user, setUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[] | []>([]);
  //   console.log(user)
  useEffect(() => {
    const store = localStorage.getItem("user");
    if (store) {
      setUser(JSON.parse(store));
    }
  }, []);
  //getting all quiz 
  const getQuiz = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/quizzes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    setQuizzes(data);
  };
  //login funciton
  const login = async (username: string, password: string) => {
    //demo credentials login
    if (username === "test" && password === "test") {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (!data.user) {
        throw new Error("Invalid credentials");
      }
      const user = { id: data.user.id, username: data.user.username };
      // console.log(user)
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      throw new Error("Invalid credentials");
    }
  };
  //logout funciton
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: user ? true : false,
        user,
        login,
        logout,
        quizzes,
        setQuizzes,
        getQuiz,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
