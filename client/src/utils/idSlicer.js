export default function idSlicer(idStr) {
    if (!idStr) return '';
    const digits = idStr.toString().replace(/\D/g, ''); 
    return digits.slice(0, 4); 
}