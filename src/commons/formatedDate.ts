

export default function getFormatedDate(date?: string) {
    //code from stackoverflow
    var starttime;
    date ?
        starttime = new Date(date)
        :
        starttime = new Date();

    var isotime = new Date((new Date(starttime)).toISOString());
    var fixedtime = new Date(isotime).toLocaleTimeString();//new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000));
    var fixeddate = new Date(isotime).toLocaleDateString().split('/').reverse().join('-');
    //var formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ');
    return `${fixeddate} ${fixedtime}`;
}