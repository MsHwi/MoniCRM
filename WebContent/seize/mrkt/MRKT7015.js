 // ***********************************************************************************************
 // Program Name : [MRKT7015] Marketing Additional Item Management(마케팅 추가 항목 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 10
 // Description  : Marketing Additional Item Management(마케팅 추가 항목 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#MRKT7015", function($cbwrap, $cbfind, corebase) {
    
	var objRefresh = null;
	var parent = GV_PGM.source;
	
    corebase.reload = function(obj) {
        parent = obj; // GV_source setting
        fn_init();
    };
    
    // document ready
    $cbfind(document).ready(function() {
    	
    	$cbfind("#DIV_SRCH").cbBindData(parent);
    	
    	objRefresh = window.setInterval(function () {
    		fn_srch();
    	}, 1000 * 2);
    	
    	fn_srch();
    });
    
    // initialize function
    function fn_init(){
        $cbwrap.cbSpread("#GRD_TRMS_STAT").clear();
    }
    
    // search function
    function fn_srch(){    	

    	var source = parent;
		var options = {};
		var data   = {};

		
		data.SELECT_MKT_FILE_TRMS_CNT = corebase.Input("select", "MRKT7015.SELECT_MKT_FILE_TRMS_CNT", source);
		data.SELECT_MKT_FILE_TRMS_TGT = corebase.Input("selectList", "MRKT7015.SELECT_MKT_FILE_TRMS_TGT", source); 
		
		options.method = null;
		options.data = data;
        options.wait = false;
		
        corebase.ajax(options, function (output, metadata) {
        	$cbfind("#GRD_TRMS_STAT").cbBindData(output.SELECT_MKT_FILE_TRMS_TGT); // process server list
        	
        	$cbfind("#NRDY_CNT").cbVal(output.SELECT_MKT_FILE_TRMS_CNT.NRDY_CNT); // ready count

        	var procCnt = kendo.toString(output.SELECT_MKT_FILE_TRMS_CNT.PROC_CNT, "n0"); 
        	var allCnt = kendo.toString(output.SELECT_MKT_FILE_TRMS_CNT.ALL_CNT, "n0");
        	$cbfind("#PROC_CNT").cbVal(procCnt + " / " + allCnt); // process count
        	
        	$cbfind("#STR_DTM").cbVal(output.SELECT_MKT_FILE_TRMS_CNT.STR_DTM); // process start time
        	
        	$cbfind("#END_DTM").cbVal(output.SELECT_MKT_FILE_TRMS_CNT.END_DTM); // process end time(all ATM)
        	
        });
    }
    
    // browser close button click event(return data)
    window.onbeforeunload = function () {
        corebase.closeWindow();
    };
});