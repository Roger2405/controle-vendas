

export function getUserFromLocalStorage() {

    const strUser = localStorage.getItem('user');


    var objUser = [];
    if (strUser) {
        objUser = JSON.parse(strUser);
    }

    console.log(objUser);
    return objUser;

}