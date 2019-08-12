export function formatDate(date) {
    let current_datetime = new Date(date);
    let formatted_date =
        current_datetime.getDate() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getFullYear();

    return formatted_date;
}
