
 // ***********************************************************************************************
 // Program Name : [RPRT1040] TOP 10 ATMs of the most failed to send data and their failed count
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 29
 // Description  : TOP 10 ATMs of the most failed to send data and their failed count
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
corebase.wrapping("#RPRT1040", function($cbwrap, $cbfind, corebase){	
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
	        fn_checkDatePicker($cbfind("#DIV_SRCH #SRCH_STR_DT"), $cbfind("#DIV_SRCH #SRCH_END_DT"), $cbfind(this).cbVal());
	    });
	});
	
	// datepicker from~to auto setting
	function fn_checkDatePicker(dtpFrom, dtpTo, type) {
		var today = CB.today();
	    switch (type) {
	    case "W" :
	        dtpFrom.cbVal(CBDate.dateAdd("d", -7, today, CB.dateformat("today")));//"yyyymmdd"));
	        dtpTo.cbVal(CBDate.dateAdd("d", -1, today, CB.dateformat("today")));//"yyyymmdd"));
	        break;
	    case "M" :
	        dtpFrom.cbVal(CBDate.dateAdd("m", -1, today, CB.dateformat("today")));//"yyyymmdd"));
	        dtpTo.cbVal(CBDate.dateAdd("d", -1, today, CB.dateformat("today")));//"yyyymmdd"));
	        break;
	    default :
	        CBMsg.error(cb.locMessage("msg.295", "You entered a wrong information."));
	    } 
	}

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
//	    header.exportParam.endDate = source.SRCH_END_DT;
	    if (source.SRCH_END_DT == CB.today()){
	    	header.exportParam.endDate = fn_getYesterdayDate();
	    } else {
	    	header.exportParam.endDate = source.SRCH_END_DT;   
	    }
	    header.exportParam.state = source.AREA_CD;
	    header.exportParam.city = source.CITY_CD;
	    header.exportParam.atmAmount = source.TOP_ATM_AMNT;
	    
	    header.exportParam.state_txt = $cbfind(AREA_CD).cbText();
	    header.exportParam.city_txt = $cbfind(CITY_CD).cbText();
	    
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
	
	function fn_getYesterdayDate(){
		var today = CB.today();
    	var today = new Date(today.substring(0,4), (parseInt(today.substring(4,6)) - 1), today.substring(6,8));
    	var yesterday = kendo.toString(kendo.date.addDays(today, -1), "yyyyMMdd");
    	return yesterday;
	}
});