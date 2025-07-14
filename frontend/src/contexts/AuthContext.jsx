import { createContext, useEffect, useState } from "react";
import api from "../services/axios";
import { toast } from "react-toastify";

//create auth context to use user info(state) in all app(component)
const AuthContext = createContext(undefined);

//AuthProvider wrap children components and supply user and set user
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  //get user info 1 time when component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/getme");
        if (res.status) {
          setUser(res.data);
        } else {
          setUser(null);
          toast.error("You are not sign in.");
        }
      } catch (error) {
        setUser(null);
        toast.error(error.message);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
