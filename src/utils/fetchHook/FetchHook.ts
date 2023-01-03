import { token } from "../headers/Headers";

export const useFetch = (url:any) => {
    const _get = async (endpoint:any={}, allParams:any) => {
        let url1 = url
        // if(str.length){
        //   for(let i=0;i<str.length;i++){
        //     url1 += `/${str[i]}` 
        //   }
        // }
        let requestUrl = new URL(url1);
        for (let i in endpoint) {
          requestUrl.searchParams.append(i, endpoint[i]);
        }
        const fetchData = await fetch(requestUrl, allParams);
        const jsonData = fetchData.json();
        return jsonData;
      };
  
    async function _post(payload = {}) {
      const fetchData = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "twitter_ads",
          Authorization: token,
          "Ced-Source-Id": "889",
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": "890",
          "Ced-Target-Name": "twitter",
        },
        body: JSON.stringify(payload),
      });
      const jsonData = await fetchData.json();
      return jsonData;
    }
    const _put = async (endpoint:any, payload:any) => {};
    const _delete = async (endpoint:any) => {};
    return [{ _get, _post, _put, _delete }];
  };