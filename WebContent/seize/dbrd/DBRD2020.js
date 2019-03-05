 // ***********************************************************************************************
 // Program Name : [DBRD2020] Average Number of CRM Request by Area(지역별/기간별/요일별 평균 CRM 요청건수)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Average Number of CRM Request by Area(지역별/기간별/요일별 평균 CRM 요청건수)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2020", function($cbwrap, $cbfind, corebase){

	// document ready
	$cbfind(document).ready(function() {
		fn_init();
		$cbfind("#BTN_SRCH").click(fn_srch);
    	fn_srch();
	});
	
	function fn_init(){
		var dataSource = [];
		$cbfind("#chart").kendoChart({
//            title: { text: "Average Number of CRM Request" , color: "#000000" },
            legend: { position: "bottom", margin: { top: -3, bottom:0 } },
            dataSource: { data: dataSource, datatype: "number" },
            seriesDefaults: { categoryField: "category" },
            series:
            	[
            		{ field: "value1", name: 'Average CRM request', type: "column", overlay: { gradient: "none" }, border: {width: 0}, tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}}},
                  	{ field: "value2", name: 'CRM request of this week', type: "column", overlay: { gradient: "none" }, border: {width: 0}, tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}}}
            	],
        	valueAxis: { labels: { format: "##,#" } },
//            chartArea: { height: 130, background :"#fff"},
            seriesClick: function(e) {console.log(e);},
            tooltip: { visible: true, format: "{0}", template: "#= series.name #: #= kendo.format('{0:N0}',value) #" }
        });
	}
	
	fn_srch = function() {
        if(!gfn_validDate($cbfind("#DIV_SRCH2020 #SRCH_STR_DT").cbVal(), $cbfind("#DIV_SRCH2020 #SRCH_END_DT").cbVal(), "Y", "365")) {
            return false;
        }        
        
		var option = {};
		var data   = {};
		var source = {};
		source = corebase.getSource("#DIV_SRCH2020");
		source.PGM_ID = "DBRD2020";
        		
	    data.SELECT_CRM_STAT = corebase.Input("execute", "DBRD2020.SELECT_CRM_STAT", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {     
//        corebase.procedure(source, "DBRD2020.SELECT_CRM_STAT", function(output, metadata) {
//        corebase.execute(source, "DBRD2020.SELECT_CRM_STAT", function(output, metadata) {
			// Set Chart
			var chart = $cbfind("#chart").data("kendoChart");
			var viewList = ["WD_CD", "CRM_AVG", "CRM_THISWEEK"]; // [카테고리명(x축: 요일),값1(평균 건수),값2(이번주 건수)]
			var viewColor = []; // Colors
			var chartType = ""; // Chart type(bar, pie, line)
			
	        var dataSource  = gfn_dataParse(output.SELECT_CRM_STAT.resultList, viewList, viewColor, chartType);
	        
	        chart.setDataSource(dataSource);
	        // Set chart options
	        chart.setOptions({
	        	title: { text: output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "" , color: "#000000" },
	            seriesColors: [ "rgb(67,174,168)", "rgb(83,99,189)" ]
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


