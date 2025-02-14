//auth route , jsx components
//context component warap all components in it to provide auth user data
import { createContext, useContext, useState, useEffect } from 'react';
interface AuthContextType {
  isAuth: boolean;
  user: User|null;
  login:(username: string, password: string)=>Promise<void>;
  logout:()=>void;
}
interface User {
  id: string;
  username: string;
}
const AuthContext=createContext<AuthContextType|null>(null);
export function AuthProvider({children}:{children: React.ReactNode }){
    // console.log("auth-hit")
  const [user,setUser]=useState<User|null>(null);
//   console.log(user)
  useEffect(()=>{
    const store=localStorage.getItem('user');
    if (store) {
      setUser(JSON.parse(store));
    }
  }, []);

  const login=async(username: string, password: string) => {
    //demo credentials login
    if (username==='test'&&password ==='test') {
      const user = { id: '1', username: 'test' };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth:user?true:false,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}