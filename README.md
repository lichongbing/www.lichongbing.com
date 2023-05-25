# ISLU

存储islu.cn下的所有域源码

```js

var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var display = document.getElementById("display");
var displayCtx = display.getContext("2d");

var screenImage = document.getElementById("screenImage");
var screenImageCtx = screenImage.getContext("2d");

var rili = document.getElementById("rili");
var riliCtx = rili.getContext("2d");

function drawRili() {
    riliCtx.clearRect(0, 0, 600, 600);
    var date = new Date();
    var year = date.getYear();
    var mouth = date.getMonth();
    var today = date.getDate();
    var week = date.getDay();

    var cardSize = 40;

    var array_three = [4, 6, 9, 11];
    var array_threeone = [1, 3, 5, 7, 8, 10, 12];
    var array_week = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

    var firstDraw; //1号绘制位置
    var wIdx = today % 7;

    if (week >= wIdx) {
        firstDraw = week - wIdx + 1;
    } else {
        firstDraw = week - wIdx + 8;
    }

    var dayIndex = 1;
    var countDay = 30;

    if (array_three.indexOf(mouth + 1) > -1) {
        countDay = 30;
    } else if (array_threeone.indexOf(mouth + 1) > -1) {
        countDay = 31;
    } else {
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
            countDay = 29;
        else
            countDay = 28;
    }

    var row = 6;
    if (7 - firstDraw + 7 * 4 < countDay) { //确定表格行数，防止日期绘制不全
        row = 7;
    }

    function drawTodaybg(i, j) {
        riliCtx.save();

        riliCtx.beginPath();
        riliCtx.strokeStyle = "#900";
        riliCtx.arc(45 + i * cardSize * 1.7 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 10, -Math.PI, Math.PI * 1);
        riliCtx.stroke();
        riliCtx.closePath();

        riliCtx.beginPath();
        riliCtx.arc(45 + i * cardSize * 1.7 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 9, -Math.PI, Math.PI * 0.9);
        riliCtx.stroke();
        riliCtx.closePath();

        riliCtx.beginPath();
        riliCtx.arc(45 + i * cardSize * 1.7 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 8, -Math.PI, Math.PI * 0.8);
        riliCtx.stroke();
        riliCtx.closePath();

        riliCtx.beginPath();
        riliCtx.arc(45 + i * cardSize * 1.7 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 7, -Math.PI, Math.PI * 0.7);
        riliCtx.stroke();
        riliCtx.closePath();

        riliCtx.beginPath();
        riliCtx.arc(45 + i * cardSize * 1.7 + cardSize / 1.18, 50 + j * cardSize + cardSize / 2, cardSize / 2 - 6, -Math.PI, Math.PI * 0.6);
        riliCtx.stroke();
        riliCtx.closePath();

        riliCtx.restore();
    }

    var isNum = /^\d+(\d+)?$/;

    function drawDate(txt, i, j) {
        riliCtx.textAlign = "center";
        riliCtx.fillStyle = "rgb(69,68,84)";
        riliCtx.font = (cardSize / 1.5) + 'px Impact';
        var yOffest = 3;

        if ((j == 0 || j == 6) && isNum.test(txt)) {
            riliCtx.fillStyle = "#900";
        }

        riliCtx.fillText(txt.toString(), 45 + j * cardSize * 1.7 + cardSize / 1.18, 50 + i * cardSize + cardSize / 3 * 2 + yOffest);

        if (txt == today) {
            drawTodaybg(j, i);
        }
    }

    riliCtx.fillStyle = "rgb(69,68,84)";
    riliCtx.font = "900 26pt SimHei";
    riliCtx.textAlign = "center";
    var monthCN = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    riliCtx.scale(1.1, 1);
    riliCtx.fillText(monthCN[mouth] + "月", 260, 32);
    riliCtx.resetTransform();

    riliCtx.font = "20pt SimHei";
    riliCtx.textAlign = "end";
    riliCtx.fillText(today + "日", 520, 38);

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < 7; j++) {
            riliCtx.strokeRect(45 + j * cardSize * 1.70, 50 + i * cardSize, cardSize * 1.70, cardSize);
        }
    }

    dayIndex = 1;

    for (var i = 0; i < row; i++) { //开始绘制日期数
        for (var j = 0; j < 7; j++) {
            if (i == 0) { //表格第一行绘制星期
                drawDate(array_week[j], i, j);
                continue;
            }

            if (i == 1 && j < firstDraw) { //确定1号绘制位置
                continue;
            }

            if (dayIndex > countDay) { //只绘制月份的天数
                break;
            }

            drawDate(dayIndex++, i, j);
        }
    }
}

var riliInterval = setInterval(drawRili, 3600000);
drawRili();

// Canvas奇妙的剪切蒙版实现
var screenMask = new Image();
screenMask.src = "http://lcbupayun.test.upcdn.net/detail/Screenmask.png";

var screen = new Image();
screen.src = "http://lcbupayun.test.upcdn.net/detail/screen.png";

var iv = setInterval(() => {
    if (screen.complete && screenMask.complete) {
        screenImageCtx.drawImage(screen, -1041, -210, 1280, 720);
        screenImageCtx.globalCompositeOperation = "destination-atop";
        screenImageCtx.drawImage(screenMask, 0, 0);
        screenImageCtx.globalCompositeOperation = "source-over";
        clearInterval(iv);
    }
}, 14);

// 奇妙的屏幕大小自适应
window.onresize = function () {
    if (window.innerWidth / window.innerHeight > 1.8333333333333) {
        display.width = window.innerWidth;
        display.height = window.innerWidth / 1980 * 1080;

        window.scrollTo(0, (window.innerHeight - 123) / 16);
    } else {
        display.width = window.innerHeight / 1080 * 1980;
        display.height = window.innerHeight;
    }
}

window.onresize();

// 加载图片
var bg = new Image();
bg.src = "http://lcbupayun.test.upcdn.net/detail/bg.png";

var mask = new Image();
mask.src = "http://lcbupayun.test.upcdn.net/detail/Screenmask.png";

var light = new Image();
light.src = "http://lcbupayun.test.upcdn.net/detail/light.png";

var caidai = new Image();
caidai.src = "http://lcbupayun.test.upcdn.net/detail/caidai.png";

var two = new Image();
two.src = "http://lcbupayun.test.upcdn.net/detail/two.png";

var screenLight = new Image();
screenLight.src = "http://lcbupayun.test.upcdn.net/detail/screenLight.png";

var phoneLight = new Image();
phoneLight.src = "http://lcbupayun.test.upcdn.net/detail/phoneLight.png";

var phoneText = JSON.parse("[{\"time\":0,\"text\":\"凌晨啦!\"},{\"time\":6,\"text\":\"早上好!\"},{\"time\":8,\"text\":\"上午好!\"},{\"time\":11,\"text\":\"你吃了吗\"},{\"time\":13,\"text\":\"下午好鸭!\"},{\"time\":16,\"text\":\"傍晚咯!\"},{\"time\":19,\"text\":\"晚安!\"}]");

var noRili = false;
var updateSongInfoHandler = -1;
// 设置左上角的壁纸
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.screenFile) {
            if (properties.screenFile.value) {
                screen.src = 'file:///' + properties.screenFile.value;
                var iv1 = setInterval(() => {
                    if (screen.complete && screenMask.complete) {
                        screenImageCtx.clearRect(0, 0, 1000, 1000);
                        screenImageCtx.drawImage(screen, -1041, -210, 1280, 720);
                        screenImageCtx.globalCompositeOperation = "destination-atop";
                        screenImageCtx.drawImage(screenMask, 0, 0);
                        screenImageCtx.globalCompositeOperation = "source-over";
                        clearInterval(iv1);
                    }
                }, 14);
            }
        }

        if (properties.phoneText) {
            if (properties.phoneText.value) {
                phoneText = JSON.parse(properties.phoneText.value);
            }
        }

        if (properties.disableRili) {
            if (properties.disableRili.value) {
                clearInterval(riliInterval);
                noRili = true;
            } else {
                riliInterval = setInterval(drawRili, 3600000);
                drawRili();
                noRili = false;
            }
        }

        if (properties.showSongInfo) {
            if (properties.showSongInfo.value) {
                updateSongInfoHandler = setInterval(updateSongInfo, 250);
                updateSongInfo();
            } else {
                clearInterval(updateSongInfoHandler);
                updateSongInfoHandler = -1;
            }
        }
    }
}

var data = new Array(128);
var animData = new Array(128);
var SoundPlaying = false;

// 奇妙的初始化
for (var i = 0; i < 128; i++) {
    data[i] = animData[i] = 0;
}

// 奇妙的Normalize
var peakValue = 1;
if (window.wallpaperRegisterAudioListener) {
    window.wallpaperRegisterAudioListener(function (audioData) {
        var max = 0;

        for (var i = 0; i < 128; i++) {
            if (audioData[i] > max)
                max = audioData[i];
        }

        peakValue = peakValue * 0.99 + max * 0.01;

        for (i = 0; i < 64; i++) {
            data[63 - i] = audioData[i] / peakValue;
        }

        for (i = 0; i < 64; i++) {
            data[127 - i] = audioData[127 - i];
        }
    });
} else {
    var iva = setInterval(() => {
        for (var i = 0; i < 128; i++) {
            data[i] = Math.random();
        }
    }, 10);
}

// ....
function min(a, b) {
    return a > b ? b : a;
}

function max(a, b) {
    return a > b ? a : b;
}

// 奇妙的颜色变化
var targetColor = {r: 80, g: 120, b: 169};
var currentColor = {r: 80, g: 120, b: 169};
var lightColor = {r: 0, g: 34, b: 77, a: 0};

function colorToRgb(color) {
    return ("rgb(" + color.r.toString() + "," + color.g.toString() + "," + color.b.toString() + ")");
}

function colorToRgba(colorWithA) {
    return ("rgba(" + colorWithA.r.toString() + "," + colorWithA.g.toString() + "," + colorWithA.b.toString() + "," + colorWithA.a.toString() + ")");
}

var night = false;
var debug = false;


// Canvas的奇妙冒险!
function render() {
    for (var i = 0; i < 128; i++) {
        animData[i] += (data[i] - animData[i]) * 0.3;
        animData[i] = min(animData[i], 1);
    }

    currentColor.r += (targetColor.r - currentColor.r) * 0.01;
    currentColor.r = min(currentColor.r, 255);
    currentColor.r = max(currentColor.r, 0);

    currentColor.g += (targetColor.g - currentColor.g) * 0.01;
    currentColor.g = min(currentColor.g, 255);
    currentColor.g = max(currentColor.g, 0);

    currentColor.b += (targetColor.b - currentColor.b) * 0.01;
    currentColor.b = min(currentColor.b, 255);
    currentColor.b = max(currentColor.b, 0);

    ctx.clearRect(0, 0, 1980, 1080);
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(mask, 954, 99);

    ctx.fillStyle = "#97adbb";
    ctx.font = "32pt Impact";


    ctx.transform(1, 2.05 * (Math.PI / 180), 0, 1, 0, 0);

    var time = new Date();
    ctx.fillText((time.getHours() < 10 ? "0" : "") + time.getHours().toString() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes() + ":" + (time.getSeconds() < 10 ? "0" : "") + time.getSeconds().toString(), 725, 318);
    ctx.resetTransform();

    //日历本
    ctx.transform(0.9645, 0, 0 * (Math.PI / 180), 0.96, 967, 100);
    ctx.rotate(6 * (Math.PI / 180));

    if (!noRili) {
        ctx.drawImage(rili, 0, 0);

        ctx.resetTransform();

        ctx.transform(0.9645, 0, 9 * (Math.PI / 180), 1, 825, 160);
        ctx.rotate(7 * (Math.PI / 180));
    }

    targetColor = {r: 80, g: 120, b: 169};

    if (night) {
        targetColor = {r: 255, g: 75, b: 80};
    }

    if (!noRili) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(-10, 320, 650, 2);
    }

    ctx.fillStyle = colorToRgb(currentColor);

    if (!noRili) {
        for (var i = 32; i < 95; i++)
            ctx.fillRect(10 * (i - 32), 20 + (300 - 300 * animData[i]), 4, 300 * animData[i]);
    } else
        for (var i = 32; i < 95; i++)
            ctx.fillRect(40 + 7.5 * (i - 32), 30 + (300 - 300 * animData[i]), 4, 300 * animData[i]);


    ctx.resetTransform();

    ctx.globalCompositeOperation = "overlay";
    ctx.drawImage(light, 971, 197);
    ctx.globalCompositeOperation = "source-over";

    ctx.drawImage(caidai, 949, 25);
    ctx.drawImage(two, 1319, 345);

    // 夜间光照
    if (night && lightColor.a < 0.7) {
        lightColor.a += 0.005;
        lightColor.a = min(lightColor.a, 0.7);
    } else if (!night) {
        lightColor.a -= 0.005;
        lightColor.a = max(lightColor.a, 0.0);
    }

    if (lightColor.a > 0) {
        ctx.globalCompositeOperation = "hard-light";
        ctx.fillStyle = colorToRgba(lightColor);
        ctx.fillRect(0, 0, 1980, 1080);
        ctx.globalCompositeOperation = "source-over";

        ctx.globalAlpha = lightColor.a / 0.7;
        ctx.drawImage(phoneLight, 860, 437);
        ctx.globalAlpha = 1;
    }

    //屏幕
    ctx.drawImage(screenImage, 0, 0);
    if (lightColor.a > 0) {
        ctx.globalAlpha = lightColor.a / 0.7;
        ctx.drawImage(screenLight, 0, 0);
        ctx.globalAlpha = 1;
    }

    night = true;
    var greeting = "凌晨啦!";

    phoneText.forEach((v) => {
        if (time.getHours() >= v.time) {
            greeting = v.text;
        }
    });

    if (time.getHours() >= 6 && time.getHours() <= 18) {
        night = false;
    }

    night = debug ? !night : night;

    //手机
    ctx.fillStyle = "#000";
    ctx.font = "31.02pt SimHei";

    ctx.transform(1.0911, -35 * (Math.PI / 180), 0, 0.5868, 1132.94, 564.07);
    ctx.rotate(56.5 * (Math.PI / 180));
    ctx.textAlign = "center"
    ctx.fillStyle = "#fff";
    ctx.fillText(greeting, 135, 100);
    ctx.textAlign = "start"
    ctx.resetTransform();

    displayCtx.drawImage(cvs, 0, 0, display.width, display.height);
    window.requestAnimationFrame(render);

}

window.requestAnimationFrame(render);


```

