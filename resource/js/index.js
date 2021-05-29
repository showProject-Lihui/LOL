//公共变量
var header = document.getElementsByTagName("header")[0];
var _this = this;
var yxlist = [];
var content = document.getElementsByClassName("content")[0];
var kblData = [];
var rmhd = [];

//header导航栏展现隐藏
var a = (function () {
    var nav = header.getElementsByClassName("nav")[0];
    var yy = header.getElementsByClassName("yy")[0];
    var ul = header.getElementsByClassName("ul");
    nav.addEventListener("mouseenter", function () {
        yy.classList.add("active");
        for (var i = 0; i < ul.length; i++) {
            ul[i].classList.add("active")
        }
    })
    header.addEventListener("mouseleave", function () {
        yy.classList.remove("active");
        for (var i = 0; i < ul.length; i++) {
            ul[i].classList.remove("active")
        }
    })
    yy.addEventListener("mouseleave", function () {
        yy.classList.remove("active");
        for (var i = 0; i < ul.length; i++) {
            ul[i].classList.remove("active")
        }
    })
}())

//header二级导航栏渲染
var aa = (function () {
    var uls = header.getElementsByClassName("ul");
    Mock.mock('./data.json', {
        "status": "success",
        "msg": "查询成功",
        "data|5": [{
            "texts|8": [{
                "text|1": ["游戏下载", "新手指引", "点券充值", "lol组队专家", "全球总决赛", "秩序殿堂", "联系客服"]

            }]
        }],
    });
    $.ajax({
        url: "./data.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            var da = data.data;
            da.forEach(function (ele, index1) {
                var str = "";
                ele.texts.forEach(function (ele, index) {
                    str += `
                        <li><a href="https://lol.qq.com/download.shtml?ADTAG=innercop.lol.web.top">` + ele.text + `</a></li>
                    `
                })
                uls[index1].innerHTML = str;
                str = "";
            })
        }
    })

}())

//搜索
var b = (function () {

    var search = header.getElementsByClassName("search")[0];
    var ul = search.getElementsByTagName("ul")[0];
    var input = search.getElementsByTagName("input")[0];
    var sousuo = search.getElementsByClassName("icon-sousuo")[0];
    var close = search.getElementsByClassName("close")[0];
    var sousuo2 = header.getElementsByClassName("icon-sousuo")[0];

    sousuo2.addEventListener("click", function () {
        search.classList.add("active")
    })

    close.addEventListener("click", function () {
        search.classList.remove("active")
    })
}())

//扫码
var c = (function () {

    var phone = header.getElementsByClassName("icon-phone")[0];
    var hh = header.getElementsByClassName("hh")[0];
    var tb = header.getElementsByClassName("tb")[0]
    phone.addEventListener("mouseenter", function () {
        hh.style.display = "flex"
        console.log(12)
    })
    hh.addEventListener("mouseleave", function () {
        this.style.display = "none";
    })
    header.addEventListener("mouseleave", function () {
        hh.style.display = "none";
    })

}())

//登录cookie设置
var d = (function () {
    var dll = header.getElementsByClassName("dl-btn")[0];
    var zhuce = document.getElementsByClassName("zhuce")[0];
    var dl = header.getElementsByClassName("dll")[0];
    var nodl = header.getElementsByClassName("no-dl")[0];
    var name = dl.getElementsByClassName("name")[0]
    var zx = header.getElementsByClassName("zx-btn")[0]

    if (!getCookieValue("username") || getCookieValue("username") == "none") {
        nodl.classList.add("active")
    } else {
        name.innerText = getCookieValue("username");
        dl.classList.add("active")
    }
    dll.addEventListener("click", function () {
        zhuce.classList.add("active")
    })

    ts.addEventListener("click", function (e) {
        e.preventDefault();
        document.cookie = "username=风拂过你的双眸"
        name.innerText = getCookieValue("username");
        nodl.classList.remove("active");
        dl.classList.add("active")
        zhuce.classList.remove("active")
    })

    zx.addEventListener("click", function (e) {
        document.cookie = "username=none"
        dl.classList.remove("active");
        nodl.classList.add("active")
    })

    function getCookieValue(name) {
        let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
        return result ? result.pop() : ""
    }
}())

//英雄列表遮罩层展示隐藏
var e = (function () {

    var yxul = document.getElementsByClassName("yxul")[0];
    var lis = yxul.getElementsByTagName("li");
    var yyc = yxul.getElementsByClassName("yyc");
    yxul.addEventListener("mouseenter", function (e) {
        if (e.target.nodeName == "LI") {
            yyc[e.target.getAttribute("index")].classList.add("active");
        }
    }, true)
    yxul.addEventListener("mouseleave", function (e) {
        if (e.target.nodeName == "LI") {
            yyc[e.target.getAttribute("index")].classList.remove("active");
        }
    }, true)

}())

