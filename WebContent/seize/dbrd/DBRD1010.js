 // ***********************************************************************************************
 // Program Name : [DBRD1010] Dashboard Widget Management
 // Creator      : BISNT
 // Create Date  : 2018. 07. 03
 // Description  : Dashboard Widget Management
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#DBRD1010", function($cbwrap, $cbfind, corebase){
    var pgmSource = GV_PGM.source;
    
    // initialize event after screen loading
    corebase.firedInit = function() {
    };
    
    // document ready
    $cbfind(document).ready(function() {
        if(CBData.isEmpty(pgmSource) || CBData.isEmpty(pgmSource.TYPE) || pgmSource.TYPE != "MODAL") {
            $cbwrap.cbSpread("#GRD_WGT_LIST").colHide(5);
        }
        
        gfn_setEnter("#DIV_SCH" , fn_srchWgtList);    // Search Widget list
        
        $cbwrap.cbSpread("#GRD_WGT_LIST").click(fn_setDtlInfo);
        $cbfind("#BTN_SCH").click(fn_srchWgtList);    // Search Widget list
        $cbfind("#BTN_PREVIEW").click(fn_preview);    // Pop up preview
        $cbfind("#BTN_NEW").click(fn_newWgtInfo);     // New Widget information
        $cbfind("#BTN_SAVE").click(fn_saveWgtInfo);   // Save Widget information
        $cbfind("#BTN_DEL").click(fn_delWgtInfo);     // Delete Widget information
        
        // Select widget
        $cbwrap.cbSpread("#GRD_WGT_LIST").buttonclicked(function(eobj){
            // Click column no. (Click 한 컬럼 순번)
            if(eobj[1] == 5) fn_selectWgt(eobj[4]);
        });
        
        fn_srchWgtList();
    });
    
    // Select widget
    fn_selectWgt = function(e) {
        if(e[9] != "Y") {
            CBMsg.error(cb.locMessage("msg.2159", "Please check the use Y/N."));
            return;
        }
        
        var source = {};
        source.WGT_ID   = e[2];
        source.WGT_NM   = e[3];
        source.WGT_PATH = e[7];
        
        corebase.closeWindow(source);
    }
    
    // Search Widget list
    fn_srchWgtList = function() {
        fn_layoutControl("INIT");
        $cbfind("#GRD_DTL_INFO").cbClearOData();
        
        var source = corebase.getSource("#DIV_SCH");
        corebase.selectList(source, "DBRD1010.SELECT_WGT_LIST", function(output, metadata) {
            $cbfind("#GRD_WGT_LIST").cbBindData(output);
            if(metadata.resultCount > 0) {
                $cbwrap.cbSpread("#GRD_WGT_LIST").active("", 0);
            }
        });
    }
    
    // Set Widget detail information
    fn_setDtlInfo = function() {
        fn_layoutControl();
        var rowObj = $cbfind("#GRD_WGT_LIST").cbSpread().getRowObject();
        $cbfind("#GRD_DTL_INFO").cbBindData(rowObj);
    }
    
    // Pop up preview
    fn_preview = function() {
        var source = corebase.getSource("#GRD_DTL_INFO");
        if(CBData.isEmpty(source.WGT_ID) || CBData.isEmpty(source.WGT_PATH)) {
            return;
        }
        
        // 2018.10.29 프로그램 등록 없이 위젯 미리보기 사용을 위한 정보
        var wgtPath = source.WGT_PATH.replace("/seize/", "");
        wgtPath = wgtPath.replace("seize/", "");
        
        var pgmObj = {};
        pgmObj._MUAL_PGM_INFO = {
                ATT_MTTR1: null,
                ATT_MTTR2: null,
                ATT_MTTR3: null,
                LINK_PATH: wgtPath,
                LRGMENU_SRT_SEQ: 1,
                MENU_ATHT_FCTY: "02",
                MENU_LVL: 1,
                MENU_TYP_CD: "B",
                MENU_USE_YN: "N",
                PAGE_IDX: "0",
                PGM_ID: source.WGT_ID,
                PGM_NM: source.WGT_NM,
                PGM_NM_TITLE: source.WGT_NM,
                PRTS_MENU_ID: "DBRD",
                SCRN_DV_CD: "2",
                SCRN_SZ_HEIGHT: "",
                SCRN_SZ_WIDTH: "",
                SMLMENU_SRT_SEQ: 1
        };
        
        corebase.popup(source.WGT_ID, pgmObj);
    }
    
    // New widget information
    fn_newWgtInfo = function() {
        fn_layoutControl("NEW");
        $cbfind("#GRD_DTL_INFO").cbClearOData();
    }
    
    function fn_validationChk() {
        var WGT_ID   = $cbfind("#GRD_DTL_INFO #WGT_ID");
        var WGT_PATH = $cbfind("#GRD_DTL_INFO #WGT_PATH");
        var WGT_DV   = $cbfind("#GRD_DTL_INFO #WGT_DV");
        var WGT_NM   = $cbfind("#GRD_DTL_INFO #WGT_NM");
        var USE_YN   = $cbfind("#GRD_DTL_INFO #USE_YN");
        
        if(CBData.isEmpty(WGT_ID.cbVal())) {
           CBMsg.error(cb.locMessage("msg.2172", "Please enter Widget ID."));
           WGT_ID.focus();
           return false;
        }
        
        if(CBData.isEmpty(WGT_PATH.cbVal())) {
            CBMsg.error(cb.locMessage("msg.2174", "Please enter Widget route."));
            WGT_PATH.focus();
            return false;
         }
        
        if(CBData.isEmpty(WGT_DV.cbVal())) {
            CBMsg.error(cb.locMessage("msg.2162", "Please enter a divison."));
            WGT_DV.focus();
            return false;
         }
        
        if(CBData.isEmpty(WGT_NM.cbVal())) {
            CBMsg.error(cb.locMessage("msg.2173", "Please enter Widget Name."));
            WGT_NM.focus();
            return false;
         }
        
        if(CBData.isEmpty(USE_YN.cbVal())) {
            CBMsg.error(cb.locMessage("msg.162", "Please select Use Y/N."));
            USE_YN.focus();
            return false;
         }
        
        return true;
    }
    
    // Save Widget information
    fn_saveWgtInfo = function() {
        if(!fn_validationChk()) return;
        
        if(!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) return;
        
        var source = corebase.getSource("#GRD_DTL_INFO");
        corebase.update(source, "DBRD1010.UPDATE_WGT_INFO", function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
            fn_srchWgtList();
        });
    }
    
    // Delete Widget information
    fn_delWgtInfo = function() {
        var source = corebase.getSource("#GRD_DTL_INFO");
        if(CBData.isEmpty(source.WGT_ID)) {
            CBMsg.error(cb.locMessage("msg.2261", "There is no widget information."));
            return;
        }
        
        if(!cb.confirm(cb.locMessage("msg.167", "Are you sure you want to delete?")))  return;
        
        corebase.delete(source, "DBRD1010.DELETE_WGT_INFO", function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.168", "Removed."));
            fn_srchWgtList();
        });
    }
    
    // Layout control
    function fn_layoutControl(type) {
        var bPK      = true;
        var bValue   = true;
        var bSave    = true;
        var bDel     = true;
        var bPrievew = true;
        
        if(type == "INIT") {
        } else if(type == "NEW") {
            bPK    = false;
            bValue = false;
            bSave  = false;
        } else {
            bValue   = false;
            bSave    = false;
            bDel     = false;
            bPrievew = false;
        }
        
        $cbfind("#GRD_DTL_INFO #WGT_ID").cbElemDisable(bPK);
        $cbfind("#GRD_DTL_INFO #WGT_PATH").cbElemDisable(bValue);
        $cbfind("#GRD_DTL_INFO #WGT_DV").cbElemDisable(bValue);
        $cbfind("#GRD_DTL_INFO #WGT_NM").cbElemDisable(bValue);
        $cbfind("#GRD_DTL_INFO #USE_YN").cbElemDisable(bValue);
        $cbfind("#GRD_DTL_INFO #WGT_DESC").cbElemDisable(bValue);
        
        $cbfind("#BTN_PREVIEW").cbElemDisable(bPrievew);
        $cbfind("#BTN_SAVE").cbElemDisable(bSave);
        $cbfind("#BTN_DEL").cbElemDisable(bDel);
    }
    
    // browser close button click event(return data)
    window.onbeforeunload = function () {
        corebase.closeWindow();
    };
    
});