```js
eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--)
            r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--)
        if (k[c])
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('!q(){1N n=$1c("2Q"),i=n.1o("2d"),l=$1c("2R"),s=l.1o("2d"),g=$1c("2S"),a=g.1o("2d"),c=$1c("2T"),p=c.1o("2d");q r(){p.1y(0,0,1Z,1Z);k e=B 22,t=e.2U(),a=e.2V(),r=e.2W(),o=e.2X(),n=40,i=["2Y","2Z","33","36","37","39","3a"],e=r%7,l=e<=o?o-e+1:o-e+8,s=1,g=30,c=6;7-l+28<(g=-1<[4,6,9,11].23(a+1)?30:-1<[1,3,5,7,8,10,12].23(a+1)?31:t%4==0&&t%1z!=0||t%3b==0?29:28)&&(c=7);k d=/^\\d+(\\d+)?$/;q f(e,t,a){p.1p="1O",p.K="1P(24,26,27)",p.1q=n/1.5+"2a 2b";0!=a&&6!=a||!d.3c(e)||(p.K="#3d"),p.1r(e.L(),45+a*n*1.7+n/1.18,1d+t*n+n/3*2+3),e==r&&(a=a,t=t,p.3e(),p.1f(),p.3f="#2c",p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-10,-j.z,+j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-9,-j.z,.9*j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-8,-j.z,.8*j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-7,-j.z,.7*j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-6,-j.z,.6*j.z),p.1s(),p.1h(),p.3g())}p.K="1P(24,26,27)",p.1q="2c 3h 1Q",p.1p="1O";p.1R(1.1,1),p.1r(["一","二","三","四","五","六","七","八","九","十","十一","十二"][a]+"月",3i,32),p.1t(),p.1q="3j 1Q",p.1p="3k",p.1r(r+"日",3l,38);D(k h=0;h<c;h++)D(k m=0;m<7;m++)p.3m(45+m*n*1.7,1d+h*n,1.7*n,n);D(s=1,h=0;h<c;h++)D(m=0;m<7;m++)1u(0!=h){1u(!(1==h&&m<l)){1u(g<s)3n;f(s++,h,m)}}2e f(i[m],h,m)}k o=1i(r,2f);r();k d=B U;d.N="V://W.X.Y/Z/3o.15";k f=B U;f.N="V://W.X.Y/Z/3p.15";k e=1i(()=>{f.1A&&d.1A&&(a.F(f,-2g,-2h,2i,2j),a.1b="2k-2l",a.F(d,0,0),a.1b="1B-1C",1D(e))},14);G.2m=q(){l.1E=G.3q,l.1v=G.3r},G.2m();k h=B U;h.N="V://W.X.Y/Z/3s.15";k m=B U;m.N="V://W.X.Y/Z/3t.15";k u=B U;u.N="V://W.X.Y/Z/2n.15";k w=B U;w.N="V://W.X.Y/Z/3u.15";k I=B U;I.N="V://W.X.Y/Z/3v.15";k v=B U;v.N="V://W.X.Y/Z/3w.15";k b=B U;b.N="V://W.X.Y/Z/3x.15";k S=2o.2p(\'[{"17":0,"1a":"凌晨啦!"},{"17":6,"1a":"早上好!"},{"17":8,"1a":"上午好!"},{"17":11,"1a":"你吃了吗"},{"17":13,"1a":"下午好鸭!"},{"17":16,"1a":"傍晚咯!"},{"17":19,"1a":"该吃晚饭咯!"},{"17":21,"1a":"晚安!"}]\'),y=!1,M=-1;G.3y={3z:q(e){k t;e.1S&&e.1S.1j&&(f.N="3A:///"+e.1S.1j,t=1i(()=>{f.1A&&d.1A&&(a.1y(0,0,2q,2q),a.F(f,-2g,-2h,2i,2j),a.1b="2k-2l",a.F(d,0,0),a.1b="1B-1C",1D(t))},14)),e.1T&&e.1T.1j&&(S=2o.2p(e.1T.1j)),e.2r&&(y=e.2r.1j?(1D(o),!0):(o=1i(r,2f),r(),!1)),e.2s&&(e.2s.1j?(M=1i(2t,3B),2t()):(1D(M),M=-1))}};D(k x=B 2u(1k),P=B 2u(1k),t=0;t<1k;t++)x[t]=P[t]=0;k T=1;q A(e,t){2v t<e?t:e}q C(e,t){2v t<e?e:t}G.2w?G.2w(q(e){D(k t=0,a=0;a<1k;a++)e[a]>t&&(t=e[a]);D(T=.2x*T+.1F*t,a=0;a<2y;a++)x[3C-a]=e[a]/T;D(a=0;a<2y;a++)x[2z-a]=e[2z-a]}):1i(()=>{D(k e=0;e<1k;e++)x[e]=j.J()},10);k O={r:1G,g:1H,b:1U},R={r:1G,g:1H,b:1U},E={r:0,g:34,b:3D,a:0};k H=!1;G.1V(q e(){D(k t=0;t<1k;t++)P[t]+=.3*(x[t]-P[t]),P[t]=A(P[t],1);R.r+=.1F*(O.r-R.r),R.r=A(R.r,Q),R.r=C(R.r,0),R.g+=.1F*(O.g-R.g),R.g=A(R.g,Q),R.g=C(R.g,0),R.b+=.1F*(O.b-R.b),R.b=A(R.b,Q),R.b=C(R.b,0),i.1y(0,0,2A,2B),i.F(h,0,0),i.F(m,3E,2x),i.K="#3F",i.1q="3G 2b",i.1I(1,j.z/1e*2.3H,0,1,0,0);k a,r=B 22;1u(i.1r((r.1w()<10?"0":"")+r.1w().L()+":"+(r.2C()<10?"0":"")+r.2C()+":"+(r.2D()<10?"0":"")+r.2D().L(),3I,3J),i.1t(),i.1I(.2E,0,j.z/1e*0,.3K,3L,1z),i.1W(j.z/1e*6),y||(i.F(c,0,0),i.1t(),i.1I(.2E,0,j.z/1e*9,1,3M,3N),i.1W(j.z/1e*7)),O=H?{r:Q,g:3O,b:1G}:{r:1G,g:1H,b:1U},y||(i.K="1J(0,0,0,0.5)",i.1K(-10,3P,3Q,2)),i.K="1P("+(a=R).r.L()+","+a.g.L()+","+a.b.L()+")",y)D(t=32;t<2F;t++)i.1K(40+7.5*(t-32),1l-1l*P[t]+30,4,1l*P[t]);2e D(t=32;t<2F;t++)i.1K(10*(t-32),1l-1l*P[t]+20,4,1l*P[t]);i.1t(),i.1b="3R",i.F(u,3S,3T),i.1b="1B-1C",i.F(w,3U,25),i.F(I,3V,3W),H&&E.a<.7?(E.a+=.2G,E.a=A(E.a,.7)):H||(E.a-=.2G,E.a=C(E.a,0)),0<E.a&&(i.1b="3X-2n",i.K="1J("+(a=E).r.L()+","+a.g.L()+","+a.b.L()+","+a.a.L()+")",i.1K(0,0,2A,2B),i.1b="1B-1C",i.1L=E.a/.7,i.F(b,3Y,3Z),i.1L=1),i.F(g,0,0),0<E.a&&(i.1L=E.a/.7,i.F(v,0,0),i.1L=1),H=!0;k o="凌晨啦!";S.41(e=>{r.1w()>=e.17&&(o=e.1a)}),6<=r.1w()&&r.1w()<=18&&(H=!1),i.K="#42",i.1q="31.43 1Q",i.1I(1.44,j.z/1e*-35,0,.46,47.48,49.4a),i.1W(j.z/1e*4b.5),i.1p="1O",i.K="#4c",i.1r(o,4d,1z),i.1p="4e",i.1t(),s.F(n,0,0,l.1E,l.1v),G.1V(e)})}(),G.4f=q(){!q(){1N a,r,e,o,t=!0;1M n=[],i={1m:"1J(Q,Q,Q,.5)",2H:10,2I:.3,2J:.2},l=$1c("4g");q s(){t=!(2K.4h.4i>r)}q g(){a=l.4j,r=l.4k,l.1v=r+"2a",e.1E=a,e.1v=r}q c(){1u(t){o.1y(0,0,a,r);D(1M e 4l n)n[e].2L()}1V(c)}q d(){1M e=2M;q t(){e.1n.x=j.J()*a,e.1n.y=r+1z*j.J(),e.1X=.1+j.J()*i.2J,e.1R=.1+.3*j.J(),e.2N=j.J(),"J"===i.1m?e.1m="1J("+j.1Y(Q*j.J())+", "+j.1Y(Q*j.J())+", "+j.1Y(Q*j.J())+", "+j.J().4m(2)+")":e.1m=i.1m}e.1n={},t(),2M.2L=q(){e.1X<=0&&t(),e.1n.y-=e.2N,e.1X-=4n-4,o.1f(),o.1g(e.1n.x,e.1n.y,e.1R*i.2H,0,2*j.z,!1),o.K=e.1m,o.4o(),o.1h()}}!q(){a=l.4p,r=l.4q-1H,q(){1M e=2K.4r("4s");e.1c="2O",e.1x.4t="4u",l.4v(e),e.4w.1x.4x="4y"}(),e=$1c("2O"),e.1E=a,e.1v=r,e.1x.4z="4A",e.1x.4B="0",e.1x.4C="0",o=e.1o("2d");D(1N e=0;e<a*i.2I;e++){k t=B d;n.4D(t)}c()}(),G.2P("4E",s,!1),G.2P("4F",g,!1)}()};', 62, 290, '|||||||||||||||||||Math|var||||||function|||||||||PI||new||for||drawImage|window|||random|fillStyle|toString||src|||255||||Image|https|files|islu|cn|detail||||||png||time|||text|globalCompositeOperation|id|50|180|beginPath|arc|closePath|setInterval|value|128|300|color|pos|getContext|textAlign|font|fillText|stroke|resetTransform|if|height|getHours|style|clearRect|100|complete|source|over|clearInterval|width|01|80|120|transform|rgba|fillRect|globalAlpha|const|let|center|rgb|SimHei|scale|screenFile|phoneText|169|requestAnimationFrame|rotate|alpha|floor|600|||Date|indexOf|69||68|84|||px|Impact|900||else|36e5|1041|210|1280|720|destination|atop|onresize|light|JSON|parse|1e3|disableRili|showSongInfo|updateSongInfo|Array|return|wallpaperRegisterAudioListener|99|64|127|1980|1080|getMinutes|getSeconds|9645|95|005|radius|density|clearOffset|document|draw|this|speed|homeTopCanvas|addEventListener|cvs|display|screenImage|rili|getYear|getMonth|getDate|getDay|SUN|MON||||TUES|||WED|THUR||FRI|SAT|400|test|990000|save|strokeStyle|restore|26pt|260|20pt|end|520|strokeRect|break|Screenmask|screen|innerWidth|innerHeight|bg|mask|caidai|two|screenLight|phoneLight|wallpaperPropertyListener|applyUserProperties|file|250|63|77|954|97adbb|32pt|05|725|318|96|967|825|160|75|320|650|overlay|971|197|949|1319|345|hard|860|437||forEach|000|02pt|0911||5868|1132|94|564|07|56|fff|135|start|onload|header|body|scrollTop|clientWidth|clientHeight|in|toPrecision|5e|fill|offsetWidth|offsetHeight|createElement|canvas|pointerEvents|none|appendChild|parentElement|overflow|hidden|position|absolute|left|bottom|push|scroll|resize'.split('|'), 0, {}))


```

