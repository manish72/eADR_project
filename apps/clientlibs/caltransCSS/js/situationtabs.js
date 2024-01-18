function enableTabs() {
    let disList =  guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager.instances");
    let count = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instanceCount-1;
    let currStatus,disputeID,meetingType;
    let params = new URLSearchParams(window.location.search);
	let actualData=JSON.parse(window.atob(params.get('input')));
    for(var i=0;i < count;i++){
        if(disList[i].tableItem11.value==='Y'){
            disputeID = disList[i].table1_item1.value;
            meetingType = disList[i].table1_item2.value;
            currStatus = disList[i].table1_item3.value;
            break;
        }
    }
    let addArr = {
        "RE SUBMITTED ADDITIONAL INFORMATION" : "RE SUBMITTED ADDITIONAL INFORMATION",
        "CONTRACTOR SUBMITTED ADDITIONAL INFORMATION" : "CONTRACTOR SUBMITTED ADDITIONAL INFORMATION",
        "RE AND CONTRACTOR SUBMITTED ADDITIONAL INFORMATION" : "RE AND CONTRACTOR SUBMITTED ADDITIONAL INFORMATION",
        "CHAIR SUBMITTED THE RECOMMENDATION REPORT" : "CHAIR SUBMITTED THE RECOMMENDATION REPORT",
        "ADVISOR SUBMITTED THE RECOMMENDATION REPORT" : "ADVISOR SUBMITTED THE RECOMMENDATION REPORT",
        "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
        "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
        "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION",
        "CHAIR SUBMITTED CLARIFICATION REQUEST":"CHAIR SUBMITTED CLARIFICATION REQUEST",
        "ADVISOR SUBMITTED CLARIFICATION REQUEST":"ADVISOR SUBMITTED CLARIFICATION REQUEST",
        "RE SUBMITTED RECOMMENDATION RESPONSE":"RE SUBMITTED RECOMMENDATION RESPONSE",
        "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE":"CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
        "RE REQUESTED RECONSIDERATION" : "RE REQUESTED RECONSIDERATION",
        "CONTRACTOR REQUESTED RECONSIDERATION" : "CONTRACTOR REQUESTED RECONSIDERATION",
    };
    //if current status ID is 1 or 2
    if(currStatus.toLowerCase() === "RE initiated the Dispute".toLowerCase() || currStatus.toLowerCase() === "Contractor initiated the Dispute".toLowerCase()){
        guideBridge.resolveNode("position-RE").visible = false;
        guideBridge.resolveNode("position-Contractor").visible = false;
        //guideBridge.resolveNode("DMReportPanel").visible = false;
        if(actualData.userRole.toString().toUpperCase()==="DRB_CHAIR" || actualData.userRole.toString().toUpperCase()==="DRA"){
            guideBridge.resolveNode("recReport").visible = true;
        }
        else{
            guideBridge.resolveNode("recReport").visible = false;

        }
    }
    //if current status ID is 4 or 5
    else if(currStatus.toLowerCase() === "Contractor submitted Position Paper".toLowerCase() || currStatus.toLowerCase() === "RE submitted Position Paper".toLowerCase()){
        //no body
    }
    //below is for status ID 6
	else if (currStatus.toLowerCase() === "RE and Contractor submitted Position Papers".toLowerCase()) {
        //let disputeID = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instances[index].table1_item1.value;
        //let meetingType = guideBridge.resolveNode("DisputeDashDisTable.Row1.instanceManager").instances[index].table1_item2.value;
        let jsonData = {
            "ea": guideBridge.resolveNode("ea").value,
            "district": guideBridge.resolveNode("district").value,
            "DisputeID": disputeID,
            "MeetingType": meetingType,
            "DRType": guideBridge.resolveNode("SelectDRADRB").value
        };
        $.ajax({
            type: 'GET',
            data: jsonData,
            url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetDetailsOfDispute',
            success: function (data) {
            	let posDueDate = new Date(data.getElementsByTagName("PPDueDate")[0].innerHTML);
            	let currentDate = new Date();
                if (posDueDate < currentDate){
					guideBridge.resolveNode("position-RE").visible = true;
                    guideBridge.resolveNode("position-Contractor").visible = true;
                    //guideBridge.resolveNode("DMReportPanel").visible = false;
                    if(actualData.userRole.toString().toUpperCase()==="DRB_CHAIR" || actualData.userRole.toString().toUpperCase()==="DRA"){
                        guideBridge.resolveNode("recReport").visible = true;
                    }
                    else{
                        guideBridge.resolveNode("recReport").visible = false;
            
                    }
                }
			}
    	});
    }
    else if(currStatus.toLowerCase() === "Position Paper Due Date and Meeting Date Established".toLowerCase()){
        if(actualData.userRole.toString().toUpperCase()==="RE"){
            guideBridge.resolveNode("position-RE").visible = true;
            guideBridge.resolveNode("position-Contractor").visible = false;
            guideBridge.resolveNode("recReport").visible = false;
          }
          else if(actualData.userRole.toString().toUpperCase()==="CONTRACTOR"){
              guideBridge.resolveNode("position-RE").visible = false;
              guideBridge.resolveNode("position-Contractor").visible = true;
              guideBridge.resolveNode("recReport").visible = false;
          }
          else if(actualData.userRole.toString().toUpperCase()==="DRB_CHAIR" || actualData.userRole.toString().toUpperCase()==="DRA"){
            guideBridge.resolveNode("position-RE").visible = false;
            guideBridge.resolveNode("position-Contractor").visible = false;
            guideBridge.resolveNode("recReport").visible = true;    
          } 
    }
    //below is for status ID 28
    else if(currStatus.toLowerCase() === "Dispute Meeting Cancelled".toLowerCase()){
        guideBridge.resolveNode("position-RE").visible = false;
        guideBridge.resolveNode("position-Contractor").visible = false;
        guideBridge.resolveNode("recReport").visible = false;
        guideBridge.resolveNode("DMReportPanel").visible = false;
    }
	//below is for status present in addArr
	else if((currStatus.toUpperCase() in addArr)){
        guideBridge.resolveNode("position-RE").visible = true;
        guideBridge.resolveNode("position-Contractor").visible = true;
        guideBridge.resolveNode("recReport").visible = true;
        guideBridge.resolveNode("DMReportPanel").visible = false;
    }
	//below is for status ID 25, 28, 29
	else if(currStatus.toLowerCase() === "re and contractor submitted recommendation response" || currStatus.toLowerCase() === "chair responded to reconsideration request" || currStatus.toLowerCase() === "advisor responded to reconsideration request" || currStatus.toLowerCase() === "final report generated" || currStatus.toLowerCase() === "document has been signed"){
        guideBridge.resolveNode("position-RE").visible = true;
        guideBridge.resolveNode("position-Contractor").visible = true;
        guideBridge.resolveNode("recReport").visible = true;
        if(actualData.userRole.toString().toUpperCase()==="DRB_CHAIR" || actualData.userRole.toString().toUpperCase()==="DRA"){
            guideBridge.resolveNode("DMReportPanel").visible = true;
        }
        else{
            guideBridge.resolveNode("DMReportPanel").visible = false;            
        }
    }
}
/* Using below code, when user clicks on eadr-dashboard from left menu table inside will get refresh */
$(document).ready(function () {
    $('#guideContainer-rootPanel-panel_652182736-panel_1552065248___guide-item-nav').click(function(){
        //refreshing table with new information
        let tCount = guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instanceCount;
        for(let k=0; k<tCount; k++){
            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.removeInstance(1);            
        }
        //fetch dispute details from ea and district
        let params = new URLSearchParams(window.location.search);
        let actualData=JSON.parse(window.atob(params.get('input')));
        //ea.value=actualData.ea;
        //district.value=actualData.district;
        let jsonData={'ea':actualData.ea,'district':actualData.district,'InfoType':'Partial','DRType' : actualData.type};
        guideBridge.resolveNode("EADRPCPTable").visible = false;
        //console.log(jsonData);     
        $.ajax({ 
              type: 'GET', 
              contentType: 'application/json',
              url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetDisputeMeetings',
              data : jsonData,
              //dataType: "json",
              success: function (data) {    
                    //console.log(data);
                   //console.log(data.getElementsByTagName("GetRowCount")[0].innerHTML);
                   count=parseInt(data.getElementsByTagName("GetRowCount")[0].innerHTML);
                   if(count === 0){
                      guideBridge.resolveNode("DisTableNoDataRow1").visible = true;
                   }
                   if(count>0){
                        jsonResponse = JSON.parse(data.getElementsByTagName("DRBMembersDetailsJson")[0].innerHTML);
                        //console.log(jsonResponse.Dispute_Meetings.Meeting.DISPUTE_MEETING_ID);
                        //console.log(data.Dispute_Meetings.Meeting.length);
                        if(count===1){
                            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.addInstance(1);
                            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].tableItem11.value = "";
                            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].table1_item1.value=jsonResponse.Dispute_Meetings.Meeting.DISPUTE_MEETING_ID;
                            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].table1_item2.value=jsonResponse.Dispute_Meetings.Meeting.DISPUTE_CURRENT_STATUS;
                            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].table1_item3.value=jsonResponse.Dispute_Meetings.Meeting.NAME;
                            if(jsonResponse.Dispute_Meetings.Meeting.CLOSED_DISPUTE_COMMENTS!=="null"){
                                guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].table1_item4.value=jsonResponse.Dispute_Meetings.Meeting.CLOSED_DISPUTE_COMMENTS;                  
                            }
                            else{
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].table1_item4.value="---";  
                            }
                            guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[0].visible=true;
                        }
                       else{
                         for(var i=0; i<count; i++){  
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.addInstance(1);
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].tableItem11.value = "";
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].table1_item1.value=jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_MEETING_ID;
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].table1_item2.value=jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_CURRENT_STATUS;
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].table1_item3.value=jsonResponse.Dispute_Meetings.Meeting[i].NAME;
                              if(jsonResponse.Dispute_Meetings.Meeting[i].CLOSED_DISPUTE_COMMENTS!=="null"){
                                  guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].table1_item4.value=jsonResponse.Dispute_Meetings.Meeting[i].CLOSED_DISPUTE_COMMENTS;                  
                              }
                              else{
                                guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].table1_item4.value="---";  
                              }
                              guideBridge.resolveNode("EADRDisputeTable.Row1").instanceManager.instances[i].visible=true;
                         }  
                       }              
                   }
              },
              error: function(err){
                alert("something went wrong");
              }
        });
    });
});