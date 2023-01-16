import React from 'react'
export type hcProps ={
    name:string
}
const StringHoc = <T,>(NewComponet:React.ComponentType<T & hcProps>)=> {
  return (props:T)=>{
    return <NewComponet {...props as T} name="created By Kamal"/>
  }
}

export default StringHoc