//英雄列表数据初始化
var f = (function () {
    Mock.mock('./yxList.json', {
        "status": "success",
        "msg": "查询成功",
        "data|60": [
            {
                "img|1": ["/resource/images/yx16.jpg", "/resource/images/yx1.jpg", "/resource/images/yx2.jpg", "/resource/images/yx3.jpg", "/resource/images/yx4.jpg", "/resource/images/yx5.jpg", "/resource/images/yx6.jpg", "/resource/images/yx7.jpg", "/resource/images/yx8.jpg", "/resource/images/yx9.jpg", "/resource/images/yx10.jpg", "/resource/images/yx11.jpg", "/resource/images/yx12.jpg", "/resource/images/yx13.jpg", "/resource/images/yx14.jpg", "/resource/images/yx15.jpg"],
                "name|1": ["黑暗之女", "亡灵战士", "疾风剑豪", "李辉", "武伟", "李白", "上官婉儿", "卡特琳娜", "迪迦奥特曼", "蕾娜", "漩涡鸣人", "叶凡"],
                "url": "https://lol.qq.com/data/info-defail.shtml?id=14",
                "job|1": ["战士", "法师", "键盘侠", "辅助", "烧锅炉的", "看大门的"]
            }
        ]
    });

    $.ajax({
        url: "./yxList.json",
        type: "get",
        dataType: "json",
        success: yxlbRandy
    })
}())

//英雄列表数据切换
var g = (function () {

    var head = content.getElementsByClassName("head")[0];
    var yxlbul = document.getElementById("yxlbul");
    var yxlblis = yxlbul.getElementsByTagName("li");

    for (var i = 0; i < yxlblis.length; i++) {
        yxlblis[i].addEventListener("click", function () {
            var now = yxlbul.getElementsByClassName("active")[0];
            now.classList.remove("active");
            this.classList.add("active");
            var job = this.getAttribute("data")
            var data = null;
            if (this.getAttribute("data") == "all") {
                data = yxlist;
            } else {
                data = yxlist.filter(function (ele) { return ele.job == job })
            }
            yxlbRandy(data, "click")
        })
    }

}())

//英雄列表数据渲染
function yxlbRandy(data, flag) {
    var ul = document.getElementsByClassName("yxul")[0];
    var da = [];
    if (flag == "click") {
        da = data;
    } else {
        yxlist = data.data;
        da = yxlist;
    }
    var str = "";
    da.forEach(function (ele, index) {
        str += `
            <li index=` + index + `>
                <div>
                    <div index=` + index + ` class="yyc">
                        <a href="` + ele.url + `">
                            <i class="iconfont icon-sousuo"></i>
                        </a>
                    </div>
                    <img src="` + ele.img + `">
                    <p>` + ele.name + `</p>
                </div>
            </li>
        `
    })
    ul.innerHTML = str;
}

//FANART创作馆部分数据渲染
var o = (function () {

    var fanart = content.getElementsByClassName("fanart")[0];
    var d1 = fanart.getElementsByClassName("d1")[0];

    Mock.mock('./fanart1.json', {
        "status": "success",
        "msg": "查询成功",
        "data|8": [
            {
                "src|1": ["/resource/images/t1.jfif", "/resource/images/t2.jfif", "/resource/images/t3.jfif", "/resource/images/t4.jfif", "/resource/images/t5.jfif", "/resource/images/t6.jfif", "/resource/images/t7.jfif", "/resource/images/t8.jfif"],
                "title|1": ["影流之主", "卡莎", "诺克萨斯之手"]
            }
        ]
    });

    $.ajax({
        url: "./fanart1.json",
        type: "get",
        dataType: "json",
        success: fanart1Randy
    })

    function fanart1Randy(data) {
        var da = data.data;
        var str = "";
        da.forEach(function (ele) {
            str += `
                <div>
                    <img src="` + ele.src + `">
                    <div class="title">` + ele.title + `</div>
                </div>
            `
        })
        d1.innerHTML = str;
    }

}())

//轮播图区域
var aa = (function () {

    var lbtBox = content.getElementsByClassName("lbt-box")[0];
    var lbt = content.getElementsByClassName("lbt")[0];
    var title = lbtBox.getElementsByClassName("title")[0];
    var spans = title.getElementsByTagName("span");
    var index = 0;
    var flag = true;
    var timer = null;

    timer = setInterval(function () {
        var left = parseInt(window.getComputedStyle(lbt, true)["left"]);
        index++;
        if (index == spans.length) {
            index = 0;
        }
        lbt.style.left = -(820 * (index)) + "px";
        lbtBox.getElementsByClassName("active")[0].classList.remove("active")
        spans[index].classList.add("active");
    }, 3000)

    for (var i = 0; i < spans.length; i++) {
        spans[i].index = i;
        spans[i].addEventListener("mouseenter", function () {
            clearInterval(timer);
            var index = this.index;
            lbt.style.left = -(820 * (index)) + "px";
            lbtBox.getElementsByClassName("active")[0].classList.remove("active")
            spans[index].classList.add("active");
        })
        spans[i].addEventListener("mouseleave", function () {
            timer = setInterval(function () {
                var left = parseInt(window.getComputedStyle(lbt, true)["left"]);
                index++;
                if (index == spans.length) {
                    index = 0;
                }
                lbt.style.left = -(820 * (index)) + "px";
                lbtBox.getElementsByClassName("active")[0].classList.remove("active")
                spans[index].classList.add("active");
            }, 3000)
        })
    }


}())

