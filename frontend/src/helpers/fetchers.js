export const commonFetch = async (url, method, headers, body) => {
	 return fetch(url,
      {
        method: method,
        mode: "cors",
        headers: headers,
        body: body,
      })
      .then((response) => Promise.all([response, response.json()]))//получаем ответ
      .then(([response, json]) => {
        console.log("Response JSON: " + JSON.stringify(json));
        if (response.ok) {
          return { success: true, data: json };
        }
        return { success: false, error: json };
      })
      .catch((e) => handleError(e));
}


export const deleteFetch = async (url, method, headers, body) => {
    return fetch(url,
        {
            method: method,
            mode: "cors",
            headers: headers,
            body: body,
        })
        .then((response) => {
					const res_ok = response.ok;
					if (!res_ok) {
						return Promise.all([res_ok, response, response.json()]);
					}
					return Promise.all([res_ok, response, null]);
        })
				.then(([res_ok, response, data]) => {
					if (!res_ok) {
						return {success: false, error: data};
					}
	        return { success: true,  data: null};
	      })
        .catch((e) => handleError(e));
}

export const docFetch = async (url, method, headers, body) => {
	 return fetch(url,
      {
        method: method,
        mode: "cors",
        headers: headers,
        body: body,
      })
      .then(response => {
				const type = response.headers.get('content-type');
				if (type == 'application/json') {
					return Promise.all([type, response, response.json()]);
				}
				return Promise.all([type, response, response.blob()]);
			})
      .then(([type, response, data]) => {
				if (type == 'application/json') {
					return {success: false, error: data}
				}
        return { success: true, headers: response.headers, blob: data};
      })
      .catch((e) => handleError(e));
}

export const tokenFetch = async (url, headers, body, clear, store) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      ...headers,
    },
    body: body,
  })
    .then((response) => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (!response.ok) {
        clear();
        return { success: false, error: json };
      }
      store(json);
      return { success: true, data: json };
    })
    .catch((e) => handleError(e));
};

export const clearTokenFetch = async (url, headers, body, clear) => {
  return fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      ...headers,
    },
    body: body,
  })
    .then((response) => {
      clear();
      if (!response.ok) {
        const error = response.json();
        console.log(error);
        throw Error(error);
      }
      return response;
    })
    .catch((e) => handleError(e));
};

function handleError(error) {
	console.error(error);
	const err = new Map([
		[TypeError, "Can't connect to server."],
		[SyntaxError, "There was a problem parsing the response."],
		[Error, error.message],
	]).get(error.constructor);
	console.log(err);
	return err;
};
