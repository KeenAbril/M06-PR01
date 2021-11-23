/* eslint-disable import/prefer-default-export */
export async function getRegisterResponse(usrObj) {
    try {
        // eslint-disable-next-line no-undef
        const response = await fetch('https://reqres.in/api/users', {
            method: 'PUT',
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