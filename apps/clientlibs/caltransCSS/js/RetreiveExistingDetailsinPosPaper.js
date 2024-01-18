$(document).ready(function(){ 
	$('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop___guide-item-nav').click(function(){
		//alert("Retreive");
        guideBridge.resolveNode("RecommendationPanelPPCon").visible = false;
        guideBridge.resolveNode("FirstSubmitPPCon").visible = true;
        guideBridge.resolveNode("SubmitPPCon").visible = true;
        guideBridge.resolveNode("PreviewPPCon").visible = true;
        guideBridge.resolveNode("AddInfoSecPPCon").visible = true;
        guideBridge.resolveNode("ButtonsPanelPPCon").visible = true;
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
        let jsonData = {
            "ea" : guideBridge.resolveNode("ea").value,
            "district" : guideBridge.resolveNode("district").value,
            "DisputeID" : disputeID,
            "MeetingType" : meetingType,
            "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
            "role" : "CONTRACTOR"
        };
        xmlData = OBJtoXML1({"data":jsonData});
        url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetPosPaperSubmittedRecord';
        $.ajax({ 
              type: 'POST',
              headers: {
                'Content-Type' : 'application/xml',
                'Accept' : '*/*'
              },
              url: url,
             data: xmlData,
            //data: data1,
              success: function (data) {
                //console.log(data);
                    let params = new URLSearchParams(window.location.search);
                    let actualData = JSON.parse(window.atob(params.get('input')));
                    if (actualData.userRole.toString().toUpperCase() === "CONTRACTOR") {
                        guideBridge.resolveNode("PreviewPPCon").visible = true;
                        guideBridge.resolveNode("ButtonsPanelPPCon").visible = true;
                    } else {
                        guideBridge.resolveNode("PreviewPPCon").visible = false;
                        guideBridge.resolveNode("ButtonsPanelPPCon").visible = false;
                    }
                    if (actualData.userRole.toString().toUpperCase() === "CONTRACTOR") {
                        let posduedate = new Date(guideBridge.resolveNode("PosPaperDuePPCon").value.replace("<p>", "").replace("</p>", ""));
                        let currentDate = new Date();
                        if (parseInt(data.getElementsByTagName("RowCount")[0].innerHTML) === 1) {
                            guideBridge.resolveNode("backgroundPPCon").value = data.getElementsByTagName("BGNote")[0].innerHTML;
                            guideBridge.resolveNode("contractorPPCon").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
                            guideBridge.resolveNode("PreviewPPCon").visible = true;
                            if (posduedate < currentDate || parseInt(data.getElementsByTagName("CheckOtherStatus")[0].innerHTML) === 1) {
                                //alert("okk..");
                                guideBridge.resolveNode("FirstSubmitPPCon").enabled = false;
                                guideBridge.resolveNode("SubmitPPCon").enabled = false;
                                guideBridge.resolveNode("ReviewConPPCon").enabled = true;
                            }
                            if (data.getElementsByTagName("AddInfoDueDate")[0].innerHTML !== "null" && data.getElementsByTagName("AddInfoDueDate")[0].innerHTML !== "") {
                                guideBridge.resolveNode("AttachDueDatePPCon").value = "<p>" + data.getElementsByTagName("AddInfoDueDate")[0].innerHTML + "</p>";
                            }
							else if(data.getElementsByTagName("AddInfoDueDate")[0].innerHTML === "null" || data.getElementsByTagName("AddInfoDueDate")[0].innerHTML === "") {
                                guideBridge.resolveNode("AddInfoSecPPCon").enabled = false;
                                guideBridge.resolveNode("SubmitAddPPCon").enabled = false;
                            }
                            let addInfoDuedate = new Date(data.getElementsByTagName("AddInfoDueDate")[0].innerHTML);
                            if (data.getElementsByTagName("AddInfoSubDate")[0].innerHTML !== "") {
                                let addInfoSubdate = new Date(data.getElementsByTagName("AddInfoSubDate")[0].innerHTML);
                                guideBridge.resolveNode("SubmitAddPPCon").enabled = false;
                                guideBridge.resolveNode("AddInfoPreviewPPCon").visible = true;
                            }
                            if (addInfoDuedate < currentDate) {
                                guideBridge.resolveNode("AddInfoSecPPCon").enabled = false;
                                guideBridge.resolveNode("SubmitAddPPCon").enabled = false;
                                //guideBridge.resolveNode("AddInfoPreviewPPCon").visible = true;
                            }
                        } 
                        else {
                            guideBridge.resolveNode("PreviewPPCon").visible = false;
                            guideBridge.resolveNode("SubmitAddPPCon").enabled = false;
                            guideBridge.resolveNode("AddInfoSecPPCon").enabled = false;
                            guideBridge.resolveNode("FirstSubmitPPCon").enabled = true;
                            guideBridge.resolveNode("FirstSubmitPPCon").resetData();
                            guideBridge.resolveNode("SubmitPPCon").enabled = true;
                            guideBridge.resolveNode("ReviewConPPCon").enabled = false;
                        }
                    }
              }, 
              error: function(err){
                //this block is executed when server encounters any problem
               // alert("something went wrong");
              }
        });
    });
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_547247398_copy___guide-item-nav').click(function(){
		//alert("Retreive");
        guideBridge.resolveNode("RecommendationPanelPPRES").visible = false;
        guideBridge.resolveNode("FirstSubmitPPRES").visible = true;
        guideBridge.resolveNode("SubmitPPRES").visible = true;
        guideBridge.resolveNode("PreviewPPRES").visible = true;
        guideBridge.resolveNode("AddInfoSecPPRES").visible = true;
        guideBridge.resolveNode("ButtonsPanelPPRES").visible = true;
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
        let jsonData = {
            "ea" : guideBridge.resolveNode("ea").value,
            "district" : guideBridge.resolveNode("district").value,
            "DisputeID" : disputeID,
            "MeetingType" : meetingType,
            "DRType" : guideBridge.resolveNode("SelectDRADRB").value,
            "role" : "RE"
        };
        xmlData = OBJtoXML1({"data":jsonData});
        url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetPosPaperSubmittedRecord';
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
                let params = new URLSearchParams(window.location.search);
                let actualData = JSON.parse(window.atob(params.get('input')));
                if (actualData.userRole.toString().toUpperCase() === "RE") {
                    guideBridge.resolveNode("PreviewPPRES").visible = true;
                    guideBridge.resolveNode("ButtonsPanelPPRES").visible = true;
                } else {
                    guideBridge.resolveNode("PreviewPPRES").visible = false;
                    guideBridge.resolveNode("ButtonsPanelPPRES").visible = false;
                }
                if (actualData.userRole.toString().toUpperCase() === "RE") {
                    let posduedate = new Date(guideBridge.resolveNode("PosPaperDuePPRES").value.replace("<p>", "").replace("</p>", ""));
                    let currentDate = new Date();
                    if (parseInt(data.getElementsByTagName("RowCount")[0].innerHTML) === 1) {
                        guideBridge.resolveNode("backgroundPPRES").value = data.getElementsByTagName("BGNote")[0].innerHTML;
                        guideBridge.resolveNode("CaltransPPRES").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
                        guideBridge.resolveNode("PreviewPPRES").visible = true;
                        if (posduedate < currentDate || parseInt(data.getElementsByTagName("CheckOtherStatus")[0].innerHTML) === 1) {
                            //alert("okk..");
                            guideBridge.resolveNode("FirstSubmitPPRES").enabled = false;
                            guideBridge.resolveNode("SubmitPPRES").enabled = false;
                            guideBridge.resolveNode("ReviewConPPRES").enabled = true;
                        }
                        if (data.getElementsByTagName("AddInfoDueDate")[0].innerHTML !== "null" && data.getElementsByTagName("AddInfoDueDate")[0].innerHTML !== "") {
                            guideBridge.resolveNode("AttachDueDatePPRES").value = "<p>" + data.getElementsByTagName("AddInfoDueDate")[0].innerHTML + "</p>";
                        }
                        else if(data.getElementsByTagName("AddInfoDueDate")[0].innerHTML === "null" || data.getElementsByTagName("AddInfoDueDate")[0].innerHTML === "") {
                            guideBridge.resolveNode("AddInfoSecPPRES").enabled = false;
                            guideBridge.resolveNode("SubmitAddPPRES").enabled = false;
                        }
                        let addInfoDuedate = new Date(data.getElementsByTagName("AddInfoDueDate")[0].innerHTML);
                        if (data.getElementsByTagName("AddInfoSubDate")[0].innerHTML !== "") {
                            let addInfoSubdate = new Date(data.getElementsByTagName("AddInfoSubDate")[0].innerHTML);
                            guideBridge.resolveNode("SubmitAddPPRES").enabled = false;
                            guideBridge.resolveNode("AddInfoPreviewPPRES").visible = true;
                        }
                        if (addInfoDuedate < currentDate) {
                            guideBridge.resolveNode("AddInfoSecPPRES").enabled = false;
                            guideBridge.resolveNode("SubmitAddPPRES").enabled = false;
                            //guideBridge.resolveNode("AddInfoPreviewPPRES").visible = true;
                        } 
                    } 
                    else {
                        guideBridge.resolveNode("PreviewPPRES").visible = false;
                        guideBridge.resolveNode("SubmitAddPPRES").enabled = false;
                        guideBridge.resolveNode("AddInfoSecPPRES").enabled = false;
                        guideBridge.resolveNode("FirstSubmitPPRES").enabled = true;
                        guideBridge.resolveNode("FirstSubmitPPRES").resetData();
                        guideBridge.resolveNode("SubmitPPRES").enabled = true;
                        guideBridge.resolveNode("ReviewConPPRES").enabled = false;
                        //guideBridge.resolveNode("CaltransPPRES").enabled = true;
                    }
                }
              },
              error: function(err){
                //this block is executed when server encounters any problem
               // alert("something went wrong");
              }
        });
    });
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_769133156_copy___guide-item-nav').click(function(){
		//alert("Retreive");
        setTimeout(function() {
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
        let jsonData = {
            "ea" : guideBridge.resolveNode("ea").value,
            "district" : guideBridge.resolveNode("district").value,
            "DisputeID" : disputeID,
            "MeetingType" : meetingType,
            "DRType" : guideBridge.resolveNode("SelectDRADRB").value
        };
        let params = new URLSearchParams(window.location.search);
        let actualData = JSON.parse(window.atob(params.get('input')));
        if (actualData.userRole.toString().toUpperCase() === "DRA" || actualData.userRole.toString().toUpperCase() === "DRB_CHAIR") {
            guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled = true;
            guideBridge.resolveNode("BriefDescRecChair").enabled = true;
            guideBridge.resolveNode("MeetingInfoPanelRecChair").enabled = true;
            guideBridge.resolveNode("RecomPanelRecChair").enabled = true;
            guideBridge.resolveNode("SubmitRecomButton").enabled = true;
        } 
        else {
            guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled = false;
            guideBridge.resolveNode("BriefDescRecChair").enabled = false;
            guideBridge.resolveNode("MeetingInfoPanelRecChair").enabled = false;
            guideBridge.resolveNode("RecomPanelRecChair").enabled = false;
            guideBridge.resolveNode("SubmitRecomButton").enabled = false;
        }
        xmlData = OBJtoXML1({"data":jsonData});
        url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetRecommendChairRecord';
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
                if(parseInt(data.getElementsByTagName("GetAddInfoExistCount")[0].innerHTML)===0){
					guideBridge.resolveNode("ReqAddInfoDateRecChair").value=data.getElementsByTagName("MeetingDate")[0].innerHTML;
                }
                else{
                    var parsedData=JSON.parse(data.getElementsByTagName("RecomDetailsJson")[0].innerHTML);
                    var parsedData1=JSON.parse(data.getElementsByTagName("DisputeMeetDetailsJson")[0].innerHTML);
                    //console.log(parsedData1);
                    if(typeof(parsedData1.DisputeMeetingDetails.Details)==="undefined"){
                    //alert("No data available");
                    }
                    else{
                        if(parsedData1.DisputeMeetingDetails.Details.MEETING_DATE!=="" || parsedData1.DisputeMeetingDetails.Details.MEETING_DATE!=="null"){
                            parsedData1 = parsedData1.DisputeMeetingDetails.Details;
							guideBridge.resolveNode("AttendAddRowRecChair").enabled = false;
                            guideBridge.resolveNode("AttendDeleteRowRecChair").enabled = false;
                            if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
                                guideBridge.resolveNode("MeetingDRBPanel").enabled = false;
                                guideBridge.resolveNode("MeetingDateRecomDRB").value = parsedData1.MEETING_DATE;
                                guideBridge.resolveNode("MeetCallRecomDRB").value = parsedData1.MEETING_CALLED_BY;
                                guideBridge.resolveNode("DRBChairRecomDRB").value = parsedData1.DRB_CHAIR;
                                guideBridge.resolveNode("DRBMemr1RecomDRB").value = parsedData1.DRB_MEMEBER;
                                if(parsedData1.MEETING_LOCATION!=="null"){
                                    guideBridge.resolveNode("MeetLOCRecomDRB").value = parsedData1.MEETING_LOCATION;
                                }
                                if(parsedData1.CALTRANS_REPRESENTATIVE!=="null"){
                                    guideBridge.resolveNode("CalRepRecomDRB").value = parsedData1.CALTRANS_REPRESENTATIVE;
                                }
                                if(parsedData1.ATTENDEE_1!=="null"){
                                    guideBridge.resolveNode("attendee1RecomDRB").value = parsedData1.ATTENDEE_1;
                                }
                                if(parsedData1.ATTENDEE_2!=="null"){
                                    guideBridge.resolveNode("attendee2RecomDRB").value = parsedData1.ATTENDEE_2;
                                }
                                if(parsedData1.CONTRACTORS_REPRESENTATIVE!=="null"){
                                    guideBridge.resolveNode("ContractoRepRecomDRB").value = parsedData1.CONTRACTORS_REPRESENTATIVE;
                                }
                            }
                            else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
                                guideBridge.resolveNode("MeetingDRAPanel").enabled = false;
                                //console.log(parsedData1);
                                guideBridge.resolveNode("MeetingDateRecomDRA").value = parsedData1.MEETING_DATE;
                                guideBridge.resolveNode("MeetCallRecomDRA").value = parsedData1.MEETING_CALLED_BY;
                                guideBridge.resolveNode("AdvisorRecomDRA").value = parsedData1.DRA_MEMBER;
                                if(parsedData1.MEETING_LOCATION!=="null"){
                                    guideBridge.resolveNode("MeetLOCRecomDRA").value = parsedData1.MEETING_LOCATION;
                                }
                                if(parsedData1.CALTRANS_REPRESENTATIVE!=="null"){
                                    guideBridge.resolveNode("CalRepRecomDRA").value = parsedData1.CALTRANS_REPRESENTATIVE;
                                }
                                if(parsedData1.ATTENDEE_1!=="null"){
                                    guideBridge.resolveNode("attendee1RecomDRA").value = parsedData1.ATTENDEE_1;
                                }
                                if(parsedData1.ATTENDEE_2!=="null"){
                                    guideBridge.resolveNode("attendee2RecomDRA").value = parsedData1.ATTENDEE_2;
                                }
                                if(parsedData1.CONTRACTORS_REPRESENTATIVE!=="null"){
                                    guideBridge.resolveNode("ContractoRepRecomDRA").value = parsedData1.CONTRACTORS_REPRESENTATIVE;
                                }               
                            }
                            //retreive existing additional attendes details
                            let attenddetails = JSON.parse(data.getElementsByTagName("DMAttendDetailsJson")[0].innerHTML);
                            var count1=0;
                            if(Object.values(attenddetails.AttendDet).length>0){
                                if(typeof(attenddetails.AttendDet.Record.DISPUTE_MEETING_ID)==="undefined"){
                                    count1=attenddetails.AttendDet.Record.length;
                                }
                                else{
                                    count1=1;
                                }
                            }
                            let tCount = guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instanceCount;
                            for(var i=tCount;i>-1;i--){
                               guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.removeInstance(i);
                            }
                            guideBridge.resolveNode("MeetAtendPanelRecChair").resetData();
                            if(count1===1){
                                //guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.addInstance(1);
                                if(attenddetails.AttendDet.Record.ATTENDEE_NAME!=="null"){
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").AttendNameRecChair.value = attenddetails.AttendDet.Record.ATTENDEE_NAME;
                                }
                                if(attenddetails.AttendDet.Record.JOB_TITLE!=="null"){
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").AttendJobTitleRecChair.value = attenddetails.AttendDet.Record.JOB_TITLE;
                                }
                                if(attenddetails.AttendDet.Record.ATTENDEE_CHECK!=="null"){
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").AttendCheckRecChair.value = attenddetails.AttendDet.Record.ATTENDEE_CHECK;
                                }
                                guideBridge.resolveNode("MeetAtendPanelRecChair").enabled=false;
                                guideBridge.resolveNode("MeetAtendPanelRecChair").visible=true;
                            }
                            else if(count1>1){
                                for(var i=0; i<attenddetails.AttendDet.Record.length; i++){
                                    if(i>0){
                                        guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.addInstance(1);
                                    }
                                    if(attenddetails.AttendDet.Record[i].ATTENDEE_NAME!=="null"){
                                        guideBridge.resolveNode("MeetAtendPanelRecChair").AttendNameRecChair.value = attenddetails.AttendDet.Record[i].ATTENDEE_NAME;
                                    }
                                    if(attenddetails.AttendDet.Record[i].JOB_TITLE!=="null"){
                                        guideBridge.resolveNode("MeetAtendPanelRecChair").AttendJobTitleRecChair.value = attenddetails.AttendDet.Record[i].JOB_TITLE;
                                    }
                                    if(attenddetails.AttendDet.Record[i].ATTENDEE_CHECK!=="null"){
                                        guideBridge.resolveNode("MeetAtendPanelRecChair").AttendCheckRecChair.value = attenddetails.AttendDet.Record[i].ATTENDEE_CHECK;
                                    }
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").enabled=false;
                                    guideBridge.resolveNode("MeetAtendPanelRecChair").visible=true;
                                }
                            }
                            else if(count1 == 0){
								guideBridge.resolveNode("MeetAtendPanelRecChair").enabled=false;
                                guideBridge.resolveNode("MeetAtendPanelRecChair").visible=true;
                            }
                          }
                        /*else{
                            guideBridge.resolveNode("AttendAddRowRecChair").enabled=true;
        					guideBridge.resolveNode("AttendDeleteRowRecChair").enabled=true;
                        }*/
                     }
                    if(typeof(parsedData.RecomDetails.Details)==="undefined"){
                        //alert("No data available");
                    }
                    else{
                        //console.log(parsedData);
                        //PreviewRecChair
                        	if(parsedData.RecomDetails.Details.ADD_INFO_DUEDATE!=="null"){
								guideBridge.resolveNode("ReqAddInfoDateRecChair").value = parsedData.RecomDetails.Details.ADD_INFO_DUEDATE;
                                var checkDate = new Date(parsedData.RecomDetails.Details.ADD_INFO_DUEDATE);
                                var todaydate = new Date();
                                //guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled=false;
                                /*if(checkDate>todaydate){
                        			guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled=false;
                                }*/
                            }
                        	if(parsedData.RecomDetails.Details.ADD_INFO_RE!=="null"){
								guideBridge.resolveNode("ReqAddInfoResChk").value = parsedData.RecomDetails.Details.ADD_INFO_RE;
                            }
                        	if(parsedData.RecomDetails.Details.ADD_INFO_CONTRACTOR!=="null"){
								guideBridge.resolveNode("ReqAddInfoConChk").value = parsedData.RecomDetails.Details.ADD_INFO_CONTRACTOR;
                            }
                        	if(parsedData.RecomDetails.Details.ADD_INFO_REQUEST_DESC!=="null"){
								guideBridge.resolveNode("ReqAddInfoDescRecChair").value = parsedData.RecomDetails.Details.ADD_INFO_REQUEST_DESC;
								guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled=false;
                            }
                            if(parsedData.RecomDetails.Details.BRIEF_DESCRIPTION!=="null"){
                            	guideBridge.resolveNode("BriefDescRecChair").value = parsedData.RecomDetails.Details.BRIEF_DESCRIPTION;
                            }
                            if( parsedData.RecomDetails.Details.RECOMMENDATION_INPUT!=="null"){
                            	guideBridge.resolveNode("RecomInputRecChair").value = parsedData.RecomDetails.Details.RECOMMENDATION_INPUT;
								guideBridge.resolveNode("RecomPanelRecChair").enabled=false;
                                guideBridge.resolveNode("BriefDescRecChair").enabled=false;
                                //guideBridge.resolveNode("SubmitRecomButton").enabled=false;
                                guideBridge.resolveNode("PreviewRecChair").visible=true;
                                guideBridge.resolveNode("ReqAddInfoSecRecChair").enabled=false;
                                guideBridge.resolveNode("ReqAddInfoDateRecChair").value=data.getElementsByTagName("MeetingDate")[0].innerHTML;
                            }
                            if(parsedData.RecomDetails.Details.FAVOR_PARTY!=="null"){
                                guideBridge.resolveNode("DRBFavRecChair").value = parsedData.RecomDetails.Details.FAVOR_PARTY;
                                guideBridge.resolveNode("PreviewRecChair").visible=true;
                                guideBridge.resolveNode("ClarPreviewRecChair").visible=true;
                                guideBridge.resolveNode("SubmitRecomButton").enabled = false;
                                //guideBridge.resolveNode("RecomPanelRecChair").enabled=false;
                            }
                            /*if(parsedData.RecomDetails.Details.SIGN_NAME!=="null"){
                                guideBridge.resolveNode("SignNameMainRecChair").value = parsedData.RecomDetails.Details.SIGN_NAME;
                            }
                            if(parsedData.RecomDetails.Details.SIGN_DATE!=="null"){
                                guideBridge.resolveNode("SignDateRecChair").value = parsedData.RecomDetails.Details.SIGN_DATE;

                            }*/
                        	if(parsedData.RecomDetails.Details.CLARIFICATION_INPUT!=="null"){
                                guideBridge.resolveNode("ReqClaInputRecChair").value = parsedData.RecomDetails.Details.CLARIFICATION_INPUT;
                                guideBridge.resolveNode("ClarificationPanelRecChair").enabled = false;
                                guideBridge.resolveNode("button_14237702541654689494965-re").enabled = false;
                                guideBridge.resolveNode("ClarPreviewRecChair").visible = true;
                            }
                        	else{
                                guideBridge.resolveNode("ClarPreviewRecChair").visible = false;
                                if(parsedData.RecomDetails.Details.CLARIFICATION_REQUESTED_RECON==='YES'){
									guideBridge.resolveNode("ClarificationPanelRecChair").enabled = true;
                                    guideBridge.resolveNode("button_14237702541654689494965-re").enabled = true;
                                }
                                else{
									guideBridge.resolveNode("ClarificationPanelRecChair").enabled = false;
                                    guideBridge.resolveNode("button_14237702541654689494965-re").enabled = false;
                                }
                            }
                        	if(parsedData.RecomDetails.Details.RECONSIDER_FAVOR_PARTY!=="null"){
                                guideBridge.resolveNode("ReqRecRecomInputRecChair").value = parsedData.RecomDetails.Details.RECONSIDER_RECOMMENDATION_INPUT;
                                guideBridge.resolveNode("ReqRecDRBFavRecChair").value = parsedData.RecomDetails.Details.RECONSIDER_FAVOR_PARTY;
                               // guideBridge.resolveNode("ReqRecSignNameMainRecChair").value = parsedData.RecomDetails.Details.RECONSIDER_SIGN_NAME;
                               // guideBridge.resolveNode("ReqRecSignDateRecChair").value = parsedData.RecomDetails.Details.RECONSIDER_SIGN_DATE;
								guideBridge.resolveNode("RequestReconsiderPanelRecChair").enabled = false;
                                guideBridge.resolveNode("ReqRecSubRecRecChair").enabled = false;
                                guideBridge.resolveNode("ReqRecPreviewRecChair").visible = true;
                            }
                        	else
                            {
								guideBridge.resolveNode("ReqRecPreviewRecChair").visible = false;
                                if(parsedData.RecomDetails.Details.REQUESTED_RECONSIDER_RECON==='YES'){
									guideBridge.resolveNode("RequestReconsiderPanelRecChair").enabled = true;
                                    guideBridge.resolveNode("ReqRecSubRecRecChair").enabled = true;
                                }
                                else{
									guideBridge.resolveNode("RequestReconsiderPanelRecChair").enabled = false;
                                    guideBridge.resolveNode("ReqRecSubRecRecChair").enabled = false;
                                }
                            }
                        }

                    }
              },
              error: function(err){
                //this block is executed when server encounters any problem
               // alert("something went wrong");
              }
        });
        },900)     
    });
});