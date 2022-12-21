export const useFetch = (url:any) => {
    const _get = async (endpoint:any={},str=[], allParams:any) => {
        let url1 = url
        if(str.length){
          for(let i=0;i<str.length;i++){
            url1 += `/${str[i]}` 
          }
        }
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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcxNjI5MTU5LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYTJkMTI3OWFlZGNmN2UxNTdhODZhNiJ9.NCksH0DVDn2m1j5FypLiOqmUyWMPPVK4vFsjivg6LPYqQ5clC2Yjm6U7HYhO4mOKjstA-HmdEeNpGTGAmnFjXEOFYWztKtQ0L2_Iu0xwYeSvzRu0uLM3n006olovo-k4K4qs1l-gAIF6d0_VNlRS5DgyLoVbaj859mpZcVlXA-X8b248t6t1s09p55govCgBsCPAj6sWepybUjky2Ucugn_n2GAgtg-W3yK7hXrSoL4HtA3ob45PKoKEzrDx3QCRgz8dB-gNvdTEEeMTdXDqxz_hCkT6JpakGTQ5aOJt0AHHULRcDOth0-7qYOPKl7OiCCEoQM225z31xwgYiDZUow`,
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