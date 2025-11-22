import { Button } from "antd";
import { useAuthContext } from "../shared/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const auth = useAuthContext();
    const navigate = useNavigate();

    const handleSignout = () => {
        if(auth)
        auth.signout(() => navigate('/'));
    }

    const handleSignin = () => {
        navigate('/login');
    }
    return (
        <div>
            {
                auth ? (auth.user === null
                    ? <Button onClick = {handleSignin}  type="primary">Авторизация</Button>
                    : <Button onClick = {handleSignout} type="primary">Выход</Button>
                )
                : <Button onClick = {handleSignin}  type="primary">Авторизация</Button>
            }
        </div>
    )
}