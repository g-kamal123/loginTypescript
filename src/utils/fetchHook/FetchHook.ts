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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcyMTI4ODIyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYWE3MGY2YjBmZGE5N2YxYzUwY2NlMSJ9.DVT16jue58peKQMJ4VhfACZJoYe_FiheK0ZxuAzCX9Bh9N9T1y7haOzuPsxWzuYVkiafcNghBDSxxay6YecUuZxiWL8ytavbvVJKLHAWQ0nbeudwRxHDB4vlgr0EgM80lraBmSYC6ULAwqEoeHSFHpWBwZdeVz7PXBCLEFQjoF1fTjlZXMpXodYDyjSziXTcVvxt1Tt0pF5glImHK3kifV6qFFWQR_boc5aqx-KTlwAr1P5zffda0BaTWYR2820sMCl70HnH1vfv-LU00vQuPC4QWa47jJTSKC3qEkqBurj7zXe6Gdh1jLxDYvEO_Wju4EWKx4Dsp9GwnyC1MdqjZg`,
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