const toUrlParams = params => {
  let urlParams = [];
  
  for (let param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams.push(encodeURI(param + '=' + params[param]));
      }
  }

  return `?${urlParams.join('&')}`;
}

const request = async(url, params = false, headers = false, method = 'get') => {
  const config = {
    method: method,
    headers: {},
  };

  if (headers)
    config.headers = headers;

  if (params && method === 'get')
    url = url + toUrlParams(params);

  if (params && method === 'post'){
    config.body = JSON.stringify(params);
    config.headers = {
      ...config.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  const http = await fetch(url, config);
  const response = await http.text();

  if(http.status !== 200)
    throw response;

  return response;
}