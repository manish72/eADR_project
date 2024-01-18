//for accordions show or hide using below function for every status
function statusCheckChair(currStatus, meetDate, meetingType, disputeID, actualData, data) {
    /* Hide success and error messages inside each accordion of Chair/Advisor Reports tab*/
    guideBridge.resolveNode("SuccDates").visible = false;
    guideBridge.resolveNode("ErrorDates").visible = false;
    guideBridge.resolveNode("SuccDatesResch").visible = false;
    guideBridge.resolveNode("ErrorDatesResch").visible = false;
    guideBridge.resolveNode("ErrorCloseDisputeMssge").visible = false;
    guideBridge.resolveNode("SucCloseDisputeMssge").visible = false;
    guideBridge.resolveNode("ReqAddSucMssgeRecChair").visible = false;
    guideBridge.resolveNode("ReqAddErrorMssgeRecChair").visible = false;
    guideBridge.resolveNode("SucMssgeRecChair").visible = false;
    guideBridge.resolveNode("ErrorMssgeRecChair").visible = false;
    guideBridge.resolveNode("ReqClaSucMssgeRecChair").visible = false;
    guideBridge.resolveNode("ReqClaErrorMssgeRecChair").visible = false;
    guideBridge.resolveNode("ReqRecSucMssgeRecChair").visible = false;
    guideBridge.resolveNode("ReqRecErrorMssgeRecChair").visible = false;    

    let curstatusObj = {
        "re and contractor submitted position papers": "re and contractor submitted position papers",
        "chair requested additional information from re": "chair requested additional information from re",
        "chair requested additional information from contractor": "chair requested additional information from contractor",
        "chair requested additional information from re and contractor": "chair requested additional information from re and contractor",
        "re submitted additional information": "re submitted additional information",
        "contractor submitted additional information": "contractor submitted additional information",
        "re and contractor submitted additional information": "re and contractor submitted additional information",
        "chair submitted the recommendation report": "chair submitted the recommendation report",
        "re requested clarification": "re requested clarification",
        "contractor requested clarification": "contractor requested clarification",
        "re and contractor requested clarification": "re and contractor requested clarification",
        "chair submitted clarification request": "chair submitted clarification request",
        "re submitted recommendation response": "re submitted recommendation response",
        "contractor submitted recommendation response": "contractor submitted recommendation response",
        "re and contractor submitted recommendation response": "re and contractor submitted recommendation response",
        "re requested reconsideration": "re requested reconsideration",
        "contractor requested reconsideration": "contractor requested reconsideration",
        "chair responded to reconsideration request": "chair responded to reconsideration request",
        "final report generated": "final report generated",
        "document has been signed": "document has been signed"
    };

    let recomAfterSubObj = {
        "chair submitted the recommendation report": "chair submitted the recommendation report",
        "re requested clarification": "re requested clarification",
        "contractor requested clarification": "contractor requested clarification",
        "re and contractor requested clarification": "re and contractor requested clarification",
        "chair submitted clarification request": "chair submitted clarification request",
        "re submitted recommendation response": "re submitted recommendation response",
        "contractor submitted recommendation response": "contractor submitted recommendation response",
        "re and contractor submitted recommendation response": "re and contractor submitted recommendation response",
        "re requested reconsideration": "re requested reconsideration",
        "contractor requested reconsideration": "contractor requested reconsideration",
        "chair responded to reconsideration request": "chair responded to reconsideration request",
        "final report generated": "final report generated",
        "document has been signed": "document has been signed"
    }
    let afterclarifyObj = {
        "CHAIR SUBMITTED CLARIFICATION REQUEST": "CHAIR SUBMITTED CLARIFICATION REQUEST",
        "RE SUBMITTED RECOMMENDATION RESPONSE": "RE SUBMITTED RECOMMENDATION RESPONSE",
        "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE": "CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
        "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE": "RE AND CONTRACTOR SUBMITTED RECOMMENDATION RESPONSE",
        "RE REQUESTED RECONSIDERATION": "RE REQUESTED RECONSIDERATION",
        "CONTRACTOR REQUESTED RECONSIDERATION": "CONTRACTOR REQUESTED RECONSIDERATION",
        "CHAIR RESPONDED TO RECONSIDERATION REQUEST": "CHAIR RESPONDED TO RECONSIDERATION REQUEST",
        "FINAL REPORT GENERATED": "FINAL REPORT GENERATED",
        "DOCUMENT HAS BEEN SIGNED": "DOCUMENT HAS BEEN SIGNED"
    }
    //below is for Status ID 1 or 2
    if (currStatus.toLowerCase() === "RE initiated the Dispute".toLowerCase() || currStatus.toLowerCase() === "Contractor initiated the Dispute".toLowerCase()) {
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").visible = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").enabled = true;
        //guideBridge.resolveNode("NotifyAllDatesButton").enabled = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = false;
    }
    //below is for Status ID 3
    else if (currStatus.toLowerCase() === "Position Paper Due Date and Meeting Date Established".toLowerCase()) {
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").visible = true;
        //guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").resetData();
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").enabled = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").visible = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").enabled = true;
        guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair")).somExpression;
        //guideBridge.resolveNode("UpdateMeetPosDatesResch").enabled = true;
        //guideBridge.resolveNode("ChairorAdvisorPanel.closeDisputeRecChair").visible = false;
        closedisputeAcc();
        guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = false;
    }
    //below is for Status ID 4 or 5
    else if (currStatus.toLowerCase() === "RE submitted Position Paper".toLowerCase() || currStatus.toLowerCase() === "Contractor submitted Position Paper".toLowerCase()) {
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").visible = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.panelduedateRecChair").enabled = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").visible = true;
        guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair").enabled = true;
        //guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.rescheduleDMRecChair")).somExpression;
        //guideBridge.resolveNode("UpdateMeetPosDatesResch").enabled = true;
        closedisputeAcc();
        guideBridge.resolveNode("ChairorAdvisorPanel.ReqAddInfoSecRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = false;
        guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = false;
    }
    //below is for status present in curstatusObj object
    else if (currStatus.toLowerCase()in curstatusObj) {
        getPreviousChaAdv(meetingType, disputeID, actualData, currStatus, meetDate);
        if (currStatus.toLowerCase()in recomAfterSubObj) {
            guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair").enabled = true;
            getRecommendationRecord(disputeID, meetingType);
			guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair")).somExpression;
            if ((currStatus.toLowerCase()) !== "chair submitted the recommendation report") {
                if (actualData.userRole.toString().toUpperCase() !== "DRB_CHAIR" && actualData.userRole.toString().toUpperCase() !== "DRA") {
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = false;
                    guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").enabled = false;
                } else {
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = true;
                    guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").enabled = true;
                }
                let cladata, errorHandler;
                if ((currStatus.toUpperCase()) === "RE Requested Clarification".toUpperCase()) {
                    guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = true;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").enabled = true;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = false;
                    const promise = getClarificationInfo(disputeID, meetingType, "RE");
                    // let the Promise know what you want to do when it resolves
                    promise.then(result => cladata = result).catch(errorHandler);

                    setTimeout(function alertFunc2() {
                        if (errorHandler === "" || errorHandler == null) {
                            cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                            //console.log(cladata.ClarifyInfo.Info);
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                            //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = true;
                            guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = false;
                            //for RE request
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").enabled = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").resetData();
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariREReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST + "</p>";
                            //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClarifyREButtonRecChair").enabled = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClarPreviewRERecChair").visible = false;
                        }
                    }, 1200);
                } else if ((currStatus.toUpperCase()) === "Contractor Requested Clarification".toUpperCase()) {
                    guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = false;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = true;
                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").enabled = true;
                    const promise = getClarificationInfo(disputeID, meetingType, "CONTRACTOR");
                    // let the Promise know what you want to do when it resolves
                    promise.then(result => cladata = result).catch(errorHandler);

                    setTimeout(function alertFunc2() {
                        if (errorHandler === "" || errorHandler == null) {
                            cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                            //console.log(cladata.ClarifyInfo.Info);
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                            //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = true;
                            guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                            //for Contractor request
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").enabled = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").resetData();
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST + "</p>";
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClarPreviewConRecChair").visible = false;
                            //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClarifyConButtonRecChair").enabled = true;
                        }
                    }, 1200);
                } else if ((currStatus.toUpperCase()) === "RE and Contractor Requested Clarification".toUpperCase()) {
                    const promise = getClarificationInfo(disputeID, meetingType, "");
                    // let the Promise know what you want to do when it resolves
                    promise.then(result => cladata = result).catch(errorHandler);

                    setTimeout(function alertFunc2() {
                        if (errorHandler === "" || errorHandler == null) {
                            cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                            //console.log(cladata.ClarifyInfo.Info);
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                            //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = true;
                            guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                            //for RE request
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").enabled = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").resetData();
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariREReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info[1].CLARIFICATION_REQUEST + "</p>";
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClarPreviewRERecChair").visible = false;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClarifyREButtonRecChair").enabled = true;
                            if (cladata.ClarifyInfo.Info[1].CLARIFICATION_RESPONSE !== "null") {
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariRERespRecChair").value = cladata.ClarifyInfo.Info[1].CLARIFICATION_RESPONSE;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariRERespRecChair").enabled = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClaAttachRERecChair").enabled = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClarifyREButtonRecChair").enabled = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClarPreviewRERecChair").visible = true;
                            } else {
                                //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClaAttachRERecChair").enabled = true;
                                //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClarifyREButtonRecChair").enabled = true;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClarPreviewRERecChair").visible = false;
                            }
                            //for Contractor request
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").enabled = true;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").resetData();
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info[0].CLARIFICATION_REQUEST + "</p>";
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClarPreviewConRecChair").visible = false;
                            guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClarifyConButtonRecChair").enabled = true;
                            if (cladata.ClarifyInfo.Info[0].CLARIFICATION_RESPONSE !== "null") {
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConRespRecChair").value = cladata.ClarifyInfo.Info[0].CLARIFICATION_RESPONSE;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConRespRecChair").enabled = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClaAttachConRecChair").enabled = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClarifyConButtonRecChair").enabled = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClarPreviewConRecChair").visible = true;
                            } else {
                                //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClaAttachConRecChair").enabled = true;
                                //guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClarifyConButtonRecChair").enabled = true;
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClarPreviewConRecChair").visible = false;
                            }
                        }
                    }, 1200);
                } else if ((currStatus.toUpperCase())in afterclarifyObj) {
                    const promise = getClarificationInfo(disputeID, meetingType, "");
                    // let the Promise know what you want to do when it resolves
                    promise.then(result => cladata = result).catch(errorHandler);

                    setTimeout(function alertFunc2() {
                        if (errorHandler === "" || errorHandler == null) {
                            //console.log(cladata);
                            let count = parseInt(cladata.getElementsByTagName("RowCount")[0].innerHTML);
                            cladata = JSON.parse(cladata.getElementsByTagName("ClarifyInfoStr")[0].innerHTML);
                            //console.log(typeof(cladata.ClarifyInfo.Info.length));
                            if (count > 0) {
                                if (typeof(cladata.ClarifyInfo.Info.length) === "undefined") {
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = true;
                                    guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                                    if (cladata.ClarifyInfo.Info.CLARIFICATION_REQUESTED_FROM === "RE") {
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = false;
                                        //for RE request
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = true;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").enabled = true;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").resetData();
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariREReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST + "</p>";
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariRERespRecChair").value = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariRERespRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClaAttachRERecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClarPreviewRERecChair").visible = true;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClarifyREButtonRecChair").enabled = false;
                                    } else if (cladata.ClarifyInfo.Info.CLARIFICATION_REQUESTED_FROM === "CONTRACTOR") {
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = false;
                                        //for Contractor request
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = true;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").enabled = true;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").resetData();
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info.CLARIFICATION_REQUEST + "</p>";
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConRespRecChair").value = cladata.ClarifyInfo.Info.CLARIFICATION_RESPONSE;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConRespRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClaAttachConRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClarifyConButtonRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClarPreviewConRecChair").visible = true;
                                    }
                                } else {
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = true;
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").enabled = true;
                                    guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair")).somExpression;
                                    //for RE request
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").visible = true;
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").enabled = true;
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair").resetData();
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariREReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info[1].CLARIFICATION_REQUEST + "</p>";

                                    if (cladata.ClarifyInfo.Info[1].CLARIFICATION_RESPONSE !== "null") {
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariRERespRecChair").value = cladata.ClarifyInfo.Info[1].CLARIFICATION_RESPONSE;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClariRERespRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClaAttachRERecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ReqClarifyREButtonRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelRERecChair.ClarPreviewRERecChair").visible = true;
                                    }
                                    //for Contractor request
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").visible = true;
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").enabled = true;
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair").resetData();
                                    guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConReqRecChair").value = "<p>" + cladata.ClarifyInfo.Info[0].CLARIFICATION_REQUEST + "</p>";

                                    if (cladata.ClarifyInfo.Info[0].CLARIFICATION_RESPONSE !== "null") {
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConRespRecChair").value = cladata.ClarifyInfo.Info[0].CLARIFICATION_RESPONSE;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClariConRespRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClaAttachConRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ReqClarifyConButtonRecChair").enabled = false;
                                        guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair.ClarificationPanelConRecChair.ClarPreviewConRecChair").visible = true;
                                    }
                                }
                            } else {
                                guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = false;
                            }
                            if (currStatus.toUpperCase() === "RE Requested Reconsideration".toUpperCase()) {
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = true;
                                //guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").enabled = true;
                                guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair")).somExpression;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").visible = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").visible = true;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").enabled = true;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").resetData();
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReqRecREPreviewRecChair").visible = false;

                                let reconsiderData;
                                let promise1 = getReconsiderInfo(disputeID, meetingType, "RE");
                                // let the Promise know what you want to do when it resolves
                                promise1.then(result => reconsiderData = result).catch(errorHandler);

                                setTimeout(function alertFunc4() {
                                    if (errorHandler === "" || errorHandler == null) {
                                        reconsiderData = JSON.parse(reconsiderData);
                                        guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReconsiderREReqRecChair").value = "<p>" + reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION + "</p>";
                                    }
                                }, 300);
                            } else if (currStatus.toUpperCase() === "Contractor Requested Reconsideration".toUpperCase()) {
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = true;
                                //guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").enabled = true;
                                guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair")).somExpression;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").visible = false;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").visible = true;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").enabled = true;
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").resetData();
                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReqRecConPreviewRecChair").visible = false;

                                let reconsiderData;
                                let promise1 = getReconsiderInfo(disputeID, meetingType, "CONTRACTOR");
                                // let the Promise know what you want to do when it resolves
                                promise1.then(result => reconsiderData = result).catch(errorHandler);

                                setTimeout(function alertFunc4() {
                                    if (errorHandler === "" || errorHandler == null) {
                                        reconsiderData = JSON.parse(reconsiderData);
                                        guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConReqRecChair").value = "<p>" + reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION + "</p>";
                                    }
                                }, 300);
                            } 
                            else if (currStatus.toUpperCase() === "Chair Responded to Reconsideration Request".toUpperCase() || currStatus.toUpperCase() === "Final Report Generated".toUpperCase() || currStatus.toUpperCase() === "Document has been signed".toUpperCase()) {
                                //guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = true;
                                //guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").enabled = true;
                                //guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair")).somExpression;

                                let reconsiderData;
                                let promise1 = getReconsiderInfo(disputeID, meetingType, "");
                                // let the Promise know what you want to do when it resolves
                                promise1.then(result => reconsiderData = result).catch(errorHandler);

                                setTimeout(function alertFunc4() {
                                    if (errorHandler === "" || errorHandler == null) {
                                        //console.log(reconsiderData);
                                        reconsiderData = JSON.parse(reconsiderData);
                                        if (typeof(reconsiderData.ReconsiderInfo.Info) !== "undefined") {
                                            guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = true;
                                            guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").enabled = true;
                                            guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair")).somExpression;

                                            if (reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_FROM == "CONTRACTOR") {
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").visible = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").visible = true;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").enabled = true;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").resetData();
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConRespRecChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReqRecConAttach1RecomChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReqRecConFavRecChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReqRecConSubRecChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReqRecConPreviewRecChair").visible = true;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConReqRecChair").value = "<p>" + reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION + "</p>";
                                                if(reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE !== "null"){
                                                	guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConRespRecChair").value = reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE;
                                                }
                                                else{
                                                    guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConRespRecChair").value = "--";
                                                }
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReqRecConFavRecChair").value = reconsiderData.ReconsiderInfo.Info.RECONSIDERATION_FAVOR_PARTY;
                                            } else if (reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_FROM == "RE") {
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair").visible = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").visible = true;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").enabled = true;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair").resetData();
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReconsiderRERespRecChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReqRecREAttach1RecomChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReqRecREFavRecChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReqRecRESubRecChair").enabled = false;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReqRecREPreviewRecChair").visible = true;
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReconsiderREReqRecChair").value = "<p>" + reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION + "</p>";
                                                if(reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE !== "null"){
                                                	guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConRespRecChair").value = reconsiderData.ReconsiderInfo.Info.REQUEST_RECONSIDERATION_RESPONSE;
                                                }
                                                else{
                                                    guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderConPanelRecChair.ReconsiderConRespRecChair").value = "--";
                                                }
                                                guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair.ReconsiderREPanelRecChair.ReqRecREFavRecChair").value = reconsiderData.ReconsiderInfo.Info.RECONSIDERATION_FAVOR_PARTY;
                                            }
                                        } else {
                                            guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = false;
                                        }
                                    }
                                }, 300);
                            }
                        }
                    }, 1200);
                } 
                else {
                    guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair")).somExpression;
                }
            }
			else{
				guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair")).somExpression;
				guideBridge.resolveNode("ChairorAdvisorPanel.ClarificationPanelRecChair").visible = false;
				guideBridge.resolveNode("ChairorAdvisorPanel.RequestReconsiderPanelRecChair").visible = false;
			}
        } else {
            recomPanel(disputeID, meetingType, data);
            guideBridge.setFocus(guideBridge.resolveNode("ChairorAdvisorPanel.RecomPanelRecChair")).somExpression;
			if (guideBridge.resolveNode("SelectDRADRB").value === "DRB") {
				guideBridge.resolveNode("MeetingDRBPanel").enabled = true;
				guideBridge.resolveNode("MeetLOCRecomDRB").enabled = true;
				guideBridge.resolveNode("CalRepRecomDRB").enabled = true;
				guideBridge.resolveNode("attendee1RecomDRB").enabled = true;
				guideBridge.resolveNode("attendee2RecomDRB").enabled = true;
				guideBridge.resolveNode("ContractoRepRecomDRB").enabled = true;
				guideBridge.resolveNode("DRBMemr2RecomDRB").enabled = true;
			}
			else if (guideBridge.resolveNode("SelectDRADRB").value === "DRA") {
				guideBridge.resolveNode("MeetingDRAPanel").enabled = true;
				guideBridge.resolveNode("MeetLOCRecomDRA").enabled = true;
				guideBridge.resolveNode("CalRepRecomDRA").enabled = true;
				guideBridge.resolveNode("attendee1RecomDRA").enabled = true;
				guideBridge.resolveNode("attendee2RecomDRA").enabled = true;
				guideBridge.resolveNode("ContractoRepRecomDRA").enabled = true;
			}
			guideBridge.resolveNode("AttendAddRowRecChair").enabled = true;
            guideBridge.resolveNode("AttendDeleteRowRecChair").enabled = true;
			let tCount = guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.instanceCount;
			for (var i = tCount; i > -1; i--) {				
				guideBridge.resolveNode("MeetAtendPanelRecChair").enabled = true;
				guideBridge.resolveNode("MeetAtendPanelRecChair").instanceManager.removeInstance(i);
			}
			guideBridge.resolveNode("BriefDescRecChair").enabled=true;
			guideBridge.resolveNode("RecomInputRecChair").enabled=true;
			guideBridge.resolveNode("DRBFavRecChair").enabled=true;
			guideBridge.resolveNode("Attach1RecomChair").enabled=true;
			guideBridge.resolveNode("SubmitRecomButton").enabled = true;
			guideBridge.resolveNode("PreviewRecChair").visible=false;
        }
    }
    /* Hide the loader/spinner image when above operations are completed */
    $('#guideContainer-rootPanel-guideimage__').hide();
}