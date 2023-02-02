import {React, useRef, useState, useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from '../functions/authfunctions';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

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

  useEffect(() => {
      setValidFirstname(USER_REGEX.test(firstname));
  }, [firstname])

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
    const v2 = PWD_REGEX.test(pwd);
    console.log("v1 y v2", v1, v2);
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
                <CustomInput
                  type="text"
                  id="firstname"
                  placeholder="Primer Nombre"
                  autoComplete="off"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                  aria-invalid={validFirstname ? "false" : "true"}
                  aria-describedby="fnidnote"
                  onFocus={() => setFirstnameFocus(true)}
                  onBlur={() => setFirstnameFocus(false)}
                />
                <p id="fnidnote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                {/* INPUT SEGUNDO NOMBRE */}
                <CustomInput
                  type="text"
                  id="lastname"
                  placeholder="Segundo Nombre"
                  autoComplete="off"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                  aria-invalid={validLastname ? "false" : "true"}
                  aria-describedby="lnidnote"
                  onFocus={() => setLastnameFocus(true)}
                  onBlur={() => setLastnameFocus(false)}
                />
                <p id="lnidnote" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                {/* INPUT EMAIL */}
                <CustomInput  
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="mailidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p id="mailidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                  Error de Email
                </p>
                {/* INPUT MOBILE */}
                <CustomInput  
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Telefono"
                  autoComplete="off"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  required
                  aria-invalid={validMobile ? "false" : "true"}
                  aria-describedby="mobileidnote"
                  onFocus={() => setMobileFocus(true)}
                  onBlur={() => setMobileFocus(false)}
                />
                <p id="mobileidnote" className={mobileFocus && mobile && !validMobile ? "instructions" : "offscreen"}>
                  Error de Mobile
                </p>
                {/* INPUT PASSWORD */}
                <CustomInput
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                {/* INPUT CONFIRM PASSWORD */}
                <CustomInput
                  type="password"
                  id="confirm_pwd"
                  placeholder="Confirmar Contraseña"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  Must match the first password input field.
                </p>

                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
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
