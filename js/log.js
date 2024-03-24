// function show_date_time() {
//     window.setTimeout("show_date_time()", 1000);
//     var h = new Date("3/15/2019 08:05:00"),
//         j = new Date,
//         d = j.getTime() - h.getTime(),
//         i = 86400000,
//         b = d / i,
//         g = Math.floor(b),
//         c = 24 * (b - g),
//         a = Math.floor(c),
//         f = 60 * (c - a),
//         l = Math.floor(60 * (c - a)),
//         k = Math.floor(60 * (f - l));
//     // span_dt_dt.innerHTML = g + " day " + a + " hour " + l + " min " + k + " sccond"
//     span_dt_dt.innerHTML = g + " d " + a + " hr " + l + " m " + k + " sec"
//     // span_dt_dt.innerHTML = g + " day " + a + " hour " + l + " min "
// }
// show_date_time();



console.log("\n %c 欢迎来到 https://xgan.me 站长：苍耳  %c 如果你来访我 我不在 请和我门外的花坐一会儿 它们很温暖 \n\n",
    "color: white; background: rgba(0,0,0,0.2); padding:5px 0;",
    "color: gray; background: rgba(0,0,0,0.1); padding:5px 0;");

var OriginTitile = document.title,
    titleTime;
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        $('[rel="shortcut icon"]').attr("href", "images/favicon.ico");
        document.title = "月遇从云  花遇和风";
        clearTimeout(titleTime)
    } else {
        $('[rel="shortcut icon"]').attr("href", "images/favicon.ico");
        document.title = "Hi - " + OriginTitile;
        titleTime = setTimeout(function () {
            document.title = OriginTitile
        }, 2000)
    }
});