```js
eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if ('0'.replace(0, e) == 0) {
        while (c--) r[e(c)] = k[c];
        k = [function (e) {
            return r[e] || e
        }];
        e = function () {
            return '([cefhk-qs-uw-zA-Z]|[1-3]\\w)'
        };
        c = 1
    }
    ;
    while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('c 1s=1t.1u("1s");c e=1s.1v("2d");c D=1t.1u("D");c 2p=D.1v("2d");c 1w=1t.1u("1w");c y=1w.1v("2d");c 1x=1t.1u("1x");c f=1x.1v("2d");w 1d(){f.23(0,0,2q,2q);c 1e=s 2r();c 1y=1e.getYear();c 1z=1e.getMonth();c 1A=1e.getDate();c 1B=1e.getDay();c h=40;c 2s=[4,6,9,11];c 2t=[1,3,5,7,8,10,12];c 2u=["SUN","MON","TUES","WED","THUR","FRI","SAT"];c 1f;c 1C=1A%7;k(1B>=1C){1f=1B-1C+1}z{1f=1B-1C+8}c 1D=1;c R=30;k(2s.2v(1z+1)>-1){R=30}z k(2t.2v(1z+1)>-1){R=31}z{k(1y%4==0&&1y%24!=0||1y%400==0)R=29;z R=28}c 1E=6;k(7-1f+7*4<R){1E=7}w 2w(i,j){f.save();f.1g();f.strokeStyle="#26";f.1h(45+i*h*1.7+h/1.18,S+j*h+h/2,h/2-10,-m.o,m.o*1);f.1i();f.1j();f.1g();f.1h(45+i*h*1.7+h/1.18,S+j*h+h/2,h/2-9,-m.o,m.o*0.9);f.1i();f.1j();f.1g();f.1h(45+i*h*1.7+h/1.18,S+j*h+h/2,h/2-8,-m.o,m.o*0.8);f.1i();f.1j();f.1g();f.1h(45+i*h*1.7+h/1.18,S+j*h+h/2,h/2-7,-m.o,m.o*0.7);f.1i();f.1j();f.1g();f.1h(45+i*h*1.7+h/1.18,S+j*h+h/2,h/2-6,-m.o,m.o*0.6);f.1i();f.1j();f.restore()}c 2x=/^\\d+(\\d+)?$/;w 27(1F,i,j){f.1k="2a";f.E="2b(69,68,84)";f.1l=(h/1.5)+\'px 2B\';c 2C=3;k((j==0||j==6)&&2x.test(1F)){f.E="#26"}f.1m(1F.A(),45+j*h*1.7+h/1.18,S+i*h+h/3*2+2C);k(1F==1A){2w(j,i)}}f.E="2b(69,68,84)";f.1l="26 26pt 2c";f.1k="2a";c 2D=["一","二","三","四","五","六","七","八","九","十","十一","十二"];f.scale(1.1,1);f.1m(2D[1z]+"月",260,32);f.1n();f.1l="20pt 2c";f.1k="end";f.1m(1A+"日",520,38);u(c i=0;i<1E;i++){u(c j=0;j<7;j++){f.strokeRect(45+j*h*1.70,S+i*h,h*1.70,h)}}1D=1;u(c i=0;i<1E;i++){u(c j=0;j<7;j++){k(i==0){27(2u[j],i,j);2F}k(i==1&&j<1f){2F}k(1D>R){break}27(1D++,i,j)}}}c 2e=U(1d,2G);1d();c V=s F();V.B="G://H.I.J/K/2H.L";c O=s F();O.B="G://H.I.J/K/O.L";c iv=U(()=>{k(O.1G&&V.1G){y.q(O,-2J,-2K,2L,2M);y.P="2N-2O";y.q(V,0,0);y.P="1H-1I";1J(iv)}},14);p.2P=w(){k(p.2f/p.1K>1.8333333333333){D.2g=p.2f;D.2h=p.2f/1L*1M;p.scrollTo(0,(p.1K-123)/16)}z{D.2g=p.1K/1M*1L;D.2h=p.1K}}p.2P();c bg=s F();bg.B="G://H.I.J/K/bg.L";c 2i=s F();2i.B="G://H.I.J/K/2H.L";c 1o=s F();1o.B="G://H.I.J/K/1o.L";c 1O=s F();1O.B="G://H.I.J/K/1O.L";c 1P=s F();1P.B="G://H.I.J/K/1P.L";c 1Q=s F();1Q.B="G://H.I.J/K/1Q.L";c 1R=s F();1R.B="G://H.I.J/K/1R.L";c W=2Q.2R("[{\\"n\\":0,\\"Q\\":\\"凌晨啦!\\"},{\\"n\\":6,\\"Q\\":\\"早上好!\\"},{\\"n\\":8,\\"Q\\":\\"上午好!\\"},{\\"n\\":11,\\"Q\\":\\"你吃了吗\\"},{\\"n\\":13,\\"Q\\":\\"下午好鸭!\\"},{\\"n\\":16,\\"Q\\":\\"傍晚咯!\\"},{\\"n\\":19,\\"Q\\":\\"晚安!\\"}]");c X=Y;c 1S=-1;p.wallpaperPropertyListener={applyUserProperties:w(x){k(x.2j){k(x.2j.Z){O.B=\'file:///\'+x.2j.Z;c 2S=U(()=>{k(O.1G&&V.1G){y.23(0,0,2T,2T);y.q(O,-2J,-2K,2L,2M);y.P="2N-2O";y.q(V,0,0);y.P="1H-1I";1J(2S)}},14)}}k(x.W){k(x.W.Z){W=2Q.2R(x.W.Z)}}k(x.2U){k(x.2U.Z){1J(2e);X=2V}z{2e=U(1d,2G);1d();X=Y}}k(x.2W){k(x.2W.Z){1S=U(2X,250);2X()}z{1J(1S);1S=-1}}}}c 15=s 2Y(17);c C=s 2Y(17);c SoundPlaying=Y;u(c i=0;i<17;i++){15[i]=C[i]=0}c 1T=1;k(p.2Z){p.2Z(w(1p){c M=0;u(c i=0;i<17;i++){k(1p[i]>M)M=1p[i]}1T=1T*0.99+M*0.01;u(i=0;i<64;i++){15[63-i]=1p[i]/1T}u(i=0;i<64;i++){15[37-i]=1p[37-i]}})}z{c iva=U(()=>{u(c i=0;i<17;i++){15[i]=m.random()}},10)}w 1a(a,b){1V a>b?b:a}w M(a,b){1V a>b?a:b}c 1b={r:80,g:2k,b:2l};c l={r:80,g:2k,b:2l};c t={r:0,g:34,b:77,a:0};w 39(1X){1V("2b("+1X.r.A()+","+1X.g.A()+","+1X.b.A()+")")}w 3a(1q){1V("3b("+1q.r.A()+","+1q.g.A()+","+1q.b.A()+","+1q.a.A()+")")}c N=Y;c 3c=Y;w 2m(){u(c i=0;i<17;i++){C[i]+=(15[i]-C[i])*0.3;C[i]=1a(C[i],1)}l.r+=(1b.r-l.r)*0.01;l.r=1a(l.r,1Y);l.r=M(l.r,0);l.g+=(1b.g-l.g)*0.01;l.g=1a(l.g,1Y);l.g=M(l.g,0);l.b+=(1b.b-l.b)*0.01;l.b=1a(l.b,1Y);l.b=M(l.b,0);e.23(0,0,1L,1M);e.q(bg,0,0);e.q(2i,954,99);e.E="#97adbb";e.1l="32pt 2B";e.1Z(1,2.05*(m.o/T),0,1,0,0);c n=s 2r();e.1m((n.1r()<10?"0":"")+n.1r().A()+":"+(n.3d()<10?"0":"")+n.3d()+":"+(n.3e()<10?"0":"")+n.3e().A(),725,318);e.1n();e.1Z(0.3f,0,0*(m.o/T),0.96,967,24);e.2n(6*(m.o/T));k(!X){e.q(1x,0,0);e.1n();e.1Z(0.3f,0,9*(m.o/T),1,825,160);e.2n(7*(m.o/T))}1b={r:80,g:2k,b:2l};k(N){1b={r:1Y,g:75,b:80}}k(!X){e.E="3b(0,0,0,0.5)";e.21(-10,320,650,2)}e.E=39(l);k(!X){u(c i=32;i<95;i++)e.21(10*(i-32),20+(1c-1c*C[i]),4,1c*C[i])}z u(c i=32;i<95;i++)e.21(40+7.5*(i-32),30+(1c-1c*C[i]),4,1c*C[i]);e.1n();e.P="overlay";e.q(1o,971,197);e.P="1H-1I";e.q(1O,949,25);e.q(1P,1319,345);k(N&&t.a<0.7){t.a+=0.3h;t.a=1a(t.a,0.7)}z k(!N){t.a-=0.3h;t.a=M(t.a,0.0)}k(t.a>0){e.P="hard-1o";e.E=3a(t);e.21(0,0,1L,1M);e.P="1H-1I";e.22=t.a/0.7;e.q(1R,860,437);e.22=1}e.q(1w,0,0);k(t.a>0){e.22=t.a/0.7;e.q(1Q,0,0);e.22=1}N=2V;c 2o="凌晨啦!";W.forEach((v)=>{k(n.1r()>=v.n){2o=v.Q}});k(n.1r()>=6&&n.1r()<=18){N=Y}N=3c?!N:N;e.E="#000";e.1l="31.02pt 2c";e.1Z(1.0911,-35*(m.o/T),0,0.5868,1132.94,564.07);e.2n(56.5*(m.o/T));e.1k="2a"e.E="#fff";e.1m(2o,135,24);e.1k="start"e.1n();2p.q(1s,0,0,D.2g,D.2h);p.3i(2m)}p.3i(2m);', [], 205, '||||||||||||var||ctx|riliCtx||cardSize|||if|currentColor|Math|time|PI|window|drawImage||new|lightColor|for||function|properties|screenImageCtx|else|toString|src|animData|display|fillStyle|Image|https|image|lichongbing|com|detail|png|max|night|screen|globalCompositeOperation|text|countDay|50|180|setInterval|screenMask|phoneText|noRili|false|value||||||data||128|||min|targetColor|300|drawRili|date|firstDraw|beginPath|arc|stroke|closePath|textAlign|font|fillText|resetTransform|light|audioData|colorWithA|getHours|cvs|document|getElementById|getContext|screenImage|rili|year|mouth|today|week|wIdx|dayIndex|row|txt|complete|source|over|clearInterval|innerHeight|1980|1080||caidai|two|screenLight|phoneLight|updateSongInfoHandler|peakValue||return||color|255|transform||fillRect|globalAlpha|clearRect|100||900|drawDate|||center|rgb|SimHei||riliInterval|innerWidth|width|height|mask|screenFile|120|169|render|rotate|greeting|displayCtx|600|Date|array_three|array_threeone|array_week|indexOf|drawTodaybg|isNum||||Impact|yOffest|monthCN||continue|3600000|Screenmask||1041|210|1280|720|destination|atop|onresize|JSON|parse|iv1|1000|disableRili|true|showSongInfo|updateSongInfo|Array|wallpaperRegisterAudioListener||||||||127||colorToRgb|colorToRgba|rgba|debug|getMinutes|getSeconds|9645||005|requestAnimationFrame'.split('|'), 0, {}))
```

