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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcyMjE3NzM1LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYWJjYzQ3Mjk0MTA1NTk0ZDU4N2U3ZCJ9.lAZpat7XqVL-IfZr3DfVigmoxhyNFiJMTunv_1jZVjf9Uqwa_Y4F7bWOa8B5-VDnSIPjJH1d1ksgsX01BytX8oCIYyeDi0ww-hPqq3uQTtWnDS0kUf1CzTVNfDX6gv23wkYzJvRj_DLEzVONYH4wXof8QtebAk6WbqcDqQy6wnT81Z41mnoEw1-_tJ_IKNsHDnFVFtkYTrGacZUDiox0zK8pnfjRcwSwYPJzVZOs4qLQaETKey6PyP2oOjLkG7KPjkk4oTORTHUS2Jt6uWAFGO7d0R6dWvYNLSZixLOajnB4saARiXvi45QJ8EnLgyVYXSCsEcg96nOxqbRU0oDc9g`,
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