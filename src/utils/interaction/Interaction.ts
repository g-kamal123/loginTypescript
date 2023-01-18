export const Interaction =(documnet:any)=>{
   intercationHelper()
    documnet.addEventListener("click",()=>intercationHelper());
    documnet.addEventListener("scroll",()=>intercationHelper());
    documnet.addEventListener("mouseover",()=>intercationHelper());
    documnet.addEventListener("keydown",()=>intercationHelper());
}
let timer:any;
let intercationHelper =()=>{
    clearTimeout(timer)
    timer=setTimeout(()=>{
        let date = new Date();
        console.log(date)
    },300)
}