```js
eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    }
    ;
    while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('!q(){1N n=$1c("2Q"),i=n.1o("2d"),l=$1c("2R"),s=l.1o("2d"),g=$1c("2S"),a=g.1o("2d"),c=$1c("2T"),p=c.1o("2d");q r(){p.1y(0,0,1Z,1Z);k e=B 22,t=e.2U(),a=e.2V(),r=e.2W(),o=e.2X(),n=40,i=["2Y","2Z","33","36","37","39","3a"],e=r%7,l=e<=o?o-e+1:o-e+8,s=1,g=30,c=6;7-l+28<(g=-1<[4,6,9,11].23(a+1)?30:-1<[1,3,5,7,8,10,12].23(a+1)?31:t%4==0&&t%1z!=0||t%3b==0?29:28)&&(c=7);k d=/^\\d+(\\d+)?$/;q f(e,t,a){p.1p="1O",p.K="1P(24,26,27)",p.1q=n/1.5+"2a 2b";0!=a&&6!=a||!d.3c(e)||(p.K="#3d"),p.1r(e.L(),45+a*n*1.7+n/1.18,1d+t*n+n/3*2+3),e==r&&(a=a,t=t,p.3e(),p.1f(),p.3f="#2c",p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-10,-j.z,+j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-9,-j.z,.9*j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-8,-j.z,.8*j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-7,-j.z,.7*j.z),p.1s(),p.1h(),p.1f(),p.1g(45+a*n*1.7+n/1.18,1d+t*n+n/2,n/2-6,-j.z,.6*j.z),p.1s(),p.1h(),p.3g())}p.K="1P(24,26,27)",p.1q="2c 3h 1Q",p.1p="1O";p.1R(1.1,1),p.1r(["一","二","三","四","五","六","七","八","九","十","十一","十二"][a]+"月",3i,32),p.1t(),p.1q="3j 1Q",p.1p="3k",p.1r(r+"日",3l,38);D(k h=0;h<c;h++)D(k m=0;m<7;m++)p.3m(45+m*n*1.7,1d+h*n,1.7*n,n);D(s=1,h=0;h<c;h++)D(m=0;m<7;m++)1u(0!=h){1u(!(1==h&&m<l)){1u(g<s)3n;f(s++,h,m)}}2e f(i[m],h,m)}k o=1i(r,2f);r();k d=B U;d.N="V://W.X.Y/Z/3o.15";k f=B U;f.N="V://W.X.Y/Z/3p.15";k e=1i(()=>{f.1A&&d.1A&&(a.F(f,-2g,-2h,2i,2j),a.1b="2k-2l",a.F(d,0,0),a.1b="1B-1C",1D(e))},14);G.2m=q(){l.1E=G.3q,l.1v=G.3r},G.2m();k h=B U;h.N="V://W.X.Y/Z/3s.15";k m=B U;m.N="V://W.X.Y/Z/3t.15";k u=B U;u.N="V://W.X.Y/Z/2n.15";k w=B U;w.N="V://W.X.Y/Z/3u.15";k I=B U;I.N="V://W.X.Y/Z/3v.15";k v=B U;v.N="V://W.X.Y/Z/3w.15";k b=B U;b.N="V://W.X.Y/Z/3x.15";k S=2o.2p(\'[{"17":0,"1a":"凌晨啦!"},{"17":6,"1a":"早上好!"},{"17":8,"1a":"上午好!"},{"17":11,"1a":"你吃了吗"},{"17":13,"1a":"下午好鸭!"},{"17":16,"1a":"傍晚咯!"},{"17":19,"1a":"该吃晚饭咯!"},{"17":21,"1a":"晚安!"}]\'),y=!1,M=-1;G.3y={3z:q(e){k t;e.1S&&e.1S.1j&&(f.N="3A:///"+e.1S.1j,t=1i(()=>{f.1A&&d.1A&&(a.1y(0,0,2q,2q),a.F(f,-2g,-2h,2i,2j),a.1b="2k-2l",a.F(d,0,0),a.1b="1B-1C",1D(t))},14)),e.1T&&e.1T.1j&&(S=2o.2p(e.1T.1j)),e.2r&&(y=e.2r.1j?(1D(o),!0):(o=1i(r,2f),r(),!1)),e.2s&&(e.2s.1j?(M=1i(2t,3B),2t()):(1D(M),M=-1))}};D(k x=B 2u(1k),P=B 2u(1k),t=0;t<1k;t++)x[t]=P[t]=0;k T=1;q A(e,t){2v t<e?t:e}q C(e,t){2v t<e?e:t}G.2w?G.2w(q(e){D(k t=0,a=0;a<1k;a++)e[a]>t&&(t=e[a]);D(T=.2x*T+.1F*t,a=0;a<2y;a++)x[3C-a]=e[a]/T;D(a=0;a<2y;a++)x[2z-a]=e[2z-a]}):1i(()=>{D(k e=0;e<1k;e++)x[e]=j.J()},10);k O={r:1G,g:1H,b:1U},R={r:1G,g:1H,b:1U},E={r:0,g:34,b:3D,a:0};k H=!1;G.1V(q e(){D(k t=0;t<1k;t++)P[t]+=.3*(x[t]-P[t]),P[t]=A(P[t],1);R.r+=.1F*(O.r-R.r),R.r=A(R.r,Q),R.r=C(R.r,0),R.g+=.1F*(O.g-R.g),R.g=A(R.g,Q),R.g=C(R.g,0),R.b+=.1F*(O.b-R.b),R.b=A(R.b,Q),R.b=C(R.b,0),i.1y(0,0,2A,2B),i.F(h,0,0),i.F(m,3E,2x),i.K="#3F",i.1q="3G 2b",i.1I(1,j.z/1e*2.3H,0,1,0,0);k a,r=B 22;1u(i.1r((r.1w()<10?"0":"")+r.1w().L()+":"+(r.2C()<10?"0":"")+r.2C()+":"+(r.2D()<10?"0":"")+r.2D().L(),3I,3J),i.1t(),i.1I(.2E,0,j.z/1e*0,.3K,3L,1z),i.1W(j.z/1e*6),y||(i.F(c,0,0),i.1t(),i.1I(.2E,0,j.z/1e*9,1,3M,3N),i.1W(j.z/1e*7)),O=H?{r:Q,g:3O,b:1G}:{r:1G,g:1H,b:1U},y||(i.K="1J(0,0,0,0.5)",i.1K(-10,3P,3Q,2)),i.K="1P("+(a=R).r.L()+","+a.g.L()+","+a.b.L()+")",y)D(t=32;t<2F;t++)i.1K(40+7.5*(t-32),1l-1l*P[t]+30,4,1l*P[t]);2e D(t=32;t<2F;t++)i.1K(10*(t-32),1l-1l*P[t]+20,4,1l*P[t]);i.1t(),i.1b="3R",i.F(u,3S,3T),i.1b="1B-1C",i.F(w,3U,25),i.F(I,3V,3W),H&&E.a<.7?(E.a+=.2G,E.a=A(E.a,.7)):H||(E.a-=.2G,E.a=C(E.a,0)),0<E.a&&(i.1b="3X-2n",i.K="1J("+(a=E).r.L()+","+a.g.L()+","+a.b.L()+","+a.a.L()+")",i.1K(0,0,2A,2B),i.1b="1B-1C",i.1L=E.a/.7,i.F(b,3Y,3Z),i.1L=1),i.F(g,0,0),0<E.a&&(i.1L=E.a/.7,i.F(v,0,0),i.1L=1),H=!0;k o="凌晨啦!";S.41(e=>{r.1w()>=e.17&&(o=e.1a)}),6<=r.1w()&&r.1w()<=18&&(H=!1),i.K="#42",i.1q="31.43 1Q",i.1I(1.44,j.z/1e*-35,0,.46,47.48,49.4a),i.1W(j.z/1e*4b.5),i.1p="1O",i.K="#4c",i.1r(o,4d,1z),i.1p="4e",i.1t(),s.F(n,0,0,l.1E,l.1v),G.1V(e)})}(),G.4f=q(){!q(){1N a,r,e,o,t=!0;1M n=[],i={1m:"1J(Q,Q,Q,.5)",2H:10,2I:.3,2J:.2},l=$1c("4g");q s(){t=!(2K.4h.4i>r)}q g(){a=l.4j,r=l.4k,l.1v=r+"2a",e.1E=a,e.1v=r}q c(){1u(t){o.1y(0,0,a,r);D(1M e 4l n)n[e].2L()}1V(c)}q d(){1M e=2M;q t(){e.1n.x=j.J()*a,e.1n.y=r+1z*j.J(),e.1X=.1+j.J()*i.2J,e.1R=.1+.3*j.J(),e.2N=j.J(),"J"===i.1m?e.1m="1J("+j.1Y(Q*j.J())+", "+j.1Y(Q*j.J())+", "+j.1Y(Q*j.J())+", "+j.J().4m(2)+")":e.1m=i.1m}e.1n={},t(),2M.2L=q(){e.1X<=0&&t(),e.1n.y-=e.2N,e.1X-=4n-4,o.1f(),o.1g(e.1n.x,e.1n.y,e.1R*i.2H,0,2*j.z,!1),o.K=e.1m,o.4o(),o.1h()}}!q(){a=l.4p,r=l.4q-1H,q(){1M e=2K.4r("4s");e.1c="2O",e.1x.4t="4u",l.4v(e),e.4w.1x.4x="4y"}(),e=$1c("2O"),e.1E=a,e.1v=r,e.1x.4z="4A",e.1x.4B="0",e.1x.4C="0",o=e.1o("2d");D(1N e=0;e<a*i.2I;e++){k t=B d;n.4D(t)}c()}(),G.2P("4E",s,!1),G.2P("4F",g,!1)}()};', 62, 290, '|||||||||||||||||||Math|var||||||function|||||||||PI||new||for||drawImage|window|||random|fillStyle|toString||src|||255||||Image|https|files|islu|cn|detail||||||png||time|||text|globalCompositeOperation|id|50|180|beginPath|arc|closePath|setInterval|value|128|300|color|pos|getContext|textAlign|font|fillText|stroke|resetTransform|if|height|getHours|style|clearRect|100|complete|source|over|clearInterval|width|01|80|120|transform|rgba|fillRect|globalAlpha|const|let|center|rgb|SimHei|scale|screenFile|phoneText|169|requestAnimationFrame|rotate|alpha|floor|600|||Date|indexOf|69||68|84|||px|Impact|900||else|36e5|1041|210|1280|720|destination|atop|onresize|light|JSON|parse|1e3|disableRili|showSongInfo|updateSongInfo|Array|return|wallpaperRegisterAudioListener|99|64|127|1980|1080|getMinutes|getSeconds|9645|95|005|radius|density|clearOffset|document|draw|this|speed|homeTopCanvas|addEventListener|cvs|display|screenImage|rili|getYear|getMonth|getDate|getDay|SUN|MON||||TUES|||WED|THUR||FRI|SAT|400|test|990000|save|strokeStyle|restore|26pt|260|20pt|end|520|strokeRect|break|Screenmask|screen|innerWidth|innerHeight|bg|mask|caidai|two|screenLight|phoneLight|wallpaperPropertyListener|applyUserProperties|file|250|63|77|954|97adbb|32pt|05|725|318|96|967|825|160|75|320|650|overlay|971|197|949|1319|345|hard|860|437||forEach|000|02pt|0911||5868|1132|94|564|07|56|fff|135|start|onload|header|body|scrollTop|clientWidth|clientHeight|in|toPrecision|5e|fill|offsetWidth|offsetHeight|createElement|canvas|pointerEvents|none|appendChild|parentElement|overflow|hidden|position|absolute|left|bottom|push|scroll|resize'.split('|'), 0, {}))

```


