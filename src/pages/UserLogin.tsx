import { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import '../styles/AuthForm.scss';
import '../styles/styles.scss';
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { ArrowRight } from "phosphor-react";

interface Props {
    setUser: React.Dispatch<any>
}

export default function UserLogin({ setUser }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = (values: { email: string, password: string }) => {
        setIsLoading(true);
        Axios.post("https://server-controle-vendas.herokuapp.com/user/login/", {
            email: values.email,
            password: values.password,
        }).then((response) => {
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
        <main className="page main-formAuth">
            <div className="auth-form-container">
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
                <p className="translate-y-8 ml-auto mr-0 w-1/2 text-end">Ainda não tem uma conta?</p>
                <div className="flex py-4 w-full">
                    <Link className="basis-1/2" to={"/"}>
                        <Button className="green-button left" onClick={() => setUser({ email: 'teste@demo.com', id: 1 })}>
                            Conta de demonstração
                        </Button>
                    </Link>
                    <Link className="basis-1/2" to={"/cadastro"}>
                        <Button className="green-button right">
                            Cadastre-se
                            <ArrowRight size={48} />
                        </Button>
                    </Link>

                </div >
            </div >
        </main>
    );
}
