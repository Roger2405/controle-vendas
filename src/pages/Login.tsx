import { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import '../styles/Form.scss';
import '../styles/styles.scss';
import { Link } from "react-router-dom";
import Button from "../components/Button";

interface Props {
    setUser: React.Dispatch<any>
}

export default function Login({ setUser }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = (values: { email: string, password: string }) => {
        setIsLoading(true);
        Axios.post("https://server-controle-vendas.herokuapp.com/user/login/", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response)
            if (response.data.success) {
                const user = response.data.user;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            }
            setShowErrorMsg(true);
            setErrorMsg(response.data.msg);
            setIsLoading(false);
        });
    };



    const validationsLogin = yup.object().shape({
        email: yup
            .string()
            .email("email inválido")
            .required("O email é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
    });



    return (
        <div className="form-container">
            <h1 className="title form-title">Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={validationsLogin}
            >
                <Form className="login-form">
                    <div className="form-group">
                        <Field name="email" className="form-field" id="email" placeholder="Email" />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="error-message"
                        />
                    </div>
                    <div className="form-group">
                        <Field type="password" name="password" className="form-field" id="password" placeholder="Senha" />
                        
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="error-message"
                        />
                    </div>

                    <Button className="green-button" isLoading={isLoading} type="submit">
                        Login
                    </Button>
                </Form>
            </Formik>
            {
                showErrorMsg &&
                <span className='error-message' >{errorMsg}</span>
            }
            <p className="mt-8">Ainda não tem uma conta?</p>
            <Button className="green-button" type="submit">
                <Link to={"/registro"}>Cadastrar-se</Link>
            </Button>

        </div>
    );
}
