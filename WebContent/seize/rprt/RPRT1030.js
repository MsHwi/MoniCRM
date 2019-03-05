
 // ***********************************************************************************************
 // Program Name : [RPRT1030] Coupon usage rate
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 28
 // Description  : Coupon usage rate
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
corebase.wrapping("#RPRT1030", function($cbwrap, $cbfind, corebase){	
	// document ready
	$cbfind(document).ready(function() {
			
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
	    
	    // Check date period
	    $cbfind("input[name='SRCH_RD_DT_RPRT']").change(function () {
	        gfn_checkDatePicker($cbfind("#DIV_SRCH_RPRT #SRCH_STR_DT"), $cbfind("#DIV_SRCH_RPRT #SRCH_END_DT"), $cbfind(this).cbVal());
	    });
	});

	function fn_srch(){		
    	if (!gfn_validDate($("#DIV_SRCH #SRCH_STR_DT").cbVal(), $("#DIV_SRCH #SRCH_END_DT").cbVal(), "")) {
			return;
        }
    	
	    var source = corebase.getSource("#DIV_SRCH");	    	    
	    source = $cbfind("#GRD_MKT").cbSpread().getPageSource(source);
	    
	    corebase.selectList(source, "RPRT1030.SELECT_CPN_MKT_INFO", function(output, metadata) {	
	        $cbfind("#GRD_MKT").cbSpread().cbBindData(output, metadata);
	    });
		
	}
	
	function fn_grid(){
	    var rowObj = $cbwrap.cbSpread("#GRD_MKT").getRowObject();
	    var MKT_NO = rowObj.MKT_NO;
	    $cbfind("#DIV_SRCH_RPRT #MKT_NO").cbVal(MKT_NO);
	}
	
	// File export function
	function fn_exptFile(type) {	  
    	if (!gfn_validDate($("#DIV_SRCH_RPRT #SRCH_STR_DT").cbVal(), $("#DIV_SRCH_RPRT #SRCH_END_DT").cbVal(), "")) {
			return;
        }
    	
    	var option = {};
        var data   = {};
        var source = {};
        source = corebase.getSource("#DIV_SRCH_RPRT");
        
        data.SELECT_EXSTCHK_MKT_INFO = corebase.Input("select", "RPRT1030.SELECT_EXSTCHK_MKT_INFO", source); // Marketing Existing Check
		option.data = data;				        
        corebase.ajax(option, function(output, metadata) {   				    	
            var exstChk = output.SELECT_EXSTCHK_MKT_INFO.metadata.resultCount;

            if(exstChk < 1) {
                CBMsg.error(cb.locMessage("msg.2257", "There is no existing coupon marketing. Please check the marketing number you inputted."));
                $cbfind("#DIV_SRCH_RPRT #MKT_NO").focus();
                return;
            }
            
            if(!cb.confirm(type == "xlsx" ? cb.locMessage("msg.257", "Do you want export Excel file?") : cb.locMessage("msg.1657", "Do you want export PDF file?"))) return;
            
	        options = {};
	        data   = {};
	        
		    var detail = [];
		    var header = {};		    
		    
		    header.exportParam = {};
		    header.exportParam.programId = GV_PGM.programId;
		    header.exportParam.fileName = gfn_getProgramTitle(GV_PGM.programId, "_") + "_" + CB.today();
		    header.exportParam.title = gfn_getProgramTitle(GV_PGM.programId);	    
		    header.exportParam.strDate =  source.SRCH_STR_DT;
		    header.exportParam.endDate = source.SRCH_END_DT;
		    header.exportParam.mkt_nm = output.SELECT_EXSTCHK_MKT_INFO.result.MKT_NM;
		    header.exportParam.mkt_no = source.MKT_NO;
		    header.exportParam.state = source.AREA_CD;
		    header.exportParam.city = source.CITY_CD;
		    header.exportParam.cust_grd = source.CUST_GRD;
		    header.exportParam.cust_age_from = source.CUST_AGE_FROM;
		    header.exportParam.cust_age_to = source.CUST_AGE_TO;
		    header.exportParam.cust_gndr = source.CUST_GNDR_CD;
		    header.exportParam.crd_no = source.CRD_NO;		
		    
		    header.exportParam.state_txt = $cbfind(AREA_CD).cbText();
		    header.exportParam.city_txt = $cbfind(CITY_CD).cbText();
		    header.exportParam.cust_grd_txt = $cbfind(CUST_GRD).cbText();
		    header.exportParam.cust_gndr_txt = $cbfind(CUST_GNDR_CD).cbText();		    
		    
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
        });
	}
});
