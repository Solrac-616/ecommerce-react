import {React, useRef, useState, useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Swal from "sweetalert2";
import axios from '../functions/authfunctions';

const USER_REGEX = /^[A-Z][A-z]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const MOBILE_REGEX = /^\d{11}$/ ;
const REGISTER_URL = '/user/auth/register';

const Signup = () => {

  const userRef = useRef();
  const errRef = useRef();

  /* PRIMER NOMBRE */
  const [firstname, setFirstname] = useState('');
  const [validFirstname, setValidFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);
  /* SEGUNDO NOMBRE */
  const [lastname, setLastname] = useState('');
  const [validLastname, setValidLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  /* CORREO */
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  /* TELEFONO */
  const [mobile, setMobile] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  /* CONTRASEÑA */
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  /* CONFIRMAR CONTRASEÑA */
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /* VALIDAR PRIMER NOMBRE */
  useEffect(() => {
    setValidFirstname(USER_REGEX.test(firstname));
  }, [firstname])
  /* VALIDAR SEGUNDO NOMBRE */
  useEffect(() => {
    setValidLastname(USER_REGEX.test(lastname));
  }, [lastname])
  /* VALIDAR EMAIL */
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])
  /* VALIDAR TELEFONO */
  useEffect(() => {
    setValidMobile(MOBILE_REGEX.test(mobile));
  }, [mobile])
  /* VALIDAR CONTRASEÑA */
  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])
  
  useEffect(() => {
      setErrMsg('');
  }, [firstname, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const v1 = USER_REGEX.test(firstname);
    const v2 = USER_REGEX.test(lastname);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = MOBILE_REGEX.test(mobile);
    const v5 = PWD_REGEX.test(pwd);
    const password = pwd;
    console.log("v1:", v1, "v2:", v2, "v3:", v3, "v4:", v4, "v5:", v5);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
        setErrMsg("Campos Invalidos");
        return;
    }
    try {
        const response = await axios.post(REGISTER_URL,
          {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "mobile": mobile,
            "password": password
          }
        );
        if (response) {
          Swal.fire({
            icon: 'success',
            title: "Eso ta' listo",
            text: 'Tus datos se han registrado con exito',
            confirmButtonText: `<a href='http://192.168.1.149:3000/login' style='color: #fff; text-decoration: none;'>Ingresar</a>`,
          })
        }
        // console.log(response?.data);
        // console.log(response?.accessToken);
        // console.log(JSON.stringify(response))
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setFirstname('');
        setLastname('');
        setEmail('');
        setMobile('');
        setPwd('');
        setMatchPwd('');
        
    } catch (err) {
        if (!err?.response) {
          Swal.fire({
            icon: 'error',
            title: "Lo sentimos",
            text: `El servidor no responde, lo resolveremos lo mas pronto posible`,
            confirmButtonText: `<a href='http://192.168.1.149:3000/' style='color: #fff; text-decoration: none;'>ok</a>` 
          })
        }
        if (err.response.status === 500 ) {
            setErrMsg('Usuario ya registrado');
            Swal.fire({
              icon: 'error',
              title: "Lo sentimos",
              text: `Usuario ya registrado, Error ${err.response.status}, ${err.response.data.message}`,  
            })
        } else {
            setErrMsg('Fallo en el registro')
            Swal.fire({
              icon: 'error',
              title: "Lo sentimos",
              text: `Algo salio mal, Error ${err.response.status}, ${err.response.data.message}` ,  
            })
        }
    }
  }

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                
                {/* INPUT PRIMER NOMBRE */}
                <input
                  type="text"
                  id="firstname"
                  placeholder="Primer Nombre"
                  autoComplete="off"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                  className="form-control"
                  aria-invalid={validFirstname ? "false" : "true"}
                  aria-describedby="fnidnote"
                  onFocus={() => setFirstnameFocus(true)}
                  onBlur={() => setFirstnameFocus(false)}
                />
                <p id="fnidnote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                    Entre 2 y 24 letras.<br />
                    Debe comenzar con Mayuscula.<br />
                    Sin espacios
                </p>
                {/* INPUT APELLIDO */}
                <input
                  type="text"
                  id="lastname"
                  placeholder="Apellido"
                  autoComplete="off"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                  className="form-control"
                  aria-invalid={validLastname ? "false" : "true"}
                  aria-describedby="lnidnote"
                  onFocus={() => setLastnameFocus(true)}
                  onBlur={() => setLastnameFocus(false)}
                />
                <p id="lnidnote" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                    Entre 2 y 24 letras.<br />
                    Debe comenzar con Mayuscula.<br />
                    Sin espacios
                </p>
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
                {/* INPUT MOBILE */}
                <input  
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Telefono"
                  autoComplete="off"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  required
                  className="form-control"
                  aria-invalid={validMobile ? "false" : "true"}
                  aria-describedby="mobileidnote"
                  onFocus={() => setMobileFocus(true)}
                  onBlur={() => setMobileFocus(false)}
                />
                <p id="mobileidnote" className={mobileFocus && mobile && !validMobile ? "instructions" : "offscreen"}>
                  Numero de telefono din espacios <br />
                  ejemplo: <br />
                  04241112233
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
                {/* INPUT CONFIRM PASSWORD */}
                <input
                  type="password"
                  id="confirm_pwd"
                  placeholder="Confirmar Contraseña"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  className="form-control"
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  Debe coincidir con el primer campo de entrada de contraseña.
                </p>

                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button disabled={!validFirstname || !validLastname || !validEmail || !validMobile || !validPwd || !validMatch ? true : false} className="button border-0">Registrar</button>
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

export default Signup;
