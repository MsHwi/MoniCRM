 // ***********************************************************************************************
 // Program Name : [DBRD1030] Dashboard Layout Editing
 // Creator      : soyounlee@buttle.co.kr
 // Create Date  : 2018. 09. 05
 // Description  : Dashboard Layout Editing
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#DBRD1030", function($cbwrap, $cbfind, corebase){
    var pgmSource  = GV_PGM.source;
    var layoutHtml = [];  // layout html(초기 셋팅을 위한 html 양식)
    var initLayout = [];  // Init layout(초기 레이아웃)
    var layoutSet  = [];  // layout set information(최종 레이아웃 정보)
    var txtSelect  = cb.locMessage("txt.2221", "Select");
    
    // initialize event after screen loading
    corebase.firedInit = function() {
    };
    
    // document ready
    $cbfind(document).ready(function() {
        $cbfind("#BTN_ADD_ROW").click(fn_addRow);                                  // Add widget row
        $cbfind("#BTN_RST_ROW").click(function(){fn_makeDbrdLyout(initLayout);});  // Reset layout
        $cbfind("#BTN_VIEW_WGT").click(fn_viewWidget);                             // View dashboard
        $cbfind("#BTN_SAVE").click(fn_saveWidget);                                 // Save widget information
        
        fn_init();
    });
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Initialize
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Initialize(Get init layout)
    function fn_init() {
        fn_btnDisable(true);
        
        // 초기 레이아웃 정보 조회
        corebase.select({LYOT_ID:"0000000000"}, "DBRD1030.SELECT_LYOT_SET", function(output, metadata) {
            if(metadata.resultCount > 0) {
                initLayout = JSON.parse(output.LYOT_FORM);
            } else initLayout = [{"type":"vtrl-content","height":"100","width":"100","children":[]}]; // 초기 레아아웃 정보가 없을 시 기본 레아아웃 셋팅
            
            fn_srchLyoutSet();
        });
    }
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Make Splitter layout
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Search dashboard layout set list
    function fn_srchLyoutSet() {
        var source = {};
        
        // 부모 창으로 부터 전달 받은 레이아웃 정보가 없을 시 레이아웃 세팅을 하지 않는다.
        if(CBData.isEmpty(pgmSource) || CBData.isEmpty(pgmSource.LYOT_ID)) {
            CBMsg.error(cb.locMessage("", "There is no layout information."));
            return;
        }
        
        corebase.select(pgmSource, "DBRD1030.SELECT_LYOT_SET", function(output, metadata) {
            fn_btnDisable(false); // 버튼 활성화 처리
            
            if(metadata.resultCount > 0) {
                var layoutForm = JSON.parse(output.LYOT_FORM); // 스트링 형식의 레이아웃 포멧을 json 형태로 변환
                fn_makeDbrdLyout(layoutForm);  // 기존 저장 정보로 레이아웃 html 생성
            } else fn_makeDbrdLyout(initLayout);  // 초기 정보로 레이아웃 html 생성
        });
    }
    
    // Make bashborad layout html
    function fn_makeDbrdLyout(obj) {
        if(CBData.isEmpty(obj)) return;
        
        $cbfind("#SEC_DASH_WGT").empty(); // 레이아웃을 담을 section 초기화
        layoutHtml = [];  // 레이아웃을 담을 객체 초기화
        
        fn_makeChildren(obj, "INIT");  // div 생성
        
        $cbfind("#SEC_DASH_WGT").html(layoutHtml.join("")); // 최종 레이아웃 html 정보 적용
        
        layoutHtml = null; // 최종 레이아웃 html 정보 초기화
        
        var topVtrl = $cbfind("#SEC_DASH_WGT").children();
        fn_makeSplitter(topVtrl);
        
        fn_contentBtnDisplay();
    }
    
    // Make children div
    function fn_makeChildren(layout, type) {
        if(CBData.isEmpty(layout)) return false;
        
        $.each(layout, function(layIdx, layContent) {
            var position = "";
            if(layIdx == 0 && type =="INIT") position = "position:absolute; top:0; left:0; right:0; height:100%;";
            layoutHtml.push("<div id='" + layContent.type + "' style='overflow:hidden;" + position + "' data-option='width:" + layContent.width + ";height:" + layContent.height + ";' >");
                if(!fn_makeChildren(layContent.children)) {
                    fn_getInnerHtml(layContent.type, layContent);
                }
            layoutHtml.push("</div>");
        });
        
        return true;
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
        if(childCnt.length < 1) {
            panes.push({collapsible:false});
        } else {
            $.each(childCnt, function(chdIdx, chdContent){
                var $chdContent = $(chdContent);
                var option = $chdContent.cbParseData("option");
                
                var size = "";
                if(type == "vtrl-content") {
                    size = option.height;
                } else size = option.width;
                
                panes.push({size:size + "%", collapsible:false});
            });
        }
        
        splitterOption.panes = panes;
        obj.kendoSplitter(splitterOption);
        
        if(childCnt.length > 0) {
            $.each(childCnt, function(idx, data){
                fn_makeSplitter($(data));
            });
        }
    }
    
    // Make pane content html
    function fn_getInnerHtml(divId, data, type) {
        var wgtNm    = "";  // Widget name
        var wgtId    = "";  // Widget id
        var divId    = divId;
        
        if(!CBData.isEmpty(data)) {
            if(!CBData.isEmpty(data.WGT_ID)){
                var wgtInfo = fn_getWgtNm(data.WGT_ID);
                wgtId = wgtInfo.WGT_ID ? wgtInfo.WGT_ID : "";
                wgtNm = wgtInfo.WGT_NM ? wgtInfo.WGT_NM : "";
            }
        }
        
        if(divId == "hrzn-content") divId = "vtrl-content";
        else divId = "hrzn-content";
        
        var innerHTML = [];
        if(type!="ADD")innerHTML.push("<div id='" + divId + "' data-option='width:100;height:100;'>                                                                                                          ");
        innerHTML.push("<div>                                                                                                                                                                                ");
        innerHTML.push("    <div class='pane-content'>                                                                                                                                                       ");
        innerHTML.push("        <div class='filebox' style='position:absolute; top:5px; left:5px; width: calc(100% - 10px);'>                                                                                ");
        innerHTML.push("            <table class='boxst_file' id='GRD_WGT_INFO' style='width: 100%;'>                                                                                                        ");
        innerHTML.push("                <colgroup>                                                                                                                                                           ");
        innerHTML.push("                    <col style='width:' />                                                                                                                                           ");
        innerHTML.push("                    <col style='width:26px' />                                                                                                                                       ");
        innerHTML.push("                </colgroup>                                                                                                                                                          ");
        innerHTML.push("                <tbody>                                                                                                                                                              ");
        innerHTML.push("                    <tr style='height:25px;'>                                                                                                                                        ");
        innerHTML.push("                        <td>                                                                                                                                                         ");
        innerHTML.push("                            <input id='WGT_NM'   value='" + wgtNm + "'   type='text' data-io='IO' style='width: calc(100% - 28px); overflow: hidden; border:0;' disabled='disabled'/>");
        innerHTML.push("                            <input id='WGT_ID'   value='" + wgtId + "'   type='text' data-io='IO' style='display:none;'/>                                                            ");
        innerHTML.push("                        </td>                                                                                                                                                        ");
        innerHTML.push("                        <td><button class='btn_WF_ico_Gdel file-delete' style='top:5px; height:15px;' onclick='fn_delWgtInfo(this);'></button></td>                                  ");
        innerHTML.push("                    </tr>                                                                                                                                                            ");
        innerHTML.push("                </tbody>                                                                                                                                                             ");
        innerHTML.push("            </table>                                                                                                                                                                 ");
        innerHTML.push("        </div>                                                                                                                                                                       ");
        innerHTML.push("        <div style='position:absolute; top:40%; right:calc(50% - 65px);'>                                                                                                            ");
        innerHTML.push("            <button id='BTN_SEL_WGT'  title='Select'     class='btn_WF' onclick='fn_selWidget(this);'  >" + txtSelect + "</button>                                                   ");
        innerHTML.push("            <button id='BTN_ADD_ROW'  title='AddRow'     class='btn_WF' onclick='fn_addRowPane(this);' >▼</button>                                                                  ");
        innerHTML.push("            <button id='BTN_ADD_COL'  title='AddCol'     class='btn_WF' onclick='fn_addColPane(this);' >▶</button>                                                                  ");
        innerHTML.push("            <button id='BTN_ADD_CPNE' title='AddColPane' class='btn_WF' onclick='fn_addPane(this);'   >▥</button>                                                                   ");
        innerHTML.push("            <button id='BTN_ADD_RPNE' title='AddRowPane' class='btn_WF' onclick='fn_addPane(this);'   >▤</button>                                                                   ");
        innerHTML.push("            <button id='BTN_DEL_PNE'  title='Delete'     class='btn_WF' onclick='fn_delPane(this);'   >Ｘ</button>                                                                   ");
        innerHTML.push("        </div>                                                                                                                                                                       ");
        innerHTML.push("    </div>                                                                                                                                                                           ");
        innerHTML.push("</div>                                                                                                                                                                               ");
        if(type!="ADD")innerHTML.push("</div>                                                                                                                                                                ");
        
        if(!CBData.isEmpty(layoutHtml)) layoutHtml.push(innerHTML.join(""));
        
        return innerHTML.join("");
    }
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Pane Content Button control
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Select widget information
    fn_selWidget = function(e) {
        $this = $(e);
        var $pane = $this.closest(".k-pane");
        var GRD_WGT_INFO = $pane.find("#GRD_WGT_INFO:eq(0)");
        
        var options = {};
        options.callback = function(output) {
            if(CBData.isEmpty(output)) return;
            GRD_WGT_INFO.cbBindData(output);  // 선택한 위젯 정보 세팅
        };
        corebase.modal("DBRD1010", {TYPE:"MODAL"}, options);
    }
    
    // Delete widget information
    fn_delWgtInfo = function(e) {
        $this = $(e);
        var $pane = $this.closest(".k-pane");
        var GRD_WGT_INFO = $pane.find("#GRD_WGT_INFO:eq(0)");
        
        GRD_WGT_INFO.cbClearOData(); // 선택한 위젯 정보 삭제
    }
    
    // Add pane
    fn_addPane = function(e) {
        $this = $(e);
        var $widget = $this.closest(".k-widget");
        var $pane   = $this.closest(".k-pane");
        
        fn_addSplitterPane($widget, $pane);
    }
    
    // Add col pane
    fn_addColPane = function(e) {
        $this = $(e);
        var $widget = $this.closest(".k-widget");
        var $parent = $widget.parent();
        var type = $parent[0].id;
        if(type == "vtrl-content") {
            $widget = $parent;
            $parent = $widget.parent();
        }
        
        if(!$parent.hasClass("k-widget")) return;
        
        fn_addSplitterPane($parent, $widget, "P");
    }
    
    // Add row pane
    fn_addRowPane = function(e) {
        $this = $(e);
        var $widget = $this.closest(".k-widget");
        var $parent = $widget.parent();
        var type = $parent[0].id;
        if(type == "hrzn-content") {
            $widget = $parent;
            $parent = $widget.parent();
        }
        
        if(!$parent.hasClass("k-widget")) return;
        
        fn_addSplitterPane($parent, $widget, "P");
    }
    
    // Delete pane
    fn_delPane = function(e) {
        var totalWidget = $cbfind("#SEC_DASH_WGT").children().find(".pane-content").length;
        if(totalWidget == 1) return;
        
        $this = $(e);
        var $pane   = $this.closest(".k-pane");
        var $widget = $pane.parent();
        
        fn_removeTarget($widget);
    }
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Etc Button control
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Add widget row
    fn_addRow = function(e) {
        var $widget  = $cbfind("#SEC_DASH_WGT").children();
        var paneList = $widget.children("#hrzn-content");
        var $pane    = paneList.eq(paneList.length - 1);
        
        fn_addSplitterPane($widget, $pane, "P");
    }
    
    // View dashboard
    fn_viewWidget = function() {
        var layObj = fn_validationChk();
        if(CBData.isEmpty(layObj)) return;
        
        var options = {};
        options.callback = function(output) {};
        corebase.modal("DBRD1050", layObj.LYOT_INFO, options);
    }
    
    // Save widget information
    fn_saveWidget = function() {
        var layObj = fn_validationChk();
        if(CBData.isEmpty(layObj)) return;
        
        if(!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) return;
        
        var options = {};
        var data    = {};
        
        data.UPDATE_LYOT_INFO = corebase.Input("update", "DBRD1030.UPDATE_LYOT_INFO", layObj.LYOT_INFO);
        data.DELETE_LYOT_SET  = corebase.Input("delete", "DBRD1030.DELETE_LYOT_SET" , layObj.LYOT_INFO);
        data.UPDATE_LYOT_SET  = corebase.Input("update", "DBRD1030.UPDATE_LYOT_SET" , layObj.LYOT_SET);
        options.data = data;
        corebase.ajax(options, function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
        });
    }
    
    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * User function
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // get widget path
    function fn_getWgtNm(wgtId) {
        if(CBData.isEmpty(wgtId)) return "";
        var options = {};
        var data = {};
        var result = {WGT_ID:"", WGT_NM:""};
        data.SELECT_WGT_NM = corebase.Input("select","DBRD1030.SELECT_WGT_NM",{WGT_ID:wgtId});
        options.async = false;
        options.data = data;
        
        corebase.ajax(options, function(output, metadata){ 
            if(metadata.SELECT_WGT_NM.resultCount > 0) result = output.SELECT_WGT_NM.result;
        });
        
        return result;
    }
    
    // Content button display
    function fn_contentBtnDisplay() {
        var top = $("#SEC_DASH_WGT").children().children("#hrzn-content");
        
        $.each(top, function(idx, data){
            $data = $(data);
            var paneList = $data.find(".pane-content");
            $.each(paneList, function(i, pane){
                $pane = $(pane);
                var parentType = $pane.closest(".k-widget")[0].id;
                if(parentType == "hrzn-content") {
                    $pane.find("#BTN_ADD_CPNE").css("display", "");
                    $pane.find("#BTN_ADD_RPNE").css("display", "none");
                } else {
                    $pane.find("#BTN_ADD_CPNE").css("display", "none");
                    $pane.find("#BTN_ADD_RPNE").css("display", "");
                }
                
                $pane.find("#BTN_DEL_PNE").css("display", "");
                $pane.find("#BTN_ADD_COL").css("display", "");
            });
            
            if(paneList.length == 1) {
                paneList.find("#BTN_ADD_COL").css("display", "none");
            }
        });
        
        // 최종 pane 정보가 1개면 삭제 버튼 감추기
        var topPane = top.find(".pane-content");
        if(top.length == 1 && topPane.length == 1) {
            topPane.find("#BTN_DEL_PNE").css("display", "none");
        }
    }
    
    // Splitter pane add
    function fn_addSplitterPane($widget, $pane, type) {
        var type = $widget[0].id;
        
        var $splitter = $widget.data("kendoSplitter");
        var size = 0;
        
        var divID = "hrzn-content";
        var option = {panes:[{collapsible:false}]};
        if(type == "hrzn-content") {
            divID = "vtrl-content";
            option.orientation = "vertical";
            size = $widget.width();
        } else size = $widget.height();
        
        if(type != "P") $pane.children(".pane-content").wrap("<div></div>");  // 새로운 splitter 를 위한 div
        
        $splitter.insertAfter({}, $pane).html(fn_getInnerHtml(type, "", "ADD"));
        
        var $totalPane = $widget.children(".k-pane");
        
        $.each($totalPane, function(idx, data){
            $data = $(data);
            
            if(!$data.hasClass("k-widget")) {
                $data[0].id = divID;
                $data.kendoSplitter(option);
            }
        });
        
        fn_contentBtnDisplay();
        
        // calculator average width
        var avgWidth = (100 / $totalPane.length).toFixed(2);
        $.each($totalPane, function(idx, data){
            $splitter.size($(data), avgWidth + "%");
        });
    }
    
    // Remove target
    function fn_removeTarget($widget) {
        var $parent = $widget.parent();     // 본인 상위
        var $topWidget = $parent.parent();  // 본인의 최상위
        
        var $target     = null;
        var $targetPane = null;
        
        var cnt = $parent.find(".pane-content").length;
        if(cnt == 1) {
            var topCnt = $topWidget.find(".pane-content").length;
            if(topCnt == 1) {
                fn_removeTarget($parent);
                return;
            }
            else {
                $target = $topWidget;
                $targetPane= $parent;
            }
        } else {
            $target = $parent;
            $targetPane = $widget;
        }
        
        $target.data("kendoSplitter").remove($targetPane);
        
        fn_contentBtnDisplay();
    }
    
    // Make result data
    function fn_makeResult(obj) {
        var childObj = {};
        childObj.type   = obj[0].id;  // widget type 정보를 가지고 있는 div id
        childObj.height = ((obj.height() / obj.parent().height()) * 100).toFixed(2);  // widget의 높이
        childObj.width  = ((obj.width() / obj.parent().width()) * 100).toFixed(2);    // widget의 넓이
        childObj.children = [];  // widget의 자식 정보
        
        var widgetList = obj.children(".k-widget"); // widget에 하위 widget 리스트
        if(widgetList.length > 0) { // widget에 하위 widget이 있다면 children 정보를 만들어준다.
            $.each(widgetList, function(idx, widget) {
                $widget = $(widget);
                childObj.children.push(fn_makeResult($widget));
            });
            
        } else { // widget에 하위 widget이 없다면 해당 widget이 최하위 정보이다.
            var content = obj.find(".pane-content");  // widget의 pane 정보를 가져온다
            childObj.WGT_ID = content.find("#WGT_ID").cbVal();  // pane 내부에 있는 WGT_ID input 박스의 정보를 가져온다
            childObj.WGT_NM = content.find("#WGT_NM").cbVal();  // pane 내부에 있는 WGT_NM input 박스의 정보를 가져온다
            
            var layout = {};  // T_DBRD_LYOT_SET 테이블에 담아줄 위젯 리스트를 생성 하기 위한 객체
            layout.LYOT_ID = pgmSource.LYOT_ID;  // DBRD1020 화면으로 부터 넘겨 받은 레이아웃 ID 정보를 담는다.
            layout.WGT_ID  = childObj.WGT_ID;    // 추출한 WGT_ID 정보를 담는다
            
            layoutSet.push(layout);
        }
        
        return childObj;
    }
    
    // Validation check
    function fn_validationChk() {
        var bValue = false;
        var top = $cbfind("#SEC_DASH_WGT").children();  // 최상단의 widget 정보를 찾는다
        var paneList = top.find(".pane-content");   // pane 리스트를 가져온다.
        $.each(paneList, function(idx, pane){
            $pane = $(pane);
            if(CBData.isEmpty($pane.find("#WGT_ID").cbVal())) bValue = true; // WGT_ID 정보가 없을 경우 체크
        });
        
        if(bValue) { // WGT_ID 정보가 없을 시 알림 창 띄워준다.
            CBMsg.error(cb.locMessage("msg.2160", "Please check the widget information."));
            return null;
        }
        
        layoutSet = []; // layoutSet information clear
        var resultObj = [fn_makeResult($cbfind("#SEC_DASH_WGT").children(".k-widget"))]; // 최종 레이아웃 정보를 가져온다.
        
        var source = {};
        source.LYOT_INFO = {LYOT_ID:pgmSource.LYOT_ID, LYOT_FORM:JSON.stringify(resultObj)};
        source.LYOT_SET  = layoutSet;
        
        console.log(source);
        
        return source;
    }
    
    // button disable/Enable
    function fn_btnDisable(bAble) {
        $cbfind("#BTN_ADD_ROW").cbElemDisable(bAble);
        $cbfind("#BTN_RST_ROW").cbElemDisable(bAble);
        $cbfind("#BTN_VIEW_WGT").cbElemDisable(bAble);
        $cbfind("#BTN_SAVE").cbElemDisable(bAble);
    }
    
    // browser close button click event(return data)
    window.onbeforeunload = function () {
        //corebase.closeWindow();
    };
});
