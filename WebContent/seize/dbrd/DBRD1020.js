 // ***********************************************************************************************
 // Program Name : [DBRD1020] Dashboard Layout Management(대시보드 레아아웃 관리)
 // Creator      : soyounlee@buttle.co.kr
 // Create Date  : 2018.09.06
 // Description  : Dashboard Layout Management(대시보드 레아아웃 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#DBRD1020", function($cbwrap, $cbfind, corebase){
    
    // initialize event after screen loading
    corebase.firedInit = function() {
    };
    
    // document ready
    $cbfind(document).ready(function() {
        gfn_setEnter("#DIV_SCH" , fn_srchLayoutList);    // Search dashboard layout list
        
        $cbwrap.cbSpread("#GRD_LYOT_LIST").click(fn_srchLayoutSetList);  // Set layout detail information
        $cbfind("#BTN_SCH").click(fn_srchLayoutList);    // Search dashboard layout list
        $cbfind("#BTN_AUTH").click(fn_popAuthLayout);    // Pop up layout authority management
        $cbfind("#BTN_NEW").click(fn_newLayoutInfo);     // New layout information
        $cbfind("#BTN_SAVE").click(fn_saveLayoutInfo);   // Save dashboard layout information
        $cbfind("#BTN_DEL").click(fn_delLayoutInfo);     // Delete layout information
        $cbfind("#BTN_EDIT").click(fn_popEditLyoutInfo);  // Pop up edit layout information
        
        fn_btnDisable("INIT");
        fn_srchLayoutList();
    });
    
    /*
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * Button click event function
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Search dashboard layout list
    fn_srchLayoutList = function() {
        
        var source = corebase.getSource("#DIV_SCH");
        corebase.selectList(source, "DBRD1020.SELECT_DBRD_LYOT", function(output, metadata) {
            $cbfind("#GRD_LYOT_LIST").cbBindData(output);
            $cbfind("#DIV_DETAIL").cbClearOData();
            $cbwrap.cbSpread("#GRD_WGT_LIST").clear();
            
            if(metadata.resultCount > 0) {
                $cbwrap.cbSpread("#GRD_LYOT_LIST").active("", 0);
            }
        });
    }
    
    // Pop up layout authority management
    fn_popAuthLayout = function() {
        var source = $cbfind("#GRD_LYOT_LIST").cbSpread().getRowObject();
        var options = {};
        options.callback = function(output) {
        };
        corebase.modal("DBRD1021", source, options);
    }
    
    // New layout information
    fn_newLayoutInfo = function() {
        $cbfind("#DIV_DETAIL").cbClearOData();
        $cbwrap.cbSpread("#GRD_WGT_LIST").clear();
        fn_btnDisable("NEW");
    }
    
    // Save dashboard layout information
    fn_saveLayoutInfo = function() {
        var source = corebase.getSource("#DIV_DETAIL");
        if(CBData.isEmpty(source.LYOT_NM)) {
            CBMsg.error(cb.locMessage("msg.2166", "Please enter the Layout Name."));
            $cbfind("#DIV_DETAIL #LYOT_NM").focus();
            return;
        } else if(CBData.isEmpty(source.USE_YN)) {
            CBMsg.error(cb.locMessage("msg.2188", "Please select the Use Y/N."));
            $cbfind("#DIV_DETAIL #USE_YN").focus();
            return;
        }
        
        if(!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) return;
        
        corebase.update(source, "DBRD1020.UPDATE_DBRD_LYOT", function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
            fn_srchLayoutList();
        });
    }
    
    // Delete layout information
    fn_delLayoutInfo = function() {
        var source = $cbfind("#GRD_LYOT_LIST").cbSpread().getRowObject();
        if(CBData.isEmpty(source.LYOT_ID)) {
            CBMsg.error(cb.locMessage("msg.2185", "Please select the layout information."));
            return;
        }
        
        if(!cb.confirm(cb.locMessage("msg.167", "Are you sure you want to delete?")))  return;
        
        corebase.delete(source, "DBRD1020.DELETE_DBRD_LYOT", function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.168", "Removed."));
            fn_srchLayoutList();
        });
    }
    
    // Pop up edit layout information
    fn_popEditLyoutInfo = function() {
        var source = $cbfind("#GRD_LYOT_LIST").cbSpread().getRowObject();
        var options = {};
        options.callback = function(output) {
            fn_srchLayoutSetList();
        };
        corebase.mdi("DBRD1030", source, options);
    }
    
    /*
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     * User function
     * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     */
    
    // Search layout set list
    function fn_srchLayoutSetList() {
        fn_btnDisable();
        var source = $cbfind("#GRD_LYOT_LIST").cbSpread().getRowObject();
        $cbfind("#DIV_DETAIL").cbBindData(source);
        
        corebase.selectList(source, "DBRD1020.SELECT_LYOT_SET", function(output, metadata) {
            $cbfind("#GRD_WGT_LIST").cbBindData(output);
        });
    }
    
    // Button Disable/Enable
    function fn_btnDisable(type) {
        var bAuth = false;
        var bDel  = false;
        var bSave = false;
        var bEdit = false;
        if(type == "INIT") {
            bAuth = true;
            bDel  = true;
            bSave = true;
            bEdit = true;
        } else if(type == "NEW") {
            bAuth = true;
            bDel  = true;
            bEdit = true;
        }
        
        $cbfind("#BTN_AUTH").cbElemDisable(bAuth);
        $cbfind("#BTN_DEL").cbElemDisable(bDel);
        $cbfind("#BTN_SAVE").cbElemDisable(bSave);
        $cbfind("#BTN_EDIT").cbElemDisable(bEdit);
    }
    
    // browser close button click event(return data)
    window.onbeforeunload = function () {
        //corebase.closeWindow();
    };
    
});
