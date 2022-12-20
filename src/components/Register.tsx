import { Alert, Button, Card, FormElement, TextField } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {emailValidator, passwordValidator} from '../formvalidation/formValidation'

type formdata ={
  name:string,
  username:string,
  email:string,
  password:string,
  cnfpassword:string
}

const Register = () => {
  const nav = useNavigate()
    const [data,setData] = useState<formdata>();
    const [emailcheck,setEmailCheck] = useState<boolean>(false);
    const [passcheck,setPassCheck] = useState<boolean>(false);
    const [cnfpass,setCnfpass] = useState<boolean>(false);
    const [register,setregister] = useState<boolean>(false);

    const submitHandler =()=>{
      if(!data?.name || !data?.username || !data?.email || !data?.password || !data?.cnfpassword){
      setregister(true);
      return
      }
      if(emailcheck || passcheck || cnfpass)
      return;
      alert("you are register successfully");
      sessionStorage.setItem("credentials",JSON.stringify({username:data.username,email:data.email,pass:data.password}));
      nav('/');
    }
    const formDataHandler =(e:string,type:string)=>{
      setregister(false);
      if(type==="email"){
        let checkEmail:boolean = emailValidator(e);
        if(!checkEmail){
          setEmailCheck(true)
        }else
        setEmailCheck(false)
      }
      if(type==="password"){
        let checkpassword:boolean = passwordValidator(e);
        if(!checkpassword){
          setPassCheck(true);
        }
        else
        setPassCheck(false)
        if(data?.cnfpassword){
        let pass:string = data?.cnfpassword;
        if(pass!==e){
          setCnfpass(true);
        }
        else
        setCnfpass(false);
        }
      }
      if(type==="cnfpassword"){
        let pass:string = data?.password? data.password:"";
        if(pass!==e){
          setCnfpass(true);
        }
        else
        setCnfpass(false);
      }
        const dt:any = {...data}
        dt[type] = e;
        setData({...dt});
    }
  return (
    <Card title="SIGN UP">
    <FormElement
    >
      {register && <Alert
      destroy={false}
      type="warning"
    >
      All fields required
    </Alert>}
      <TextField
        name="Name"
        onChange={(e:string)=>formDataHandler(e,"name")}
        placeHolder="Enter Name here"
        value={data?.name}
        required
      />
      <TextField
        name="username"
        onChange={(e:string)=>formDataHandler(e,"username")}
        placeHolder="Enter Password here"
        value={data?.username}
        required
        // innerSufIcon = {<Button icon={}></Button>}
      />
      <TextField 
      name = "Email"
      onChange={(e:string)=>formDataHandler(e,"email")}
      value={data?.email}
      placeHolder='Enter Email Here'
      required/>
      {emailcheck && <Alert
      destroy={false}
      type="warning"
    >
      Not a valid email
    </Alert>}
      <TextField 
      name="Password"
      type='password'
      onChange={(e:string)=>formDataHandler(e,"password")}
      value={data?.password}
      placeHolder='Enter password'
      required
      />
       {passcheck && <Alert
      destroy={false}
      type="warning"
    >
      Not a valid password
    </Alert>}
      <TextField 
      name="confirm Password"
      type='password'
      onChange={(e:string)=>formDataHandler(e,"cnfpassword")}
      value={data?.cnfpassword}
      placeHolder='Confirm Password'
      required/>
       {cnfpass && <Alert
      destroy={false}
      type="warning"
    >
     password does not match
    </Alert>}
    <Button onClick={submitHandler}>Register</Button>
    <span>already registered? <a  onClick={()=>nav('/')}>Login</a></span>
    </FormElement>
  </Card>
  )
}

export default Register