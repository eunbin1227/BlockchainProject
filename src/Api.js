const LOGIN_KEY = 'LOGIN_KEY';

const getDefaultHeaders = () => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Clear-Site-Data': "*"
    }
    if (localStorage.getItem(LOGIN_KEY))
        defaultHeaders['Authorization'] = `Key ${localStorage.getItem(LOGIN_KEY)}`;
    return defaultHeaders;
}

const post = async (url, body={}, extraHeaders={}) => {
    const res = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams(body).toString(),
        headers: {...getDefaultHeaders(), ...extraHeaders}
    });

    return await res.json();
}

// const get = async (url, query={}, extraHeaders={}) => {
//     const res = await fetch(`${url}`, {
//         method: 'GET',
//         headers: {...getDefaultHeaders(), ...extraHeaders}
//     });
//
//     return await res.json();
// }

const login = async (name, password) => {
    return await post('login', {name, password});
}

export {login}