$(document).ready(function () {
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_copy___guide-item-nav').click(function () {
        //refreshing table with new information
        let tCount = guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instanceCount;
        for(let k=0; k<tCount; k++){
            guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.removeInstance(1);            
        }
		//fetch dispute details from ea and district
        var params = new URLSearchParams(window.location.search);
        var actualData=JSON.parse(window.atob(params.get('input')));
        var jsonData={'ea':actualData.ea,'district':actualData.district,'InfoType':'Complete',"DRType" : actualData.type};
        //hide all tabs to avoid giving input without selecting dispute ID
        guideBridge.resolveNode("position-RE").visible = false;
        guideBridge.resolveNode("position-Contractor").visible = false;
        guideBridge.resolveNode("recReport").visible = false;
        guideBridge.resolveNode("DMReportPanel").visible = false;
        
        //hide the PCP table if any of the disputeID is unchecked
        guideBridge.resolveNode("DisputeDashPCPTable").visible = false;

        $.ajax({ 
          type: 'GET', 
          contentType: 'application/xml',        
          url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetDisputeMeetings',
          data: jsonData,
          success: function (data) {        
            //console.log(data.getElementsByTagName("GetRowCount")[0].innerHTML);
            count=parseInt(data.getElementsByTagName("GetRowCount")[0].innerHTML);
            if(count === 0){
              guideBridge.resolveNode("DisTableNoDataRow").visible = true;
            }
            if(count>0){
            	guideBridge.resolveNode("DisTableNoDataRow").visible = false;
                jsonResponse = JSON.parse(data.getElementsByTagName("DRBMembersDetailsJson")[0].innerHTML);
            	//console.log(jsonResponse);
                //console.log(data.Dispute_Meetings.Meeting.length);
                if(count===1){
                  //console.log(table1.Row1.instanceManager.instances);
                  guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.addInstance(1);
                  guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].tableItem11.value = null;
                  guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item1.value=jsonResponse.Dispute_Meetings.Meeting.DISPUTE_MEETING_ID;
                  guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item2.value=jsonResponse.Dispute_Meetings.Meeting.TYPE_OF_MEETING;
                  guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item3.value=jsonResponse.Dispute_Meetings.Meeting.DISPUTE_CURRENT_STATUS;
                  if(jsonResponse.Dispute_Meetings.Meeting.DISPUTE_PENDING_STATUS !== "null"){
                  	guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item4.value=jsonResponse.Dispute_Meetings.Meeting.DISPUTE_PENDING_STATUS;
                  }
                  else{
                    guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item4.value = "---";
                  }
                  if(jsonResponse.Dispute_Meetings.Meeting.ASSIGNED_TO !== "null"){
                  	guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item5.value=jsonResponse.Dispute_Meetings.Meeting.ASSIGNED_TO;
                  }
                  else{
                    guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item5.value = "---";
                  }
                  if(jsonResponse.Dispute_Meetings.Meeting.DUE_DATE!=="null"){
                    if(jsonResponse.Dispute_Meetings.Meeting.DISPUTE_CURRENT_STATUS === "Dispute Meeting Cancelled"){
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item6.value = "---";
                    }
                    else{
                    	guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item6.value=jsonResponse.Dispute_Meetings.Meeting.DUE_DATE;
                    }
                  }
                  if(jsonResponse.Dispute_Meetings.Meeting.MEETING_DATE!=="null"){
                    guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item7.value=jsonResponse.Dispute_Meetings.Meeting.MEETING_DATE;
                  }
                  else{
                     guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].table1_item7.value = "---";
                  }
                  guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[0].visible=true;
                }
              else{
                    for(var i=0; i<count; i++){ 
                      //console.log(table1.Row1.instanceManager.instances);
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.addInstance(1);
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].tableItem11.value = null;
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item1.value=jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_MEETING_ID;
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item2.value=jsonResponse.Dispute_Meetings.Meeting[i].TYPE_OF_MEETING;
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item3.value=jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_CURRENT_STATUS;
                      if(jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_PENDING_STATUS !== "null"){
                        guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item4.value=jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_PENDING_STATUS;
                      }
                      else{
                        guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item4.value = "---";
                      }
                      if(jsonResponse.Dispute_Meetings.Meeting[i].ASSIGNED_TO !== "null"){
                        guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item5.value=jsonResponse.Dispute_Meetings.Meeting[i].ASSIGNED_TO;
                      }
                      else{
                        guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item5.value = "---";
                      }
                      if(jsonResponse.Dispute_Meetings.Meeting[i].DUE_DATE!=="null"){
                        if(jsonResponse.Dispute_Meetings.Meeting[i].DISPUTE_CURRENT_STATUS === "Dispute Meeting Cancelled"){
                          guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item6.value = "---";
                        }
                        else{
                            guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item6.value=jsonResponse.Dispute_Meetings.Meeting[i].DUE_DATE;
                        }
                      }
                      if(jsonResponse.Dispute_Meetings.Meeting[i].MEETING_DATE!=="null"){
                        guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item7.value=jsonResponse.Dispute_Meetings.Meeting[i].MEETING_DATE;
                      }
                      else{
                         guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].table1_item7.value = "---";
                      }
                      guideBridge.resolveNode("DisputeDashDisTable.Row1").instanceManager.instances[i].visible=true;
                    }
                    //console.log(table1.Row1.instanceManager.instanceCount);
                }
              }
            },
          error: function(err){
            alert("something went wrong");
          }
    });
  });
});