import {React, useRef, useState, useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import Swal from "sweetalert2";
import axios from '../functions/authfunctions';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = '/user/auth/login';

const Login = () => {
  /* CORREO */
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  /* CONTRASEÑA */
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /* VALIDAR EMAIL */
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  /* VALIDAR CONTRASEÑA */
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    const password = pwd;
    console.log("v1:", v1, "v2:", v2);
    if (!v1 || !v2 ) {
      setErrMsg("Campos Invalidos");
      return;
    }
    try {
        const response = await axios.post(LOGIN_URL,
          {
            "email": email,
            "password": password
          }
        );
        if (response) {
          Swal.fire({
            icon: 'success',
            title: "Eso ta' listo",
            text: `Bienvenido ${response.data.firstname}`,
            confirmButtonText: `<a href='http://localhost:3000' style='color: #fff; text-decoration: none;'>Continuar</a>`,

          })
        }
        console.log("Response:", response);
        console.log("Response data:", response?.data);
        console.log("Response token:", response?.accessToken);
        console.log("Response json:", JSON.stringify(response))
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        
        //setEmail('');
        //setPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('Error: servidor no responde');
        } else if (err.response?.status === 409) {
            setErrMsg('Usuario no existe');
        } else {
            setErrMsg('Fallo en al iniciar sesion')
        }
        console.log("ERROR:", errMsg);
        console.log("err data:", err.data)
    }
  }

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Iniciar Sesion</h3>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">

                {/* INPUT EMAIL */}
                <input  
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="form-control"
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="mailidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p id="mailidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                  Escriba su correo en minuscula sin espacios <br />
                  ejemplo: <br />
                  correo@gmail.com
                </p>
                {/* INPUT PASSWORD */}
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  className="form-control"
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                Entre 8 a 24 letras.<br />
                  Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                  Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button disabled={ !validEmail || !validPwd ? true : false} className="button border-0" type="submit">
                      Ingresar
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
