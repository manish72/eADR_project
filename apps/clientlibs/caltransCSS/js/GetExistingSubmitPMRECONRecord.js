$(document).ready(function(){ 
	$('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_547247398_copy___guide-item-nav').click(function(){
		setTimeout(function() {
            let jsonData={};
            let progressMeetID;
            jsonData["userRole"] = "RE";
            let count = guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager").instanceCount-1;
            let disList =  guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager.instances");
            for(var i=0;i < count;i++){
                if(disList[i].tableItem11.value==='Y'){
                    jsonData.progmeetID = disList[i].table1_item1.value.toString().replace("<p>","").replace("</p>","");
                    break;
                }
            }
  			let url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetExistingPMRECONRecord';
            xmlData = OBJtoXML1({"data":jsonData});
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
                        let parsedData1 = JSON.parse(data);
                        if(Object.values(parsedData1.ProgressMeet).length>0){
                            guideBridge.resolveNode("PMREPanel1").enabled=false;
							guideBridge.resolveNode("PMCalResponseRE").value = parsedData1.ProgressMeet.Record.RESPONSE;
                            guideBridge.resolveNode("PreviewPMRE").visible = true;
                            guideBridge.resolveNode("PreviewPMRE").enabled=true;
                            if(parsedData1.ProgressMeet.Record.RESPONSE == "1"){
								guideBridge.resolveNode("PMREAttachPanel").visible = true;
                                if(parsedData1.ProgressMeet.Record.COMMENTS !== "null"){
                                    guideBridge.resolveNode("PMCommentsRE").value = parsedData1.ProgressMeet.Record.COMMENTS;
                                }
                            }
                            else{
                                guideBridge.resolveNode("PMREAttachPanel").visible = false;
                            }
							guideBridge.resolveNode("PMDateCalResponseRE").value = parsedData1.ProgressMeet.Record.DATE_OF_RESPONSE;
                            guideBridge.resolveNode("PMCalNameRE").value = "<p>"+parsedData1.ProgressMeet.Record.NAME+"</p>";
                            if(parsedData1.ProgressMeet.Record.JOB_TITLE !== "null"){
                            	guideBridge.resolveNode("PMCalTitleRE").value = "<p>"+parsedData1.ProgressMeet.Record.JOB_TITLE+"</p>";
                            }
                            guideBridge.resolveNode("PMREAttachPanel").enabled = false;
                            guideBridge.resolveNode("PMSubmitRE").enabled = false;
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
		},200)  
    });
    $('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_769133156_copy___guide-item-nav').click(function(){
		setTimeout(function() {
            let jsonData={};
            jsonData["userRole"] = "CONTRACTOR";
            let count = guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager").instanceCount-1;
            let disList =  guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager.instances");
            for(var i=0;i < count;i++){
                if(disList[i].tableItem11.value==='Y'){
                    jsonData["progmeetID"] = disList[i].table1_item1.value.replace("<p>","").replace("</p>","");
                    break;
                }
            }
  			let url = 'http://'+window.location.hostname+':8080/rest/services/Caltrans-eADR/Processes/GetExistingPMRECONRecord';
            xmlData = OBJtoXML1({"data":jsonData});
            //console.log(jsonData.progmeetID);
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
                        let parsedData2 = JSON.parse(data);
                        if(Object.values(parsedData2.ProgressMeet).length>0){
							guideBridge.resolveNode("PMConResponseCON").value = parsedData2.ProgressMeet.Record.RESPONSE;
                            if(parsedData2.ProgressMeet.Record.RESPONSE == "1"){
								guideBridge.resolveNode("PMCONAttachPanel").visible = true;
                                if(parsedData2.ProgressMeet.Record.COMMENTS !== "null"){
                                    guideBridge.resolveNode("PMCommentsCON").value = parsedData2.ProgressMeet.Record.COMMENTS;
                                }
                            }
                            else{
                                guideBridge.resolveNode("PMCONAttachPanel").visible = false;
                            }
							guideBridge.resolveNode("PMDateConResponseCON").value = parsedData2.ProgressMeet.Record.DATE_OF_RESPONSE;
                            guideBridge.resolveNode("PMConNameCON").value = parsedData2.ProgressMeet.Record.NAME;
                            if(parsedData2.ProgressMeet.Record.JOB_TITLE !== "null"){
                            	guideBridge.resolveNode("PMConTitleCON").value = parsedData2.ProgressMeet.Record.JOB_TITLE;
                            }
                            guideBridge.resolveNode("PMCONAttachPanel").enabled = false;
                            guideBridge.resolveNode("PMSubmitCON").enabled = false;
                            guideBridge.resolveNode("PMCONPanel1").enabled=false;
                            guideBridge.resolveNode("PreviewPMCON").visible=true;
                            guideBridge.resolveNode("PreviewPMCON").enabled=true;
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
		},200)  
    });
});