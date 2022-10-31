

export default function getFormatedDate() {
    //code from stackoverflow
    var starttime = new Date();
    var isotime = new Date((new Date(starttime)).toISOString());
    var fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000));
    var formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ');

    return formatedMysqlString;
}