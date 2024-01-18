$(document).ready(function () {
    /* When user clicks on Chair/Advisor Reports tab below code is executed */
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy___guide-item-nav').click(function () {

		/* Shows loader/spinner image */
        $('#guideContainer-rootPanel-guideimage__').show();

        /* Retreive the Dispute table information from dispute dashboard table*/
        let disList = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");

        /* Clear all the date fields data inside first and second accordions */
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair.PosPaperDueDateDash").value = "";
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair.MeetDateDash").value = "";
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair.PosPaperDueDateDashResch").value = "";
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair.MeetDateDashResch").value = "";

        /* Count number of rows inside a table */
        let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount - 1;
        let currStatus = "";
        let disputeID = "";
        let meetingType = "";
        let meetingDate = "";
        var disputeCreatedDate = "";
        var disdata;
        var params = new URLSearchParams(window.location.search);
		var actualData=JSON.parse(window.atob(params.get('input')));
        for (let i = 0; i < count; i++) {
            if (disList[i].tableItem11.value === 'Y') {
                currStatus = disList[i].table1_item3.value;
                disputeID = disList[i].table1_item1.value;
                meetingType = disList[i].table1_item2.value;
                //meetingDate = disList[i].table1_item7.value;
                break;
            }
        }
        guideBridge.resolveNode("SummRecChair.DisputeIDRecChair").value = "<p>" + disputeID + "</p>";
        guideBridge.resolveNode("SummRecChair.MeetingType1RecChair").value = "<p>" + meetingType + "</p>";
        guideBridge.resolveNode("SummRecChair.StatusRecChair").value = "<p>" + currStatus + "</p>";
        let jsonData = {
            "ea": guideBridge.resolveNode("ea").value,
            "district": guideBridge.resolveNode("district").value,
            "DisputeID": disputeID,
            "MeetingType": meetingType,
            "DRType": guideBridge.resolveNode("SelectDRADRB").value
        };
        let dollarUSLocale = Intl.NumberFormat('en-US');
        $.ajax({
            type: 'GET',
            data: jsonData,
            url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
            success: function (data) {
            	disdata = data;
				data1 = JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML);
            	disputeCreatedDate=data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
            	guideBridge.resolveNode("DisputeCreatedDatePM").value = disputeCreatedDate.split("-")[2]+disputeCreatedDate.split("-")[0]+disputeCreatedDate.split("-")[1];
            	guideBridge.resolveNode("DisputeCreatedDatePMResch").value = disputeCreatedDate.split("-")[2]+disputeCreatedDate.split("-")[0]+disputeCreatedDate.split("-")[1];
				let posDate = data.getElementsByTagName("PPDueDate")[0].innerHTML;
            	if (posDate !== null && posDate !== "") {
                    guideBridge.resolveNode("PosPaperDueRecChair").value = "<p>" + data.getElementsByTagName("PPDueDate")[0].innerHTML + "</p>";
            		guideBridge.resolveNode("PosPaperDueDateDash").value = posDate.split("/")[2]+posDate.split("/")[0]+posDate.split("/")[1];
            		guideBridge.resolveNode("PosPaperDueDateDashResch").value = posDate.split("/")[2]+posDate.split("/")[0]+posDate.split("/")[1];
                } 
                else {
                    guideBridge.resolveNode("PosPaperDueRecChair").value = "<p>---</p>";
                }
                let meetDate = data.getElementsByTagName("MeetDate")[0].innerHTML;
                if (meetDate !== null && meetDate !== "") {
                    guideBridge.resolveNode("MeetDateRecChair").value = "<p>" + data.getElementsByTagName("MeetDate")[0].innerHTML + "</p>";
            		guideBridge.resolveNode("MeetDateDash").value = meetDate.split("/")[2]+meetDate.split("/")[0]+meetDate.split("/")[1];
            		guideBridge.resolveNode("MeetDateDashResch").value = meetDate.split("/")[2]+meetDate.split("/")[0]+meetDate.split("/")[1];
                } 
                else {
                    guideBridge.resolveNode("MeetDateRecChair").value = "<p>---</p>";
                }
            	var count1;
                //console.log(data1);
                if (typeof(data1.PCP_Details.Record.PCP_MAIN_PK) === "undefined") {
                    count1 = data1.PCP_Details.Record.length;
                } 
                else {
                    count1 = 1;
                }
                var tCount = guideBridge.resolveNode("Row1RecChair").instanceManager.instanceCount;
                for (let k = 0; k < tCount; k++) {
                    guideBridge.resolveNode("PCPRecChair.Row1RecChair").instanceManager.removeInstance(1);

       			}
        		if (count1 === 1) {
					guideBridge.resolveNode("Row1RecChair").instanceManager.addInstance(1);
                    guideBridge.resolveNode("Row1RecChair").tableItem11.value = data1.PCP_Details.Record.PCP_MAIN_PK;
                    if (data1.PCP_Details.Record.D_IPC_DESCR !== "null") {
                        guideBridge.resolveNode("Row1RecChair").tableItem12.value = data1.PCP_Details.Record.D_IPC_DESCR;
                    }
                    if (data1.PCP_Details.Record.E_EST_COST !== "null") {
                        guideBridge.resolveNode("Row1RecChair").tableItem13.value = "$ " + dollarUSLocale.format(data1.PCP_Details.Record.E_EST_COST);
                    }
                    if (data1.PCP_Details.Record.E_TIME_IMPACT !== "null") {
                        guideBridge.resolveNode("Row1RecChair").tableItem14.value = data1.PCP_Details.Record.E_TIME_IMPACT;
                    }
                    if (data1.PCP_Details.Record.E_REC_DATE !== "null") {
                        guideBridge.resolveNode("Row1RecChair").tableItem15.value = data1.PCP_Details.Record.E_REC_DATE;
                    }
                    if (data1.PCP_Details.Record.E_COMMENT_DATE !== "null") {
                        guideBridge.resolveNode("Row1RecChair").tableItem16.value = data1.PCP_Details.Record.E_COMMENT_DATE;
                    }
                    guideBridge.resolveNode("Row1RecChair").tableItem17.value = disputeCreatedDate;
                    guideBridge.resolveNode("Row1RecChair").visible = true;
                }
        		else {
                    for (var i = 0; i < data1.PCP_Details.Record.length; i++) {
						guideBridge.resolveNode("Row1RecChair").instanceManager.addInstance(1);
                        guideBridge.resolveNode("Row1RecChair").tableItem11.value = data1.PCP_Details.Record[i].PCP_MAIN_PK;
                        if (data1.PCP_Details.Record[i].D_IPC_DESCR !== "null") {
                            guideBridge.resolveNode("Row1RecChair").tableItem12.value = data1.PCP_Details.Record[i].D_IPC_DESCR;
                        }
                        if (data1.PCP_Details.Record[i].E_EST_COST !== "null") {
                            guideBridge.resolveNode("Row1RecChair").tableItem13.value = "$ " + dollarUSLocale.format(data1.PCP_Details.Record[i].E_EST_COST);
                        }
                        if (data1.PCP_Details.Record[i].E_TIME_IMPACT !== "null") {
                            guideBridge.resolveNode("Row1RecChair").tableItem14.value = data1.PCP_Details.Record[i].E_TIME_IMPACT;
                        }
                        if (data1.PCP_Details.Record[i].E_REC_DATE !== "null") {
                            guideBridge.resolveNode("Row1RecChair").tableItem15.value = data1.PCP_Details.Record[i].E_REC_DATE;
                        }
                        if (data1.PCP_Details.Record[i].E_COMMENT_DATE !== "null") {
                            guideBridge.resolveNode("Row1RecChair").tableItem16.value = data1.PCP_Details.Record[i].E_COMMENT_DATE;
                        }
                        guideBridge.resolveNode("Row1RecChair").tableItem17.value = disputeCreatedDate;
                        guideBridge.resolveNode("Row1RecChair").visible = true;
                    }
                }
    			tooltipDataChAd(count1,data1);
        		guideBridge.resolveNode("FilePathsRecomChair").value = "";
    			if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
					statusCheckChair(currStatus,meetDate,meetingType,disputeID,actualData,data);
                }
    			else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
					statusCheckAdvisor(currStatus,meetDate,meetingType,disputeID,actualData,data);
                }

        	},
            error: function (data) {}
    	});

    });
});