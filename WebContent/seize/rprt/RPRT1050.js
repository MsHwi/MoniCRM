
 // ***********************************************************************************************
 // Program Name : [RPRT1050] File sending count and file size
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 29
 // Description  : File sending count and file size
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
corebase.wrapping("#RPRT1050", function($cbwrap, $cbfind, corebase){	
	// document ready
	$cbfind(document).ready(function() {
			
		// Useable export pdf
	    if (CBConfig.runtime.useReports) { $cbfind("#BTN_PDF").show(); }		
	 	
	    $cbfind("#BTN_EXCEL").click(function() { // Excel download Button
	        fn_exptFile("xlsx");
	    });
	    $cbfind("#BTN_PDF").click(function() { // PDF download Button
	        fn_exptFile("pdf");
	    });
	    
	    // Check date period
	    $cbfind("input[name='SRCH_RD_DT']").change(function () {
	        gfn_checkDatePicker($cbfind("#DIV_SRCH #SRCH_STR_DT"), $cbfind("#DIV_SRCH #SRCH_END_DT"), $cbfind(this).cbVal());
	    });
	});

	// File export function
	function fn_exptFile(type) {	  
    	if (!gfn_validDate($("#DIV_SRCH #SRCH_STR_DT").cbVal(), $("#DIV_SRCH #SRCH_END_DT").cbVal(), "")) {
			return;
        }
    	
    	if(!cb.confirm(type == "xlsx" ? cb.locMessage("msg.257", "Do you want export Excel file?") : cb.locMessage("msg.1657", "Do you want export PDF file?"))) return;
    	
    	var options = {};
        var data   = {};
        var source = {};
	    var detail = [];
	    var header = {};
        source = corebase.getSource("#DIV_SRCH");		    
	    
	    header.exportParam = {};
	    header.exportParam.programId = GV_PGM.programId;
	    header.exportParam.fileName = gfn_getProgramTitle(GV_PGM.programId, "_") + "_" + CB.today();
	    header.exportParam.title = gfn_getProgramTitle(GV_PGM.programId);	    
	    header.exportParam.strDate =  source.SRCH_STR_DT;
	    header.exportParam.endDate = source.SRCH_END_DT;   
	    header.exportParam.gbl_lang_cd = GV_USR.GBL_LANG_CD;    
	    
		var nationCd = GV_USR.GBL_NATION_CD || "en-US";		
		header.exportParam.language_cd = nationCd.substring(0,2);
		header.exportParam.country_cd = nationCd.substring(3,5);
	    
	    if (type == "xlsx"){
	    	header.exportParam.IS_IGNORE_PAGINATION = true;
	    }
	    
	    header.exportParam.format = type;
	    header.exportParam.target = $cbwrap.cbSpread("#GRD_RPT");
	    header.exportParam.detail = detail;	    
	    
	    data.SELECT_1 = corebase.Input("selectList", "RPRT1010.SELECT_1", source, header); // select query
	    
	    options.method = "exportReport";//"exportExcel", "exportReport";
	    options.data = data;

	    corebase.ajax(options);
	}
});