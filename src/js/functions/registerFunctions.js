/* eslint-disable import/prefer-default-export */
export async function getRegisterResponse(usrObj) {
    try {
        // eslint-disable-next-line no-undef
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(usrObj),
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        // axios retorna els valors com a objecte amb data com a json
        return { status: response.status, msg: data };
    } catch (e) {
        return { status: false, msg: e };
    }
}

export function checkSesionStorage() {
    return sessionStorage.getItem('User') !== null;
}

export function getUserNameFromkSesionStorage() {
    return JSON.parse(sessionStorage.getItem('User')).username;
}

export function logOut() {
    sessionStorage.clear();
}
