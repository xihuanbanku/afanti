
// ==UserScript==
// @name         阿凡题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       lianghaikun@sina.com
// @match        *://www.zhixue.com/crowdsourcednew/api*
// @grant        none
// ==/UserScript==

//http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1529543629746&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false
(function() {
    'use strict';
     var innerHtml = eval("(" + document.getElementsByTagName("body")[0].innerText + ")");

    var currentCount = innerHtml.result;
    var storeCount = localStorage.getItem("storeCount");
    if(currentCount != 0 && storeCount != 0) {
        console.error(innerHtml);
        console.error("来题了");
        //播放音乐
        window.open("http://dx.sc.chinaz.com/Files/DownLoad/sound1/201402/4082.mp3");
        localStorage.setItem("storeCount",0);
    }
    //网页上追加当前状态
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(storeCount ==1 ? "监控中。。。" : "已停止"));
    document.body.appendChild(div);
    //网页上追加button
    var btn1=document.createElement("button");
    var t1=document.createTextNode("开始");
    btn1.appendChild(t1);
    document.body.appendChild(btn1);
    btn1.addEventListener("click", function () { localStorage.setItem("storeCount",1); });
    var btn2=document.createElement("BUTTON");
    var t2=document.createTextNode("结束");
    btn2.appendChild(t2);
    btn2.addEventListener("click", function () { localStorage.setItem("storeCount",0); });
    document.body.appendChild(btn2);
　　  //存入 参数： 1.调用的值 2.所要存入的数据
　　 console.log(localStorage.getItem("storeCount"));//输出
    // Your code here...
    // 2.清空localStorage
　　// localStorage.clear();
    // 3.删除键值对
　　// localStorage.removeItem("arr");
    document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];

　　console.log(e.keyCode);//输出
        if(e && e.keyCode==32){ // 按 空格
            //要做的事情
            if(storeCount ==1) {
                localStorage.setItem("storeCount",0);
            } else {
                localStorage.setItem("storeCount",1);
            }
        }
    };

})();
