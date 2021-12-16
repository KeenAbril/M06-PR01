/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */
export class User {
    constructor(usrObj) {
        this.email = usrObj.email;
        this.username = usrObj.username;
        this.realName = usrObj.realName;
        this.password = usrObj.password;
        this.id = 0;
    }

    static checkUser(usrObj) {
        return (
            /^[A-Za-z ]+$/.test(usrObj.realName)
            && /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(usrObj.email)
            && /^[A-Za-z0-9]{5,}$/.test(usrObj.password)) && usrObj.username !== '';
    }

    setId(id) {
        this.id = id;
    }

    saveUser() {
        try {
            sessionStorage.setItem('User', JSON.stringify(this));
            return { status: true };
        } catch (e) {
            return { status: false, error: e };
        }
    }
}