const toUrlParams = params => {
  let urlParams = [];
  
  for (let param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams.push(encodeURI(param + '=' + params[param]));
      }
  }

  return `?${urlParams.join('&')}`;
}

const request = async(url, params = [], cors = false) => {
  if (cors)
    url = `https://cors-anywhere.herokuapp.com/${url}`;

  if (params)
    url = url + toUrlParams(params);

  const http = await fetch(url);
  const response = await http.text();

  return response;
}