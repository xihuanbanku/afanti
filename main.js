
// ==UserScript==
// @name         阿凡题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       lianghaikun@sina.com
// @match        *://www.zhixue.com/crowdsourcednew/api*
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

//http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1529543629746&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false
(function() {
    'use strict';
    if(window.location.href.indexOf("dist") > 0) {
        //网页上追加获取count地址
        var aurl = document.createElement('a');
        var node = document.createTextNode("link");
        aurl.setAttribute("href","http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1529543629746&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false");
        aurl.setAttribute("target", "_blank");
        aurl.appendChild(node);
        document.body.appendChild(aurl);
    } else {
        $("body").append("<div id='course1'>html1</div>");
        $("body").append("<div id='course2'>html2</div>");
        $("body").append("<div id='course3'>html3</div>");
        $("body").append("<div id='monitorStatus'>status</div>");

        //启动定时任务, 3秒一次
        setInterval(function(){
            //初中数学
            $.getJSON(
                "http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1529543629746&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0",
                function(data) {
                    display2Console("1",data);
                }
            );
            //高中数学
            $.getJSON(
                "http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1532496023817&phaseCode=05&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0",
                function(data) {
                    display2Console("2",data);
                }
            );
            //高中物理
            $.getJSON(
                "http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1532496057010&phaseCode=05&subjectCode=05&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0",
                function(data) {
                    display2Console("3",data);
                }
            );
        }, 3000)

        function display2Console(course, data) {
            var storeCount = localStorage.getItem("storeCount");
            var currentCount = data.result;
            console.info(new Date()+data.result);
            $("#course"+course).html(new Date()+course+"["+data.result+"]");
            if(currentCount != 0 && storeCount != 0) {
                localStorage.setItem("storeCount",0);
                console.info("["+course+"]来题了");
                //播放音乐
                window.open("http://yss.yisell.com/yisell/ybys2018050819052088/sound/yisell_sound_201403191523425893_88366.mp3");
            }
            $("#monitorStatus").html(new Date()+(storeCount ==1 ? "监控中。。。" : "已停止"));
        }

        //存入 参数： 1.调用的值 2.所要存入的数据
        console.log("storeCount:"+localStorage.getItem("storeCount"));//输出
        // Your code here...
        // 2.清空localStorage
        // localStorage.clear();
        // 3.删除键值对
        // localStorage.removeItem("arr");
        document.onkeydown=function(event){
            var storeCount = localStorage.getItem("storeCount");
            var e = event || window.event || arguments.callee.caller.arguments[0];

            console.log(e.keyCode);//输出
            if(e && e.keyCode==32){ // 按 空格
                //要做的事情
                if(storeCount >=1) {
                    localStorage.setItem("storeCount",0);
                    $("#monitorStatus").html(new Date()+"已停止");
                } else {
                    localStorage.setItem("storeCount",1);
                    $("#monitorStatus").html(new Date()+"监控中。。。");
                }
            }
        };
    }
})();
