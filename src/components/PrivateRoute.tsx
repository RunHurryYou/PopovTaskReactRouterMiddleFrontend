import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { publickRoutes } from "../routes/routes";

export const PrivateRoute = ({children}: React.PropsWithChildren) => {
    const auth = useAuthContext();
    const location = useLocation();
    if(auth && auth.user === null){
        return <Navigate to={publickRoutes.login} state={{from: location.pathname}} replace/>
    }
    return <>{children}</>
}