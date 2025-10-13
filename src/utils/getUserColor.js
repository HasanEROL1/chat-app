export default function getUserColor(user) {
    const hash = stringToHash(user.id);

    // Hue: 0–359 (tüm renk çemberi)
    const hue = hash % 360;

    // Saturation: %70–%100 (yüksek doygunluk)
    const saturation = 70 + (hash % 30);

    // Lightness: %45–%55 (orta parlaklık - kontrast için ideal)
    const lightness = 45 + (hash % 10);

    return hslToHex(hue, saturation, lightness);
}

function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
