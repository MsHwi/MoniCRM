 // ***********************************************************************************************
 // Program Name : [DBRD2040] Survey Response Rate by Area(지역별/월별 Survey 응답률)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Survey Response Rate by Area(지역별/월별 Survey 응답률)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2040", function($cbwrap, $cbfind, corebase){

	// document ready
	$cbfind(document).ready(function() {
		fn_init();
		$cbfind("#BTN_SRCH").click(fn_srch);
		fn_srch();
	});

	function fn_init(){
		var dataSource = [];
		$cbfind("#chart").kendoChart({
//            title: { text: "Survey Response Rate" , color: "#000000" },
            legend: { position: "bottom", margin: { top: -3, bottom:0 }},
            dataSource: { data: dataSource, datatype: "number" },
            seriesDefaults: { type: "pie", categoryField: "category",
            	labels: {            
                visible: true,
                position: "outsideEnd",
                background: "transparent",
                //color:"#d9dbe8",
                template: "#if (value > 0) {# #= category #: \n #= kendo.format('{0:N0}', value) # (#= kendo.format('{0:P}', percentage) #) #}#"
            	}
            },
            series:
            	[
//            		{ field: "value1", name: 'VALUE', overlay: { gradient: "none" }},
//                  { field: "value2", name: 'LABEL'}
                    {field: "value1",
                     name: 'RATIO',
                     overlay: { gradient: "none" }}
            	],
            valueAxis: { format: "{0}%" },
            seriesClick: function(e) {},
            tooltip: { visible: true, format: "{0}%", template: "#= category #: #= kendo.format('{0:N0}', value) # (#= kendo.format('{0:P}', percentage) #)", background: "#2f3b51", color:"#fff", border:{width:0}}
        });
	}
	
	fn_srch = function() {
        if(!gfn_validDate($cbfind("#DIV_SRCH2040 #SRCH_STR_DT").cbVal(), $cbfind("#DIV_SRCH2040 #SRCH_END_DT").cbVal(), "Y", "365")) {
            return false;
        }                
        
		var option = {};
		var data   = {};
		var source = {};
		source = corebase.getSource("#DIV_SRCH2040");
		source.PGM_ID = "DBRD2040";
        		
	    data.SELECT_SURV_RT = corebase.Input("execute", "DBRD2040.SELECT_SURV_RT", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {  
//	    corebase.procedure(source, "DBRD2040.SELECT_SURV_RT", function(output, metadata) {	
//        corebase.execute(source, "DBRD2040.SELECT_SURV_RT", function(output, metadata) {	    	    	
			// Set Chart
			var chart = $cbfind("#chart").data("kendoChart");
			var viewList = ["LABEL", "VALUE"]; //[카테고리명(파이별 데이터 이름),값]
			var viewColor = []; // Colors
			var chartType = "pie"; // Chart type(bar, pie, line)
			
			
	        var dataSource  = gfn_dataParse(output.SELECT_SURV_RT.resultList, viewList, viewColor, chartType);
	        chart.setDataSource(dataSource);
	        // Set chart options
	        chart.setOptions({
	        	title: { text: output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "" , color: "#000000" },
	            //seriesDefaults: { labels: {position: "outsideEnd" } },
	        	transitions: false,
	            seriesColors: [ "rgb(96,177,204)", "rgb(67,174,168)", "rgb(108,133,189)" ]
//	            categoryAxis: [ { field: "category", labels: { rotation: "auto", margin: { top: -5} }, reverse: false} ]
	        });
		});
	}
	
    // windows resize
    $cbfind(window).resize(function () {
        var chart = $cbfind("#chart").data("kendoChart");
        chart.refresh();
    });
    
});


