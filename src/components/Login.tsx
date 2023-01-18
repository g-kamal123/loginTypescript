import {
  Alert,
  Button,
  Card,
  FormElement,
  TextField,
} from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(()=>{
    nav('/comments')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const usernameHandler = (e: string) => {
    setFlag(false);
    setUsername(e);
  };
  const passwordHandler = (e: string) => {
    setFlag(false);
    setpassword(e);
  };
  const formHandler = () => {
    if (!username || !password) {
      setFlag(true);
      return;
    }
    let data: any = sessionStorage.getItem("credentials");
    data = JSON.parse(data);
    if (data.username === username || data.email === username) {
      if (data.pass === password) {
        nav("/welcome");
        return;
      }
    }
    setFlag(true);
  };
  return (
    <Card title="LOGIN">
      <FormElement>
        <TextField
          name="Email/Username"
          onChange={usernameHandler}
          placeHolder="Enter username here"
          value={username}
          required
        />
        <TextField
          name="Password"
          type="password"
          onChange={passwordHandler}
          placeHolder="Enter Password here"
          value={password}
          required
        />
        <Button onClick={formHandler}>Sign In</Button>
        {flag && (
          <Alert destroy={false} type="warning">
            Entered Username and password does not match
          </Alert>
        )}
        <span>
          New User? <a href="#a" onClick={() => nav("/register")}>Register Here</a>
        </span>
      </FormElement>
    </Card>
  );
};

export default Login;
