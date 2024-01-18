$(document).ready(function(){ 
    // for getting existing chair/advisor submitted record
	$('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_1774090199_cop___guide-item-nav').click(function(){
		let count = guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager").instanceCount-1;
        let progressMeetID;
        let disList =  guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager.instances");
        for(var i=0;i < count;i++){
            if(disList[i].tableItem11.value==='Y'){
                progressMeetID = disList[i].table1_item1.value;
                break;
            }
        }
        if(guideBridge.resolveNode("SelectDRADRB").value === "DRB")
        {
          guideBridge.resolveNode("PMContractorNoRecChair").value=guideBridge.resolveNode("ContractNumberDRB").value;
          guideBridge.resolveNode("PMREName").value=guideBridge.resolveNode("ResidentEngineerDRB").value;
          guideBridge.resolveNode("PMREPhoneNo").value=guideBridge.resolveNode("PhoneNumberDRB").value;
          guideBridge.resolveNode("PMConName").value=guideBridge.resolveNode("ContractorDRB").value;
          guideBridge.resolveNode("PMSelectDRAB").value=0;
          guideBridge.resolveNode("PMCalDRBMemCk").value=guideBridge.resolveNode("CaltransCBDRB").value;
          guideBridge.resolveNode("PMConDRBMemCk").value=guideBridge.resolveNode("ContractorCBDRB").value;
          guideBridge.resolveNode("PMThirdDRBMemCk").value=guideBridge.resolveNode("DRBMemCBDRB").value;
          guideBridge.resolveNode("PMCalDRBMem").value=guideBridge.resolveNode("CaltransNameDRB").value;
          guideBridge.resolveNode("PMConDRBMem").value=guideBridge.resolveNode("ContractorNameDRB").value;
          guideBridge.resolveNode("PMThirdDRBMem").value=guideBridge.resolveNode("MemberDateDRB").value;
          guideBridge.resolveNode("PMIDNoValue").value="<p>"+progressMeetID+"</p>";
        }
        else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA")
        {
          guideBridge.resolveNode("PMContractorNoRecChair").value=guideBridge.resolveNode("ContractNumberDRA").value;
          guideBridge.resolveNode("PMREName").value=guideBridge.resolveNode("ResidentEngineerDRA").value;
          guideBridge.resolveNode("PMREPhoneNo").value=guideBridge.resolveNode("PhoneNumberDRA").value;
          guideBridge.resolveNode("PMConName").value=guideBridge.resolveNode("ContractorDRA").value;
          guideBridge.resolveNode("PMSelectDRAB").value=1;
          guideBridge.resolveNode("PMDRAAttende").value=guideBridge.resolveNode("DRAName").value;
          guideBridge.resolveNode("PMIDNoValue").value="<p>"+progressMeetID+"</p>";
        }
        guideBridge.resolveNode("textdraw_5496175091665645457513").visible=false;
        guideBridge.resolveNode("textdraw1661153925002").visible=false;
        guideBridge.resolveNode("PMSucNoteRecChair").visible=false;
        guideBridge.resolveNode("PMErrNoteRecChair").visible=false;
        guideBridge.resolveNode("PMPanel2RecChair").enabled=false;
        guideBridge.resolveNode("PMPanel3RecChair").enabled=false;
        //guideBridge.resolveNode("PMAttendPanel").enabled=false;
        guideBridge.resolveNode("PMBottomPanelRecChair").enabled=false;
        guideBridge.resolveNode("PMAttendAddRow").enabled=false;
        guideBridge.resolveNode("PMAttendDeleteRow").enabled=false;
        guideBridge.resolveNode("PMAttachDocRecChair").enabled=false;
        guideBridge.resolveNode("PMSubmitRecChair").enabled=false;
  		guideBridge.resolveNode("PreviewPMDRAB").visible=false;
        let jsonData = {
            "progmeetID":progressMeetID.replace("<p>","").replace("</p>","")
        };
        xmlData = OBJtoXML1({"data":jsonData});
        //console.log(xmlData);
        url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetExistingProgressChAdRecord';
        $.ajax({ 
              type: 'POST',
              headers: {
                'Content-Type' : 'application/xml',
                'Accept' : '*/*'
              },
              url: url,
             data: xmlData,
              success: function (data) {
                //console.log(data);
                let chairrecord = JSON.parse(data.getElementsByTagName("PMChAdDetailsJson")[0].innerHTML);
                    let attenddetails = JSON.parse(data.getElementsByTagName("PMAttendDetailsJson")[0].innerHTML);
                    guideBridge.resolveNode("PMDateSub").value = chairrecord.ProgressMeet.Record.CREATED_DATE;
                    guideBridge.resolveNode("PMIDNo").value=progressMeetID.replace("<p>","").replace("</p>","");
                    if(!chairrecord.ProgressMeet.Record.MEETING_DATE.includes("1900-01-01")){
                        if(chairrecord.ProgressMeet.Record.MEETING_DATE !== "null"){
                        	guideBridge.resolveNode("PMMeetDate").value = chairrecord.ProgressMeet.Record.MEETING_DATE;
                        }
                    }
                    guideBridge.resolveNode("PMMeetHeld").value = chairrecord.ProgressMeet.Record.MEETING_HELD;
                  	if(chairrecord.ProgressMeet.Record.MEETING_LOCATION !== "null"){
                        guideBridge.resolveNode("PMMeetLoc").value = chairrecord.ProgressMeet.Record.MEETING_LOCATION;
                    }
                  	if(chairrecord.ProgressMeet.Record.CALTRANS_REPRESENTATIVE !== "null"){
                        guideBridge.resolveNode("PMCaltransRep").value = chairrecord.ProgressMeet.Record.CALTRANS_REPRESENTATIVE;
                    }
                  	if(chairrecord.ProgressMeet.Record.CONTRACTORS_REPRESENTATIVE !== "null"){
                        guideBridge.resolveNode("PMContractorRep").value = chairrecord.ProgressMeet.Record.CONTRACTORS_REPRESENTATIVE;
                    }
                    guideBridge.resolveNode("PMStatusWork").value = chairrecord.ProgressMeet.Record.STATUS_OF_WORK;
                    guideBridge.resolveNode("PMPotProblem").value = chairrecord.ProgressMeet.Record.POTENTIAL_PROBLEMS;
                    guideBridge.resolveNode("PMPotClaim").value = chairrecord.ProgressMeet.Record.POTENTIAL_CLAIMS;
                    guideBridge.resolveNode("PMStatusPotClaimDispute").value = chairrecord.ProgressMeet.Record.STATUS_OF_POTENTIAL_CLAIMS;
                    guideBridge.resolveNode("PreviewPMDRAB").visible=true;
                    var count1;
                    //console.log(data1);
                    if(Object.values(attenddetails.AttendDet).length>0){
                    //if(Object.values(attenddetails.AttendDet.Record).length>0 ){
                        if(typeof(attenddetails.AttendDet.Record.PROGRESS_MEETING_ID)==="undefined"){
                            count1=attenddetails.AttendDet.Record.length;
                        }
                        else{
                            count1=1;
                        }
                    }
                    let tCount = guideBridge.resolveNode("PMAttendPanel").instanceManager.instanceCount;
                    for(var i=tCount;i>-1;i--){
                       guideBridge.resolveNode("PMAttendPanel").instanceManager.removeInstance(i);
                    }
                    guideBridge.resolveNode("PMAttendPanel").resetData();
                    if(count1===1){
                        //guideBridge.resolveNode("PMAttendPanel").instanceManager.addInstance(1);
                        if(attenddetails.AttendDet.Record.ATTENDEE_NAME!=="null"){
                            guideBridge.resolveNode("PMAttendPanel").PMAttendName.value = attenddetails.AttendDet.Record.ATTENDEE_NAME;
                        }
                        if(attenddetails.AttendDet.Record.JOB_TITLE!=="null"){
                            guideBridge.resolveNode("PMAttendPanel").PMAttendJobTitle.value = attenddetails.AttendDet.Record.JOB_TITLE;
                        }
                        if(attenddetails.AttendDet.Record.ATTENDEE_CHECK!=="null"){
                            guideBridge.resolveNode("PMAttendPanel").PMAttendCheck.value = attenddetails.AttendDet.Record.ATTENDEE_CHECK;
                        }
                        guideBridge.resolveNode("PMAttendPanel").enabled=false;
                        guideBridge.resolveNode("PMAttendPanel").visible=true;
                    }
                    else if(count1>1){
                        for(var i=0; i<attenddetails.AttendDet.Record.length; i++){
                            if(i>0){
                                guideBridge.resolveNode("PMAttendPanel").instanceManager.addInstance(1);
                            }
                            if(attenddetails.AttendDet.Record[i].ATTENDEE_NAME!=="null"){
                                guideBridge.resolveNode("PMAttendPanel").PMAttendName.value = attenddetails.AttendDet.Record[i].ATTENDEE_NAME;
                            }
                            if(attenddetails.AttendDet.Record[i].JOB_TITLE!=="null"){
                                guideBridge.resolveNode("PMAttendPanel").PMAttendJobTitle.value = attenddetails.AttendDet.Record[i].JOB_TITLE;
                            }
                            if(attenddetails.AttendDet.Record[i].ATTENDEE_CHECK!=="null"){
                                guideBridge.resolveNode("PMAttendPanel").PMAttendCheck.value = attenddetails.AttendDet.Record[i].ATTENDEE_CHECK;
                            }
                            guideBridge.resolveNode("PMAttendPanel").enabled=false;
                            guideBridge.resolveNode("PMAttendPanel").visible=true;
                        }
                	}
              }, 
              error: function(err){
                //this block is executed when server encounters any problem
               // alert("something went wrong");
              }
        });
    });
});