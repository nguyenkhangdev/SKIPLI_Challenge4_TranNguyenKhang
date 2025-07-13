import { useContext } from "react";
import AuthContext from "./AuthContext";

//custom hook to access to AuthContext
//Use this custom hook instead of just using AuthContext because it can be expanded later
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
