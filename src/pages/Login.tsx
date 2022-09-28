import { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import '../styles/Form.scss';
import { Link } from "react-router-dom";
import { getUserFromLocalStorage } from "../commons/userFromLocalStorage";

interface Props {
    setUser: React.Dispatch<any>
}

export default function Login({ setUser }: Props) {
    const handleLogin = (values: { email: string, password: string }) => {
        Axios.post("http://127.0.0.1:3001/login/", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            if (response.data.success) {
                const user = response.data.user;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            }
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
        <div className="container">
            <h1>Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={validationsLogin}
            >
                <Form className="login-form">
                    <div className="form-group">
                        <Field name="email" className="form-field" placeholder="Email" />

                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"
                        />
                    </div>
                    <div className="form-group">
                        <Field name="password" className="form-field" placeholder="Senha" />

                        <ErrorMessage
                            component="span"
                            name="password"
                            className="form-error"
                        />
                    </div>

                    <button className="form-button" type="submit">
                        Login
                    </button>
                </Form>
            </Formik>

            <p className="mt-8">Ainda não tem uma conta?</p>
            <button className="form-button" type="submit">
                <Link to={"/registro"}>Cadastro</Link>
            </button>

        </div>
    );
}
