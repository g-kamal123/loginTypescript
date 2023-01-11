import { columnType } from "../../store/slices/AdminPanelSlice"

export const adminFilter = (data:columnType[])=>{
    
    let filter:any = {}
    data.map((item)=>{
        if(item.input&&item.checked){
            if(item.id==="updated_at"||item.id==="created_at"){
                filter[`${item.filter}[from]`] = item.input
                filter[`${item.filter}[to]`] = item.input
                return 0
            }
            filter[`${item.filter}[${item.selected}]`] = item.input
        }
        return 0
    })
    return filter
}