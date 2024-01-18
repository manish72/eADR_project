$(document).ready(function () {
    /* When user clicks on Final Reports tab below code is executed */
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_965048011_copy___guide-item-nav').click(function(){
        guideBridge.resolveNode("DMRDPanel").visible = true;
        guideBridge.resolveNode("DisputeReportPanel").visible = false;

		/* Shows loader/spinner image */
        $('#guideContainer-rootPanel-guideimage__').show();

        /* Retreive the Dispute table information from dispute dashboard table*/
        let disList = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");

        /* Count number of rows inside a table */
        let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount - 1;
        let currStatus = "",disputeID = "",meetingType = "",meetingDate="";
        for (let i = 0; i < count; i++) {
            if (disList[i].tableItem11.value === 'Y') {
                currStatus = disList[i].table1_item3.value;
                disputeID = disList[i].table1_item1.value;
                meetingType = disList[i].table1_item2.value;
                meetingDate = disList[i].table1_item7.value;
                break;
            }
        }
        guideBridge.resolveNode("DMRDPanel.SummDMRPanel.disputeIDDMRMainPage").value = "<p>" + disputeID + "</p>";
        guideBridge.resolveNode("DMRDPanel.SummDMRPanel.StatusValueDMRMain").value = "<p>" + currStatus + "</p>";
        guideBridge.resolveNode("DMRDPanel.SummDMRPanel.MeetingTypeValueDMRMain").value = "<p>" + meetingType + "</p>"; 
        guideBridge.resolveNode("DMRDPanel.SummDMRPanel.MeetingDateValueDMRMain").value = "<p>" + meetingDate.replaceAll("-","/") + "</p>";
        let jsonData = {
            "ea": guideBridge.resolveNode("ea").value,
            "district": guideBridge.resolveNode("district").value,
            "DisputeID": disputeID,
            "RecordType" : "DMR",
            "DRType": guideBridge.resolveNode("SelectDRADRB").value
        };
        let dollarUSLocale = Intl.NumberFormat('en-US');
        $.ajax({ 
            type: 'GET', 
            data: jsonData,
            url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
            success: function (data) { 
                //console.log(data);
                //console.log(JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML));
                data1 = JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML);
                let  disputeCreatedDate = data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
                /*guideBridge.resolveNode("StatusValueDMRMain").value = "<p>"+data.getElementsByTagName("OverallStatus")[0].innerHTML+"</p>";
                if(data.getElementsByTagName("PPDueDate")[0].innerHTML!=="null"||data.getElementsByTagName("PPDueDate")[0].innerHTML!=="")
                {
                    guideBridge.resolveNode("MeetingTypeValueDMRMain").value =  "<p>"+data.getElementsByTagName("MeetingType")[0].innerHTML+"</p>";
                }
                else
                {
                    guideBridge.resolveNode("MeetingTypeValueDMRMain").value =  "<p>---</p>";
                }
                if(data.getElementsByTagName("MeetDate")[0].innerHTML!=="null"||data.getElementsByTagName("MeetDate")[0].innerHTML==="")
                {
                    guideBridge.resolveNode("MeetingDateValueDMRMain").value =  "<p>"+data.getElementsByTagName("MeetDate")[0].innerHTML+"</p>";
                }
                else
                {
                    guideBridge.resolveNode("MeetingDateValueDMRMain").value =  "<p>---</p>";
                }*/
                var count1;
                if(typeof(data1.PCP_Details.Record.PCP_MAIN_PK) === "undefined"){
                  count1 = data1.PCP_Details.Record.length;
                }
                else{
                  count1 = 1;
                }
                var tCount = guideBridge.resolveNode("Row1DMRMainPage").instanceManager.instanceCount;
                for(var k=0; k<tCount; k++){
                    guideBridge.resolveNode("DMRMainPageTable.Row1DMRMainPage").instanceManager.removeInstance(1);
                }
                if(count1 === 1){
                    guideBridge.resolveNode("Row1DMRMainPage.instanceManager").addInstance(1);
                    guideBridge.resolveNode("Row1DMRMainPage.tableItem11").value = data1.PCP_Details.Record.PCP_MAIN_PK;
                    if(data1.PCP_Details.Record.D_IPC_DESCR!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem12").value = data1.PCP_Details.Record.D_IPC_DESCR;
                    }
                    if(data1.PCP_Details.Record.E_EST_COST!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem13").value = "$ "+dollarUSLocale.format(data1.PCP_Details.Record.E_EST_COST);
                    }
                    if(data1.PCP_Details.Record.E_TIME_IMPACT!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem14").value = data1.PCP_Details.Record.E_TIME_IMPACT;
                    }
                    if(data1.PCP_Details.Record.E_REC_DATE!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem15").value = data1.PCP_Details.Record.E_REC_DATE;
                    }
                    if(data1.PCP_Details.Record.E_COMMENT_DATE!=="null"){
                      guideBridge.resolveNode("Row1DMRMainPage.tableItem16").value = data1.PCP_Details.Record.E_COMMENT_DATE;
                    }
                    guideBridge.resolveNode("Row1DMRMainPage.tableItem17").value = disputeCreatedDate;
                    guideBridge.resolveNode("Row1DMRMainPage").visible = true;
                }
                else{
                  for(var i=0; i<data1.PCP_Details.Record.length; i++){
                  	//alert(i);
                    guideBridge.resolveNode("Row1DMRMainPage.instanceManager").addInstance(1);
                    guideBridge.resolveNode("Row1DMRMainPage.tableItem11").value = data1.PCP_Details.Record[i].PCP_MAIN_PK;
                    if(data1.PCP_Details.Record[i].D_IPC_DESCR!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem12").value = data1.PCP_Details.Record[i].D_IPC_DESCR;
                    }
                    if(data1.PCP_Details.Record[i].E_EST_COST!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem13").value = "$ "+dollarUSLocale.format(data1.PCP_Details.Record[i].E_EST_COST);
                    }
                    if(data1.PCP_Details.Record[i].E_TIME_IMPACT!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem14").value = data1.PCP_Details.Record[i].E_TIME_IMPACT;
                    }
                    if(data1.PCP_Details.Record[i].E_REC_DATE!=="null"){
                        guideBridge.resolveNode("Row1DMRMainPage.tableItem15").value = data1.PCP_Details.Record[i].E_REC_DATE;
                    }
                    if(data1.PCP_Details.Record[i].E_COMMENT_DATE!=="null"){
                      guideBridge.resolveNode("Row1DMRMainPage.tableItem16").value = data1.PCP_Details.Record[i].E_COMMENT_DATE;
                    }
                    guideBridge.resolveNode("Row1DMRMainPage.tableItem17").value = disputeCreatedDate;
                    guideBridge.resolveNode("Row1DMRMainPage").visible = true;
                   } 
                }
        		/* Hide the loader/spinner image*/
				$('#guideContainer-rootPanel-guideimage__').hide();
            },
            error: function(err){
                /* Hide the loader/spinner image*/
        		$('#guideContainer-rootPanel-guideimage__').hide();
            }
         });
		//for status 29
		if(currStatus.toLowerCase() === "final report generated"){
            if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
				guideBridge.resolveNode("GenPDFDMRDRB").enabled = false;
                guideBridge.resolveNode("PreviewDMRDRB").visible = false;
            }
            else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
				guideBridge.resolveNode("GenPDFDMRDRA").enabled = false;
                guideBridge.resolveNode("PreviewDMRDRA").visible = false;
            }
        }
		//for status 30
		else if(currStatus.toLowerCase() === "document has been signed"){
            if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
				guideBridge.resolveNode("GenPDFDMRDRB").enabled = false;
                guideBridge.resolveNode("PreviewDMRDRB").visible = true;
            }
            else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
				guideBridge.resolveNode("GenPDFDMRDRA").enabled = false;
                guideBridge.resolveNode("PreviewDMRDRA").visible = true;
            }
        }
		else{
            if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
				guideBridge.resolveNode("GenPDFDMRDRB").enabled = true;
                guideBridge.resolveNode("PreviewDMRDRB").visible = false;
            }
            else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
				guideBridge.resolveNode("GenPDFDMRDRA").enabled = true;
                guideBridge.resolveNode("PreviewDMRDRA").visible = false;
            }
        }
    });
});