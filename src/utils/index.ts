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

export function getBrowser(userAgent: string) {

    const browsers = {
        Edge: /Edg\/([\d.]+)/,
        'Internet Explorer': /MSIE|rv:([\d.]+)/,
        Chrome: /Chrome\/([\d.]+)/,
        Firefox: /Firefox\/([\d.]+)/,
        Safari: /Version\/([\d.]+).*Safari/,
        Opera: /Opera\/([\d.]+)/,
    };

    for (const browser in browsers) {
        if (browsers.hasOwnProperty(browser)) {
            const match = userAgent.match(browsers[browser]);
            if (match) {
                return { name: browser, version: match[1] };
            }
        }
    }

    return { name: 'Unknown', version: 'N/A' };
}

export function getOS(userAgent: string) {
    const osRegex = {
        Windows: /Windows NT (\d+\.\d+)/,
        macOS: /Mac OS X (\d+)[._](\d+)(?:[._](\d+))?/,
        iOS: /(?:iPhone|iPad|iPod).*? OS (\d+)[._](\d+)(?:[._](\d+))?/,
        Android: /Android (\d+\.\d+)(?:\.\d+)?/,
        Linux: /Linux/,
    };

    for (const os in osRegex) {
        if (osRegex.hasOwnProperty(os)) {
            const match = userAgent.match(osRegex[os]);
            if (match) {
                if (os === 'macOS') {
                    return { name: os, version: match.slice(1).join('.') };
                } else if (os === 'iOS') {
                    return { name: os, version: match.slice(1, 3).join('.') };
                } else {
                    return { name: os, version: match[1] || '' };
                }
            }
        }
    }

    return { name: 'Unknown', version: '' };
}

export function groupData(
    docs: any[],
    key: string,
    keyFn?: ((data: any, key: string) => string) | undefined
) {

    const data = docs.reduce((acc, curr) => {
      const label = keyFn ? keyFn(curr, key) : curr[key]
      let value = 1
      if (acc[label]) {
        acc[label].value += value
      } else {
        acc[label] = { label, value: 1 }
      }
      return acc
    }, {} as { [key: string]: { label: string, value: number } });

    return Object.values(data)
}