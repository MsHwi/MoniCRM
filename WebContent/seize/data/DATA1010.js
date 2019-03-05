 // ***********************************************************************************************
 // Program Name : [DATA1010] Item Code Management
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 06
 // Description  : Item Code Management(항목코드 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
corebase.wrapping ("#DATA1010", function ($cbwrap, $cbfind, corebase){
	// Gloval Variable
	var pgmSource = GV_PGM.source;
//	var GBL_LANG_CD     = corebase.getGlobalData("GV_USR").GBL_LANG_CD;
	var isLrgNewCode       = false;	// 대분류 신규 코드 여부
	var isSmlNewCode       = false;	// 소분류 신규 코드 여부
	var regex = /^[a-zA-Z0-9_:-]+$/; 	// Regex for CD
	
	// document ready
	$cbfind(document).ready(function() {
		// 데이터 레이아웃 화면에서 호출 된 것이 아니라면 select 버튼 숨김
		if(CBData.isEmpty(pgmSource) || CBData.isEmpty(pgmSource.TYPE) || pgmSource.TYPE != "MODAL") {
			$cbwrap.cbSpread("#GRD_LRGCLAS").colHide(5);
		}
		
		// Enter Key Event
	    gfn_setEnter("#LRGCLAS_AREA #DIV_SRCH", fn_srchLrg);
	    gfn_setEnter("#SMLCLAS_AREA #DIV_SRCH", fn_srchSml);
	    
	    // Button click - Large Code
		$cbfind("#LRGCLAS_AREA #BTN_SCH").click(fn_srchLrg);		
		$cbfind("#LRGCLAS_AREA #BTN_NEW_CODE").click(fn_newLrg);		
		$cbfind("#LRGCLAS_AREA #BTN_SAVE").click(fn_saveLrg);		
		$cbfind("#LRGCLAS_AREA #BTN_DEL").click(fn_deleteLrg);
		
		// Button click - Small Code
		$cbfind("#SMLCLAS_AREA #BTN_SCH").click(fn_srchSml);	
		$cbfind("#SMLCLAS_AREA #BTN_NEW_CODE").click(fn_newSml);
		$cbfind("#SMLCLAS_AREA #BTN_SAVE").click(fn_saveSml);		
		$cbfind("#SMLCLAS_AREA #BTN_DEL").click(fn_deleteSml);
		
		// Grid Paging
		$("#GRD_LRGCLAS").cbSpread().pagesearch(fn_srchLrg);
		$("#GRD_SMLCLAS").cbSpread().pagesearch(fn_srchSml);
		
		// Grid click
		$cbwrap.cbSpread("#GRD_LRGCLAS").click(fn_gridLrg);
		$cbwrap.cbSpread("#GRD_SMLCLAS").click(fn_gridSml);
		
		fn_init();		
		fn_srchLrg();
	});
	
	// Initialize function
	function fn_init() {
		isLrgNewCode = false;
		isSmlNewCode = false;
		$cbfind("#LRGCLAS_AREA #GRD_LRGCLAS, #SMLCLAS_AREA #GRD_SMLCLAS").cbClearOData();
		$cbfind("#LRGCLAS_AREA #DIV_DTL, #SMLCLAS_AREA #DIV_DTL").cbClearOData();
		
		$cbfind("#LRGCLAS_AREA #DIV_DTL, #SMLCLAS_AREA #DIV_DTL").cbElemDisable(true);    // disable all
	    $cbfind("#LRGCLAS_AREA #BTN_SAVE, #SMLCLAS_AREA #BTN_SAVE").cbElemDisable(true);  // disable save buttons
	    $cbfind("#LRGCLAS_AREA #BTN_DEL, #SMLCLAS_AREA #BTN_DEL").cbElemDisable(true);    // disable delete buttons
	}
	
	// Initialize function
	function fn_initSml() {
		isLrgNewCode = false;
		isSmlNewCode = false;
		$cbfind("#SMLCLAS_AREA #GRD_SMLCLAS").cbClearOData();
		$cbfind("#SMLCLAS_AREA #DIV_DTL").cbClearOData();
		
		$cbfind("#SMLCLAS_AREA #DIV_DTL").cbElemDisable(true);    // disable all
	    $cbfind("#SMLCLAS_AREA #BTN_SAVE").cbElemDisable(true);  // disable save buttons
	    $cbfind("#SMLCLAS_AREA #BTN_DEL").cbElemDisable(true);    // disable delete buttons
	}
	
	// Large Code Search function
	function fn_srchLrg(){		
		fn_init();	
        $cbwrap.cbSpread("#GRD_SMLCLAS").clear(); // Grid Initialize
        
		var source = {};
		source = corebase.getSource("#LRGCLAS_AREA #DIV_SRCH");
	    source = $cbfind("#GRD_LRGCLAS").cbSpread().getPageSource(source); // Grid Page Source

	    corebase.selectList ( source, "DATA1010.SELECT_LRGCLAS_LIST", function (output, metadata){
	        $cbfind("#GRD_LRGCLAS").cbSpread().cbBindData(output, metadata); // page (cbSpread() and metadata Add)
	        $cbwrap.cbSpread("#GRD_LRGCLAS").active("", 0);
	    });
	}
	
	// Large Code grid click function
	function fn_gridLrg(){		
		isLrgNewCode = false;
		
	    var row = $cbfind("#GRD_LRGCLAS").cbSpread().getRowObject();
	    $cbfind("#LRGCLAS_AREA #DIV_DTL").cbBindData(row);
	    
	    $cbfind("#LRGCLAS_AREA #BTN_SAVE").cbElemDisable(false);  					// enable save buttons
	    $cbfind("#LRGCLAS_AREA #BTN_DEL").cbElemDisable(false);   					// enable delete buttons
        $cbfind("#LRGCLAS_AREA #DIV_DTL").cbElemDisable(false);   					// enable all
        $cbfind("#LRGCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").cbElemDisable(true); 	// disable code input box
        
		$cbfind("#SMLCLAS_AREA #DIV_DTL").cbClearOData();
		
		$cbfind("#SMLCLAS_AREA #DIV_DTL").cbElemDisable(true);    // disable all
	    $cbfind("#SMLCLAS_AREA #BTN_SAVE").cbElemDisable(true);  // disable save buttons
	    $cbfind("#SMLCLAS_AREA #BTN_DEL").cbElemDisable(true);    // disable delete buttons
        //$cbfind("#LRGCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD, #LRGCLAS_AREA #DIV_DTL #USE_YN").css("background-color", "#FFFFFF"); // input box background color : white
        
        fn_srchSml();
	}	
	
	// Large Code area new button function
	function fn_newLrg(){    
		$cbfind("#LRGCLAS_AREA #DIV_DTL").cbClearOData();
		$cbfind("#LRGCLAS_AREA #DIV_DTL").cbElemDisable(false);
	    $cbfind("#LRGCLAS_AREA #BTN_SAVE").cbElemDisable(false);   // enable save buttons
	    $cbfind("#LRGCLAS_AREA #BTN_DEL").cbElemDisable(false);    // enable delete buttons
	    isLrgNewCode = true;     
        $cbfind("#LRGCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").focus();		
	}
	
	// Large Code save function
	function fn_saveLrg(){       
	    var source = {};
	    source = corebase.getSource("#LRGCLAS_AREA #DIV_DTL");
	    
	    // when you register new large code
	    if(isLrgNewCode){	
	    	if (!regex.test($cbfind("#LRGCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").cbVal())) {
            	CBMsg.error(cb.locMessage("msg.1848", "Unacceptable character(s). Please check your input and try again."));
                $cbfind("#LRGCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").focus();
                return;
	    	}
	    	
	        var option = {};
	        var data   = {};
	        
	        data.DUPCHK_LRCLAS = corebase.Input("select", "DATA1010.SELECT_DUP_CHK_LRCLAS", source); // Duplication Check
	        option.data = data;
	        
	        corebase.ajax( option, function(output, metadata) {				
	            var dupCnt = output.DUPCHK_LRCLAS.result.CNT;
	            if(dupCnt > 0) {
	            	CBMsg.error(cb.locMessage("msg.86", "Same Code(L) value already exists."));
	                $cbfind("#LRGCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").focus();
	                return;
	            } else {            
	    	    	
	    	        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
	    	            return;
	    	            }
	    	        
					corebase.insert(source, "DATA1010.MERGE_LRGCLAS", function(output, metadata) {
						CBMsg.error(cb.locMessage("msg.306", "Save completed."));

						fn_init();
						fn_srchLrg();
						isLrgNewCode = false;
					});    
	            }
	        });
	    } else { // when you modify existing large code
	        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
	            return;
	            }
	        
			corebase.insert(source, "DATA1010.MERGE_LRGCLAS", function(output, metadata) {
				CBMsg.error(cb.locMessage("msg.306", "Save completed."));

				fn_init();
				fn_srchLrg();
			});    
	    }
	}
	
	// Large Code delete function
	function fn_deleteLrg(){
		if (!cb.confirm(cb.locMessage("msg.171", "Are you sure you want to delete?"))) {
			return;
		}

		var source = {};
		source = $cbwrap.cbSpread("#GRD_LRGCLAS").getRowObject();

		corebase.update(source, "DATA1010.DELETE_LRGCLAS", function(output, metadata) {
			CBMsg.error(cb.locMessage("msg.168", "Removed."));
			fn_init();
			fn_srchLrg();
		});
		isLrgNewCode = false;
	}
	
	// Small Code Search function
	function fn_srchSml(){				
		isSmlNewCode = false;
        $cbwrap.cbSpread("#GRD_SMLCLAS").clear(); // Grid Initialize
        $cbfind("#SMLCLAS_AREA #DIV_DTL").cbClearOData();
        
        var source = {};
		var sourceForSml = {};		
		source = $cbfind("#GRD_LRGCLAS").cbSpread().getRowObject();
		sourceForSml = corebase.getSource("#SMLCLAS_AREA #DIV_SRCH");
		sourceForSml.ITEM_LRGCLAS_CD = source.ITEM_LRGCLAS_CD;
	    $cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").cbVal(source.ITEM_LRGCLAS_CD);
	    $cbfind("#SMLCLAS_AREA #DIV_SRCH #ITEM_LRGCLAS_CD").cbVal(source.ITEM_LRGCLAS_CD); 
	    		
		sourceForSml = $cbfind("#GRD_SMLCLAS").cbSpread().getPageSource(sourceForSml); // Grid Page Source
		
	    corebase.selectList ( sourceForSml, "DATA1010.SELECT_SMLCLAS_LIST", function (output, metadata){
	        $cbfind("#GRD_SMLCLAS").cbSpread().cbBindData(output, metadata); // page (cbSpread() and metadata Add)
	    });
	}
	
	// When you click on small code grid
	function fn_gridSml(){
		isSmlNewCode = false;
		
	    var row = $cbfind("#GRD_SMLCLAS").cbSpread().getRowObject();
	    $cbfind("#SMLCLAS_AREA #DIV_DTL").cbBindData(row);	
	    $cbfind("#SMLCLAS_AREA #BTN_SAVE").cbElemDisable(false);  					// enable save buttons
	    $cbfind("#SMLCLAS_AREA #BTN_DEL").cbElemDisable(false);   					// enable delete buttons
        $cbfind("#SMLCLAS_AREA #DIV_DTL").cbElemDisable(false);   					// enable all
        $cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_SMLCLAS_CD").cbElemDisable(true); 	// disable code input box
	}
	
	// small code area 'New' button function
	function fn_newSml(){
		$cbfind("#SMLCLAS_AREA #DIV_DTL").cbClearOData();
	    $cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_LRGCLAS_CD").cbVal($cbfind("#SMLCLAS_AREA #DIV_SRCH #ITEM_LRGCLAS_CD").cbVal());
		$cbfind("#SMLCLAS_AREA #DIV_DTL").cbElemDisable(false);
	    $cbfind("#SMLCLAS_AREA #BTN_SAVE").cbElemDisable(false);   // enable save buttons
	    $cbfind("#SMLCLAS_AREA #BTN_DEL").cbElemDisable(false);    // enable delete buttons
	    isSmlNewCode = true;    	    

        $cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_SMLCLAS_CD").focus();	
	}
	
	// Small code save function
	function fn_saveSml(){           
    	    var source = {};
    	    source = corebase.getSource("#SMLCLAS_AREA #DIV_DTL");		
    	    
    	    // when you register new small code
    	    if(isSmlNewCode){	
    	    	if (!regex.test($cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_SMLCLAS_CD").cbVal())) {
                	CBMsg.error(cb.locMessage("msg.1848", "Unacceptable character(s). Please check your input and try again."));
                	$cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_SMLCLAS_CD").cbVal('');
                    $cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_SMLCLAS_CD").focus();
                    return;
    	    	}
    	    	
    	        var option = {};
    	        var data   = {};
    	        
    	        data.DUPCHK_SMCLAS = corebase.Input("select", "DATA1010.SELECT_DUP_CHK_SMLCLAS", source); // Duplication Check
    	        option.data = data;
    	        
    	        corebase.ajax( option, function(output, metadata) {				
    	            var dupCnt = output.DUPCHK_SMCLAS.result.CNT;
    	            if(dupCnt > 0) {
    	            	CBMsg.error(cb.locMessage("msg.86", "Same Code(L) value already exists."));
    	                $cbfind("#SMLCLAS_AREA #DIV_DTL #ITEM_SMLCLAS_CD").focus();
    	                return;
    	            } else {                	    	    	
    	    	        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
    	    	            return;
    	    	            }
    	    	        
    					corebase.insert(source, "DATA1010.MERGE_SMLCLAS", function(output, metadata) {
    						CBMsg.error(cb.locMessage("msg.306", "Save completed."));

//    						fn_init();
//    						fn_srchLrg();
    						fn_initSml();
    	    				fn_srchSml();
    						isSmlNewCode = false;
    					});    
    	            }
    	        });
    	    } else { // when you modify existing small code
    	        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
    	            return;
    	            }
    	        
    			corebase.insert(source, "DATA1010.MERGE_SMLCLAS", function(output, metadata) {
    				CBMsg.error(cb.locMessage("msg.306", "Save completed."));

//    				fn_init();
//    				fn_srchLrg();
    				fn_initSml();
    				fn_srchSml();
    			});    
    	    }    	    
	}
	
	// Small code delete function
	function fn_deleteSml(){
		if (!cb.confirm(cb.locMessage("msg.171", "Are you sure you want to delete?"))) {
			return;
		}

		var source = {};
		source = $cbwrap.cbSpread("#GRD_SMLCLAS").getRowObject();

		corebase.update(source, "DATA1010.DELETE_SMLCLAS", function(output, metadata) {
			CBMsg.error(cb.locMessage("msg.168", "Removed."));
//			fn_init();
//			fn_srchLrg();
			fn_initSml();
			fn_srchSml();
		});
	}
	
	// When you click 'Select' button
	$cbwrap.cbSpread("#GRD_LRGCLAS").buttonclicked(function(eobj){

		var rowObj = $cbfind("#GRD_LRGCLAS").cbSpread().getRowObject(eobj[5]);
		
		if (!cb.confirm(cb.locMessage("msg.1836", "Do you want to use this code?"))) {
			return;
		}

        corebase.closeWindow(rowObj);
       
    });
});
