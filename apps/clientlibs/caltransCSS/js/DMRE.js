$(document).ready(function () {
    /* When user clicks on RE Reports tab below code is executed */
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy___guide-item-nav').click(function(){

        /* Shows loader/spinner image */
        $('#guideContainer-rootPanel-guideimage__').show();

        /* Retreive the Dispute table information from dispute dashboard table*/
        let disList = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");

        /* Count number of rows inside a table */
        let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount - 1;

        let currStatus = "";
        let disputeID = "";
        let meetingType = "";
        let meetingDate = "";
        let disputeCreatedDateRE = "";
        let jsonData;
		let xmlData,duedate;
        let data;
        var params = new URLSearchParams(window.location.search);
        var actualData=JSON.parse(window.atob(params.get('input')));
        var pendingAction;
        for (let i = 0; i < count; i++) {
            if (disList[i].tableItem11.value === 'Y') {
                currStatus = disList[i].table1_item3.value;
                disputeID = disList[i].table1_item1.value;
                meetingType = disList[i].table1_item2.value;
                pendingAction = disList[i].table1_item4.value;
                duedate = disList[i].table1_item6.value;
                //meetingDate = disList[i].table1_item7.value;
                break;
            }
        }
        guideBridge.resolveNode("SummPPRES.DisputeIDPPRES").value = "<p>" + disputeID + "</p>";
        guideBridge.resolveNode("SummPPRES.MeetingType1PPRES").value = "<p>" + meetingType + "</p>"; 
        guideBridge.resolveNode("SummPPRES.StatusPPRES").value = "<p>" + currStatus + "</p>"; ;
        jsonData = {
            "ea": guideBridge.resolveNode("ea").value,
            "district": guideBridge.resolveNode("district").value,
            "DisputeID": disputeID,
            "MeetingType": meetingType,
            "DRType": guideBridge.resolveNode("SelectDRADRB").value
        };
        let dollarUSLocale = Intl.NumberFormat('en-US');
        /* Below status are special statuses for duedate table column of a dispute */
        let curstatusObj1;
        if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
            curstatusObj1 = {
                "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                "RE REQUESTED RECONSIDERATION":"RE REQUESTED RECONSIDERATION",
                "CONTRACTOR REQUESTED RECONSIDERATION":"CONTRACTOR REQUESTED RECONSIDERATION",
                "CHAIR RESPONDED TO RECONSIDERATION REQUEST":"CHAIR RESPONDED TO RECONSIDERATION REQUEST",
                "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
                "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
            };
        }
        else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
            curstatusObj1 = {
                "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                "RE REQUESTED RECONSIDERATION":"RE REQUESTED RECONSIDERATION",
                "CONTRACTOR REQUESTED RECONSIDERATION":"CONTRACTOR REQUESTED RECONSIDERATION",
                "ADVISOR RESPONDED TO RECONSIDERATION REQUEST":"ADVISOR RESPONDED TO RECONSIDERATION REQUEST",
                "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
                "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
            };
        }
        $.ajax({
            type: 'GET',
            data: jsonData,
            url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
            success: function (data) {
				data1 = JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML);
            	disputeCreatedDateRE=data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
                if (data.getElementsByTagName("PPDueDate")[0].innerHTML != "null" || data.getElementsByTagName("PPDueDate")[0].innerHTML != "") {
                    guideBridge.resolveNode("PosPaperDuePPRES").value = "<p>" + data.getElementsByTagName("PPDueDate")[0].innerHTML + "</p>";
                } 
                else {
                    guideBridge.resolveNode("PosPaperDuePPRES").value = "<p></p>";
                }
                if (data.getElementsByTagName("MeetDate")[0].innerHTML !== "null" || data.getElementsByTagName("MeetDate")[0].innerHTML === "") {
                    guideBridge.resolveNode("MeetDatePPRES").value = "<p>" + data.getElementsByTagName("MeetDate")[0].innerHTML + "</p>";
                } 
                else {
                    guideBridge.resolveNode("MeetDatePPRES").value = "<p></p>";
                }
    			//to store recomsubdate when current status is recommendation submission of RE an Contractor
                if(currStatus.toUpperCase() in curstatusObj1){
                    if (data.getElementsByTagName("RecomCreatedDate")[0].innerHTML !== "null" || data.getElementsByTagName("RecomCreatedDate")[0].innerHTML === "") {
                        duedate = data.getElementsByTagName("RecomCreatedDate")[0].innerHTML;
                        //console.log(duedate);
                    } 
                }
            	var count1;
                //console.log(data1);
                if (typeof(data1.PCP_Details.Record.PCP_MAIN_PK) === "undefined") {
                    count1 = data1.PCP_Details.Record.length;
                } 
                else {
                    count1 = 1;
                }
                var tCount = guideBridge.resolveNode("Row1PPRES").instanceManager.instanceCount;
                for (let k = 0; k < tCount; k++) {
                    guideBridge.resolveNode("PCPPPRES.Row1PPRES").instanceManager.removeInstance(1);

       			}
        		if (count1 === 1) {
					guideBridge.resolveNode("Row1PPRES").instanceManager.addInstance(1);
                    guideBridge.resolveNode("Row1PPRES").tableItem11.value = data1.PCP_Details.Record.PCP_MAIN_PK;
                    if (data1.PCP_Details.Record.D_IPC_DESCR !== "null") {
                        guideBridge.resolveNode("Row1PPRES").tableItem12.value = data1.PCP_Details.Record.D_IPC_DESCR;
                    }
                    if (data1.PCP_Details.Record.E_EST_COST !== "null") {
                        guideBridge.resolveNode("Row1PPRES").tableItem13.value = "$ " + dollarUSLocale.format(data1.PCP_Details.Record.E_EST_COST);
                    }
                    if (data1.PCP_Details.Record.E_TIME_IMPACT !== "null") {
                        guideBridge.resolveNode("Row1PPRES").tableItem14.value = data1.PCP_Details.Record.E_TIME_IMPACT;
                    }
                    if (data1.PCP_Details.Record.E_REC_DATE !== "null") {
                        guideBridge.resolveNode("Row1PPRES").tableItem15.value = data1.PCP_Details.Record.E_REC_DATE;
                    }
                    if (data1.PCP_Details.Record.E_COMMENT_DATE !== "null") {
                        guideBridge.resolveNode("Row1PPRES").tableItem16.value = data1.PCP_Details.Record.E_COMMENT_DATE;
                    }
                    guideBridge.resolveNode("Row1PPRES").tableItem17.value = disputeCreatedDateRE;
                    guideBridge.resolveNode("Row1PPRES").visible = true;
                }
        		else {
                    for (var i = 0; i < data1.PCP_Details.Record.length; i++) {
						guideBridge.resolveNode("Row1PPRES").instanceManager.addInstance(1);
                        guideBridge.resolveNode("Row1PPRES").tableItem11.value = data1.PCP_Details.Record[i].PCP_MAIN_PK;
                        if (data1.PCP_Details.Record[i].D_IPC_DESCR !== "null") {
                            guideBridge.resolveNode("Row1PPRES").tableItem12.value = data1.PCP_Details.Record[i].D_IPC_DESCR;
                        }
                        if (data1.PCP_Details.Record[i].E_EST_COST !== "null") {
                            guideBridge.resolveNode("Row1PPRES").tableItem13.value = "$ " + dollarUSLocale.format(data1.PCP_Details.Record[i].E_EST_COST);
                        }
                        if (data1.PCP_Details.Record[i].E_TIME_IMPACT !== "null") {
                            guideBridge.resolveNode("Row1PPRES").tableItem14.value = data1.PCP_Details.Record[i].E_TIME_IMPACT;
                        }
                        if (data1.PCP_Details.Record[i].E_REC_DATE !== "null") {
                            guideBridge.resolveNode("Row1PPRES").tableItem15.value = data1.PCP_Details.Record[i].E_REC_DATE;
                        }
                        if (data1.PCP_Details.Record[i].E_COMMENT_DATE !== "null") {
                            guideBridge.resolveNode("Row1PPRES").tableItem16.value = data1.PCP_Details.Record[i].E_COMMENT_DATE;
                        }
                        guideBridge.resolveNode("Row1PPRES").tableItem17.value = disputeCreatedDateRE;
                        guideBridge.resolveNode("Row1PPRES").visible = true;
                    }
                }
    			tooltipDataRE(count1,data1);
    			guideBridge.resolveNode("FilePathsPPRES").value = "";
    			/* If dispute resolution type is DRB else DRA*/
    			if(guideBridge.resolveNode("SelectDRADRB").value === "DRB") {
                    statusCheckREChair(currStatus,meetingType,disputeID,actualData,pendingAction,duedate);
                }
                else{
                    statusCheckREDRA(currStatus,meetingType,disputeID,actualData,pendingAction,duedate);
                }
        	},
            error: function (data) {}
    	});
    });
});