import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import '../styles/Form.scss';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Register() {
    const [registered, setRegistered] = useState<boolean>();
    const navigate = useNavigate();

    const handleRegister = (values: { email: string, password: string }) => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            setRegistered(response.data.success);
        });
    };

    useEffect(() => {
        if (registered) {
            navigate('/');
        }
    }, [registered]);

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
        <div className="container">
            <h1>Cadastro</h1>
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

                    <div className="form-group">
                        <Field
                            name="confirmation"
                            className="form-field"
                            placeholder="Confirmar senha"
                        />

                        <ErrorMessage
                            component="span"
                            name="confirmation"
                            className="form-error"
                        />
                    </div>

                    <button className="form-button" type="submit">
                        Cadastrar
                    </button>
                </Form>
            </Formik>
            <p className="mt-8">Já tem uma conta?</p>

            <button className="form-button" type="submit">
                <Link to={"/"}>Login</Link>
            </button>
        </div>
    )
}