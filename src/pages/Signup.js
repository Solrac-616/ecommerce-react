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

  const [firstname, setFirstname] = useState('');
  const [validFirstname, setValidFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);

  const handleSubmit = function(e) {
    e.preventDefault();
    console.log("submit");
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
                <CustomInput
                  type="text"
                  id="firstname"
                  placeholder="Primer Nombre"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                  aria-invalid={validFirstname ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setFirstnameFocus(true)}
                  onBlur={() => setFirstnameFocus(false)}
                />
                <p id="fnidnote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <CustomInput type="email" name="email" placeholder="Email" />
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
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
