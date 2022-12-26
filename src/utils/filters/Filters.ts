import { store } from "../../store/Store"

export const filters = ()=>{
    const data = store.getState();
    let dt = data.grid
    let allFilters:any ={}
    allFilters.activePage = dt.activePage
    allFilters.count = dt.pageCount
    if(dt.enteredInput){
    allFilters["or_filter[title][3]"] = dt.enteredInput
    allFilters["or_filter[items.sku][3]"] = dt.enteredInput
    }
    if(dt.appliedStatus){
        allFilters["filter[items.status][1]"] = dt.selectedStatus
    }
    if(dt.sort){
        allFilters["sort[title]"] = dt.sort
    }
    return allFilters
}