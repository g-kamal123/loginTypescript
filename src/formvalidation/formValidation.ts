export const passwordValidator =(text:string):boolean=>{
    let pass:any = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(pass.test(text))
    return true;
    return false;
    
}

export const emailValidator =(text:string):boolean=>{
    let email:any = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.test(text))
    return true;
    return false;
}

