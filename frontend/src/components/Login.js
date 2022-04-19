import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { StyledAuth } from "./Signup";
import useInput from "../hooks/useInput";
import { login } from "../reducers/user";
import logo from '../assets/logo.png'
import styled from 'styled-components'

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`
const CenteredImage = styled.img`
  display: block;
  max-width:310px;
`

const Login = ({ setAuth }) => {
  const [ loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const email = useInput("");
  const password = useInput("");

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email.value.trim() || !password.value.trim()) {
      setLoading(false);
      return toast.error("Please fill in all the fields");
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    const clearForm = () => {
      setLoading(false)
      email.setValue("");
      password.setValue("");
    };

    const showError = (error)=>{
      setLoading(false)
      toast.error(error);
    }
    dispatch(login({ payload, clearForm, showError }));
  };

  return (
    <StyledLogin>
      <CenteredImage src={logo} alt="site logo"/>
      <StyledAuth>
      <h2>Login to your account</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email.value}
          onChange={email.onChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password.value}
          onChange={password.onChange}
        />
        <div className="action input-group">
          <a href="#" className="pointer" >
            Signup instead
          </a>
          <button>{loading ? "Please wait..." : "Login"}</button>
        </div>
      </form>
    </StyledAuth>
    </StyledLogin>
  );
};

export default Login;
