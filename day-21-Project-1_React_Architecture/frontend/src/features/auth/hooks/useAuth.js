/**
 * 2). HOOKS Layer 
 * 👉 Hooks belong to the component logic layer in React applications.
    They manage state and behavior inside functional components.
    This layer helps to manage State Layer
 */

import { useContext } from "react";
import { AuthContext } from "../auth.contaxt";





// Custom Hooks
export function useAuth() {
   const context = useContext(AuthContext);
   return context;    
}