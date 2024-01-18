$(document).ready(function(){ 
	//Delete all records of progress meeting table and generate all updated records
    $('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_copy___guide-item-nav').click(function(){
		let tCount = guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instanceCount;
        //console.log(tCount);
        for(let k=0; k<tCount; k++){
            guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.removeInstance(1);            
        }
        //fetch progress meeting details from ea and district
        let params = new URLSearchParams(window.location.search);
        let actualData=JSON.parse(window.atob(params.get('input')));
        //console.log(actualData);
        guideBridge.resolveNode("ea").value=actualData.ea;
        guideBridge.resolveNode("district").value=actualData.district;
        let jsonData={'ea':actualData.ea,'district':actualData.district};
        xmlData = OBJtoXML1({"data":jsonData});
        //console.log(jsonData);
        $.ajax({ 
                  type: 'POST',
                  headers: {
                   'Content-Type' : 'application/xml',
                   'Accept' : '*/*'
                  },
                  url: 'http://'+window.location.hostname+':8080'+'/rest/services/Caltrans-eADR/Processes/GetProgressMeetingDetails',
                  data: xmlData,
                  success: function (data) { 
                    count=parseInt(data.getElementsByTagName("GetRowCount")[0].innerHTML);
                    if(count>0){
                        jsonResponse = JSON.parse(data.getElementsByTagName("PMDetailsJson")[0].innerHTML);
                        if(count===1){                             
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.addInstance(1);
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].table1_item1.value=jsonResponse.Progress_Meetings.Record.PROGRESS_MEETING_ID;
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].table1_item2.value=jsonResponse.Progress_Meetings.Record.PROGRESS_MEETING_DATE;
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].table1_item3.value=jsonResponse.Progress_Meetings.Record.CHAIR_ADVISOR_REPORT;
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].table1_item4.value=jsonResponse.Progress_Meetings.Record.RE_RESPONSE;
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].table1_item5.value=jsonResponse.Progress_Meetings.Record.CONTRACTOR_RESPONSE;
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].table1_item6.value=jsonResponse.Progress_Meetings.Record.FINAL_STATUS;
                          guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[0].visible=true;
                        }
                        else{
                            for(var i=0; i<count; i++){
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.addInstance(1);
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].table1_item1.value=jsonResponse.Progress_Meetings.Record[i].PROGRESS_MEETING_ID;
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].table1_item2.value=jsonResponse.Progress_Meetings.Record[i].PROGRESS_MEETING_DATE;
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].table1_item3.value=jsonResponse.Progress_Meetings.Record[i].CHAIR_ADVISOR_REPORT;
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].table1_item4.value=jsonResponse.Progress_Meetings.Record[i].RE_RESPONSE;
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].table1_item5.value=jsonResponse.Progress_Meetings.Record[i].CONTRACTOR_RESPONSE;
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].table1_item6.value=jsonResponse.Progress_Meetings.Record[i].FINAL_STATUS;
                              guideBridge.resolveNode("ProgressDashTable.Row1").instanceManager.instances[i].visible=true;
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