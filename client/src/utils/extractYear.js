export default function extractYear(dateString) {
    if (!dateString || typeof dateString !== 'string') {
        return null;
    }

    return dateString.substring(0, 4);
}