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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcyNzQwMzI0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYjNjNWE0OTQ1Mjg4NDEwNTcwMGE3MiJ9.lnZd-XcM2CSXDoszeeV_EbS_OT3_M3nKcP37Bc2PLqRf1V8Fc265X0TKYVe2CSun97FEaDBpjK-5b1PRxCckkMdfdpAAmMczktKgIKGw_x2zSKxZFqPXtKTpLRgBIcaWalBnqZhPZTAiA85xO__U9pF0DT0phwnpQuX0xUBhGz_ylcn7BhpAgk_-SejTXWgz2tD1PnS2RzSiAZ3IQgVlLARqgFD0S2QXZESTqkIuRV7Q_DNaFU96Y7y9lWmBN-dAoz3Wh1dE811qxKE-GC2V1PGJVWpQIjVpI9GsKLQrlF9lqWZseEKwlHYdnqP-WZpGWmKD55qeLf9lMNtOCoghOA`,
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