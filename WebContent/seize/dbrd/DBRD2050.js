 // ***********************************************************************************************
 // Program Name : [DBRD2050] Marketing Process Status(마케팅 진행 현황)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Marketing Process Status(마케팅 진행 현황)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2050", function($cbwrap, $cbfind, corebase){
	
	// document ready
	$cbfind(document).ready(function() {
		fn_srch();
		$cbfind("#BTN_SRCH").click(fn_srch);
	});
	
	fn_srch = function() {
		var option = {};
		var data   = {};
		var source = {};
		source.PGM_ID = "DBRD2050";
        		
	    data.SELECT_MRK_PRCS_STT = corebase.Input("select", "DBRD2050.SELECT_MRK_PRCS_STT", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {
			$cbfind("#DTL_MRT_STT").cbBindData(output.SELECT_MRK_PRCS_STT);
			$cbfind("#PGM_NM").cbVal(output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "");
		});
	}
	
	fn_move = function(type, date){
		
        var source = {};
        source.MKT_TYP_CD = type;
		if(date == 'today'){
			source.SRCH_DT = $cbfind("#DTL_MRT_STT #TODAY").cbVal();
		} else if (date == 'yesterday'){
			source.SRCH_DT = $cbfind("#DTL_MRT_STT #YSTDY").cbVal();
		} else if (date == 'tomorrow'){
			source.SRCH_DT = $cbfind("#DTL_MRT_STT #TMRRW").cbVal();
		}
        
        corebase.refresh("MRKT1010", source);
	}
});


