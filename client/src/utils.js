//client\src\utils.js

export default function calculateGroups(totalVerbs) {
    let r;
    if (totalVerbs % 6 < 0.5) {
        r = Math.floor(totalVerbs / 6) - 1;
    } else {
        r = Math.floor(totalVerbs / 6);
    }
    const rr = (r === 0) ? 1 : r;

    const x = Math.floor(totalVerbs / rr);
    const y = x + 1;
    const a = rr - (rr * (totalVerbs / rr - Math.floor(totalVerbs / rr)));
    const b = rr * (totalVerbs / rr - Math.floor(totalVerbs / rr));


    return { a, b, x, y };
}
