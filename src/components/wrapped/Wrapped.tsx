import React from 'react'
import StringHoc, { hcProps } from '../hoc/stringHoc/StringHoc'

const Wrapped =(props:hcProps) => {
  return (
    <div style={{fontSize:"2rem",textAlign:"center"}}>{props.name}</div>
  )
}

export default StringHoc(Wrapped)