import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthContext";

export const useAuthContext = () => {
    return useContext(AuthContext);
}
