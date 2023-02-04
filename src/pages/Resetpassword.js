import {React, useRef, useState, useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Resetpassword = () => {

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

  /* VALIDAR CONTRASEÑA */
  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
  }  

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
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
                    <button disabled={!validPwd || !validMatch ? true : false} className="button border-0">Ok</button>
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

export default Resetpassword;
