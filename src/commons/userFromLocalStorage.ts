

export function getUserFromLocalStorage() {

    const strUser = localStorage.getItem('user');


    var objUser = [];
    if (strUser) {
        objUser = JSON.parse(strUser);
    }

    return objUser;

}