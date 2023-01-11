import { TextField } from '@shopify/polaris'
import React, { FC, useState } from 'react'

const ColumnInput:FC = () => {
    const [text,setText] = useState<string>("")
    const inputHandler =(e:React.KeyboardEvent<HTMLDivElement>)=>{
        let data = text + e.key
        setText(data)
    }
    const handleChange =(e:string)=>{

    }
  return (
    <div  onKeyDown={(e)=>inputHandler(e)}>
              <TextField
              name="av"
                label=""
                // value={value}
                onChange={handleChange}
                autoComplete="off"
              />
              </div>
  )
}

export default ColumnInput