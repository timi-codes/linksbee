export function generateShortURL(url: string) {
    const base62Charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const base62Length = base62Charset.length;

    // Hash the URL to generate a unique identifier
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        hash = ((hash << 5) - hash) + url.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    // Convert the hash to base62
    let encodedString = '';
    for (let i = 0; i < 7; i++) {
        const index = hash % base62Length;
        encodedString += base62Charset[index];
        hash = Math.floor(hash / base62Length);
    }

    return encodedString;
}