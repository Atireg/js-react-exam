export default function idSlicer(idStr) {
    const digits = idStr.replace(/\D/g, ''); 
    return digits.slice(0, 4); 
}