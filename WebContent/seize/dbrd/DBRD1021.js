 // ***********************************************************************************************
 // Program Name : [DBRD1021] Dashboard Authority Management(대시보드 권한 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 09. 06
 // Description  : Dashboard Authority Management(대시보드 권한 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#DBRD1021", function($cbwrap, $cbfind, corebase) {
    
	var $gridL = $cbwrap.cbSpread("#GRD_LEFT");
	var $gridR = $cbwrap.cbSpread("#GRD_RIGHT");
	
    // document ready
    $cbfind(document).ready(function() {
        // Button click
        $cbfind("#BTN_SRCH").click(fn_srch);        
        $cbfind("#BTN_SAVE").click(fn_save);
    	$cbfind("#BTN_LEFT").click(fn_moveToLeft);
    	$cbfind("#BTN_RIGHT").click(fn_moveToRight);
        
    	// initialize when authority changed
//        $cbfind("#USR_GRP_ATHT").change(fn_init);
    	
//    	fn_init();
        fn_srch();
    });

	// Initialize Function
	function fn_init() {
        $cbwrap.cbSpread("#GRD_RIGHT").clear();
        $cbwrap.cbSpread("#GRD_LEFT").clear();
        
//        $cbfind("#BTN_SAVE").cbElemDisable(true);  // disable save button
	}   
	 
    // search function
    function fn_srch(){    	
		var option = {};
	    var data    = {};
		var source  = corebase.getSource("#DIV_SRCH");
		
	    data.SELECT_DBRD_LYOT     = corebase.Input("selectList", "DBRD1021.SELECT_DBRD_LYOT",  source);
	    data.SELECT_AUTH_DBRD_LYOT = corebase.Input("selectList", "DBRD1021.SELECT_AUTH_DBRD_LYOT", source);
	    
	    option.data = data;
	    
	    corebase.ajax(option, function (output, metadata) {	       
	    	$cbfind("#GRD_LEFT").cbBindData(output.SELECT_DBRD_LYOT);
	        $cbfind("#GRD_RIGHT").cbBindData(output.SELECT_AUTH_DBRD_LYOT);
	        $cbfind("#GRP_ATHT").cbVal(source.USR_GRP_ATHT); 
	        $cbwrap.each(output.SELECT_AUTH_DBRD_LYOT, function (idx, data) {
	        	for (var i = 0; i < output.SELECT_DBRD_LYOT.length; i++) {
	        		if(data.LYOT_ID == $gridL.getValue(0,i)){
	        			$gridL.removeRow(i);
	        		}	        		
				}    
//	        	$cbfind("#BTN_SAVE").cbElemDisable(false);  // enable save button
	        });
	    });
    }
    
    // right button click function
    function fn_moveToRight(){
    	var selectedRow = $gridL.activeRowIndex();
    	
    	if (selectedRow < 0 ) {
	    	CBMsg.error(cb.locMessage("msg.207", "There is no selected item."));
	        return;
	    }
    	
    	var listL = $gridL.getAll();
    	var listR = $gridR.getAll();
    	var newList = new Array();
    	
    	$.each(listL, function( idx, data ){            
    		
    		if( idx != selectedRow) {
    			newList.push(data);
                return;
            }
            if( idx == selectedRow) {
            	listR.push(data);
                return;
            }    		    		
        });
    	
    	//sort object array
    	newList.sort(compare);
    	listR.sort(compare);    	
    	
    	$gridL.setList(newList);
    	$gridR.setList(listR);
    }
    
    // left button click function
    function fn_moveToLeft(){
    	var selectedRow = $gridR.activeRowIndex();
    	
    	if (selectedRow < 0 ) {
	    	CBMsg.error(cb.locMessage("msg.207", "There is no selected item."));
	        return;
	    }
    	
    	var listL = $gridL.getAll();
    	var listR = $gridR.getAll();
    	var newList = new Array();
    	
    	$.each(listR, function( idx, data ){            
    		
    		if( idx != selectedRow) {
    			newList.push(data);
                return;
            }
            if( idx == selectedRow) {
            	listL.push(data);
                return;
            }    		    		
        });
    	//sort object array
    	newList.sort(compare);
    	listL.sort(compare);
    	
    	$gridL.setList(listL);
    	$gridR.setList(newList);
    }
    
    // object array sort function
    function compare(a, b) {
	  if (a.LYOT_ID < b.LYOT_ID)
	    return -1;
	  if (a.LYOT_ID > b.LYOT_ID)
	    return 1;
	  return 0;
    }
    
    // Save function
    function fn_save(){
        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
            return;
            }
        
	    var source  = corebase.getSource($gridR.getAll());
        var options = {};
        var data = {};
        var sourceForDelete = {};
        for (var i = 0; i < source.length; i++) {
	    	source[i].GRP_ATHT = $cbfind("#GRP_ATHT").cbVal();     // 그룹 권한
		}
        sourceForDelete.GRP_ATHT = $cbfind("#GRP_ATHT").cbVal();          
        
        data.DELETE_DBRD_ATHT	   = corebase.Input("delete", "DBRD1021.DELETE_DBRD_ATHT", sourceForDelete);
        data.INSERT_AUTH_DBRD_LYOT = corebase.Input("insert", "DBRD1021.INSERT_AUTH_DBRD_LYOT", source);

        options.data = data;
        corebase.ajax(options, function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
            fn_init();
            fn_srch();
        });        
    }
});
