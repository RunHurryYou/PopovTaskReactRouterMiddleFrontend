import { useNavigate, useLocation } from "react-router-dom";
export const CardCLick = (id: string ) => {
    const navigate = useNavigate();
    const location = useLocation();
    navigate(`${location.pathname}/${id}`);
};