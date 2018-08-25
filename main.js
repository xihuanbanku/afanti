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

// 查找数量
// http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1529543629746&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false
// 打开试题
// http://www.zhixue.com/crowdsourcednew/dist/#/proofread/show/9cd5dbee-2e5d-402a-954f-37b81576a358_4b02bb1d-378d-4043-ab90-a8ee2b345afd_Proofread_0
// 获取试题
// http://www.zhixue.com/crowdsourcednew/api/machining/applyTask?_=1535079101324&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0
(function() {
    'use strict';

    //主要代码逻辑
    $("body").append("<div id='course1'>html1</div>");
    $("body").append("<div id='course2'>html2</div>");
    $("body").append("<div id='course3'>html3</div>");
    $("body").append("<div id='courseApply1'>courseApply1</div>");
    $("body").append("<div id='monitorStatus'>monitorStatus</div>");
    $("body").append("<audio id=\"media\" controls src=\"http://gddx.sc.chinaz.com//Files/DownLoad/sound1/201403/4204.mp3\"></audio>");

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
        if(currentCount > 0) {
            console.info(new Date()+"["+course+"]"+currentCount);
        }
        $("#course"+course).html(new Date()+course+"["+currentCount+"]");
        if(course =="1" && currentCount != 0 && storeCount != 0) {
            console.info("["+course+"]来题了");
            // 获取任务
            $.getJSON(
                "http://www.zhixue.com/crowdsourcednew/api/machining/applyTask?_=1535091176662&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0",
                function(data) {
                    if(data.errorCode == 0 && data.result != undefined) {
                        $("#courseApply"+course).html(new Date()+course+"["+data.result.id+"]");
                        // 打开试题
                        // http://www.zhixue.com/crowdsourcednew/dist/#/proofread/show/9cd5dbee-2e5d-402a-954f-37b81576a358_4b02bb1d-378d-4043-ab90-a8ee2b345afd_Proofread_0
                        window.open("http://www.zhixue.com/crowdsourcednew/dist/#/proofread/show/"+data.result.id);
                        //播放音乐
                        $("#media")[0].play()
                    }
                }
            );
            // 拿到题目以后 是否继续监控, 统一由空格控制
            // localStorage.setItem("storeCount",0);
            // $("#monitorStatus").html(new Date()+(storeCount ==1 ? "监控中。。。" : "已停止"));
        }
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
})();
