$(document).ready(function(){ 
    $("#guideContainer-rootPanel-panel_652182736-panel___guide-item-nav").click(function(){
        var params = new URLSearchParams(window.location.search);
        var b=params.get('input');
        guidelib.util.GuideUtil.navigateToURL('/content/forms/af/caltrans-eadr/welcome-statement.html?wcmmode=disabled&input='+b,'SAME_TAB');
    });
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop___guide-item-nav').click(function(){
        		let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount-1;
        		let meetingType,disputeID;
        		let disList =  guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");
        		for(var i=0;i < count;i++){
                    if(disList[i].tableItem11.value==='Y'){
                        meetingType = disList[i].table1_item3.value;
                        disputeID = disList[i].table1_item1.value;
                        break;
                    }
                }
        		if(typeof(disputeID)!=="undefined" || typeof(meetingType)!=="undefined"){
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop-guidetextdraw_104653__').html("<p><b>Dispute Meeting ID :</b> "+disputeID+"</p>");
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop-guidetextdraw_copy__').html("<p><b>Traditional/Informal :</b> "+meetingType+"</p>");
                }
                else{
					$('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop-guidetextdraw_104653__').html("<p><b>Dispute Meeting ID :</b> --</p>");
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop-guidetextdraw_copy__').html("<p><b>Traditional/Informal :</b> --</p>");
                }
        		//alert(disputeID);
        		let jsonData = {
                    "ea" : guideBridge.resolveNode("ea").value,
                    "district" : guideBridge.resolveNode("district").value,
                    "DisputeID" : disputeID,
                    "MeetingType" : meetingType,
                    "DRType" : guideBridge.resolveNode("SelectDRADRB").value
                };            
        		let dollarUSLocale = Intl.NumberFormat('en-US');
                $.ajax({ 
                    type: 'GET', 
                    data: jsonData,
                    url: 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
                    success: function (data) {  
                        //console.log(data);
						//console.log(JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML));
                    	data1=JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML);
                    	disputeCreatedDate=data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
						guideBridge.resolveNode("StatusPPCon").value = "<p>"+data.getElementsByTagName("OverallStatus")[0].innerHTML+"</p>";
                    	if(data.getElementsByTagName("PPDueDate")[0].innerHTML!="null"||data.getElementsByTagName("PPDueDate")[0].innerHTML!="")
                    	{
							guideBridge.resolveNode("PosPaperDuePPCon").value =  "<p>"+data.getElementsByTagName("PPDueDate")[0].innerHTML+"</p>";
                		}
                       	else
                       	{
							guideBridge.resolveNode("PosPaperDuePPCon").value =  "<p></p>";
                        }
                        if(data.getElementsByTagName("MeetDate")[0].innerHTML!=="null"||data.getElementsByTagName("MeetDate")[0].innerHTML==="")
                    	{
                    		guideBridge.resolveNode("MeetDatePPCon").value =  "<p>"+data.getElementsByTagName("MeetDate")[0].innerHTML+"</p>";
                		}
						else
                       	{
							guideBridge.resolveNode("MeetDatePPCon").value =  "<p></p>";
                        }
                    	var count1;
                    	//console.log(data1);
                        if(typeof(data1.PCP_Details.Record.PCP_MAIN_PK)==="undefined"){
                          count1=data1.PCP_Details.Record.length;
                        }
                        else{
                          count1=1;
                        }
                       	var tCount = guideBridge.resolveNode("Row1RecChair").instanceManager.instanceCount;
                        for(let k=0; k<tCount; k++){
                            	guideBridge.resolveNode("PCPPPCon.Row1RecChair").instanceManager.removeInstance(1);

                		}
                        if(count1===1){
                            guideBridge.resolveNode("Row1RecChair").instanceManager.addInstance(1);
                            guideBridge.resolveNode("Row1RecChair").tableItem11.value=data1.PCP_Details.Record.PCP_MAIN_PK;
                            if(data1.PCP_Details.Record.D_IPC_DESCR!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem12.value=data1.PCP_Details.Record.D_IPC_DESCR;
                            }
                            if(data1.PCP_Details.Record.E_EST_COST!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem13.value="$ "+dollarUSLocale.format(data1.PCP_Details.Record.E_EST_COST);
                            }
                            if(data1.PCP_Details.Record.E_TIME_IMPACT!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem14.value=data1.PCP_Details.Record.E_TIME_IMPACT;
                            }
                            if(data1.PCP_Details.Record.E_REC_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem15.value=data1.PCP_Details.Record.E_REC_DATE;
                            }
                            if(data1.PCP_Details.Record.E_COMMENT_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem16.value=data1.PCP_Details.Record.E_COMMENT_DATE;
                            }
                            guideBridge.resolveNode("Row1RecChair").tableItem17.value=disputeCreatedDate;
                            guideBridge.resolveNode("Row1RecChair").visible=true;
                        }
                        else{
                          for(var i=0; i<data1.PCP_Details.Record.length; i++){
                          //alert(i);
                            guideBridge.resolveNode("Row1RecChair").instanceManager.addInstance(1);
                            guideBridge.resolveNode("Row1RecChair").tableItem11.value=data1.PCP_Details.Record[i].PCP_MAIN_PK;
                            if(data1.PCP_Details.Record[i].D_IPC_DESCR!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem12.value=data1.PCP_Details.Record[i].D_IPC_DESCR;
                            }
                            if(data1.PCP_Details.Record[i].E_EST_COST!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem13.value="$ "+dollarUSLocale.format(data1.PCP_Details.Record[i].E_EST_COST);
                            }
                            if(data1.PCP_Details.Record[i].E_TIME_IMPACT!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem14.value=data1.PCP_Details.Record[i].E_TIME_IMPACT;
                            }
                            if(data1.PCP_Details.Record[i].E_REC_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem15.value=data1.PCP_Details.Record[i].E_REC_DATE;
                            }
                            if(data1.PCP_Details.Record[i].E_COMMENT_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem16.value=data1.PCP_Details.Record[i].E_COMMENT_DATE;
                            }
                            guideBridge.resolveNode("Row1RecChair").tableItem17.value=disputeCreatedDate;
                            guideBridge.resolveNode("Row1RecChair").visible=true;
                           } 
                        }
                    if(data.getElementsByTagName("RecomCount")[0].innerHTML==="0"){
						guideBridge.resolveNode("ClickRecomPPCon").enabled=false;
                    }
                    else if(data.getElementsByTagName("RecomCount")[0].innerHTML==="1"){
                        guideBridge.resolveNode("ClickRecomPPCon").enabled=true;
                    }
                },
                  error: function(err){
                    //console.log("something went wrong");
                }
       			 });
	});
	$('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy___guide-item-nav').click(function(){
        		let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount-1;
        		let meetingType,disputeID;
        		let disList =  guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");
        		for(var i=0;i < count;i++){
                    if(disList[i].tableItem11.value==='Y'){
                        meetingType = disList[i].table1_item3.value;
                        disputeID = disList[i].table1_item1.value;
                        break;
                    }
                }
        		if(typeof(disputeID)!=="undefined" || typeof(meetingType)!=="undefined"){
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy-guidetextdraw_1046536176__').html("<p><b>Dispute Meeting ID :</b> "+disputeID+"</p>");;
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy-guidetextdraw__').html("<p><b>Traditional/Informal :</b> "+meetingType+"</p>");
                }
                else{
					$('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy-guidetextdraw_1046536176__').html("<p><b>Dispute Meeting ID :</b> --</p>");
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy-guidetextdraw__').html("<p><b>Traditional/Informal :</b> --</p>");
                }
        		let jsonData = {
                    "ea" : guideBridge.resolveNode("ea").value,
                    "district" : guideBridge.resolveNode("district").value,
                    "DisputeID" : disputeID,
                    "MeetingType" : meetingType,
                    "DRType" : guideBridge.resolveNode("SelectDRADRB").value
                };            
                //console.log(jsonData);
        		let dollarUSLocale = Intl.NumberFormat('en-US');
                $.ajax({ 
                    type: 'GET', 
                    data: jsonData,
                    url: 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
                    success: function (data) {  
                        //console.log(data);
						//console.log(JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML));
                    	//alert("");
                    	data1=JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML);
                    	disputeCreatedDate=data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
						guideBridge.resolveNode("StatusPPRES").value = "<p>"+data.getElementsByTagName("OverallStatus")[0].innerHTML+"</p>";
                    	if(data.getElementsByTagName("PPDueDate")[0].innerHTML!="null"||data.getElementsByTagName("PPDueDate")[0].innerHTML!="")
                    	{
							guideBridge.resolveNode("PosPaperDuePPRES").value =  "<p>"+data.getElementsByTagName("PPDueDate")[0].innerHTML+"</p>";
                		}
                       	else
                       	{
							guideBridge.resolveNode("PosPaperDuePPRES").value =  "<p></p>";
                        }
                        if(data.getElementsByTagName("MeetDate")[0].innerHTML!=="null"||data.getElementsByTagName("MeetDate")[0].innerHTML==="")
                    	{
                    		guideBridge.resolveNode("MeetDatePPRES").value =  "<p>"+data.getElementsByTagName("MeetDate")[0].innerHTML+"</p>";
                		}
						else
                       	{
							guideBridge.resolveNode("MeetDatePPRES").value =  "<p></p>";
                        }
                    	var count1;
                    	//console.log(data1);
                        if(typeof(data1.PCP_Details.Record.PCP_MAIN_PK)==="undefined"){
                          count1=data1.PCP_Details.Record.length;
                        }
                        else{
                          count1=1;
                        }
                       	var tCount = guideBridge.resolveNode("Row1PPRES").instanceManager.instanceCount;
                        for(let k=0; k<tCount; k++){
                            	guideBridge.resolveNode("PCPPPRES.Row1PPRES").instanceManager.removeInstance(1);

                		}
                        if(count1===1){
                            guideBridge.resolveNode("Row1PPRES").instanceManager.addInstance(1);
                            guideBridge.resolveNode("Row1PPRES").tableItem11.value=data1.PCP_Details.Record.PCP_MAIN_PK;
                            if(data1.PCP_Details.Record.D_IPC_DESCR!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem12.value=data1.PCP_Details.Record.D_IPC_DESCR;
                            }
                            if(data1.PCP_Details.Record.E_EST_COST!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem13.value="$ "+dollarUSLocale.format(data1.PCP_Details.Record.E_EST_COST);
                            }
                            if(data1.PCP_Details.Record.E_TIME_IMPACT!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem14.value=data1.PCP_Details.Record.E_TIME_IMPACT;
                            }
                            if(data1.PCP_Details.Record.E_REC_DATE!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem15.value=data1.PCP_Details.Record.E_REC_DATE;
                            }
                            if(data1.PCP_Details.Record.E_COMMENT_DATE!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem16.value=data1.PCP_Details.Record.E_COMMENT_DATE;
                            }
                            guideBridge.resolveNode("Row1PPRES").tableItem17.value=disputeCreatedDate;
                            guideBridge.resolveNode("Row1PPRES").visible=true;
                        }
                        else{
                          for(var i=0; i<data1.PCP_Details.Record.length; i++){
                          //alert(i);
                            guideBridge.resolveNode("Row1PPRES").instanceManager.addInstance(1);
                            guideBridge.resolveNode("Row1PPRES").tableItem11.value=data1.PCP_Details.Record[i].PCP_MAIN_PK;
                            if(data1.PCP_Details.Record[i].D_IPC_DESCR!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem12.value=data1.PCP_Details.Record[i].D_IPC_DESCR;
                            }
                            if(data1.PCP_Details.Record[i].E_EST_COST!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem13.value="$ "+dollarUSLocale.format(data1.PCP_Details.Record[i].E_EST_COST);
                            }
                            if(data1.PCP_Details.Record[i].E_TIME_IMPACT!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem14.value=data1.PCP_Details.Record[i].E_TIME_IMPACT;
                            }
                            if(data1.PCP_Details.Record[i].E_REC_DATE!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem15.value=data1.PCP_Details.Record[i].E_REC_DATE;
                            }
                            if(data1.PCP_Details.Record[i].E_COMMENT_DATE!=="null"){
                                guideBridge.resolveNode("Row1PPRES").tableItem16.value=data1.PCP_Details.Record[i].E_COMMENT_DATE;
                            }
                            guideBridge.resolveNode("Row1PPRES").tableItem17.value=disputeCreatedDate;
                            guideBridge.resolveNode("Row1PPRES").visible=true;
                           } 
                        }
                        if(data.getElementsByTagName("RecomCount")[0].innerHTML==="0"){
                            guideBridge.resolveNode("ClickRecomPPRES").enabled=false;
                        }
                        else if(data.getElementsByTagName("RecomCount")[0].innerHTML==="1"){
                            guideBridge.resolveNode("ClickRecomPPRES").enabled=true;
                        }
                	},
                    error: function(err){

                	}
       			 });
	});
	$('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy___guide-item-nav').click(function(){

				//alert(tablenewDispute.tablenewDisputeRow1.instanceManager.instanceCount);
                var meetingType,disputeID;
                var disputeRecChair = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager");
                for(var i=0;i < disputeRecChair.instanceCount-1;i++){
                    if(disputeRecChair.instances[i].tableItem11.value==='Y'){
                      meetingType = disputeRecChair.instances[i].table1_item3.value;
                      disputeID = disputeRecChair.instances[i].table1_item1.value;
                      break;
                    }
                }
                var jsonData = {
                    "ea" : guideBridge.resolveNode("ea").value,
                    "district" : guideBridge.resolveNode("district").value,
                    "DisputeID" : disputeID,
                    "MeetingType" : meetingType,
                    "DRType" : guideBridge.resolveNode("SelectDRADRB").value
                }; 
                
                //console.log(jsonData);
                
                $.ajax({ 
                    type: 'GET', 
                    data: jsonData,
                    url: 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetNewDisputeCreatedDate',
                    success: function (data) {  
                     //console.log(data);
                      guideBridge.resolveNode("NotifyAllDatesButton").visible = true;    
                      guideBridge.resolveNode("DisputeCreatedDatePM").value = data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
                      guideBridge.resolveNode("DisputeCreatedDatePMResch").value = data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
                      guideBridge.resolveNode("PosPaperDueDateDash").value = "";
                      guideBridge.resolveNode("MeetDateDash").value = "";
                      guideBridge.resolveNode("SuccDates").visible = false;
                      guideBridge.resolveNode("ErrorDates").visible = false;
                      guideBridge.resolveNode("SuccDates").value = "";
                      guideBridge.resolveNode("ErrorDates").value = "";
                    },
                    error: function(err){
                      
                    }
                });


        		/*let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount-1;
        		let meetingType,disputeID;
        		let disList =  guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");
        		for(var i=0;i < count;i++){
                    if(disList[i].tableItem11.value==='Y'){
                        meetingType = disList[i].table1_item3.value;
                        disputeID = disList[i].table1_item1.value;
                        break;
                    }
                }
        		if(typeof(disputeID)!=="undefined" || typeof(meetingType)!=="undefined"){
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy-guidetextdraw_104653__').html("<p><b>Dispute Meeting ID :</b> "+disputeID+"</p>");
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy-guidetextdraw_copy_c__').html("<p><b>Traditional/Informal :</b> "+meetingType+"</p>");
                }
                else{
					$('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy-guidetextdraw_104653__').html("<p><b>Dispute Meeting ID :</b> --</p>");
                    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy-guidetextdraw_copy_c__').html("<p><b>Traditional/Informal :</b> --</p>");
                }
        		let jsonData = {
                    "ea" : guideBridge.resolveNode("ea").value,
                    "district" : guideBridge.resolveNode("district").value,
                    "DisputeID" : disputeID,
                    "MeetingType" : meetingType,
                    "DRType" : guideBridge.resolveNode("SelectDRADRB").value
                };            
                //console.log(jsonData);
        		var tCount = guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instanceCount;
                for(var i=0;i<tCount;i++){
                    guideBridge.resolveNode("MeetAtendPanelRecChair").enabled=true;
                    guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.removeInstance(1);
                }
        		guideBridge.resolveNode("AttendAddRowRecChair").enabled=true;
        		guideBridge.resolveNode("AttendDeleteRowRecChair").enabled=true;
        		let dollarUSLocale = Intl.NumberFormat('en-US');
                $.ajax({ 
                    type: 'GET', 
                    data: jsonData,
                    url: 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
                    success: function (data) {  
                        //console.log(data);
						//console.log(JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML));
                    	//alert("");
                    	data1=JSON.parse(data.getElementsByTagName("PCPDetailsJson")[0].innerHTML);
                    	disputeCreatedDate=data.getElementsByTagName("DisputeCreatedDate")[0].innerHTML;
                    	var meetingCalled = data.getElementsByTagName("MeetingCalled")[0].innerHTML;
                    	if(guideBridge.resolveNode("SelectDRADRB").value === "DRB")
                    	{
							if(meetingCalled === "RE")
                    		{
								guideBridge.resolveNode("MeetCallRecomDRB").value = 0;
                			}
                       		else if(meetingCalled === "CONTRACTOR")
                    		{
								guideBridge.resolveNode("MeetCallRecomDRB").value = 1;
                			}
                            guideBridge.resolveNode("MeetingDateRecomDRB").value =  data.getElementsByTagName("MeetDate1")[0].innerHTML;
        					guideBridge.resolveNode("MeetingDRBPanel").enabled = true;
							guideBridge.resolveNode("MeetLOCRecomDRB").value = "";
                            guideBridge.resolveNode("DRBMemr2RecomDRB").value = "";
                            guideBridge.resolveNode("CalRepRecomDRB").value = "";
        					guideBridge.resolveNode("attendee1RecomDRB").value = "";
                            guideBridge.resolveNode("ContractoRepRecomDRB").value = "";
                            guideBridge.resolveNode("attendee2RecomDRB").value = "";
                		}
						if(guideBridge.resolveNode("SelectDRADRB").value === "DRA")
                    	{
							if(meetingCalled === "RE")
                    		{
								guideBridge.resolveNode("MeetCallRecomDRA").value = 0;
                			}
                       		else if(meetingCalled === "CONTRACTOR")
                    		{
								guideBridge.resolveNode("MeetCallRecomDRA").value = 1;
                			}
                            guideBridge.resolveNode("MeetingDateRecomDRA").value =  data.getElementsByTagName("MeetDate1")[0].innerHTML;
                            guideBridge.resolveNode("CalRepRecomDRA").value = "";
							guideBridge.resolveNode("MeetingDRAPanel").enabled = true;
                            guideBridge.resolveNode("ContractoRepRecomDRA").value = "";
                            guideBridge.resolveNode("MeetLOCRecomDRA").value = "";
        					guideBridge.resolveNode("attendee1RecomDRA").value = "";
                            guideBridge.resolveNode("attendee2RecomDRA").value = "";

                		}
                        guideBridge.resolveNode("ClarificationPanelRecChair").resetData();
                        guideBridge.resolveNode("RequestReconsiderPanelRecChair").resetData();
						guideBridge.resolveNode("ReqRecPreviewRecChair").visible = false;
                        guideBridge.resolveNode("ClarPreviewRecChair").visible = false;
						guideBridge.resolveNode("StatusRecChair").value = "<p>"+data.getElementsByTagName("OverallStatus")[0].innerHTML+"</p>";
                    	if(data.getElementsByTagName("PPDueDate")[0].innerHTML!="null"||data.getElementsByTagName("PPDueDate")[0].innerHTML!="")
                    	{
							guideBridge.resolveNode("PosPaperDueRecChair").value =  "<p>"+data.getElementsByTagName("PPDueDate")[0].innerHTML+"</p>";
                		}
                       	else
                       	{
							guideBridge.resolveNode("PosPaperDueRecChair").value =  "<p></p>";
                        }
                        if(data.getElementsByTagName("MeetDate")[0].innerHTML!=="null"||data.getElementsByTagName("MeetDate")[0].innerHTML==="")
                    	{
                    		guideBridge.resolveNode("MeetDateRecChair").value =  "<p>"+data.getElementsByTagName("MeetDate")[0].innerHTML+"</p>";
                		}
						else
                       	{
							guideBridge.resolveNode("MeetDateRecChair").value =  "<p></p>";
                        }
                    	var count1;
                    	//console.log(data1);
                        if(typeof(data1.PCP_Details.Record.PCP_MAIN_PK)==="undefined"){
                          count1=data1.PCP_Details.Record.length;
                        }
                        else{
                          count1=1;
                        }
                       	var tCount = guideBridge.resolveNode("Row1RecChair").instanceManager.instanceCount;
                        for(let k=0; k<tCount; k++){
                            	guideBridge.resolveNode("PCPRecChair.Row1RecChair").instanceManager.removeInstance(1);

                		}
                        if(count1===1){
                            guideBridge.resolveNode("Row1RecChair").instanceManager.addInstance(1);
                            guideBridge.resolveNode("Row1RecChair").tableItem11.value=data1.PCP_Details.Record.PCP_MAIN_PK;
                            if(data1.PCP_Details.Record.D_IPC_DESCR!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem12.value=data1.PCP_Details.Record.D_IPC_DESCR;
                            }
                            if(data1.PCP_Details.Record.E_EST_COST!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem13.value="$ "+dollarUSLocale.format(data1.PCP_Details.Record.E_EST_COST);
                            }
                            if(data1.PCP_Details.Record.E_TIME_IMPACT!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem14.value=data1.PCP_Details.Record.E_TIME_IMPACT;
                            }
                            if(data1.PCP_Details.Record.E_REC_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem15.value=data1.PCP_Details.Record.E_REC_DATE;
                            }
                            if(data1.PCP_Details.Record.E_COMMENT_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem16.value=data1.PCP_Details.Record.E_COMMENT_DATE;
                            }
                            guideBridge.resolveNode("Row1RecChair").tableItem17.value=disputeCreatedDate;
                            guideBridge.resolveNode("Row1RecChair").visible=true;
                        }
                        else{
                          for(var i=0; i<data1.PCP_Details.Record.length; i++){
                          	//alert(i);
                            guideBridge.resolveNode("Row1RecChair").instanceManager.addInstance(1);
                            guideBridge.resolveNode("Row1RecChair").tableItem11.value=data1.PCP_Details.Record[i].PCP_MAIN_PK;
                            if(data1.PCP_Details.Record[i].D_IPC_DESCR!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem12.value=data1.PCP_Details.Record[i].D_IPC_DESCR;
                            }
                            if(data1.PCP_Details.Record[i].E_EST_COST!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem13.value="$ "+dollarUSLocale.format(data1.PCP_Details.Record[i].E_EST_COST);
                            }
                            if(data1.PCP_Details.Record[i].E_TIME_IMPACT!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem14.value=data1.PCP_Details.Record[i].E_TIME_IMPACT;
                            }
                            if(data1.PCP_Details.Record[i].E_REC_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem15.value=data1.PCP_Details.Record[i].E_REC_DATE;
                            }
							if(data1.PCP_Details.Record[i].E_COMMENT_DATE!=="null"){
                                guideBridge.resolveNode("Row1RecChair").tableItem16.value=data1.PCP_Details.Record[i].E_COMMENT_DATE;
                            }
                            guideBridge.resolveNode("Row1RecChair").tableItem17.value=disputeCreatedDate;
                            guideBridge.resolveNode("Row1RecChair").visible=true;
                           } 
                        }
						guideBridge.resolveNode("ClarificationPanelRecChair").enabled=false;
						guideBridge.resolveNode("RequestReconsiderPanelRecChair").enabled=false;
						guideBridge.resolveNode("ReqRecSubRecRecChair").enabled=false;
						guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled=true;
						guideBridge.resolveNode("ReqAddInfoSecRecChair").resetData();
						guideBridge.resolveNode("BriefDescRecChair").enabled=true;
						guideBridge.resolveNode("BriefDescRecChair").value="";
						//guideBridge.resolveNode("MeetingInfoPanelRecChair").enabled=true;
						guideBridge.resolveNode("RecomPanelRecChair").resetData();
						guideBridge.resolveNode("RecomPanelRecChair").enabled=true;
						guideBridge.resolveNode("SubmitRecomButton").enabled=true;
						guideBridge.resolveNode("PreviewRecChair").visible=false;
                	},	
                    error: function(err){

                	}
       			 });*/
	});
});