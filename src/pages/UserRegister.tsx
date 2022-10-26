import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import '../styles/AuthForm.scss';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function UserRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = (values: { email: string, password: string }) => {
        setIsLoading(true);
        Axios.post(`${process.env.REACT_APP_LINK_API}/user/register`, {
            email: values.email,
            password: values.password,
        }).then((response) => {
            if (response.data.success) {
                navigate('/');
            }
            alert(response.data.msg)

            setShowErrorMsg(true);
            setErrorMsg(response.data.msg);

            setIsLoading(false);
        });
    };

    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("email inválido")
            .required("O email é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas são diferentes")
            .required("A confirmação da senha é obrigatória"),
    });
    return (

        <main className="page main-formAuth">
            <div className="auth-form-container">
                <h1 className="form-title title">Cadastro</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleRegister}
                    validationSchema={validationsRegister}
                >
                    <Form className="register-form">
                        <div className="form-group">
                            <Field name="email" className="form-field" placeholder="Email" />
                            <ErrorMessage
                                component="span"
                                name="email"
                                className="error-message"
                            />
                        </div>
                        <div className="form-group">
                            <Field name="password" type="password" className="form-field" placeholder="Senha" />
                            <ErrorMessage
                                component="span"
                                name="password"
                                className="error-message"
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                name="confirmation"
                                className="form-field"
                                placeholder="Confirmar senha"
                                type="password"
                            />
                            <ErrorMessage
                                component="span"
                                name="confirmation"
                                className="error-message"
                            />
                        </div>
                        <div>
                            <ErrorMessage
                                component="span"
                                name="regiter-error"
                                className="error-message"
                            />
                        </div>
                        <Button isLoading={isLoading} className="green-button" type="submit">
                            Cadastrar
                        </Button>
                    </Form>
                </Formik>
                {
                    showErrorMsg &&
                    <span className='error-message' >{errorMsg}</span>
                }
                <p className="mt-8">Já tem uma conta?</p>
                <Button className="green-button" type="submit">
                    <Link to={"/"}>Login</Link>
                </Button>
            </div>
        </main>
    )
}