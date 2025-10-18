import { useState, useRef} from 'react';
import { TextInput } from '../../UI/TextInput/TextInput';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';


export const Login = () => {
    const [inputs, setInputs] = useState<Partial<{email: string, password: string}>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const auth = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const handleChange = (event:React.ChangeEvent<HTMLFormElement>) => {
        setInputs(values => ({...values, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(inputs.email && inputs.password){
            auth?.signin(inputs.email, () => {navigate(from, {replace: true});});
        }
        if(formRef.current)
            formRef.current.reset();
    }

    const handleReset = () => {
        setInputs({});
    }

    return (
        <form
            ref={formRef}
            onChange = {handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <TextInput
                name='email'
                label='Email'
                placeholder="Ваш email"
                description='Введите вашу электронную почту'
                variant='default'
                radius='lg'
                size='xs'
            />
            <TextInput
                name='password'
                label='Пароль'
                placeholder="Ваш пароль"
                description='Введите ваш пароль'
                variant='default'
                radius='lg'
                size='xs'
            />
            <button type="submit">Sign In</button>
        </form>
    );
};