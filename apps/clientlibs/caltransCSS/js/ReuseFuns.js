/* to redirect the page to welcome statement screen on click of Home menu from left navigation inside eadr dashboard page*/
$(document).ready(function(){ 
    $("#guideContainer-rootPanel-panel_652182736-panel___guide-item-nav").click(function(){
        var params = new URLSearchParams(window.location.search);
        var b=params.get('input');
        guidelib.util.GuideUtil.navigateToURL('/content/forms/af/caltrans-eadr/welcome-statement.html?wcmmode=disabled&input='+b,'SAME_TAB');
    });
});
//for retrieving the existing submitted information of the role RE/Contractor 
function getPositionPaperData(xmlData){
    return new Promise(async function (resolve, reject) {
        let url = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/GetPosPaperSubmittedRecord';
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
                resolve(data);
            }, 
            error: function(err){
                //this block is executed when server encounters any problem
                alert("something went wrong");
            }
        });
  });
}
// to set month value based on length
function setMon(month){
  if(month<9){
    return "0"+(month+1);
  }
  else{
    return  month+1;
  }
}
function setDate1(date1){
  if(date1<10){
    return "0"+(date1);
  }
  else{
    return  date1;
  }
}
//to enable and show the accordion of Close dispute meeting accordion
function closedisputeAcc(){
    guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair").visible = true;
    guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair").enabled = true;
    guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair.ErrorCloseDisputeMssge").visible = false;
    guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair.SucCloseDisputeMssge").visible = false;
}
//to show disable the Position Paper accordion in RE tab
function displayPPAccRE(){
	guideBridge.resolveNode("REPanel.FirstSubmitPPRES.backgroundPPRES").enabled = false;
    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.CaltransPPRES").enabled = false;
    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.Attach1PPRES").enabled = false;
    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.Attach2PPRES").enabled = false;
    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.SubmitPPRES").enabled = false;
}
//to show disable the Position Paper accordion in Contractor tab
function displayPPAccContractor(){
	guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.backgroundPPCon").enabled = false;
    guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.contractorPPCon").enabled = false;
    guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.Attach1PPCon").enabled = false;
    guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.Attach2PPCon").enabled = false;
    guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.SubmitPPCon").enabled = false;
}
//tooltip code for RE tab
function tooltipDataRE(count,data){
    var x;
	var nId;
	setTimeout(function alertFunc() {
      if(count === 1){
          x = guideBridge.resolveNode("Row1PPRES.instanceManager").instances[1].tableItem12.jsonModel.id+"_widget";
          nId= document.getElementById(x).parentElement.nextElementSibling.id;
          $("#"+nId).text(guideBridge.resolveNode("Row1PPRES.instanceManager").instances[1].tableItem12.value);        
      }

      else if(count > 1){
          for(var i=1;i<data.PCP_Details.Record.length+1;i++){
              var y = guideBridge.resolveNode("Row1PPRES.instanceManager").instances[i].tableItem12.jsonModel.id+"_widget";
              var nId1= document.getElementById(y).parentElement.nextElementSibling.id;
              $("#"+nId1).text(guideBridge.resolveNode("Row1PPRES.instanceManager").instances[i].tableItem12.value);
           }
      }	  
	}, 400);
}
//tooltip code for Contractor tab
function tooltipDataCon(count,data){
    var x;
	var nId;
	setTimeout(function alertFunc() {
      if(count === 1){
          x = guideBridge.resolveNode("Row1PPCon.instanceManager").instances[1].tableItem12.jsonModel.id+"_widget";
          nId= document.getElementById(x).parentElement.nextElementSibling.id;
          $("#"+nId).text(guideBridge.resolveNode("Row1PPCon.instanceManager").instances[1].tableItem12.value);        
      }

      else if(count > 1){
          for(var i=1;i<data.PCP_Details.Record.length+1;i++){
              var y = guideBridge.resolveNode("Row1PPCon.instanceManager").instances[i].tableItem12.jsonModel.id+"_widget";
              var nId1= document.getElementById(y).parentElement.nextElementSibling.id;
              $("#"+nId1).text(guideBridge.resolveNode("Row1PPCon.instanceManager").instances[i].tableItem12.value);
           }
      }	  
	}, 400);
}
//tooltip code for Chair/Advisor tab
function tooltipDataChAd(count,data){
    var x;
	var nId;
	setTimeout(function alertFunc() {
      if(count === 1){
          x = guideBridge.resolveNode("Row1RecChair.instanceManager").instances[1].tableItem12.jsonModel.id+"_widget";
          nId= document.getElementById(x).parentElement.nextElementSibling.id;
          $("#"+nId).text(guideBridge.resolveNode("Row1RecChair.instanceManager").instances[1].tableItem12.value);        
      }

      else if(count > 1){
          for(var i=1;i<data.PCP_Details.Record.length+1;i++){
              var y = guideBridge.resolveNode("Row1RecChair.instanceManager").instances[i].tableItem12.jsonModel.id+"_widget";
              var nId1= document.getElementById(y).parentElement.nextElementSibling.id;
              $("#"+nId1).text(guideBridge.resolveNode("Row1RecChair.instanceManager").instances[i].tableItem12.value);
           }
      }	  
	}, 400);
}
//function to get the count of records from Additional Information table
function getAdditionalInfoChair(meetingType,disputeID,actualData,currStatus,meetDate){
    if(meetingType.toLowerCase() == "traditional"){
        var addDate = new Date(meetDate);
        if(guideBridge.resolveNode("SelectDRADRB").value == "DRB"){
			addDate.setDate(addDate.getDate() + 10);
        }
		else if(guideBridge.resolveNode("SelectDRADRB").value == "DRA"){
			addDate.setDate(addDate.getDate() + 7);
        }
        guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair.ReqAddInfoDateRecChair").value = addDate.toISOString();
    }
    else{
        guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair.ReqAddInfoDateRecChair").value = "";
    }
    let jsonData = {
        "ea": guideBridge.resolveNode("ea").value,
        "district": guideBridge.resolveNode("district").value,
        "DisputeID": disputeID,
        "MeetingType": meetingType,
        "DRType": guideBridge.resolveNode("SelectDRADRB").value,
        "AddInfoType" : "Initial"
    };
    let xmlData = OBJtoXML1({"data":jsonData});
    let count,addRoleType;
    $.ajax({ 
        type: 'POST',
        headers: {
          'Content-Type' : 'application/xml',
          'Accept' : '*/*'
        },
        url: window.location.protocol+"//"+window.location.hostname+":"+window.location.port + '/rest/services/Caltrans-eADR/Processes/AdditionalInfoInsGet',
       data: xmlData,
        success: function (data) {        
			//console.log(data);
			count = data.getElementsByTagName("RowCount")[0].innerHTML;
        	let data1 = data.getElementsByTagName("AddInfoStr")[0].innerHTML;
        	if(count == 0){
        		let curstatusObj;
            	if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
                    curstatusObj = {
                        "CHAIR SUBMITTED THE RECOMMENDATION REPORT" : "CHAIR SUBMITTED THE RECOMMENDATION REPORT",
                        "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
                        "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
                        "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION",
                        "CHAIR SUBMITTED CLARIFICATION REQUEST" : "CHAIR SUBMITTED CLARIFICATION REQUEST",
                        "RE SUBMITTED RECOMMENDATION RESPONSE" : "RE SUBMITTED RECOMMENDATION RESPONSE",
                        "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "RE REQUESTED RECONSIDERATION" : "RE REQUESTED RECONSIDERATION",
                        "CONTRACTOR REQUESTED RECONSIDERATION" : "CONTRACTOR REQUESTED RECONSIDERATION",
                        "CHAIR RESPONDED TO RECONSIDERATION REQUEST" : "CHAIR RESPONDED TO RECONSIDERATION REQUEST",
                        "FINAL REPORT GENERATED" : "FINAL REPORT GENERATED",
                        "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
                    };
           		}
           		else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
                    curstatusObj = {
                        "ADVISOR SUBMITTED THE RECOMMENDATION REPORT" : "ADVISOR SUBMITTED THE RECOMMENDATION REPORT",
                        "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
                        "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
                        "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION",
                        "ADVISOR SUBMITTED CLARIFICATION REQUEST" : "ADVISOR SUBMITTED CLARIFICATION REQUEST",
                        "RE SUBMITTED RECOMMENDATION RESPONSE" : "RE SUBMITTED RECOMMENDATION RESPONSE",
                        "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "RE REQUESTED RECONSIDERATION" : "RE REQUESTED RECONSIDERATION",
                        "CONTRACTOR REQUESTED RECONSIDERATION" : "CONTRACTOR REQUESTED RECONSIDERATION",
                        "ADVISOR RESPONDED TO RECONSIDERATION REQUEST" : "ADVISOR RESPONDED TO RECONSIDERATION REQUEST",
                        "FINAL REPORT GENERATED" : "FINAL REPORT GENERATED",
                        "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
                    };
           		}
        		// check if there any records for additional information, if no hide the panel, else visible the panel
                if((currStatus.toUpperCase()) in curstatusObj) {
                    guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = false;
                }
    		}
           	else if(count == 2){
				guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoDateRecChair").enabled = false;
                guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoRoleDropRecChair").enabled = true;
        		guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoRoleDropRecChair").items = ["RE=Resident Engineer","Contractor=Contractor"];
        		guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoDescRecChair").enabled = false;
    		}
    		else if(count == 1){
				addRoleType = data.getElementsByTagName("AddInfoReqTo")[0].innerHTML;
                if(addRoleType.toUpperCase() == "Both".toUpperCase()){
					guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoRoleDropRecChair").value = addRoleType;
                    guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoRoleDropRecChair").enabled = false;
                    guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoDescRecChair").value = data.getElementsByTagName("AddInfoDesc")[0].innerHTML;
                    guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoDescRecChair").enabled = false;
                    let addInfo = data.getElementsByTagName("AddInfoStr")[0].innerHTML;
                    if(addInfo !== "null" || addInfo !== ""){
                        guideBridge.resolveNode("button_1269450121656314861672_copy_1").visible = true;
                    }
                    else{
                      guideBridge.resolveNode("button_1269450121656314861672_copy_1").visible = false;
                    }
                }
                else if(addRoleType.toUpperCase() != "Both".toUpperCase()){
					guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoRoleDropRecChair").items = ["RE=Resident Engineer","Contractor=Contractor"];
                    guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoRoleDropRecChair").enabled = true;
                    guideBridge.resolveNode("ReqAddInfoSecRecChair.ReqAddInfoDescRecChair").enabled = false;
                }
            }
    		guideBridge.resolveNode("ReqAddInfoSecRecChair.button_1269450121656314861672").enabled = false;
            guideBridge.resolveNode("ReqAddInfoSecRecChair.button_1269450121656314861672_copy_1").visible = false;
        },
        error: function(err){        

        }
  });
}
//function to get data and disable entire panel inside position paper of RE role
function disablePosPaperRE(disputeID,meetingType,actualData){
    let errorHandler;
    guideBridge.resolveNode("REPanel.FirstSubmitPPRES").enabled = true;
    guideBridge.resolveNode("REPanel.FirstSubmitPPRES").resetData();
    guideBridge.resolveNode("PosSucMssgePPRES").visible = false;
    guideBridge.resolveNode("PosErrMssgePPRES").visible = false;
    jsonData = {
        "ea" : guideBridge.resolveNode("ea").value,
        "district" : guideBridge.resolveNode("district").value,
        "DisputeID" : disputeID,
        "MeetingType" : meetingType,
        "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
        "role" : "RE"
    };
    
    xmlData = OBJtoXML1({"data":jsonData});//json to xml conversion and store in xmlData variable
    const promise = getPositionPaperData(xmlData);
    let data;
    // let the Promise know what you want to do when it resolves
    promise.then(result => data=result).catch(errorHandler);
    
    setTimeout(function alertFunc() {
        if(errorHandler===""||errorHandler==null){
            guideBridge.resolveNode("REPanel.FirstSubmitPPRES.backgroundPPRES").value = data.getElementsByTagName("BGNote")[0].innerHTML;
            guideBridge.resolveNode("REPanel.FirstSubmitPPRES.CaltransPPRES").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
            guideBridge.resolveNode("REPanel.FirstSubmitPPRES.PreviewPPRES").visible = true;
            displayPPAccRE();
        }        
    }, 500);
}
//function to get data and disable entire panel inside position paper of Contractor role
function disablePosPaperContractor(disputeID,meetingType,actualData){
    let errorHandler;
    guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").enabled = true;
    guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").resetData();
    guideBridge.resolveNode("PosSucMssgePPCon").visible = false;
    guideBridge.resolveNode("PosErrMssgePPCon").visible = false;
    jsonData = {
        "ea" : guideBridge.resolveNode("ea").value,
        "district" : guideBridge.resolveNode("district").value,
        "DisputeID" : disputeID,
        "MeetingType" : meetingType,
        "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
        "role" : "CONTRACTOR"
    };
    
    xmlData = OBJtoXML1({"data":jsonData});//json to xml conversion and store in xmlData variable
    const promise = getPositionPaperData(xmlData);
    let data;
    // let the Promise know what you want to do when it resolves
    promise.then(result => data=result).catch(errorHandler);
    
    setTimeout(function alertFunc() {
        if(errorHandler===""||errorHandler==null){
            guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.backgroundPPCon").value = data.getElementsByTagName("BGNote")[0].innerHTML;
            guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.contractorPPCon").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
            guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.PreviewPPCon").visible = true;
            displayPPAccContractor();
        }

    }, 500);
}
//function to get additional information
function getAdditionalInfo(disputeID,meetingType,role){
    return new Promise(async function (resolve, reject) {
        let jsonData = {
            "ea" : guideBridge.resolveNode("ea").value,
            "district" : guideBridge.resolveNode("district").value,
            "DisputeID" : disputeID,
            "MeetingType" : meetingType,
            "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
            "AddInfoReqTo" : role.toUpperCase(),
            "AddInfoType" : "GET",
            "HostPath" : window.location.protocol+"//"+window.location.hostname+":"+window.location.port
        };
        xmlData = OBJtoXML1({"data":jsonData});//json to xml conversion and store in xmlData variable
        let url = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/AdditionalInfoInsGet';
        $.ajax({ 
            type: 'POST',
            headers: {
                'Content-Type' : 'application/xml',
                'Accept' : '*/*'
            },
            url: url,
            data: xmlData,
            success: function (data) {
                let data1 = JSON.parse(data.getElementsByTagName("AddInfoStr")[0].innerHTML);
                resolve(data1);
            }, 
            error: function(err){
                //this block is executed when server encounters any problem
                alert("something went wrong");
            }
        });
    });
}
function recomPanel(disputeID,meetingType,data){
    var tCount = guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instanceCount;
    for (var i = 0; i < tCount; i++) {
        guideBridge.resolveNode("MeetAtendPanelRecChair").enabled = true;
        guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.removeInstance(1);
    }
    guideBridge.resolveNode("AttendAddRowRecChair").enabled = true;
    guideBridge.resolveNode("AttendDeleteRowRecChair").enabled = true;
    var meetingCalled = data.getElementsByTagName("MeetingCalled")[0].innerHTML;
    if(guideBridge.resolveNode("SelectDRADRB").value === "DRB") {
        guideBridge.resolveNode("MeetingDRBPanel").resetData();
        if (meetingCalled === "RE") {
            guideBridge.resolveNode("MeetCallRecomDRB").value = 0;
        } else if (meetingCalled.toUpperCase() === "CONTRACTOR") {
            guideBridge.resolveNode("MeetCallRecomDRB").value = 1;
        }
        guideBridge.resolveNode("MeetingDateRecomDRB").value = data.getElementsByTagName("MeetDate1")[0].innerHTML;
        if(guideBridge.resolveNode("DRB_CB").value === "0"){
            guideBridge.resolveNode("DRBChairRecomDRB").value = guideBridge.resolveNode("DRBMembersDropdownList").value;
        }
        else if(guideBridge.resolveNode("Contractor_CB").value === "0"){
            guideBridge.resolveNode("DRBChairRecomDRB").value = guideBridge.resolveNode("ContractorDropDownList").value;
        }
        else if(guideBridge.resolveNode("Caltrans_CB").value === "0"){
            guideBridge.resolveNode("DRBChairRecomDRB").value = guideBridge.resolveNode("CaltransDropDownList").value;
        }
        guideBridge.resolveNode("DRBMemr1RecomDRB").value = guideBridge.resolveNode("DRBMembersDropdownList").value;
        guideBridge.resolveNode("MeetingDRBPanel").enabled = true;
    }
    else if (guideBridge.resolveNode("SelectDRADRB").value === "DRA") {
        var meetingCalled = data.getElementsByTagName("MeetingCalled")[0].innerHTML;
        guideBridge.resolveNode("MeetingDRAPanel").resetData();
        if (meetingCalled === "RE") {
            guideBridge.resolveNode("MeetCallRecomDRA").value = 0;
        } else if (meetingCalled === "CONTRACTOR") {
            guideBridge.resolveNode("MeetCallRecomDRA").value = 1;
        }
        guideBridge.resolveNode("MeetingDateRecomDRA").value = data.getElementsByTagName("MeetDate1")[0].innerHTML;
        guideBridge.resolveNode("AdvisorRecomDRA").value = guideBridge.resolveNode("AssignAdvisor").value;
        guideBridge.resolveNode("MeetingDRAPanel").enabled = true;
    }
}
function getRecommendationRecord(disputeID, meetingType) {
    setTimeout(function () {
        let jsonData = {
            "ea": guideBridge.resolveNode("ea").value,
            "district": guideBridge.resolveNode("district").value,
            "DisputeID": disputeID,
            "MeetingType": meetingType,
            "DRType": guideBridge.resolveNode("SelectDRADRB").value
        };
        xmlData = OBJtoXML1({
            "data": jsonData
        });
        url = 'http://' + window.location.hostname + ':8080/rest/services/Caltrans-eADR/Processes/GetRecommendChairRecord';
        $.ajax({
            type: 'POST',
            headers: {
                'Content-Type': 'application/xml',
                'Accept': '*/*'
            },
            url: url,
            data: xmlData,
            success: function (data) {
                var parsedData = JSON.parse(data.getElementsByTagName("RecomDetailsJson")[0].innerHTML);
                var parsedData1 = JSON.parse(data.getElementsByTagName("DisputeMeetDetailsJson")[0].innerHTML);
                if (typeof(parsedData1.DisputeMeetingDetails.Details) === "undefined") {
                    //alert("No data available");
                } 
                else {
                    if (parsedData1.DisputeMeetingDetails.Details.MEETING_DATE !== "" || parsedData1.DisputeMeetingDetails.Details.MEETING_DATE !== "null") {
                        parsedData1 = parsedData1.DisputeMeetingDetails.Details;
                        guideBridge.resolveNode("AttendAddRowRecChair").enabled = false;
                        guideBridge.resolveNode("AttendDeleteRowRecChair").enabled = false;
                        if (guideBridge.resolveNode("SelectDRADRB").value === "DRB") {
                            guideBridge.resolveNode("MeetingDateRecomDRB").value = parsedData1.MEETING_DATE;
                            guideBridge.resolveNode("MeetCallRecomDRB").value = parsedData1.MEETING_CALLED_BY;
                            guideBridge.resolveNode("DRBChairRecomDRB").value = parsedData1.DRB_CHAIR;
                            guideBridge.resolveNode("DRBMemr1RecomDRB").value = parsedData1.DRB_MEMEBER;
                            if (parsedData1.MEETING_LOCATION !== "null") {
                                guideBridge.resolveNode("MeetLOCRecomDRB").value = parsedData1.MEETING_LOCATION;
                            }
                            if (parsedData1.CALTRANS_REPRESENTATIVE !== "null") {
                                guideBridge.resolveNode("CalRepRecomDRB").value = parsedData1.CALTRANS_REPRESENTATIVE;
                            }
                            if (parsedData1.ATTENDEE_1 !== "null") {
                                guideBridge.resolveNode("attendee1RecomDRB").value = parsedData1.ATTENDEE_1;
                            }
                            if (parsedData1.ATTENDEE_2 !== "null") {
                                guideBridge.resolveNode("attendee2RecomDRB").value = parsedData1.ATTENDEE_2;
                            }
                            if (parsedData1.CONTRACTORS_REPRESENTATIVE !== "null") {
                                guideBridge.resolveNode("ContractoRepRecomDRB").value = parsedData1.CONTRACTORS_REPRESENTATIVE;
                            }
                            guideBridge.resolveNode("MeetLOCRecomDRB").enabled = false;
                            guideBridge.resolveNode("CalRepRecomDRB").enabled = false;
                            guideBridge.resolveNode("attendee1RecomDRB").enabled = false;
                            guideBridge.resolveNode("attendee2RecomDRB").enabled = false;
                            guideBridge.resolveNode("ContractoRepRecomDRB").enabled = false;
                            guideBridge.resolveNode("DRBMemr2RecomDRB").enabled = false;
                        } 
                        else if (guideBridge.resolveNode("SelectDRADRB").value === "DRA") {
                            guideBridge.resolveNode("MeetingDRAPanel").enabled = false;
                            //console.log(parsedData1);
                            guideBridge.resolveNode("MeetingDateRecomDRA").value = parsedData1.MEETING_DATE;
                            guideBridge.resolveNode("MeetCallRecomDRA").value = parsedData1.MEETING_CALLED_BY;
                            guideBridge.resolveNode("AdvisorRecomDRA").value = parsedData1.DRA_MEMBER;
                            if (parsedData1.MEETING_LOCATION !== "null") {
                                guideBridge.resolveNode("MeetLOCRecomDRA").value = parsedData1.MEETING_LOCATION;
                            }
                            if (parsedData1.CALTRANS_REPRESENTATIVE !== "null") {
                                guideBridge.resolveNode("CalRepRecomDRA").value = parsedData1.CALTRANS_REPRESENTATIVE;
                            }
                            if (parsedData1.ATTENDEE_1 !== "null") {
                                guideBridge.resolveNode("attendee1RecomDRA").value = parsedData1.ATTENDEE_1;
                            }
                            if (parsedData1.ATTENDEE_2 !== "null") {
                                guideBridge.resolveNode("attendee2RecomDRA").value = parsedData1.ATTENDEE_2;
                            }
                            if (parsedData1.CONTRACTORS_REPRESENTATIVE !== "null") {
                                guideBridge.resolveNode("ContractoRepRecomDRA").value = parsedData1.CONTRACTORS_REPRESENTATIVE;
                            }
                            guideBridge.resolveNode("MeetLOCRecomDRA").enabled = false;
                            guideBridge.resolveNode("CalRepRecomDRA").enabled = false;
                            guideBridge.resolveNode("attendee1RecomDRA").enabled = false;
                            guideBridge.resolveNode("attendee2RecomDRA").enabled = false;
                            guideBridge.resolveNode("ContractoRepRecomDRA").enabled = false;
                        }
                        //retreive existing additional attendes details
                        let attenddetails = JSON.parse(data.getElementsByTagName("DMAttendDetailsJson")[0].innerHTML);
                        var count1 = 0;
                        if (Object.values(attenddetails.AttendDet).length > 0) {
                            if (typeof(attenddetails.AttendDet.Record.DISPUTE_MEETING_ID) === "undefined") {
                                count1 = attenddetails.AttendDet.Record.length;
                            } else {
                                count1 = 1;
                            }
                        }
                        let tCount = guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instanceCount;
                        //console.log(guideBridge.resolveNode("MeetAtendPanelRecChair").instanceCount);
                        for(var i = 0; i < tCount-1; i++) {
                            let k = guideBridge.resolveNode("MeetAtendPanelRecChair").instanceIndex;
                            guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instances[k].AttendNameRecChair.enabled = false;
                            guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instances[k].AttendJobTitleRecChair.enabled = false;
                            guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instances[k].AttendCheckRecChair.enabled = false;
                            guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.removeInstance(i);
                        }
                        guideBridge.resolveNode("MeetAtendPanelRecChair").resetData();
                        if (count1 === 1) {
                            //guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.addInstance(1);
                            if (attenddetails.AttendDet.Record.ATTENDEE_NAME !== "null") {
                                guideBridge.resolveNode("MeetAtendPanelRecChair").AttendNameRecChair.value = attenddetails.AttendDet.Record.ATTENDEE_NAME;
                            }
                            if (attenddetails.AttendDet.Record.JOB_TITLE !== "null") {
                                guideBridge.resolveNode("MeetAtendPanelRecChair").AttendJobTitleRecChair.value = attenddetails.AttendDet.Record.JOB_TITLE;
                            }
                            if (attenddetails.AttendDet.Record.ATTENDEE_CHECK !== "null") {
                                guideBridge.resolveNode("MeetAtendPanelRecChair").AttendCheckRecChair.value = attenddetails.AttendDet.Record.ATTENDEE_CHECK;
                            }
                            guideBridge.resolveNode("MeetAtendPanelRecChair").enabled = false;
                            guideBridge.resolveNode("MeetAtendPanelRecChair").visible = true;
                        }
                        else if (count1 > 1) {
                            for (var i = 0; i < attenddetails.AttendDet.Record.length; i++) {
                                if (i > 0) {
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.addInstance(i);
                                }
                                if (attenddetails.AttendDet.Record[i].ATTENDEE_NAME !== "null") {
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").AttendNameRecChair.value = attenddetails.AttendDet.Record[i].ATTENDEE_NAME;
                                }
                                if (attenddetails.AttendDet.Record[i].JOB_TITLE !== "null") {
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").AttendJobTitleRecChair.value = attenddetails.AttendDet.Record[i].JOB_TITLE;
                                }
                                if (attenddetails.AttendDet.Record[i].ATTENDEE_CHECK !== "null") {
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").AttendCheckRecChair.value = attenddetails.AttendDet.Record[i].ATTENDEE_CHECK;
                                }
                                guideBridge.resolveNode("MeetAtendPanelRecChair").enabled = false;
                                guideBridge.resolveNode("MeetAtendPanelRecChair").visible = true;
                            }
                        } 
                        else if (count1 == 0) {
                            guideBridge.resolveNode("MeetAtendPanelRecChair").enabled = false;
                            guideBridge.resolveNode("MeetAtendPanelRecChair").visible = true;
                        }
                    }
                    guideBridge.resolveNode("BriefDescRecChair").value = parsedData.RecomDetails.Details.BRIEF_DESCRIPTION;
					guideBridge.resolveNode("RecomInputRecChair").value = parsedData.RecomDetails.Details.RECOMMENDATION_INPUT;
					guideBridge.resolveNode("BriefDescRecChair").enabled=false;
					guideBridge.resolveNode("RecomInputRecChair").enabled=false;
					guideBridge.resolveNode("DRBFavRecChair").value = parsedData.RecomDetails.Details.FAVOR_PARTY;
					guideBridge.resolveNode("DRBFavRecChair").enabled=false;
                    guideBridge.resolveNode("Attach1RecomChair").enabled=false;
                    guideBridge.resolveNode("SubmitRecomButton").enabled = false;
					guideBridge.resolveNode("PreviewRecChair").visible=true;
                }
            },
            error: function(err){
                //this block is executed when server encounters any problem
                // alert("something went wrong");
            }
        });
     },900);
}
// function to check additional information record is present or not for RE role
function getREAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus) {
	currStatus = currStatus.toUpperCase();
    let curstatusObj,curstatusObj1;
    if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
        curstatusObj = {
            "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
            "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
            "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION"/*,
            "CHAIR SUBMITTED CLARIFICATION REQUEST" : "CHAIR SUBMITTED CLARIFICATION REQUEST",
            "RE SUBMITTED RECOMMENDATION RESPONSE" : "RE SUBMITTED RECOMMENDATION RESPONSE",
            "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE"*/
        };
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
        curstatusObj = {
            "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
            "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
            "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION"/*,
            "ADVISOR SUBMITTED CLARIFICATION REQUEST" : "ADVISOR SUBMITTED CLARIFICATION REQUEST",
            "RE SUBMITTED RECOMMENDATION RESPONSE" : "RE SUBMITTED RECOMMENDATION RESPONSE",
            "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE"*/
        };
        curstatusObj1 = {
            "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
            "RE REQUESTED RECONSIDERATION":"RE REQUESTED RECONSIDERATION",
            "CONTRACTOR REQUESTED RECONSIDERATION":"CONTRACTOR REQUESTED RECONSIDERATION",
            "ADVISOR RESPONDED TO RECONSIDERATION REQUEST":"ADVISOR RESPONDED TO RECONSIDERATION REQUEST",
            "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
            "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
        };
    }
    let errorHandler;
    guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = true;
    guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResponseCKPPRES").value  = "";
    guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqRejComPPRES").value  = "";
    guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
    guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = false;
    guideBridge.resolveNode("REPanel.AddInfoSecPPRES").enabled = true;
    disablePosPaperRE(disputeID,meetingType,actualData);
    const promise = getAdditionalInfo(disputeID,meetingType,"RE");
    // let the Promise know what you want to do when it resolves
    promise.then(result => data1=result).catch(errorHandler);
    
    setTimeout(function alertFunc() {
        if(errorHandler === ""||errorHandler == null){
            if(Object.values(data1.AddInfo).length > 0){// && JSON.stringify(data1.AddInfo) !== '{}'
                guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = true;
                let duedate1 = data1.AddInfo.Info.ADD_INFO_DUEDATE;
                duedate1 = duedate1.split(" ")[0];
                guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AttachDueDatePPRES").value = "<p>" + duedate1.split("-")[1]+"/"+duedate1.split("-")[2]+"/"+duedate1.split("-")[0] +"</p>";
                guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textdraw_18875509761680594696133").value = "<p>" + data1.AddInfo.Info.ADD_INFO_REQUEST + "</p>";
                if(data1.AddInfo.Info.ADD_INFO_RESPONSE !== "null"){
                	guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").value = data1.AddInfo.Info.ADD_INFO_RESPONSE;
                    guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").enabled = true;
                	guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").visible = true;
                }
                else{
					guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").value = "--";
                	guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").visible = false;
                }
                guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").enabled = false;
                guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddAttachPPRES").enabled = false;
                guideBridge.resolveNode("REPanel.AddInfoSecPPRES.SubmitAddPPRES").enabled = false;
                //guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").enabled = true;
                //guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").visible = true;
            }
            guideBridge.resolveNode("REPanel.ReqClariPPRES").resetData();
            let claDate = new Date(duedate);
            let currDate = new Date();
            //For DRB, Traditional dates calculation
            if(meetingType.toUpperCase() === "TRADITIONAL" && guideBridge.resolveNode("SelectDRADRB").value == "DRB"){
                if(currStatus in curstatusObj){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 20);
                }
                else if(currStatus in curstatusObj1){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 30);
                    claDate.setDate(claDate.getDate() + 10);
                }
                else{
                    duedate = new Date(duedate);
					claDate.setDate(claDate.getDate() - 20);
                }
            }
            //For DRA, Traditional dates calculation
            else if(meetingType.toUpperCase() === "TRADITIONAL" && guideBridge.resolveNode("SelectDRADRB").value == "DRA"){
                if(currStatus in curstatusObj){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 3);
                }
                else if(currStatus in curstatusObj1){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 10);
                    claDate.setDate(claDate.getDate() + 7);
                }
                else{
                    duedate = new Date(duedate);
					claDate.setDate(claDate.getDate() - 3);
                }
            }
            //For Informal calculation either DRB or DRA
            else{
                let curstatusObj1;
                if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
                    curstatusObj1 = {
                        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
                        "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
                    };
                }
                else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
                    curstatusObj1 = {
                        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
                        "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
                    };
                }
                if(currStatus.toUpperCase() in curstatusObj1){
                    duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 7);
                }
                else{
					duedate = new Date(duedate);//duedate is recommendation submission date
                    claDate.setDate(claDate.getDate() - 7);
                }
            }
			guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClariDatePPRES").value = "<p>" + setMon(claDate.getMonth())+"/"+setDate1(claDate.getDate())+"/"+claDate.getFullYear() +"</p>";
            if(claDate < currDate){
                guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = false;
            }
			/*if(currStatus in curstatusObj){
				guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResDueDatePPRES").value = "<p>" + setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
                //guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqRecDatePPRES").value = "<p>" + setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
            }
            else if(currStatus in curstatusObj1){
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResDueDatePPRES").value = "<p>" + setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
            }
            else{
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResDueDatePPRES").value = "<p>"+duedate.replaceAll("-","/")+"</p>";
                //guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqRecDatePPRES").value = "<p>"+duedate.replaceAll("-","/")+"</p>";
            }*/
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResDueDatePPRES").value = "<p>" + setMon(duedate.getMonth())+"/"+setDate1(duedate.getDate())+"/"+duedate.getFullYear() +"</p>";
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResponseCKPPRES").value = "";
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqRejComPPRES").value = "";
            
            duedate = new Date(duedate);
            if(duedate < currDate){
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = false;
            }

        }
    }, 500);
}
// function to check additional information record is present or not for Contractor role
function getConAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus) {
	currStatus = currStatus.toUpperCase();
    let curstatusObj,curstatusObj1;
    if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
        curstatusObj = {
            "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
            "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
            "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION"/*,
            "CHAIR SUBMITTED CLARIFICATION REQUEST" : "CHAIR SUBMITTED CLARIFICATION REQUEST",
            "RE SUBMITTED RECOMMENDATION RESPONSE" : "RE SUBMITTED RECOMMENDATION RESPONSE",
            "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE"*/
        };
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
        curstatusObj = {
            "RE REQUESTED CLARIFICATION" : "RE REQUESTED CLARIFICATION",
            "CONTRACTOR REQUESTED CLARIFICATION" : "CONTRACTOR REQUESTED CLARIFICATION",
            "RE AND CONTRACTOR REQUESTED CLARIFICATION" : "RE AND CONTRACTOR REQUESTED CLARIFICATION"/*,
            "ADVISOR SUBMITTED CLARIFICATION REQUEST" : "ADVISOR SUBMITTED CLARIFICATION REQUEST",
            "RE SUBMITTED RECOMMENDATION RESPONSE" : "RE SUBMITTED RECOMMENDATION RESPONSE",
            "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE"*/
        };
        curstatusObj1 = {
            "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
            "RE REQUESTED RECONSIDERATION":"RE REQUESTED RECONSIDERATION",
            "CONTRACTOR REQUESTED RECONSIDERATION":"CONTRACTOR REQUESTED RECONSIDERATION",
            "ADVISOR RESPONDED TO RECONSIDERATION REQUEST":"ADVISOR RESPONDED TO RECONSIDERATION REQUEST",
            "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
            "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
        };
    }
    let errorHandler;
    guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = true;
    guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResponseCKPPCon").value = "";
    guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqRejComPPCon").value = "";
    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = false;
    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").enabled = true;
    disablePosPaperContractor(disputeID,meetingType,actualData);
    const promise = getAdditionalInfo(disputeID,meetingType,"CONTRACTOR");
    // let the Promise know what you want to do when it resolves
    promise.then(result => data1=result).catch(errorHandler);
    
    setTimeout(function alertFunc() {
        if(errorHandler===""||errorHandler==null){
            //console.log(data1);
            if(Object.values(data1.AddInfo).length > 0){
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = true;
                let duedate1 = data1.AddInfo.Info.ADD_INFO_DUEDATE;
                duedate1 = duedate1.split(" ")[0];
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AttachDueDatePPCon").value = "<p>" + duedate1.split("-")[1]+"/"+duedate1.split("-")[2]+"/"+duedate1.split("-")[0] +"</p>";
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textdraw_18875509761680594696133").value = "<p>" + data1.AddInfo.Info.ADD_INFO_REQUEST + "</p>";
                if(data1.AddInfo.Info.ADD_INFO_RESPONSE !== "null"){
                	guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").value = data1.AddInfo.Info.ADD_INFO_RESPONSE;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").enabled = true;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").visible = true;
                }
                else{
					guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").value = "--";
                    //guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").enabled = false;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").visible = false;
                }
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").enabled = false;
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddAttachPPCon").enabled = false;
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.SubmitAddPPCon").enabled = false;
                //guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").enabled = true;
                //guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").visible = true;                  
            }
            guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").resetData();
            let claDate = new Date(duedate);
            let currDate = new Date();
			//For DRB, Traditional dates calculation
            if(meetingType.toUpperCase() === "TRADITIONAL" && guideBridge.resolveNode("SelectDRADRB").value == "DRB"){
                if(currStatus in curstatusObj){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 20);
                }
                else if(currStatus in curstatusObj1){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 30);
                    claDate.setDate(claDate.getDate() + 10);
                }
                else{
                    duedate = new Date(duedate);
					claDate.setDate(claDate.getDate() - 20);
                }
            }
            //For DRA, Traditional dates calculation
            else if(meetingType.toUpperCase() === "TRADITIONAL" && guideBridge.resolveNode("SelectDRADRB").value == "DRA"){
                if(currStatus in curstatusObj){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 3);
                }
                else if(currStatus in curstatusObj1){
					duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 10);
                    claDate.setDate(claDate.getDate() + 7);
                }
                else{
                    duedate = new Date(duedate);
					claDate.setDate(claDate.getDate() - 3);
                }
            }
            //For Informal calculation either DRB or DRA
            else{
                let curstatusObj1;
                if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
                    curstatusObj1 = {
                        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
                        "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
                    };
                }
                else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
                    curstatusObj1 = {
                        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE" : "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
                        "FINAL REPORT GENERATED":"FINAL REPORT GENERATED",
                        "DOCUMENT HAS BEEN SIGNED" : "DOCUMENT HAS BEEN SIGNED"
                    };
                }
                if(currStatus.toUpperCase() in curstatusObj1){
                    duedate = new Date(duedate);
                    duedate.setDate(duedate.getDate() + 7);//duedate is recommendation submission date
                }
                else{
					duedate = new Date(duedate);
                    claDate.setDate(claDate.getDate() - 7);
                }
            }
            guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClariDatePPCon").value = "<p>" + setMon(claDate.getMonth())+"/"+setDate1(claDate.getDate())+"/"+claDate.getFullYear() +"</p>";
            if(claDate < currDate){
                guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").enabled = false;
            }
            /*if(currStatus in curstatusObj){
				guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResDueDatePPCon").value = "<p>" + setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
                //guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqRecDatePPCon").value = "<p>" + setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
            }
            else if(currStatus in curstatusObj1){
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResDueDatePPCon").value = "<p>" + setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
            }
            else{
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResDueDatePPCon").value = "<p>"+ setMon(duedate.getMonth())+"/"+duedate.getDate()+"/"+duedate.getFullYear() +"</p>";
                //guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqRecDatePPCon").value = "<p>"+duedate.replaceAll("-","/")+"</p>";
            }*/
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResDueDatePPCon").value = "<p>"+ setMon(duedate.getMonth())+"/"+setDate1(duedate.getDate())+"/"+duedate.getFullYear() +"</p>";
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResponseCKPPCon").value = "";
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqRejComPPCon").value = "";
            duedate = new Date(duedate);
            if(duedate < currDate){
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = false;
            }
        }
    }, 500);
}
//function to get clarification information
function getClarificationInfo(disputeID,meetingType,role){
    return new Promise(async function (resolve, reject) {
        let jsonData = {
            "ea" : guideBridge.resolveNode("ea").value,
            "district" : guideBridge.resolveNode("district").value,
            "DisputeID" : disputeID,
            "MeetingType" : meetingType,
            "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
            "ClarificationReqFrom" : role.toUpperCase(),
            "ClarificationType" : "GET",
            "HostPath" : window.location.protocol+"//"+window.location.hostname+":"+window.location.port
        };
        xmlData = OBJtoXML1({"data":jsonData});//json to xml conversion and store in xmlData variable
        let url = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/ClarificationInfoInsGet';
        $.ajax({ 
            type: 'POST',
            async : false,
            headers: {
                'Content-Type' : 'application/xml',
                'Accept' : '*/*'
            },
            url: url,
            data: xmlData,
            success: function (data) {
                //let data1 = JSON.parse(data.getElementsByTagName("AddInfoStr")[0].innerHTML);
                resolve(data);
            }, 
            error: function(err){
                //this block is executed when server encounters any problem
                alert("something went wrong");
            }
        });
    });
}
//function to get previous records data of Chair/Advisor before recommendation report
function getPreviousChaAdv(meetingType,disputeID,actualData,currStatus,meetDate){
    guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").visible = true;
    guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").enabled = false;
    guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").visible = true;
    closedisputeAcc();
    guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").visible = true;
    guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").resetData();
    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = false;
    guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = false;
    if("RE and Contractor submitted Position Papers".toLowerCase() == currStatus.toLowerCase()){
        guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair")).somExpression;
        /* Below code is when meeting date is passed the current date, show additional information and recommendation accordions */
        /*let mDate = new Date(meetDate);
        let currDate = new Date();
        if(currDate > mDate){
			guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").visible = true;
            guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = true;
            guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").enabled = true;
            guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").resetData();
        }
        else{
			guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").visible = false;
            guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = false;
        }*/
    }
    else{
        guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair")).somExpression;
    }
    guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = true;
    guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").enabled = true;
    guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").resetData();

    if(actualData.userRole.toString().toUpperCase() !== "DRB_CHAIR" && actualData.userRole.toString().toUpperCase() !== "DRA"){
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").enabled = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair").enabled = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").enabled = false;
    }
    else{
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").enabled = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair").enabled = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").enabled = true;
    }
    getAdditionalInfoChair(meetingType,disputeID,actualData,currStatus,meetDate);
}
//function to get recommendation response information based on role
function getRecomResponseInfo(disputeID,meetingType,role){
    return new Promise(async function (resolve, reject) {
        let jsonData = {
            "ea" : guideBridge.resolveNode("ea").value,
            "district" : guideBridge.resolveNode("district").value,
            "DisputeID" : disputeID,
            "MeetingType" : meetingType,
            "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
            "role" : role.toUpperCase(),
            "recomrespType" : "GET",
            "HostPath" : window.location.protocol+"//"+window.location.hostname+":"+window.location.port
        };
        xmlData = OBJtoXML1({"data":jsonData});//json to xml conversion and store in xmlData variable
        let url = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/RecommendResponseInsGet';
        $.ajax({ 
            type: 'POST',
            headers: {
                'Content-Type' : 'application/xml',
                'Accept' : '*/*'
            },
            url: url,
            data: xmlData,
            success: function (data) {
                //let data1 = JSON.parse(data.getElementsByTagName("AddInfoStr")[0].innerHTML);
                resolve(data);
            }, 
            error: function(err){
                //this block is executed when server encounters any problem
                alert("something went wrong");
            }
        });
    });
}
//function to get reconsideration information
function getReconsiderInfo(disputeID,meetingType,role){
    return new Promise(async function (resolve, reject) {
        let jsonData;
        if(role !== "" && role!== "null"){
            jsonData = {
                "ea" : guideBridge.resolveNode("ea").value,
                "district" : guideBridge.resolveNode("district").value,
                "DisputeID" : disputeID,
                "MeetingType" : meetingType,
                "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
                "role" : role.toUpperCase(),
                "reconsiderType" : "GET",
                "HostPath" : window.location.protocol+"//"+window.location.hostname+":"+window.location.port
            };
        }
        else{
            jsonData = {
                "ea" : guideBridge.resolveNode("ea").value,
                "district" : guideBridge.resolveNode("district").value,
                "DisputeID" : disputeID,
                "MeetingType" : meetingType,
                "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
                "reconsiderType" : "GetChAdSubReconsider",
                "HostPath" : window.location.protocol+"//"+window.location.hostname+":"+window.location.port
            };
        }
        xmlData = OBJtoXML1({"data":jsonData});//json to xml conversion and store in xmlData variable
        let url = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/rest/services/Caltrans-eADR/Processes/ResponseReconsiderInsGet';
        $.ajax({ 
            type: 'POST',
            headers: {
                'Content-Type' : 'application/xml',
                'Accept' : '*/*'
            },
            url: url,
            data: xmlData,
            success: function (data) {
                //let data1 = JSON.parse(data.getElementsByTagName("AddInfoStr")[0].innerHTML);
                resolve(data);
            }, 
            error: function(err){
                //this block is executed when server encounters any problem
                alert("something went wrong");
            }
        });
    });
}