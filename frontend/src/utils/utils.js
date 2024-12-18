export const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);

    const diff = now - date;
    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;

    // Check if the timestamp is less than a minute ago
    if (diff < oneMinute) return "Now";

    // Check if the timestamp is today
    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        return date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        }); // e.g., "12:45"
    }

    // Check if the timestamp is yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return "Yesterday";
    }

    // Check if the timestamp is within the last week
    if (diff < oneWeek) {
        return date.toLocaleDateString(undefined, { weekday: "short" }); // e.g., "Thu"
    }

    // Default: Return the date in short format
    return date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }); // e.g., "07/12/24"
}