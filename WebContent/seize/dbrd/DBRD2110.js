 // ***********************************************************************************************
 // Program Name : [DBRD2110] Usage Trend of Favorite Transaction(Favorite 거래 적용 비율)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Usage Trend of Favorite Transaction(Favorite 거래 적용 비율)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2110", function($cbwrap, $cbfind, corebase){
	var nationCd = GV_USR.GBL_NATION_CD || "en-US";
	var dateFormat = kendo.cultures[nationCd].calendars.standard.patterns;
	
	// document ready
	$cbfind(document).ready(function() {
		fn_init();
		$cbfind("#BTN_SRCH").click(fn_srch);
    	fn_srch();
	});
	
	function fn_init(){		
		var dataSource = [];
		
		$cbfind("#chart").kendoChart({
		
//			renderAs: "canvas",
//            title: { text: "Usage Trend of Favorite Transaction" , color: "#000000" },
            legend: { position: "bottom", margin: { top: -3, bottom:0 } },
            dataSource: { data: dataSource, datatype: "number" },
            seriesDefaults: { type: "line", stack:true, categoryField: "category", opacity: 0.8},
            series:
            	[
            		{ field: "value1", name: 'Favorite used rate', tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}} }
               //   	{ field: "value2", name: 'unregisted', tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}} }
            	],
            categoryAxis: { crosshair: {  visible: true  }, field: "category", type: "date", baseUnit: "days", 
            	labels: { format: dateFormat.m            	
//                          , rotation: "auto"
            	}
            },
            valueAxis: { labels: { format: "{0}%" } },
            seriesClick: function(e) {},
            tooltip: { visible: true, shared: true, categoryFormat:dateFormat.d, format: "{0}%" },
            pannable: {
                lock: "y"
            },
            zoomable: {
              mousewheel: {
                lock: "y"
              },
              selection: {
                lock: "y"
              }
            }
        });
	}
	
	fn_srch = function() {
		
        if(!gfn_validDate($cbfind("#DIV_SRCH2110 #SRCH_STR_DT").cbVal(), $cbfind("#DIV_SRCH2110 #SRCH_END_DT").cbVal(), "Y", "365")) {
            return false;
        }        
                
		var option = {};
		var data   = {};
		var source = {};
		source = corebase.getSource("#DIV_SRCH2110");
		source.PGM_ID = "DBRD2110";
        		
	    data.SELECT_FAVR_STT = corebase.Input("execute", "DBRD2110.SELECT_FAVR_STT", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {  
        
//	    corebase.procedure(source, "DBRD2110.SELECT_FAVR_STT", function(output, metadata) {	
//        corebase.execute(source, "DBRD2110.SELECT_FAVR_STT", function(output, metadata) {	            
			// Set Chart
			var chart = $cbfind("#chart").data("kendoChart");
			var viewList = ["DT", "FAVR_RT"]; // [카테고리명(x축: 날짜),값1(Favorite 적용율)]
			var viewColor = []; // Colors
			var chartType = "line"; // Chart type(bar, pie, line)
			
	        var dataSource  = gfn_dataParse(output.SELECT_FAVR_STT.resultList, viewList, viewColor, chartType);
	        
	        chart.setDataSource(dataSource);	
	        
	        // Set chart options
	        chart.setOptions({
	        	title: { text: output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "" , color: "#000000" },
	        	transitions: false,
	            seriesColors: [ "rgb(56,176,166)" ]
	        });	        
	        
	        // if output is more than 6 / 31 / 150 / 270 : the label would be skipped 7 / 31 / 62 / 92.
	        var leng = output.SELECT_FAVR_STT.resultList.length;
	        if(leng > 7 && leng <= 31) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 7   // Render every 7th label
	        			      , format: dateFormat.m
	        			    }
	        			}
	        	 });
	        } else if(leng > 31 && leng <= 150) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 31  // Render every 31th label
	        			      , format: dateFormat.y 
	        			    }
	        			}
	        	 });
	        } else if(leng > 150 && leng <= 270) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 62 // Render every 62th label
	        			      , format: dateFormat.y 
	        			    }
	        			}
	        	 });
	        } else if(leng > 270) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 92 // Render every 92th label
	        			      , format: dateFormat.y 
	        			    }
	        			}
	        	 });
	        }else {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 0 // Render every label
	        			      , format: dateFormat.m
	        			    }
	        			}
	        	 });
	        }
		});
	}
	
    // windows resize
    $cbfind(window).resize(function () {
        var chart = $cbfind("#chart").data("kendoChart");
        chart.refresh();
    });
});