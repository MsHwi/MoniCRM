
 // ***********************************************************************************************
 // Program Name : [RPRT1060] Usage Trend of Favorite Transaction
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 29
 // Description  : Usage Trend of Favorite Transaction
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
corebase.wrapping("#RPRT1060", function($cbwrap, $cbfind, corebase){	
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
	});

	// File export function
	function fn_exptFile(type) {	  
		
        if( !CBDate.isValidDate($("#SRCH_YM").cbVal()) ) {
            CBMsg.error(cb.locMessage("msg.76", "Please input according to the standard date format"));
            $("#SRCH_YM").focus();
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

	    header.exportParam.strDate =  source.SRCH_YM + "01";
	    if (source.SRCH_YM == CB.today().substring(0, 6)){
	    	header.exportParam.endDate = fn_getYesterdayDate();
	    } else {
	    	header.exportParam.endDate = source.SRCH_YM + getMaxDay(source.SRCH_YM.substring(0,3), source.SRCH_YM.substring(4));   
	    }
	    
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
	
    function getMaxDay(strYear, strMonth) {

        if(strMonth == 12){
            strMonth = 0;
        }
        var oDate = new Date(strYear, strMonth, 1);
        
        oDate = new Date(oDate - (24*60*60*1000)); 
        var lastday = oDate.getDate() + "";
        oDate = null;
        
        return lastday;
    }
    
	function fn_getYesterdayDate(){
		var today = CB.today();
    	var today = new Date(today.substring(0,4), (parseInt(today.substring(4,6)) - 1), today.substring(6,8));
    	var yesterday = kendo.toString(kendo.date.addDays(today, -1), "yyyyMMdd");
    	return yesterday;
	}
});