 // ***********************************************************************************************
 // Program Name : [DBRD1040] Dashboard Viewer
 // Creator      : soyounlee@buttle.co.kr
 // Create Date  : 2018. 09. 05
 // Description  : Dashboard Viewer
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#DBRD1040", function($cbwrap, $cbfind, corebase){
    var pgmSource = GV_PGM.source;
    var layoutHtml  = [];     // layout html(초기 셋팅을 위한 html 양식)
    var collapsible = false;  // 위젯 접기 여부
    var resizable   = false;  // 위젯 사이즈 조절 여부
    
    corebase.activeInit = function() {
        fn_srchContent();    // Search all content
    };
    
    // initialize event after screen loading
    corebase.firedInit = function() {
    };
    
    // document ready
    $(document).ready(function() {
        $("#SEC_DBRD_SRCH #LYOT_ID").change(fn_srchLyoutSet);
        $("#BTN_SAVE").click(fn_saveUsrLayot); // Save widget information
        $("#BTN_SRCH").click(fn_srchContent);  // Search content
        $("#BTN_RFSH").click(fn_refresh);      // Refresh screen
        
        fn_init();
    });
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Initialize
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Initialize(Get init layout)
    function fn_init() {
        
        if(!CBData.isEmpty(pgmSource) && !CBData.isEmpty(pgmSource.LYOT_FORM)) {
            var layoutForm = JSON.parse(pgmSource.LYOT_FORM);
            fn_makeDbrdLyout(layoutForm);
            return;
        }
        
        $("#SEC_DBRD_SRCH").css("display", "");
        $("#SEC_DASH_WGT").css("height", "calc(100% - 34px)");
        
        // BTN_SRCH 버튼 한글 적용 시 사이즈 안맞는 부분 해결
        var btnWidth = $("#BTN_RFSH")[0].offsetWidth + 2;
        $("#BTN_SRCH").css("right", btnWidth + "px");
        
        corebase.select({}, "DBRD1040.SELECT_USR_LYOT", function(output, metadata) {
            if(metadata.resultCount > 0) {
                $("#SEC_DBRD_SRCH #LYOT_ID").cbVal(output.LYOT_ID);
            }
            
            fn_srchLyoutSet();
        });
    }
    
    // Window reload
    fn_refresh = function() {
        window.location.reload(); // 화면 다시 그리기
    }
    
    // Search all content
    fn_srchContent = function() {
        var wgtList = $("#SEC_DASH_WGT").find("iframe");
        
        $.each(wgtList, function(idx, widget){
            if(widget) {
                if($.isFunction(widget.contentWindow["fn_srch"])) widget.contentWindow.fn_srch();
            }
        });
    }
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Make Splitter layout
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Search dashboard layout set list
    fn_srchLyoutSet = function() {
    	var lyoutId = $("#SEC_DBRD_SRCH #LYOT_ID").cbVal();
        
        corebase.select({LYOT_ID:lyoutId}, "DBRD1040.SELECT_LYOT_SET", function(output, metadata) {
            if(metadata.resultCount > 0) {
                var layoutForm = JSON.parse(output.LYOT_FORM); // 스트링 형식의 레이아웃 포멧을 json 형태로 변환
                
                fn_makeDbrdLyout(layoutForm);  // 기존 저장 정보로 레이아웃 html 생성
            } else CBMsg.error(cb.locMessage("", "There is no layout information."));
        });
    }
    
    // Make bashborad layout html
    function fn_makeDbrdLyout(obj) {
        if(CBData.isEmpty(obj)) return;
        
        $("#SEC_DASH_WGT").empty(); // 레이아웃을 담을 section 초기화
        layoutHtml = [];  // 레이아웃을 담을 객체 초기화
        
        fn_makeChildren(obj, "INIT");  // div 생성
        
        $("#SEC_DASH_WGT").html(layoutHtml.join("")); // 최종 레이아웃 html 정보 적용
        
        layoutHtml = null; // 최종 레이아웃 html 정보 초기화
        
        var topVtrl = $("#SEC_DASH_WGT").children();
        fn_makeSplitter(topVtrl);
    }
    
    // Make children div
    function fn_makeChildren(layout, type) {
        if(CBData.isEmpty(layout)) return false;
        
        $.each(layout, function(layIdx, layContent) {
            var position = "";
            if(layIdx == 0 && type =="INIT") position = "position:absolute; top:0; left:0; right:0; height:100%;";
            layoutHtml.push("<div id='" + layContent.type + "' style='overflow:hidden;" + position + "' data-option='width:" + layContent.width + ";height:" + layContent.height + ";' >");
                if(!fn_makeChildren(layContent.children)) {
                    
                    var wgtPath = fn_getWgtPath(layContent.WGT_ID);
                    var divId   = layContent.type;
                    if(divId == "hrzn-content") divId = "vtrl-content";
                    else divId = "hrzn-content";
                    
                    layoutHtml.push("<div class='pane-content' id='" + divId + "' data-option='width:100;height:100;wgtPath:" + wgtPath + ";'> ");
                    layoutHtml.push("</div>                                                                                                    ");
                }
            layoutHtml.push("</div>");
        });
        
        return true;
    }
    
    // make pane option
    function fn_makePaneOption(type, option) {
        var size = "";
        if(type == "vtrl-content") {
            size = option.height;
        } else size = option.width;
        
        var paneOption = {size:size + "%", collapsible:collapsible, resizable:resizable};
        return paneOption;
    }
    
    // Make splitter
    function fn_makeSplitter(obj) {
        var type = obj[0].id;
        var chdType = "vtrl-content";
        
        var splitterOption = {};
        if(type == "vtrl-content") {
            splitterOption.orientation = "vertical";
            chdType = "hrzn-content";
        }
        
        var panes = [];
        var childCnt = obj.children("#" + chdType);
        $.each(childCnt, function(idx, children){
            var $children = $(children);
            var option     = $children.cbParseData("option");
            var paneOption = fn_makePaneOption(type, option);
            
            var childPane = $children.find(".pane-content");
            if(childPane.length == 1) {
                var wgtPath = childPane.cbParseData("option").wgtPath;
                if(!CBData.isEmpty(wgtPath)) {
                    // 화면 url 셋팅
                    paneOption.contentUrl = window.location.origin + CBConfig.contextPath + wgtPath;
                }
            } else fn_makeSplitter($children);
            
            panes.push(paneOption);
        });
        
        if(childCnt.length > 0) {
            splitterOption.panes = panes;
            obj.kendoSplitter(splitterOption);
        }
    }
    
    // get widget path
    function fn_getWgtPath(wgtId) {
        if(CBData.isEmpty(wgtId)) return "";
        var options = {};
        var data = {};
        var wgtPath = "";
        data.SELECT_WGT_PATH = corebase.Input("select","DBRD1040.SELECT_WGT_PATH",{WGT_ID:wgtId});
        options.async = false;
        options.data = data;
        
        corebase.ajax(options, function(output, metadata){
            if(metadata.SELECT_WGT_PATH.resultCount > 0)  wgtPath = output.SELECT_WGT_PATH.result.WGT_PATH;
            else wgtPath = "";
            
        });
        
        return wgtPath;
    }
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * User function
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    
    // Save user layout information
    fn_saveUsrLayot = function() {
        
        var lyoutId = $("#SEC_DBRD_SRCH #LYOT_ID").cbVal();
        if(CBData.isEmpty(lyoutId)) return;
        
        if(!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) return;
        corebase.select({LYOT_ID:lyoutId}, "DBRD1040.UPDATE_USR_LYOT", function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
        });
    }
    
    // browser close button click event(return data)
    window.onbeforeunload = function () {
        corebase.closeWindow();
    };
});
