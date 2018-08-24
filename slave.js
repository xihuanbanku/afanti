// ==UserScript==
// @name         打开阿凡题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       lianghaikun@sina.com
// @match        http://www.zhixue.com/crowdsourcednew/dist/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if(window.location.href.indexOf("login") >0) {
        window.open("http://www.zhixue.com/crowdsourcednew/api/machining/getReadyCount?_=1532496865332&phaseCode=04&subjectCode=02&taskTypeCode=Proofread&isLimitApply=false&processTypeCode=0");
    }
})();
