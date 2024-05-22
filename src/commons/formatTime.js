// 格式化时间
export function formatTime(timestamp){
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second= date.getSeconds();

    const formatMonth = String(month).padStart(2, '0');
    const formatDay = String(day).padStart(2, '0');
    const formatHour = String(hour).padStart(2, '0');
    const formatMinute = String(minute).padStart(2, '0');
    const formatSecond = String(second).padStart(2, '0');

    const formatDate = `${year}-${formatMonth}-${formatDay} ${formatHour}:${formatMinute}:${formatSecond}`;
    console.log(formatDate)
    return formatDate;
}