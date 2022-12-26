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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcyMDQxNDg0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYTkxYmNjMzIxMzE3NTIxYTU4YzgwMiJ9.T_kndGEEentY5MLfpJsL4l29UF_EK4e9p_oWUcg4Dt2w7dTSHs72w3CVqsKD4bNQYenaOGDuS7LeMiosZiL2vfjoUT8VorenbzTTqLh9GTG55SUnDCRG41QaUCwoJwGAChSObDqyFRK51Y-UASyMjKu4hk2hRKzJe54Wx3c3QigmD_lUd9rwxJs0ma7LrHj3ARCDaUwIagsOXoBZqC4jn3L3WQMaSDh9w6x9Ka9R1X-3zrvyjt36931qWzCkTfgGBTz0N0ZQZULsJDA-X8R0ixH4iVEqkYuylKjqJWq_KXNN6paewDZFvkRW-WzRmHCQWzqY3PmlQMgAKAJVQR-pdw`,
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