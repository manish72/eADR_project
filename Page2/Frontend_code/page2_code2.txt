//for accordions show or hide using below function for every status
function statusCheckREChair(currStatus,meetingType,disputeID,actualData,pendingAction,duedate){
        let errorHandler;
    	/* Hide success and error messages inside each accordion of RE Reports tab */
    	guideBridge.resolveNode("PosSucMssgePPRES").visible = false;
        guideBridge.resolveNode("PosErrMssgePPRES").visible = false;
        guideBridge.resolveNode("PosAddiSucMssgePPRES").visible = false;
        guideBridge.resolveNode("PosAddiErrMssgePPRES").visible = false;
        guideBridge.resolveNode("ReqClaSucMssgePPRES").visible = false;
        guideBridge.resolveNode("ReqClaErrMssgePPRES").visible = false;
        guideBridge.resolveNode("ReqSubSucMssgePPRES").visible = false;
        guideBridge.resolveNode("ReqSubErrMssgePPRES").visible = false;
        guideBridge.resolveNode("ReqRecSucMssgePPRES").visible = false;
    	guideBridge.resolveNode("ReqRecErrMssgePPRES").visible = false;
    	//to overcome the value script of making a textarea is enabled, using below one
    	enableCkRE();
    	enableCkRE1();
        ///below is for Status ID 3
        if (currStatus.toLowerCase() === "Position Paper Due Date and Meeting Date Established".toLowerCase()) {
            guideBridge.resolveNode("REPanel.FirstSubmitPPRES").visible = true;
            guideBridge.resolveNode("REPanel.FirstSubmitPPRES").enabled = true;
            //guideBridge.resolveNode("REPanel.FirstSubmitPPRES.SubmitPPRES").enabled = true;
            guideBridge.resolveNode("PosSucMssgePPRES").visible = false;
            guideBridge.resolveNode("PosErrMssgePPRES").visible = false;
            guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
        }
		// below is for Status 4
		else if (currStatus.toLowerCase() === "Contractor submitted Position Paper".toLowerCase()) {
            guideBridge.setFocus(guideBridge.resolveNode("REPanel.FirstSubmitPPRES").somExpression);
			guideBridge.resolveNode("REPanel.FirstSubmitPPRES").enabled = true;
            guideBridge.resolveNode("REPanel.FirstSubmitPPRES").visible = true;
            guideBridge.resolveNode("PosSucMssgePPRES").visible = false;
            guideBridge.resolveNode("PosErrMssgePPRES").visible = false;
            guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
        }
		// below is for Status 5
		else if (currStatus.toLowerCase() === "RE submitted Position Paper".toLowerCase()) {
			guideBridge.setFocus(guideBridge.resolveNode("REPanel.FirstSubmitPPRES").somExpression);
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
            // let the Promise know what you want to do when it resolves
            promise.then(result => data=result).catch(errorHandler);

            setTimeout(function alertFunc() {
                if(errorHandler===""||errorHandler==null){
                    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.backgroundPPRES").value = data.getElementsByTagName("BGNote")[0].innerHTML;
                    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.CaltransPPRES").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
                    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.PreviewPPRES").visible = true;
                    guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
                }

            }, 500);
        }
		// below is for Status 6
		else if (currStatus.toLowerCase() === "RE and Contractor submitted Position Papers".toLowerCase()) {
			guideBridge.setFocus(guideBridge.resolveNode("REPanel.FirstSubmitPPRES").somExpression);
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
            // let the Promise know what you want to do when it resolves
            promise.then(result => data=result).catch(errorHandler);

            setTimeout(function alertFunc() {
                if(errorHandler===""||errorHandler==null){
                    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.backgroundPPRES").value = data.getElementsByTagName("BGNote")[0].innerHTML;
                    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.CaltransPPRES").value = data.getElementsByTagName("RolePosition")[0].innerHTML;
                    guideBridge.resolveNode("REPanel.FirstSubmitPPRES.PreviewPPRES").visible = true;
                    guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
                    let posduedate = new Date(guideBridge.resolveNode("PosPaperDuePPRES").value.replace("<p>", "").replace("</p>", ""));
                    let currentDate = new Date();
                    //if 2 conditions are met or if the user role is not RE
                    if ((posduedate < currentDate && parseInt(data.getElementsByTagName("CheckOtherStatus")[0].innerHTML) === 1) || actualData.userRole.toString().toUpperCase() !== "RE") {
                        displayPPAccRE();
                    }
                }

            }, 500);
        }
		// below is for Status 10 or 12
		else if (currStatus.toLowerCase() === "Chair requested Additional Information from RE".toLowerCase() || currStatus.toLowerCase() === "Chair requested Additional Information from RE and Contractor".toLowerCase() || (currStatus.toLowerCase() === "Contractor submitted additional information".toLowerCase() && pendingAction.toLowerCase() === "Provide Additional Information".toLowerCase())) {
            disablePosPaperRE(disputeID,meetingType,actualData);
            guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
            guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = true;
			guideBridge.resolveNode("REPanel.AddInfoSecPPRES").enabled = true;
            guideBridge.resolveNode("REPanel.AddInfoSecPPRES").resetData();
            guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").visible = false;

            const promise = getAdditionalInfo(disputeID,meetingType,"RE");
            // let the Promise know what you want to do when it resolves
            promise.then(result => data1=result).catch(errorHandler);

            setTimeout(function alertFunc() {
            	if(errorHandler===""||errorHandler==null){
                    //data1 = data1.getElementsByTagName("AddInfoStr")[0].innerHTML);
                    if(Object.values(data1.AddInfo).length > 0){
                        let duedate1 = data1.AddInfo.Info.ADD_INFO_DUEDATE;
                        duedate1 = duedate1.split(" ")[0];
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AttachDueDatePPRES").value = "<p>" + duedate1.split("-")[1]+"/"+duedate1.split("-")[2]+"/"+duedate1.split("-")[0] +"</p>";
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textdraw_18875509761680594696133").value = "<p>" + data1.AddInfo.Info.ADD_INFO_REQUEST + "</p>";

                        duedate1 = new Date(duedate1);
                        let currentDate = new Date();

                        if(duedate1 > currentDate && data1.AddInfo.Info.ADD_INFO_RESPONSE.localeCompare("null") == 0){
                            if(actualData.userRole.toString().toUpperCase() !== "RE"){
								guideBridge.resolveNode("REPanel.AddInfoSecPPRES").enabled = false;
                            }
                        }
                        else{
                            guideBridge.resolveNode("REPanel.AddInfoSecPPRES").enabled = false;
                        }	
                    }
                    guideBridge.setFocus(guideBridge.resolveNode("REPanel.AddInfoSecPPRES").somExpression);
				}
            }, 500);
        }
    	// below is for Status 11 or 14
		else if (currStatus.toLowerCase() === "Chair requested Additional Information from Contractor".toLowerCase() || currStatus.toLowerCase() === "Contractor submitted additional information".toLowerCase()) {
			guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
            guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
            guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = false;
            disablePosPaperRE(disputeID,meetingType,actualData);
        }
    	// below is for Status 13 or 15
		else if (currStatus.toLowerCase() === "RE submitted additional information".toLowerCase() || currStatus.toLowerCase() === "RE and Contractor submitted additional information".toLowerCase()) {
            disablePosPaperRE(disputeID,meetingType,actualData);
            const promise = getAdditionalInfo(disputeID,meetingType,"RE");
            // let the Promise know what you want to do when it resolves
            promise.then(result => data1=result).catch(errorHandler);

            setTimeout(function alertFunc() {
            	if(errorHandler===""||errorHandler==null){
                    guideBridge.resolveNode("REPanel.AddInfoSecPPRES").visible = true;
                    guideBridge.resolveNode("REPanel.AddInfoSecPPRES").enabled = true;
                    if(Object.values(data1.AddInfo).length > 0){
                        let duedate1 = data1.AddInfo.Info.ADD_INFO_DUEDATE;
                        duedate1 = duedate1.split(" ")[0];
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AttachDueDatePPRES").value = "<p>" + duedate1.split("-")[1]+"/"+duedate1.split("-")[2]+"/"+duedate1.split("-")[0] +"</p>";
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textdraw_18875509761680594696133").value = "<p>" + data1.AddInfo.Info.ADD_INFO_REQUEST + "</p>";
                        if(data1.AddInfo.Info.ADD_INFO_RESPONSE !== "null"){
                            guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").value = data1.AddInfo.Info.ADD_INFO_RESPONSE;
                        }
                        else{
							guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").value = "--";
                        }
                        //guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").value = data1.AddInfo.Info.ADD_INFO_RESPONSE;
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.textbox1680594707025").enabled = false;
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddAttachPPRES").enabled = false;
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.SubmitAddPPRES").enabled = false;
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").enabled = true;
                        guideBridge.resolveNode("REPanel.AddInfoSecPPRES.AddInfoPreviewPPRES").visible = true;
                    }
                    guideBridge.setFocus(guideBridge.resolveNode("REPanel.AddInfoSecPPRES").somExpression);
                    guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES").visible = false;
                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
        		}
        	}, 500);
         }
    	// below is for Status 18 or 20
		else if (currStatus.toLowerCase() === "Chair submitted the Recommendation Report".toLowerCase()||currStatus.toLowerCase() === "Contractor Requested Clarification".toLowerCase()) {
			guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = true;
            guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = true;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.button_12852821241680595402538").visible = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").value  = "";
            guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = "";
            if(actualData.userRole.toString().toUpperCase() !== "RE"){
                guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = false;
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = false;
            }
            else{
                guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = true;
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = true;
            }
            getREAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus);
            guideBridge.setFocus(guideBridge.resolveNode("REPanel.ResponseRecomPPRES").somExpression);
        }
    	// below is for Status 19 or 21 or 22 or 24
        else if (currStatus.toLowerCase() === "RE Requested Clarification".toLowerCase() || currStatus.toLowerCase() === "RE and Contractor Requested Clarification".toLowerCase() || currStatus.toLowerCase() === "Chair submitted Clarification Request".toLowerCase() || currStatus.toLowerCase() === "Contractor Submitted Recommendation Response".toLowerCase()) {
            guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = true;
            guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = true;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.button_12852821241680595402538").visible = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").enabled  = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClaAttachPPRES").enabled  = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ButtonReqClariPPRES").enabled  = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = "";
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").value = "";
            if(actualData.userRole.toString().toUpperCase() !== "RE"){
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = false;
            }
            else{
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = true;
            }
            setTimeout(function alertFunc1() {
                getREAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus);
            }, 400);

            let cladata;
            const promise = getClarificationInfo(disputeID,meetingType,"RE");
            // let the Promise know what you want to do when it resolves
            promise.then(result => cladata=result).catch(errorHandler);

            setTimeout(function alertFunc2() {
                if(errorHandler===""||errorHandler==null){
                    guideBridge.setFocus(guideBridge.resolveNode("REPanel.ReqClariPPRES").somExpression);
                    cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                    if(typeof(cladata.ClarifyInfo.Info) != "undefined"){
                        if(cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST != "null"){
                            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").value  = cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST;
                        }
                        if(currStatus.toLowerCase() === "Chair submitted Clarification Request".toLowerCase()){
                            if(cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE !== "null"){
                                guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                            }
                            else{
                                guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = "--";
                            }
                            //guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                            guideBridge.resolveNode("REPanel.ReqClariPPRES.button_12852821241680595402538").visible = true;
                        }
                        /*if(currStatus.toLowerCase() === "Contractor Submitted Recommendation Response".toLowerCase()){
                            guideBridge.setFocus(guideBridge.resolveNode("REPanel.ResponseRecomPPRES").somExpression);
                        }*/
                    }
                    if(currStatus.toLowerCase() === "Contractor Submitted Recommendation Response".toLowerCase()){
                        guideBridge.setFocus(guideBridge.resolveNode("REPanel.ResponseRecomPPRES").somExpression);
                    }
                }
            }, 900);
        }
    	// below is for Status 23 or 25 or 27 or 29 or 30
		else if (currStatus.toLowerCase() === "RE Submitted Recommendation Response".toLowerCase()||currStatus.toLowerCase() === "RE and Contractor Submitted Recommendation Response".toLowerCase() || currStatus.toLowerCase() === "Contractor Requested Reconsideration".toLowerCase() || currStatus.toLowerCase() === "RE Requested Reconsideration".toLowerCase() || currStatus.toLowerCase() === "Chair Responded to Reconsideration Request".toLowerCase() || currStatus.toLowerCase() === "Final Report Generated".toLowerCase() || currStatus.toLowerCase() === "Document has been signed".toLowerCase()) {
			guideBridge.resolveNode("REPanel.ReqClariPPRES").visible = true;
            guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = true;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.button_12852821241680595402538").visible = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").enabled = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClaAttachPPRES").enabled = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ButtonReqClariPPRES").enabled = false;
            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").value  = "";
            guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = "";
            if(actualData.userRole.toString().toUpperCase() !== "RE"){
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = false;
                guideBridge.resolveNode("REPanel.ReqResPanelPPRES").enabled = false;
            }
            else{
                guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = true;
                guideBridge.resolveNode("REPanel.ReqResPanelPPRES").enabled = true;
            }
            setTimeout(function alertFunc1() {
                getREAdditionalInfo(disputeID, meetingType,actualData,duedate,currStatus);
            }, 400);

            let cladata;
            let promise = getClarificationInfo(disputeID,meetingType,"RE");
            // let the Promise know what you want to do when it resolves
            promise.then(result => cladata=result).catch(errorHandler);

            setTimeout(function alertFunc2() {
                if(errorHandler===""||errorHandler==null){
                    cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                    if(typeof(cladata.ClarifyInfo.Info) != "undefined"){
                        if(cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST !== "null"){
                            guideBridge.resolveNode("REPanel.ReqClariPPRES.ReqClarifyInputPPRES").value  = cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST;
                        }
                        if(cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE !== "null"){
                            guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                        }
                        else{
                            guideBridge.resolveNode("REPanel.ReqClariPPRES.textbox1680595306243").value  = "--";
                        }
                        guideBridge.resolveNode("REPanel.ReqClariPPRES.button_12852821241680595402538").visible = true;
                    }
                    else{
						guideBridge.resolveNode("REPanel.ReqClariPPRES").enabled = false;
                    }
                }
            }, 900);

            let responseData;
            guideBridge.setFocus(guideBridge.resolveNode("REPanel.ResponseRecomPPRES").somExpression);
            promise = getRecomResponseInfo(disputeID,meetingType,"RE");
            // let the Promise know what you want to do when it resolves
            promise.then(result => responseData=result).catch(errorHandler);

            setTimeout(function alertFunc3() {
                if(errorHandler===""||errorHandler==null){
                    responseData = JSON.parse(responseData);
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResponseCKPPRES").value = responseData.ResponseInfo.Info.RESPONSE;
                    if(responseData.ResponseInfo.Info.RESPONSE_COMMENTS !== "null"){
                        guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqRejComPPRES").value = responseData.ResponseInfo.Info.RESPONSE_COMMENTS;
                    }
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqConResDatePPRES").value = responseData.ResponseInfo.Info.CREATED_DATE;
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqRejComPPRES").enabled = false;
                    guideBridge.resolveNode("REPanel.ResponseRecomPPRES").enabled = false;
                    disableCkRE();
					
                    duedate = new Date(duedate);
                    let currDate = new Date();
                    if(guideBridge.resolveNode("SelectDRADRB").value == "DRB"){
                        duedate.setDate(duedate.getDate() + 30);
                    }
                    else if(guideBridge.resolveNode("SelectDRADRB").value == "DRA"){
                        duedate.setDate(duedate.getDate() + 10);
                    }
                    if(responseData.ResponseInfo.Info.RESPONSE === "1" && meetingType.toUpperCase() !== "INFORMAL" && currDate < duedate){
                        guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = true;
                        guideBridge.resolveNode("REPanel.ReqResPanelPPRES").resetData();
                        //guideBridge.resolveNode("REPanel.ReqResPanelPPRES").enabled = true;
                        guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqRecDatePPRES").value = guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResDueDatePPRES").value;
                        guideBridge.resolveNode("REPanel.ReqResPanelPPRES.button_8414937981680595651711").visible = false;
                    }
                    else{
                        guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
                    }
                    if(currStatus.toLowerCase() === "Contractor Requested Reconsideration".toLowerCase()){
                        guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
                    }
                    if(currStatus.toLowerCase() === "RE Requested Reconsideration".toLowerCase()|| currStatus.toLowerCase() === "Chair Responded to Reconsideration Request".toLowerCase() || currStatus.toLowerCase() === "Final Report Generated".toLowerCase() || currStatus.toLowerCase() === "Document has been signed".toLowerCase()){
						let reconsiderData;
                        let promise = getReconsiderInfo(disputeID,meetingType,"RE");
                        // let the Promise know what you want to do when it resolves
                        promise.then(result => reconsiderData=result).catch(errorHandler);
                        setTimeout(function alertFunc3() {
							//console.log(reconsiderData);
                            reconsiderData = JSON.parse(reconsiderData);
                            if(typeof(reconsiderData.ReconsiderInfo.Info)!= "undefined"){
                                guideBridge.setFocus(guideBridge.resolveNode("REPanel.ReqResPanelPPRES").somExpression);
                                guideBridge.resolveNode("REPanel.ReqResPanelPPRES").enabled = false;
                                disableCkRE1();
                                guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = true;
                                //retreive data
                                if(reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION !== "null"){
                                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqResInputPPRES").value = reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION;
                                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqRecNewInfoCheckPPRES").value = "0";
                                }
                                if(reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE !== "null"){
                                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES.textbox1680595622249").value = reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE;
                                    guideBridge.resolveNode("REPanel.ReqResPanelPPRES.button_8414937981680595651711").visible = true;
                                }
                            }
                            else{
                                guideBridge.resolveNode("REPanel.ReqResPanelPPRES").visible = false;
                            }
                        }, 300);
                    }
                }
            }, 1400);
        }
    /* Hide the loader/spinner image when above operations are completed*/
    $('#guideContainer-rootPanel-guideimage__').hide();
}
// to overcome response comments enabled, when record is already submitted by RE manually disabling it 
function disableCkRE(){
    document.addEventListener('click', function(event) {
        setTimeout(function alertFunc3() {
            guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResponseCKPPRES").enabled = false;
            guideBridge.resolveNode("ReqRejComPPRES").enabled=false;
        }, 50);
    });
}
function enableCkRE(){
    if(guideBridge.resolveNode("REPanel.ResponseRecomPPRES.ReqResponseCKPPRES").value === "1"){
        guideBridge.resolveNode("ReqRejComPPRES").enabled=true;
    }
    else{
        guideBridge.resolveNode("ReqRejComPPRES").enabled=false;
    }
}
// to overcome response comments enabled, when record is already submitted by RE manually disabling it 
function disableCkRE1(){
    document.addEventListener('click', function(event) {
        setTimeout(function alertFunc6() {
            guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqRecNewInfoCheckPPRES").enabled = false;
            guideBridge.resolveNode("ReqResInputPPRES").enabled=false;
        }, 50);
    });
}
function enableCkRE1(){
    if(guideBridge.resolveNode("REPanel.ReqResPanelPPRES.ReqRecNewInfoCheckPPRES").value === "0"){
        guideBridge.resolveNode("ReqResInputPPRES").enabled=true;
    }
    else{
        guideBridge.resolveNode("ReqResInputPPRES").enabled=false;
    }
}