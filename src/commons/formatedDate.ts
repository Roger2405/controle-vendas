

export default function getFormatedDate(date?: string) {
    //code from stackoverflow
    var starttime;
    date ?
        starttime = new Date(date).toISOString()
        :
        starttime = new Date().toISOString();
    var fixedtime = new Date(starttime).toLocaleTimeString();//new Date(starttime.getTime() - (starttime.getTimezoneOffset() * 60000));
    var fixeddate = starttime.toString().split('T')[0]//toDateString().split('/').reverse().join('-');
    //var formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ');
    return `${fixeddate} ${fixedtime}`;
}
export function getHourByDateString(isoDateString: string) {
    let date = new Date(isoDateString).toISOString();
    return isoDateString.toString().split('T')[1].slice(0, 8);
    //return `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}