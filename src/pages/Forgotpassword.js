import {React, useRef, useState, useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import Swal from "sweetalert2";
import axios from '../functions/authfunctions';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const FORGOTPASS_URL = '/user/auth/forgot-password-token';

const Forgotpassword = () => {

  /* CORREO */
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /* VALIDAR EMAIL */
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const v1 = EMAIL_REGEX.test(email);
    console.log("v1:", v1);
    if (!v1 ) {
      setErrMsg("Campos Invalidos");
      return;
    }
    try {
        const response = await axios.post(FORGOTPASS_URL,
          {
            "email": email,
          }
        );
        if (response) {
          Swal.fire({
            icon: 'success',
            title: "Eso ta' listo",
            text: `Hola ${response.data.user.firstname}, te hemos enviado un correo de confirmacion`,
            //confirmButtonText: `<a href='http://192.168.1.149:3000' style='color: #fff; text-decoration: none;'>Continuar</a>`,

          })
        }
        console.log("Response:", response);
        console.log("Response data:", response?.data);
        console.log("Response token:", response?.accessToken);
        console.log("Response json:", JSON.stringify(response))
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        
        setEmail('');
    } catch (err) {
        if (!err?.response) {
          Swal.fire({
            icon: 'error',
            title: "Lo sentimos",
            text: `El servidor no responde, lo resolveremos lo mas pronto posible`,
            confirmButtonText: `<a href='http://localhost:3000/' style='color: #fff; text-decoration: none;'>ok</a>` 
          })
        } else {
            setErrMsg('Fallo en al enviar correo');
            Swal.fire({
              icon: 'error',
              title: "Lo sentimos",
              text: `${err.response.data.message}` ,  
            })
        }
        // console.log("ERROR:", errMsg);
         console.log("err data:", err)
    }
  }

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                
                {/* INPUT EMAIL */}
                <input  
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo"
                  autoComplete="on"
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

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button disabled={ !validEmail ? true : false} className="button border-0" type="submit">
                      Enviar
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default Forgotpassword;
