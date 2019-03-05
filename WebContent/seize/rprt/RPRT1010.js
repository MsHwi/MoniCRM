
 // ***********************************************************************************************
 // Program Name : [RPRT1010] Marketing file sending result list
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 28
 // Description  : Marketing file sending result list
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
corebase.wrapping("#RPRT1010", function($cbwrap, $cbfind, corebase){	
	// document ready
	$cbfind(document).ready(function() {
			
	    fn_init();
		
		// Useable export pdf
	    if (CBConfig.runtime.useReports) { $cbfind("#BTN_PDF").show(); }	
	    
	    $cbfind("#BTN_SRCH").click(fn_srch);
	    
	    // enter event
	    gfn_setEnter("#DIV_SRCH", fn_srch);
	 	
	    $cbfind("#BTN_EXCEL").click(function() { // Excel download Button
	        fn_exptFile("xlsx");
	    });
	    $cbfind("#BTN_PDF").click(function() { // PDF download Button
	        fn_exptFile("pdf");
	    });
	    
	    // grid click
	    $cbwrap.cbSpread("#GRD_MKT").click(fn_grid);
	    
	    // grid paging
		$cbfind("#GRD_MKT").cbSpread().pagesearch(fn_srch);
	    
	    // Check date period
	    $cbfind("input[name='SRCH_RD_DT']").change(function () {
	        gfn_checkDatePicker($cbfind("#DIV_SRCH #SRCH_STR_DT"), $cbfind("#DIV_SRCH #SRCH_END_DT"), $cbfind(this).cbVal());
	    });  
	});
	
	//Initialize function
	function fn_init(){
		$cbfind("#BTN_EXCEL").cbElemDisable(true);
		$cbfind("#BTN_PDF").cbElemDisable(true);
	}
	
	// Marketing grid click function
	function fn_grid(){
		$cbfind("#BTN_EXCEL").cbElemDisable(false);
		$cbfind("#BTN_PDF").cbElemDisable(false);
	}
	
	function fn_srch(){		
    	if (!gfn_validDate($("#DIV_SRCH #SRCH_STR_DT").cbVal(), $("#DIV_SRCH #SRCH_END_DT").cbVal(), "")) {
			return;
        }
    	
	    var source = corebase.getSource("#DIV_SRCH");	    	    
	    source = $cbfind("#GRD_MKT").cbSpread().getPageSource(source);
	    
	    corebase.selectList(source, "RPRT1010.SELECT_MKT_INFO", function(output, metadata) {	
	        $cbfind("#GRD_MKT").cbSpread().cbBindData(output, metadata);
			fn_init();
	    });
		
	}
	
	// File export function
	function fn_exptFile(type) {	  
	    var rowObj = $cbwrap.cbSpread("#GRD_MKT").getRowObject();
	    var MKT_NO = rowObj.MKT_NO;
        if(CBData.isEmpty(MKT_NO)) {
            CBMsg.error(cb.locMessage("msg.2300", "You must select a marketing."));
            return;
		}
	    if(!cb.confirm(type == "xlsx" ? cb.locMessage("msg.257", "Do you want export Excel file?") : cb.locMessage("msg.1657", "Do you want export PDF file?"))) return;

	    var options = {};
	    var data= {};
	    var source = {};
	    var detail = [];
	    var header = {};
	       	    
	    header.exportParam = {};
	    header.exportParam.programId = GV_PGM.programId;
	    header.exportParam.fileName = gfn_getProgramTitle(GV_PGM.programId, "_") + "_" + CB.today();
	    header.exportParam.title = gfn_getProgramTitle(GV_PGM.programId);	    
	    header.exportParam.strDate =  rowObj.MKT_STR_DT;
	    header.exportParam.endDate = rowObj.MKT_END_DT;
	    header.exportParam.mkt_nm = rowObj.MKT_NM;
	    header.exportParam.mkt_desc = rowObj.MEMO;
	    header.exportParam.mkt_no = MKT_NO;
	    header.exportParam.gbl_lang_cd = GV_USR.GBL_LANG_CD;  
	    
		var nationCd = GV_USR.GBL_NATION_CD || "en-US";		
		header.exportParam.language_cd = nationCd.substring(0,2);
		header.exportParam.country_cd = nationCd.substring(3,5);
	    
	    if (type == "xlsx"){
	    	header.exportParam.IS_IGNORE_PAGINATION = true;
	    }
		
	    header.exportParam.format = type;
	    header.exportParam.target = $cbwrap.cbSpread("#GRD_MKT");
	    header.exportParam.detail = detail;

	    data.SELECT_1 = corebase.Input("selectList", "RPRT1010.SELECT_1", source, header); // select query
	    
	    options.method = "exportReport";//"exportExcel", "exportReport";
	    options.data = data;
	    
	    corebase.ajax(options);
	}
});
