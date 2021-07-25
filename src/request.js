const toUrlParams = params => {
  let urlParams = [];
  
  for (let param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams.push(encodeURI(param + '=' + params[param]));
      }
  }

  return `?${urlParams.join('&')}`;
}

const request = async(url, params = false, cors = false, method = 'get') => {
  const config = {
    method: method
  }

  if (cors)
    url = `https://cors-anywhere.herokuapp.com/${url}`;

  if (params && method === 'get')
    url = url + toUrlParams(params);

  if (params && method === 'post'){
    config.body = JSON.stringify(params);
    config.headers = {
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