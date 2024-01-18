//for accordions show or hide using below function for every status
function statusCheckConDRA(currStatus,meetingType,disputeID,actualData,pendingAction,duedate){
    let errorHandler;
    /* Hide success and error messages inside each accordion of Contractor Reports tab*/
    guideBridge.resolveNode("PosSucMssgePPCon").visible = false;
    guideBridge.resolveNode("PosErrMssgePPCon").visible = false;
    guideBridge.resolveNode("PosAddiSucMssgePPCon").visible = false;
    guideBridge.resolveNode("PosAddiErrMssgePPCon").visible = false;
    guideBridge.resolveNode("ReqClaSucMssgePPCon").visible = false;
    guideBridge.resolveNode("ReqClaErrMssgePPCon").visible = false;
    guideBridge.resolveNode("ReqSubSucMssgePPCon").visible = false;
    guideBridge.resolveNode("ReqSubErrMssgePPCon").visible = false;
    guideBridge.resolveNode("ReqRecSucMssgePPCon").visible = false;
    guideBridge.resolveNode("ReqRecErrMssgePPCon").visible = false;
    //to overcome the value script of making a textarea is enabled, using below one
    enableCkCon();
    enableCkCon1();
	///below is for Status ID 3
    if (currStatus.toLowerCase() === "Position Paper Due Date and Meeting Date Established".toLowerCase()) {
        guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").visible = true;
        guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").enabled = true;
        //guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.SubmitPPCon").enabled = true;
        guideBridge.resolveNode("PosSucMssgePPCon").visible = false;
        guideBridge.resolveNode("PosErrMssgePPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
    }
    // below is for Status 5
    else if (currStatus.toLowerCase() === "RE submitted Position Paper".toLowerCase()) {
        guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").somExpression);
        guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").enabled = true;
        guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").visible = true;
        guideBridge.resolveNode("PosSucMssgePPCon").visible = false;
        guideBridge.resolveNode("PosErrMssgePPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
    }
    // below is for Status 4
    else if (currStatus.toLowerCase() === "Contractor submitted Position Paper".toLowerCase()) {
        guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").somExpression);
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
        // let the Promise know what you want to do when it resolves
        promise.then(result => data=result).catch(errorHandler);
        
        setTimeout(function alertFunc() {
            if(errorHandler===""||errorHandler==null){
                guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.backgroundPPCon").value = data.getElementsByTagName("BGNote")[0].innerHTML;
                guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.contractorPPCon").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
                guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.PreviewPPCon").visible = true;
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
            }
            
        }, 500);
    }
    // below is for Status 6
    else if (currStatus.toLowerCase() === "RE and Contractor submitted Position Papers".toLowerCase()) {
        guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon").somExpression);
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
        // let the Promise know what you want to do when it resolves
        promise.then(result => data=result).catch(errorHandler);
        
        setTimeout(function alertFunc() {
            if(errorHandler===""||errorHandler==null){
                guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.backgroundPPCon").value = data.getElementsByTagName("BGNote")[0].innerHTML;
                guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.contractorPPCon").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
                guideBridge.resolveNode("ContractorPanel.FirstSubmitPPCon.PreviewPPCon").visible = true;
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
                let posduedate = new Date(guideBridge.resolveNode("PosPaperDuePPCon").value.replace("<p>", "").replace("</p>", ""));
                let currentDate = new Date();
                //if 2 conditions are met or if the user role is not Contractor
                if ((posduedate < currentDate && parseInt(data.getElementsByTagName("CheckOtherStatus")[0].innerHTML) === 1) || actualData.userRole.toString().toUpperCase() !== "CONTRACTOR") {
                    displayPPAccContractor();
                }
            }
            
        }, 500);
	}
    // below is for Status 11 or 12 or 15 
    else if (currStatus.toLowerCase() === "Advisor requested Additional Information from Contractor".toLowerCase() || currStatus.toLowerCase() === "Advisor requested Additional Information from RE and Contractor".toLowerCase() || (currStatus.toLowerCase() === "RE submitted additional information".toLowerCase() && pendingAction.toLowerCase() === "Provide Additional Information".toLowerCase())) {
        disablePosPaperContractor(disputeID,meetingType,actualData);
    	guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = true;
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").enabled = true;
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").resetData();
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").visible = false;

        const promise = getAdditionalInfo(disputeID,meetingType,"CONTRACTOR");
        // let the Promise know what you want to do when it resolves
        promise.then(result => data1=result).catch(errorHandler);

        setTimeout(function alertFunc() {
            if(errorHandler===""||errorHandler==null){
                //data1 = JSON.parse(data1.getElementsByTagName("AddInfoStr")[0].innerHTML);
                if(Object.values(data1.AddInfo).length > 0){
                    let duedate1 = data1.AddInfo.Info.ADD_INFO_DUEDATE;
                    duedate1 = duedate1.split(" ")[0];
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AttachDueDatePPCon").value = "<p>" + duedate1.split("-")[1]+"/"+duedate1.split("-")[2]+"/"+duedate1.split("-")[0] +"</p>";
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textdraw_18875509761680594696133").value = "<p>" + data1.AddInfo.Info.ADD_INFO_REQUEST + "</p>";

                    duedate1 = new Date(duedate1);
                    let currentDate = new Date();
                    
                    if(duedate1 > currentDate && data1.AddInfo.Info.ADD_INFO_RESPONSE.localeCompare("null") == 0){
                        if(actualData.userRole.toString().toUpperCase() !== "CONTRACTOR"){
                            guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").enabled = false;
                        }
                    }
                    else{
                        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").enabled = false;
                    }	
                }
                guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").somExpression);
            }
        }, 500);
    }
    // below is for Status 10 or 13
    else if (currStatus.toLowerCase() === "Advisor requested Additional Information from RE".toLowerCase() || currStatus.toLowerCase() === "RE submitted additional information".toLowerCase()) {
		guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
        guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = false;
        disablePosPaperContractor(disputeID,meetingType,actualData);

    }
    // below is for Status 14 or 15
    else if (currStatus.toLowerCase() === "Contractor submitted additional information".toLowerCase() || currStatus.toLowerCase() === "RE and Contractor submitted additional information".toLowerCase()) {
        disablePosPaperContractor(disputeID,meetingType,actualData);
        const promise = getAdditionalInfo(disputeID,meetingType,"CONTRACTOR");
        // let the Promise know what you want to do when it resolves
        promise.then(result => data1=result).catch(errorHandler);
        
        setTimeout(function alertFunc() {
            if(errorHandler===""||errorHandler==null){
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").visible = true;
                guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").enabled = true;
                if(Object.values(data1.AddInfo).length > 0){
                    let duedate1 = data1.AddInfo.Info.ADD_INFO_DUEDATE;
                    duedate1 = duedate1.split(" ")[0];
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AttachDueDatePPCon").value = "<p>" + duedate1.split("-")[1]+"/"+duedate1.split("-")[2]+"/"+duedate1.split("-")[0] +"</p>";
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textdraw_18875509761680594696133").value = "<p>" + data1.AddInfo.Info.ADD_INFO_REQUEST + "</p>";
                    if(data1.AddInfo.Info.ADD_INFO_RESPONSE !== "null"){
						guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").value = data1.AddInfo.Info.ADD_INFO_RESPONSE;
                    }
                    else{
						guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").value = "--";
                    }
                    //guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").value = data1.AddInfo.Info.ADD_INFO_RESPONSE;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.textbox1680594707025").enabled = false;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddAttachPPCon").enabled = false;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.SubmitAddPPCon").enabled = false;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").visible = true;
                    guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon.AddInfoPreviewPPCon").enabled = true;
                }
                guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.AddInfoSecPPCon").somExpression);
                guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").visible = false;
                guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
            }
        }, 500);
    }
    // below is for Status 18 or 19
    else if (currStatus.toLowerCase() === "Advisor submitted the Recommendation Report".toLowerCase()||currStatus.toLowerCase() === "RE Requested Clarification".toLowerCase()) {
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = true;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.button_12852821241680595402538").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").value = "";
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value = "";
        if(actualData.userRole.toString().toUpperCase() !== "CONTRACTOR"){
            guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").enabled = false;
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = false;
        }
        else{
            guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").enabled = true;
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = true;
        }
        getConAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus);
        guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").somExpression);
    }
    // below is for Status 20 or 21 or 22 or 23
    else if (currStatus.toLowerCase() === "Contractor Requested Clarification".toLowerCase() || currStatus.toLowerCase() === "RE and Contractor Requested Clarification".toLowerCase() || currStatus.toLowerCase() === "Advisor submitted Clarification Request".toLowerCase() || currStatus.toLowerCase() === "RE Submitted Recommendation Response".toLowerCase()) {
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = true;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").enabled = true;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.button_12852821241680595402538").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").enabled  = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClariAttachPPCon").enabled  = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ButtonReqClariPPCon").enabled  = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value  = "";
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").value  = "";
        if(actualData.userRole.toString().toUpperCase() !== "CONTRACTOR"){
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = false;
        }
        else{
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = true;
        }
        setTimeout(function alertFunc1() {
            getConAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus);
        }, 400);

        let cladata;
        const promise = getClarificationInfo(disputeID,meetingType,"CONTRACTOR");
        // let the Promise know what you want to do when it resolves
        promise.then(result => cladata=result).catch(errorHandler);
        
        setTimeout(function alertFunc() {
            if(errorHandler===""||errorHandler==null){
                guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").somExpression);
                cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                if(typeof(cladata.ClarifyInfo.Info) != "undefined"){
                    if(cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST !== "null"){
                        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").value  = cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST;
                    }
                    if(currStatus.toLowerCase() === "Advisor submitted Clarification Request".toLowerCase()){
                        if(cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE !== "null"){
                        	guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value  = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                        }
                        else{
                            guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value  = "--";
                        }
                        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.button_12852821241680595402538").visible = true;
                    }
                    /*if(currStatus.toLowerCase() === "RE Submitted Recommendation Response".toLowerCase()){
                        guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").somExpression);
                    }*/
                }
                if(currStatus.toLowerCase() === "RE Submitted Recommendation Response".toLowerCase()){
                    guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").somExpression);
                }
            }
        }, 900);
    }
    // below is for Status 24 or 25 or 26 or 29 or 30
    else if (currStatus.toLowerCase() === "Contractor Submitted Recommendation Response".toLowerCase() || currStatus.toLowerCase() === "RE and Contractor Submitted Recommendation Response".toLowerCase() || currStatus.toLowerCase() === "RE Requested Reconsideration".toLowerCase()|| currStatus.toLowerCase() === "Contractor Requested Reconsideration".toLowerCase() || currStatus.toLowerCase() === "Advisor Responded to Reconsideration Request".toLowerCase() || currStatus.toLowerCase() === "Final Report Generated".toLowerCase() || currStatus.toLowerCase() === "Document has been signed".toLowerCase()) {
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").visible = true;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").enabled = true;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.button_12852821241680595402538").visible = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").enabled  = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClariAttachPPCon").enabled  = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ButtonReqClariPPCon").enabled  = false;
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value  = "";
        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").value  = "";
        if(actualData.userRole.toString().toUpperCase() !== "CONTRACTOR"){
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = false;
            guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").enabled = false;
        }
        else{
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = true;
            guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").enabled = true;
        }
        setTimeout(function alertFunc1() {
            getConAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus);
        }, 400);

        let cladata;
        let promise = getClarificationInfo(disputeID,meetingType,"CONTRACTOR");
        // let the Promise know what you want to do when it resolves
        promise.then(result => cladata=result).catch(errorHandler);
        
        setTimeout(function alertFunc() {
            if(errorHandler===""||errorHandler==null){
                cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                if(typeof(cladata.ClarifyInfo.Info) != "undefined"){
                    if(cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST !== "null"){
                        guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.ReqClarifyInputPPCon").value  = cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST;
                    }
                    if(currStatus.toLowerCase() === "Advisor submitted Clarification Request".toLowerCase()){
                        if(cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE !== "null"){
                        	guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value  = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                        }
                        else{
                            guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.textbox1680595306243").value  = "--";
                        }
                    }
                    guideBridge.resolveNode("ContractorPanel.ReqClariPPCon.button_12852821241680595402538").visible = true;
                }
                else{
                    guideBridge.resolveNode("ContractorPanel.ReqClariPPCon").enabled = false;
                }
            }
        }, 900);

        let responseData;
        guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").somExpression);
        promise = getRecomResponseInfo(disputeID,meetingType,"CONTRACTOR");
        // let the Promise know what you want to do when it resolves
        promise.then(result => responseData=result).catch(errorHandler);

        setTimeout(function alertFunc3() {
            if(errorHandler===""||errorHandler==null){
                responseData = JSON.parse(responseData);
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResponseCKPPCon").value = responseData.ResponseInfo.Info.RESPONSE;
                if(responseData.ResponseInfo.Info.RESPONSE_COMMENTS !== "null"){
                    guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqRejComPPCon").value = responseData.ResponseInfo.Info.RESPONSE_COMMENTS;
                }
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqConResDatePPCon").value = responseData.ResponseInfo.Info.CREATED_DATE;
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqRejComPPCon").enabled = false;
                guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon").enabled = false;
                disableCkCon();

                duedate = new Date(duedate);
                let currDate = new Date();
                if(guideBridge.resolveNode("SelectDRADRB").value == "DRB"){
                    duedate.setDate(duedate.getDate() + 30);
                }
                else if(guideBridge.resolveNode("SelectDRADRB").value == "DRA"){
                    duedate.setDate(duedate.getDate() + 10);
                }
                if(responseData.ResponseInfo.Info.RESPONSE === "1" && meetingType.toUpperCase() !== "INFORMAL" && currDate < duedate){
                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = true;
                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").resetData();
                    //guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").enabled = true;
                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqRecDatePPCon").value = guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResDueDatePPCon").value;
                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.button_8414937981680595651711").visible = false;
                }
                else{
                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
                }
                if(currStatus.toLowerCase() === "RE Requested Reconsideration".toLowerCase()){
					guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
                }
                if(currStatus.toLowerCase() === "Contractor Requested Reconsideration".toLowerCase() || currStatus.toLowerCase() === "Advisor Responded to Reconsideration Request".toLowerCase() || currStatus.toLowerCase() === "Final Report Generated".toLowerCase() || currStatus.toLowerCase() === "Document has been signed".toLowerCase()){

                    let reconsiderData;
                    let promise = getReconsiderInfo(disputeID,meetingType,"CONTRACTOR");
                    // let the Promise know what you want to do when it resolves
                    promise.then(result => reconsiderData=result).catch(errorHandler);
                    setTimeout(function alertFunc3() {
                        //console.log(reconsiderData);
                            reconsiderData = JSON.parse(reconsiderData);
                            if(typeof(reconsiderData.ReconsiderInfo.Info) !== "undefined"){
                                guideBridge.setFocus(guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").somExpression);
                                guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").enabled = false;
                                disableCkCon1();
                                guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = true;
                                //retreive data
                                if(reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION !== "null"){
                                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqResInputPPCon").value = reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION;
                                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqRecNewInfoCheck").value = "0";
                                }
                                if(reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE != "null"){
                                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.textbox1680595622249").value = reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE;
                                    guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.button_8414937981680595651711").visible = true;
                                }
                            }
                            else{
                                guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon").visible = false;
                            }
                    }, 300);
                }
            }
        }, 1400);
    }
    /* Hide the loader/spinner image when above operations are completed*/
    $('#guideContainer-rootPanel-guideimage__').hide();
}
// to overcome response comments enabled, when record is already submitted by Contractor manually disabling it 
function disableCkCon(){
    document.addEventListener('click', function(event) {
        setTimeout(function alertFunc4() {
            guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResponseCKPPCon").enabled = false;
            guideBridge.resolveNode("ReqRejComPPCon").enabled=false;
        }, 50);
    });
}
function enableCkCon(){
    if(guideBridge.resolveNode("ContractorPanel.ResponseRecomPPCon.ReqResponseCKPPCon").value === "1"){
        guideBridge.resolveNode("ReqRejComPPCon").enabled=true;
    }
    else{
        guideBridge.resolveNode("ReqRejComPPCon").enabled=false;
    }
}
// to overcome response comments enabled, when record is already submitted by Contractor manually disabling it 
function disableCkCon1(){
    document.addEventListener('click', function(event) {
        setTimeout(function alertFunc5() {
            guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqRecNewInfoCheck").enabled = false;
            guideBridge.resolveNode("ReqResInputPPCon").enabled=false;
        }, 50);
    });
}
function enableCkCon1(){
    if(guideBridge.resolveNode("ContractorPanel.ReqResPanelPPCon.ReqRecNewInfoCheck").value === "0"){
        guideBridge.resolveNode("ReqResInputPPCon").enabled=true;
    }
    else{
        guideBridge.resolveNode("ReqResInputPPCon").enabled=false;
    }
}