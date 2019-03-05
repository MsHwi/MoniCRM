 // ***********************************************************************************************
 // Program Name : [DBRD2090] List of Marketing Ending up(월별 만료예정 마케팅 목록)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : List of Marketing Ending up(월별 만료예정 마케팅 목록)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2090", function($cbwrap, $cbfind, corebase){

	// document ready
	$cbfind(document).ready(function() {
		fn_srch();
		$cbfind("#BTN_SRCH").click(fn_srch);
		$cbfind("#GRD_MKT").cbSpread().pagesearch(fn_srch);
	});
	
	fn_srch = function() {    
		
		var option = {};
		var data   = {};
		var source = {};
		source = corebase.getSource("#DIV_SRCH2090");
		source = $cbfind("#GRD_MKT").cbSpread().getPageSource(source);
		source.PGM_ID = "DBRD2090";
        		
	    data.SELECT_MRK_LIST_END = corebase.Input("selectList", "DBRD2090.SELECT_MRK_LIST_END", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {
			$cbwrap.cbSpread("#GRD_MKT").cbBindData(output.SELECT_MRK_LIST_END, metadata.SELECT_MRK_LIST_END);
			$cbfind("#PGM_NM").cbVal(output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "");
		});
	}    
});