//
var f = true
document.onscroll = function () {
    if (f) {
        document.getElementsByTagName("header")[0].classList.remove("init")
    }
}

//看板栏区域
var ww = (function () {

    var kblNav = content.getElementsByClassName("kbl-nav");

    for (var i = 0; i < kblNav.length; i++) {
        kblNav[i].index = i;
        kblNav[i].addEventListener("mouseenter", function (e) {
            kblxr(kblData, this.index)
            $(".kbl-nav").removeClass("active");
            this.classList.add("active");
        })
    }

    Mock.mock('./kbl.json', {
        "status": "success",
        "msg": "查询成功",
        "data|5": [
            {
                "title|1": ["云顶之巅：蛮子刀刀爆，重射枪枪扫！神超福牛杯三大夺冠阵容教学", "万万没看到：盘点台词里的致敬梗（七）", "TOP5：Karsa毁灭冲锋 单骑成万军", "11.4＆11.5版本更新公告：小蜜蜂系列迎来新成员"],
                "item|6": [
                    {
                        "bt|1": ["新闻", "公告", "赛事"],
                        "color|1": ["color1", "color2"],
                        "text|1": ["11.4&11.5云顶之弈更新：天选系统小型调整", "小蜜蜂宝典现已上线", "3月12日免费英雄更新公告", "LPL小蜜蜂猜猜乐活动已正式上线！"],
                        "time|1": ["03-03", "03-04", "03-05", "03-11"]
                    }
                ]
            }
        ]
    });
    $.ajax({
        url: "./kbl.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            kblData = data.data;
            kblxr(kblData, 0)
        }
    })



    function kblxr(data, index) {
        var one = content.getElementsByClassName("one")[0];
        var top = one.getElementsByClassName("top")[0];
        var right = top.getElementsByClassName("right")[0];
        var title = right.getElementsByClassName("title")[0];
        var nr = right.getElementsByClassName("nr")[0];
        var ul = nr.getElementsByTagName("ul")[0];
        var da = data[index]
        title.innerHTML = "<div class='title'><a href='http://lol.qq.com/gicp/news/410/34601917.html'>" + da.title + "</a></div>";
        var str = "";
        da.item.forEach(function (ele) {
            str += `
                <li>
                    <span class="bt ` + ele.color + `">` + ele.bt + `</span>
                    <a href="http://lol.qq.com/gicp/news/410/34601917.html">
                        <span>` + ele.text + `</span>
                    </a>
                    <span class="time">` + ele.time + `</span>
                </li>
            `
        })
        ul.innerHTML = str;
    }
}())


//下载按钮视频
downVideo.play()


//渲染热门活动
var kk = (function () {

    Mock.mock('./rmhd.json', {
        "status": "success",
        "msg": "查询成功",
        "data|3": [
            {
                "data|4":[
                    {
                        "src|1":["/resource/images/hh1.JPG","/resource/images/hh2.JPG","/resource/images/hh3.JPG","/resource/images/hh4.JPG","/resource/images/hh5.JPG"],
                        "p1|1":["每周显示半价","精选皮肤限时五折","LOL组队专区"],
                        "p2|1":["已结束","未开始","进行中"],
                        "a":{
                            "title":"小蜜蜂宝典2021",
                            "p1":"撒旦飞洒地方噶丹是法国",
                            "p2":"反对和收费的改变他人山地车v"
                        }
                    }
                ]
            }
        ]
    });
    $.ajax({
        url: "./rmhd.json",
        type: "get",
        dataType: "json",
        success: ss
    })
    function ss(data){
        rmhd = data.data;
    }

    var navList = $(".content .content .left .nav-box ul li");
    var ul = $(".content .content .left .content-box ul");
    navList.on("mouseenter", function (e) {
        if(!$(this).attr("data-index")){
            return false;
        }
        navList.removeClass("active");
        this.classList.add("active");
        rand(rmhd[$(this).attr("data-index")].data);
    })

    function rand(data){
       var str = "";
        data.forEach(function(ele){
            str += `<li>
                        <img src="` + ele.src +`">
                        <p>` + ele.p1 + `<p>
                        <p>` + ele.p2 + `</p>
                        <a href="https://lol.qq.com/main.shtml">
                            <p class="title">` + ele.a.title + `</p>
                            <p>` + ele.a.p1 + `</p>
                            <p>` + ele.a.p2 + `</p>
                        </a>
                    </li>`
        })
        ul.html(str)
    }

}())



