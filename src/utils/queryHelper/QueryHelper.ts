import { rowTypes } from "../../store/slices/QuerySlice"
// import { store } from "../../store/Store"

export const queryHelper = (data:Record<string, rowTypes[]>)=>{
    // const data = store.getState()
    let dt = data
    let query = ""
    Object.keys(dt).map((item,key)=>{
        let temp = query
        if(key&&query) query += " || " ;
        query += " ( ";
        let tempData = dt[item].filter((it)=>it.input.length>0)
        tempData.map((it,k)=>{
            if(k) query += " && ";
            let temp = JSON.parse(it.category)
            let category = temp.title.toLowerCase()
            if(category === "brand" || category === "product type")
            category = "multiselect_"+category.replace(" ","_")
            if(category==="product status")
            category = "status"
            let constraint = it.constraint
            let input = it.input
            if(Array.isArray(input)){
                let tInput = ""
                for(let i=0;i<input.length;i++){
                    if(i) tInput += ","
                    tInput += input[i]
                }
                input = tInput
            }
            query += category+" "+constraint+" "+ input
            return 0
        })
        query += " ) ";
        if(!tempData.length)
        query = temp
        return 0
    })
    return query
}