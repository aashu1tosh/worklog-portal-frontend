import moment from "moment";

export function formatDateTime(date: string | Date): string {
    const format = moment(date).format("MM/DD/YYYY, HH:mm:ss");
    return format;
}
