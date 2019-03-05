 // ***********************************************************************************************
 // Program Name : [DBRD2100] List of ATM without Connection for a Period(접속이상 ATM 목록)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  :List of ATM without Connection for a Period(접속이상 ATM 목록)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2100", function($cbwrap, $cbfind, corebase){

	// document ready
	$cbfind(document).ready(function() {
		fn_srch();
		$cbfind("#BTN_SRCH").click(fn_srch);
		$cbfind("#GRD_ATM").cbSpread().pagesearch(fn_srch);
	});
	
	fn_srch = function() {		
		var option = {};
		var data   = {};
		var source = {};
		source = corebase.getSource("#DIV_SRCH2100");
		source = $cbfind("#GRD_ATM").cbSpread().getPageSource(source);
        		
	    data.SELECT_ABNRML_ATM_LIST = corebase.Input("selectList", "DBRD2100.SELECT_ABNRML_ATM_LIST", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", {PGM_ID:"DBRD2100"}); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {
			$cbfind("#GRD_ATM").cbSpread().cbBindData(output.SELECT_ABNRML_ATM_LIST, metadata.SELECT_ABNRML_ATM_LIST);
			$cbfind("#PGM_NM").cbVal(output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "");
		});
	}    
});


