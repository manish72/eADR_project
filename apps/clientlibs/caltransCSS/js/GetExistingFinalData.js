$(document).ready(function(){ 
    // for getting existing RE info from establishment form
	$('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_769133156_copy_259766741___guide-item-nav').click(function(){
		// initalize DRB Chair/ DRA data
		if(guideBridge.resolveNode("SelectDRADRB").value === "DRB")
        {
          guideBridge.resolveNode("PMContractorNoRecChairFR").value=guideBridge.resolveNode("ContractNumberDRB").value;
          guideBridge.resolveNode("PMRENameFR").value=guideBridge.resolveNode("ResidentEngineerDRB").value;
          guideBridge.resolveNode("PMREPhoneNoFR").value=guideBridge.resolveNode("PhoneNumberDRB").value;
          guideBridge.resolveNode("PMConNameFR").value=guideBridge.resolveNode("ContractorDRB").value;
          guideBridge.resolveNode("PMSelectDRABFR").value=0;
          guideBridge.resolveNode("PMCalDRBMemCkFR").value=guideBridge.resolveNode("CaltransCBDRB").value;
          guideBridge.resolveNode("PMConDRBMemCkFR").value=guideBridge.resolveNode("ContractorCBDRB").value;
          guideBridge.resolveNode("PMThirdDRBMemCkFR").value=guideBridge.resolveNode("DRBMemCBDRB").value;
          guideBridge.resolveNode("PMCalDRBMemFR").value=guideBridge.resolveNode("CaltransNameDRB").value;
          guideBridge.resolveNode("PMConDRBMemFR").value=guideBridge.resolveNode("ContractorNameDRB").value;
          guideBridge.resolveNode("PMThirdDRBMemFR").value=guideBridge.resolveNode("MemberDateDRB").value;
        }
        else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA")
        {
          guideBridge.resolveNode("PMContractorNoRecChairFR").value=guideBridge.resolveNode("ContractNumberDRA").value;
          guideBridge.resolveNode("PMRENameFR").value=guideBridge.resolveNode("ResidentEngineerDRA").value;
          guideBridge.resolveNode("PMREPhoneNoFR").value=guideBridge.resolveNode("PhoneNumberDRA").value;
          guideBridge.resolveNode("PMConNameFR").value=guideBridge.resolveNode("ContractorDRA").value;
          guideBridge.resolveNode("PMSelectDRABFR").value=1;
          guideBridge.resolveNode("PMDRAAttendeFR").value=guideBridge.resolveNode("DRAName").value;
          //guideBridge.setFocus(chairPanel.somExpression);
        }
        if(guideBridge.resolveNode("userRole").value === "DRA" || guideBridge.resolveNode("userRole").value === "DRB_CHAIR"){
			guideBridge.resolveNode("GenerateFinalPMPDF").enabled=true;
        }
        else{
        	guideBridge.resolveNode("GenerateFinalPMPDF").enabled=false;
        }
		guideBridge.resolveNode("PreviewDRBA").visible=false;
        guideBridge.resolveNode("PMSucNoteFR").visible=false;
        guideBridge.resolveNode("PMErrNoteFR").visible=false;
        var tCount = guideBridge.resolveNode("PMAttendPanelFR").instanceManager.instanceCount;
          for(var i=0;i<tCount;i++){
            guideBridge.resolveNode("PMAttendPanelFR").enabled=true;
            guideBridge.resolveNode("PMAttendPanelFR").instanceManager.removeInstance(1);
          } 
        let count = guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager").instanceCount-1;
        let progressMeetID;
        let disList =  guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager.instances");
        for(var i=0;i < count;i++){
            if(disList[i].tableItem11.value==='Y'){
                progressMeetID = disList[i].table1_item1.value;
                break;
            }
        }
        guideBridge.resolveNode("PMIDNoValueFR").value="<p>"+progressMeetID+"</p>";
        let jsonData={};
        jsonData.progmeetID = progressMeetID;
        let url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetFinalPMData';
        let xmlData = OBJtoXML1({"data":jsonData});
        if(typeof(jsonData.progmeetID)!=="undefined"){
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
                        //store backend details
                        chairRecord = JSON.parse(data.getElementsByTagName("PMChAdDetailsJson")[0].innerHTML);
                        attendDetails = JSON.parse(data.getElementsByTagName("PMAttendDetailsJson")[0].innerHTML);
                        pmRErecord = JSON.parse(data.getElementsByTagName("PMREDetailsJson")[0].innerHTML);
                        pmCONrecord = JSON.parse(data.getElementsByTagName("PMCONDetailsJson")[0].innerHTML);
                        //auto-populate chair/advisor records
                        guideBridge.resolveNode("PreviewPMRecChairFR").enabled = true;
						guideBridge.resolveNode("PMDateSubFR").value = chairRecord.ProgressMeet.Record.CREATED_DATE;
                        guideBridge.resolveNode("PMIDNoFR").value = chairRecord.ProgressMeet.Record.PROGRESS_MEETING_ID;
                        if(!chairRecord.ProgressMeet.Record.MEETING_DATE.includes("1900-01-01")){
                            if(chairRecord.ProgressMeet.Record.MEETING_DATE !== "null"){
                                guideBridge.resolveNode("PMMeetDateFR").value = chairRecord.ProgressMeet.Record.MEETING_DATE;
                            }
                        }
                        guideBridge.resolveNode("PMMeetHeldFR").value = chairRecord.ProgressMeet.Record.MEETING_HELD;
                        if(chairRecord.ProgressMeet.Record.MEETING_LOCATION!=="null"){
							guideBridge.resolveNode("PMMeetLocFR").value = chairRecord.ProgressMeet.Record.MEETING_LOCATION;
                        }
                        if(chairRecord.ProgressMeet.Record.CALTRANS_REPRESENTATIVE!=="null"){
							guideBridge.resolveNode("PMCaltransRepFR").value = chairRecord.ProgressMeet.Record.CALTRANS_REPRESENTATIVE;
                        }
						if(chairRecord.ProgressMeet.Record.CONTRACTORS_REPRESENTATIVE!=="null"){
							guideBridge.resolveNode("PMContractorRepFR").value = chairRecord.ProgressMeet.Record.CONTRACTORS_REPRESENTATIVE;
                        }
                        guideBridge.resolveNode("PMStatusWorkFR").value = chairRecord.ProgressMeet.Record.STATUS_OF_WORK;
                        guideBridge.resolveNode("PMPotProblemFR").value = chairRecord.ProgressMeet.Record.POTENTIAL_PROBLEMS;
                        guideBridge.resolveNode("PMPotClaimFR").value = chairRecord.ProgressMeet.Record.POTENTIAL_CLAIMS;
                        guideBridge.resolveNode("PMStatusPotClaimDisputeFR").value = chairRecord.ProgressMeet.Record.STATUS_OF_POTENTIAL_CLAIMS;
                        //auto-populate attendee details
                        var count1;
                        if(Object.values(attendDetails.AttendDet).length>0){
                        //if(Object.values(attenddetails.AttendDet.Record).length>0 ){
                            if(typeof(attendDetails.AttendDet.Record.PROGRESS_MEETING_ID)==="undefined"){
                                count1=attendDetails.AttendDet.Record.length;
                            }
                            else{
                                count1=1;
                            }
                        }
                        guideBridge.resolveNode("PMAttendPanelFR").resetData();
                        if(count1===1){
                            if(attendDetails.AttendDet.Record.ATTENDEE_NAME!=="null"){
                                guideBridge.resolveNode("PMAttendPanelFR").PMAttendNameFR.value = attendDetails.AttendDet.Record.ATTENDEE_NAME;
                            }
                            if(attendDetails.AttendDet.Record.JOB_TITLE!=="null"){
                                guideBridge.resolveNode("PMAttendPanelFR").PMAttendJobTitleFR.value = attendDetails.AttendDet.Record.JOB_TITLE;
                            }
                            if(attendDetails.AttendDet.Record.ATTENDEE_CHECK!=="null"){
                                guideBridge.resolveNode("PMAttendPanelFR").PMAttendCheckFR.value = attendDetails.AttendDet.Record.ATTENDEE_CHECK;
                            }
                            guideBridge.resolveNode("PMAttendPanelFR").enabled=false;
                            guideBridge.resolveNode("PMAttendPanelFR").visible=true;
                        }
                        else if(count1>1){
                            for(var i=0; i<attendDetails.AttendDet.Record.length; i++){
                                if(i>0){
                                    guideBridge.resolveNode("PMAttendPanelFR").instanceManager.addInstance(1);
                                }
                                if(attendDetails.AttendDet.Record[i].ATTENDEE_NAME!=="null"){
                                    guideBridge.resolveNode("PMAttendPanelFR").PMAttendNameFR.value = attendDetails.AttendDet.Record[i].ATTENDEE_NAME;
                                }
                                if(attendDetails.AttendDet.Record[i].JOB_TITLE!=="null"){
                                    guideBridge.resolveNode("PMAttendPanelFR").PMAttendJobTitleFR.value = attendDetails.AttendDet.Record[i].JOB_TITLE;
                                }
                                if(attendDetails.AttendDet.Record[i].ATTENDEE_CHECK!=="null"){
                                    guideBridge.resolveNode("PMAttendPanelFR").PMAttendCheckFR.value = attendDetails.AttendDet.Record[i].ATTENDEE_CHECK;
                                }
                                guideBridge.resolveNode("PMAttendPanelFR").enabled=false;
                                guideBridge.resolveNode("PMAttendPanelFR").visible=true;
                            }
                        }
                        //auto-populate RE data
                        guideBridge.resolveNode("PMREPanelFR").enabled=false;
                        //initialize comments box as empty
                        guideBridge.resolveNode("PMCommentsREFR").value = "";
                        guideBridge.resolveNode("PMCalResponseREFR").value = pmRErecord.ProgressMeet.Record.RESPONSE;
                        guideBridge.resolveNode("PMDateCalResponseREFR").value = pmRErecord.ProgressMeet.Record.DATE_OF_RESPONSE;
                        guideBridge.resolveNode("PMCalNameREFR").value = pmRErecord.ProgressMeet.Record.NAME;
                        guideBridge.resolveNode("PMCalTitleREFR").value = pmRErecord.ProgressMeet.Record.JOB_TITLE;
                        if(pmRErecord.ProgressMeet.Record.RESPONSE == "1") {
                            guideBridge.resolveNode("PMCommentsREFR").visible = true;
                        	guideBridge.resolveNode("PMCommentsREFR").value = pmRErecord.ProgressMeet.Record.COMMENTS;
                        }
                        else{
							guideBridge.resolveNode("PMCommentsREFR").visible = false;
                        }
						//auto-populate Contractor data
                        //initialize comments box as empty
                        guideBridge.resolveNode("PMCommentsCONFR").value = "";
                        guideBridge.resolveNode("PMCONPanelFR").enabled=false;
                        guideBridge.resolveNode("PMConResponseCONFR").value = pmCONrecord.ProgressMeet.Record.RESPONSE;
                        guideBridge.resolveNode("PMDateConResponseCONFR").value = pmCONrecord.ProgressMeet.Record.DATE_OF_RESPONSE;
                        guideBridge.resolveNode("PMConNameCONFR").value = pmCONrecord.ProgressMeet.Record.NAME;
                        guideBridge.resolveNode("PMConTitleCONFR").value = pmCONrecord.ProgressMeet.Record.JOB_TITLE;
                        if(pmCONrecord.ProgressMeet.Record.RESPONSE == "1") {
                            guideBridge.resolveNode("PMCommentsCONFR").visible = true;
                        	guideBridge.resolveNode("PMCommentsCONFR").value = pmCONrecord.ProgressMeet.Record.COMMENTS;
                        }
                        else{
							guideBridge.resolveNode("PMCommentsCONFR").visible = false;
                        }
                    },
                    error: function(err){
                      //this block is executed when server encounters any problem 
    
                    }
                });
            }
            else{
				alert("Please select Progress Meeting ID and continue");
            }
    });
    function constructMonth(date){
         var month = date.getMonth();
         //console.log(month);
         if(month<9){
           return "0"+(month+1);
         }
          else{
            return month+1;
          }
    }
    function constructDate(date){
         var d1 = date.getDate();
         if(d1<10){
           return "0"+(d1);
         }
          else{
            return d1;
          }
    }
});