```js
! function() {
    let n = $id("cvs"),
        i = n.getContext("2d"),
        l = $id("display"),
        s = l.getContext("2d"),
        g = $id("screenImage"),
        a = g.getContext("2d"),
        c = $id("rili"),
        p = c.getContext("2d");

    function r() {
        p.clearRect(0, 0, 600, 600);
        var e = new Date,
            t = e.getYear(),
            a = e.getMonth(),
            r = e.getDate(),
            o = e.getDay(),
            n = 40,
            i = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"],
            e = r % 7,
            l = e <= o ? o - e + 1 : o - e + 8,
            s = 1,
            g = 30,
            c = 6;
        7 - l + 28 < (g = -1 < [4, 6, 9, 11].indexOf(a + 1) ? 30 : -1 < [1, 3, 5, 7, 8, 10, 12].indexOf(a + 1) ? 31 : t % 4 == 0 && t % 100 != 0 || t % 400 == 0 ? 29 : 28) && (c = 7);
        var d = /^\d+(\d+)?$/;

        function f(e, t, a) {
            p.textAlign = "center", p.fillStyle = "rgb(69,68,84)", p.font = n / 1.5 + "px Impact";
            0 != a && 6 != a || !d.test(e) || (p.fillStyle = "#990000"), p.fillText(e.toString(), 45 + a * n * 1.7 + n / 1.18, 50 + t * n + n / 3 * 2 + 3), e == r && (a = a, t = t, p.save(), p.beginPath(), p.strokeStyle = "#900", p.arc(45 + a * n * 1.7 + n / 1.18, 50 + t * n + n / 2, n / 2 - 10, -Math.PI, +Math.PI), p.stroke(), p.closePath(), p.beginPath(), p.arc(45 + a * n * 1.7 + n / 1.18, 50 + t * n + n / 2, n / 2 - 9, -Math.PI, .9 * Math.PI), p.stroke(), p.closePath(), p.beginPath(), p.arc(45 + a * n * 1.7 + n / 1.18, 50 + t * n + n / 2, n / 2 - 8, -Math.PI, .8 * Math.PI), p.stroke(), p.closePath(), p.beginPath(), p.arc(45 + a * n * 1.7 + n / 1.18, 50 + t * n + n / 2, n / 2 - 7, -Math.PI, .7 * Math.PI), p.stroke(), p.closePath(), p.beginPath(), p.arc(45 + a * n * 1.7 + n / 1.18, 50 + t * n + n / 2, n / 2 - 6, -Math.PI, .6 * Math.PI), p.stroke(), p.closePath(), p.restore())
        }
        p.fillStyle = "rgb(69,68,84)", p.font = "900 26pt SimHei", p.textAlign = "center";
        p.scale(1.1, 1), p.fillText(["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"][a] + "月", 260, 32), p.resetTransform(), p.font = "20pt SimHei", p.textAlign = "end", p.fillText(r + "日", 520, 38);
        for (var h = 0; h < c; h++)
            for (var m = 0; m < 7; m++) p.strokeRect(45 + m * n * 1.7, 50 + h * n, 1.7 * n, n);
        for (s = 1, h = 0; h < c; h++)
            for (m = 0; m < 7; m++)
                if (0 != h) {
                    if (!(1 == h && m < l)) {
                        if (g < s) break;
                        f(s++, h, m)
                    }
                } else f(i[m], h, m)
    }
    var o = setInterval(r, 36e5);
    r();
    var d = new Image;
    d.src = "http://lcbupayun.test.upcdn.net/detail/Screenmask.png";
    var f = new Image;
    f.src = "http://lcbupayun.test.upcdn.net/detail/screen.png";
    var e = setInterval(() => {
        f.complete && d.complete && (a.drawImage(f, -1041, -210, 1280, 720), a.globalCompositeOperation = "destination-atop", a.drawImage(d, 0, 0), a.globalCompositeOperation = "source-over", clearInterval(e))
    }, 14);
    window.onresize = function() {
        l.width = window.innerWidth, l.height = window.innerHeight
    }, window.onresize();
    var h = new Image;
    h.src = "http://lcbupayun.test.upcdn.net/detail/bg.png";
    var m = new Image;
    m.src = "http://lcbupayun.test.upcdn.net/detail/mask.png";
    var u = new Image;
    u.src = "http://lcbupayun.test.upcdn.net/detail/light.png";
    var w = new Image;
    w.src = "http://lcbupayun.test.upcdn.net/detail/caidai.png";
    var I = new Image;
    I.src = "http://lcbupayun.test.upcdn.net/detail/two.png";
    var v = new Image;
    v.src = "http://lcbupayun.test.upcdn.net/detail/screenLight.png";
    var b = new Image;
    b.src = "http://lcbupayun.test.upcdn.net/detail/phoneLight.png";
    var S = JSON.parse('[{"time":0,"text":"凌晨啦!"},{"time":6,"text":"早上好!"},{"time":8,"text":"上午好!"},{"time":11,"text":"你吃了吗"},{"time":13,"text":"下午好鸭!"},{"time":16,"text":"傍晚咯!"},{"time":19,"text":"该吃晚饭咯!"},{"time":21,"text":"晚安!"}]'),
        y = !1,
        M = -1;
    window.wallpaperPropertyListener = {
        applyUserProperties: function(e) {
            var t;
            e.screenFile && e.screenFile.value && (f.src = "file:///" + e.screenFile.value, t = setInterval(() => {
                f.complete && d.complete && (a.clearRect(0, 0, 1e3, 1e3), a.drawImage(f, -1041, -210, 1280, 720), a.globalCompositeOperation = "destination-atop", a.drawImage(d, 0, 0), a.globalCompositeOperation = "source-over", clearInterval(t))
            }, 14)), e.phoneText && e.phoneText.value && (S = JSON.parse(e.phoneText.value)), e.disableRili && (y = e.disableRili.value ? (clearInterval(o), !0) : (o = setInterval(r, 36e5), r(), !1)), e.showSongInfo && (e.showSongInfo.value ? (M = setInterval(updateSongInfo, 250), updateSongInfo()) : (clearInterval(M), M = -1))
        }
    };
    for (var x = new Array(128), P = new Array(128), t = 0; t < 128; t++) x[t] = P[t] = 0;
    var T = 1;

    function A(e, t) {
        return t < e ? t : e
    }

    function C(e, t) {
        return t < e ? e : t
    }
    window.wallpaperRegisterAudioListener ? window.wallpaperRegisterAudioListener(function(e) {
        for (var t = 0, a = 0; a < 128; a++) e[a] > t && (t = e[a]);
        for (T = .99 * T + .01 * t, a = 0; a < 64; a++) x[63 - a] = e[a] / T;
        for (a = 0; a < 64; a++) x[127 - a] = e[127 - a]
    }) : setInterval(() => {
        for (var e = 0; e < 128; e++) x[e] = Math.random()
    }, 10);
    var O = {
            r: 80,
            g: 120,
            b: 169
        },
        R = {
            r: 80,
            g: 120,
            b: 169
        },
        E = {
            r: 0,
            g: 34,
            b: 77,
            a: 0
        };
    var H = !1;
    window.requestAnimationFrame(function e() {
        for (var t = 0; t < 128; t++) P[t] += .3 * (x[t] - P[t]), P[t] = A(P[t], 1);
        R.r += .01 * (O.r - R.r), R.r = A(R.r, 255), R.r = C(R.r, 0), R.g += .01 * (O.g - R.g), R.g = A(R.g, 255), R.g = C(R.g, 0), R.b += .01 * (O.b - R.b), R.b = A(R.b, 255), R.b = C(R.b, 0), i.clearRect(0, 0, 1980, 1080), i.drawImage(h, 0, 0), i.drawImage(m, 954, 99), i.fillStyle = "#97adbb", i.font = "32pt Impact", i.transform(1, Math.PI / 180 * 2.05, 0, 1, 0, 0);
        var a, r = new Date;
        if (i.fillText((r.getHours() < 10 ? "0" : "") + r.getHours().toString() + ":" + (r.getMinutes() < 10 ? "0" : "") + r.getMinutes() + ":" + (r.getSeconds() < 10 ? "0" : "") + r.getSeconds().toString(), 725, 318), i.resetTransform(), i.transform(.9645, 0, Math.PI / 180 * 0, .96, 967, 100), i.rotate(Math.PI / 180 * 6), y || (i.drawImage(c, 0, 0), i.resetTransform(), i.transform(.9645, 0, Math.PI / 180 * 9, 1, 825, 160), i.rotate(Math.PI / 180 * 7)), O = H ? {
            r: 255,
            g: 75,
            b: 80
        } : {
            r: 80,
            g: 120,
            b: 169
        }, y || (i.fillStyle = "rgba(0,0,0,0.5)", i.fillRect(-10, 320, 650, 2)), i.fillStyle = "rgb(" + (a = R).r.toString() + "," + a.g.toString() + "," + a.b.toString() + ")", y)
            for (t = 32; t < 95; t++) i.fillRect(40 + 7.5 * (t - 32), 300 - 300 * P[t] + 30, 4, 300 * P[t]);
        else
            for (t = 32; t < 95; t++) i.fillRect(10 * (t - 32), 300 - 300 * P[t] + 20, 4, 300 * P[t]);
        i.resetTransform(), i.globalCompositeOperation = "overlay", i.drawImage(u, 971, 197), i.globalCompositeOperation = "source-over", i.drawImage(w, 949, 25), i.drawImage(I, 1319, 345), H && E.a < .7 ? (E.a += .005, E.a = A(E.a, .7)) : H || (E.a -= .005, E.a = C(E.a, 0)), 0 < E.a && (i.globalCompositeOperation = "hard-light", i.fillStyle = "rgba(" + (a = E).r.toString() + "," + a.g.toString() + "," + a.b.toString() + "," + a.a.toString() + ")", i.fillRect(0, 0, 1980, 1080), i.globalCompositeOperation = "source-over", i.globalAlpha = E.a / .7, i.drawImage(b, 860, 437), i.globalAlpha = 1), i.drawImage(g, 0, 0), 0 < E.a && (i.globalAlpha = E.a / .7, i.drawImage(v, 0, 0), i.globalAlpha = 1), H = !0;
        var o = "凌晨啦!";
        S.forEach(e => {
            r.getHours() >= e.time && (o = e.text)
        }), 6 <= r.getHours() && r.getHours() <= 18 && (H = !1), i.fillStyle = "#000", i.font = "31.02pt SimHei", i.transform(1.0911, Math.PI / 180 * -35, 0, .5868, 1132.94, 564.07), i.rotate(Math.PI / 180 * 56.5), i.textAlign = "center", i.fillStyle = "#fff", i.fillText(o, 135, 100), i.textAlign = "start", i.resetTransform(), s.drawImage(n, 0, 0, l.width, l.height), window.requestAnimationFrame(e)
    })
}(), window.onload = function() {
    ! function() {
        let a, r, e, o, t = !0;
        const n = [],
            i = {
                color: "rgba(255,255,255,.5)",
                radius: 10,
                density: .3,
                clearOffset: .2
            },
            l = $id("header");

        function s() {
            t = !(document.body.scrollTop > r)
        }

        function g() {
            a = l.clientWidth, r = l.clientHeight, l.height = r + "px", e.width = a, e.height = r
        }

        function c() {
            if (t) {
                o.clearRect(0, 0, a, r);
                for (const e in n) n[e].draw()
            }
            requestAnimationFrame(c)
        }

        function d() {
            const e = this;

            function t() {
                e.pos.x = Math.random() * a, e.pos.y = r + 100 * Math.random(), e.alpha = .1 + Math.random() * i.clearOffset, e.scale = .1 + .3 * Math.random(), e.speed = Math.random(), "random" === i.color ? e.color = "rgba(" + Math.floor(255 * Math.random()) + ", " + Math.floor(255 * Math.random()) + ", " + Math.floor(255 * Math.random()) + ", " + Math.random().toPrecision(2) + ")" : e.color = i.color
            }
            e.pos = {}, t(), this.draw = function() {
                e.alpha <= 0 && t(), e.pos.y -= e.speed, e.alpha -= 5e-4, o.beginPath(), o.arc(e.pos.x, e.pos.y, e.scale * i.radius, 0, 2 * Math.PI, !1), o.fillStyle = e.color, o.fill(), o.closePath()
            }
        }! function() {
            a = l.offsetWidth, r = l.offsetHeight - 120,
                function() {
                    const e = document.createElement("canvas");
                    e.id = "homeTopCanvas", e.style.pointerEvents = "none", l.appendChild(e), e.parentElement.style.overflow = "hidden"
                }(), e = $id("homeTopCanvas"), e.width = a, e.height = r, e.style.position = "absolute", e.style.left = "0", e.style.bottom = "0", o = e.getContext("2d");
            for (let e = 0; e < a * i.density; e++) {
                var t = new d;
                n.push(t)
            }
            c()
        }(), window.addEventListener("scroll", s, !1), window.addEventListener("resize", g, !1)
    }()
};
```
