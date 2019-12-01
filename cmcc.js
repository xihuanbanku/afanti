// ==UserScript==
// @name         CMCC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       lianghaikun@sina.com
// @match        *://172.30.197.152:8080/ultrawf/UltraWF/manageprocess/all_workFlow.jsp*
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

// 所有本部门和本组负责工单查询
// http://172.30.197.152:8080/ultrawf/UltraWF/manageprocess/all_workFlow.jsp?type=NotAssigned&invalidSearch=no
// 打开工单
// http://172.30.197.152:8080/arsys/forms/BMCC-EOMS-58/WF%3ABMCC_EOMS_ITDealFault/Default+Admin+View/?eid=
// 获取试题
// http://www.zhixue.com/crowdsourcednew/api/machining/applyTask?_=1535079101324&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0
(function() {
    'use strict';

    //主要代码逻辑
    $("#lis").append("<div id='course1'>html1</div>");
    $("#lis").append("<div id='monitorStatus'>monitorStatus</div>");
   // $("#lis").append("<audio id=\"media\" controls src=\"http://ydown.smzy.com//yinpin/2014-12/smzy_2014121105.mp3\"></audio>");
    //启动定时任务, 3秒一次
    var currentCount =0;
    setInterval(function(){
        if(localStorage.getItem("storeCount") !=0) {
            $.each($("tr[id^='dr_'][id$='_1']"), function(index, item){
                //播放音乐
                //$("#media")[0].play();
                $(item).click();
                currentCount = index;
                console.log(index);
            });
            $("#course1").html(new Date()+"当前["+currentCount+"]");
            searchsubmit();
        }
//       //高中数学
//       $.getJSON(
//           "http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1532496023817&phaseCode=05&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0",
//           function(data) {
//               display2Console("2",data);
//           }
//       );
//       //高中物理
//       $.getJSON(
//           "http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1532496057010&phaseCode=05&subjectCode=05&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0",
//           function(data) {
//               display2Console("3",data);
//           }
//       );
   }, 3000)


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
