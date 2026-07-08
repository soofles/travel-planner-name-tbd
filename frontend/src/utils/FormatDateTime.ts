export function formatDateTime(datetime: string) {
    const dateTime = new Date(datetime);
    const month = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(dateTime);
    const day = dateTime.getDate();
    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(dateTime);
    return {
        month: month,
        day: day,
        time: time,
    }
}

export function getOrdinal(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}