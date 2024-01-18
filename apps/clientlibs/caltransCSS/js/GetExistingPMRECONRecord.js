$(document).ready(function(){ 
    // for getting existing RE info from establishment form
	$('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_547247398_copy___guide-item-nav').click(function(){
		let count = guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager").instanceCount-1;
        let progressMeetID;
        let disList =  guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager.instances");
        for(var i=0;i < count;i++){
            if(disList[i].tableItem11.value==='Y'){
                progressMeetID = disList[i].table1_item1.value;
                break;
            }
        }
        guideBridge.resolveNode("PMREPanel").resetData();
        if(guideBridge.resolveNode("userRole").value !== "RE"){
			guideBridge.resolveNode("PMREPanel1").enabled=false;
            guideBridge.resolveNode("PMSubmitRE").visible = false;
        }
        else{
        	guideBridge.resolveNode("PMREPanel1").enabled=true;
            guideBridge.resolveNode("PMSubmitRE").visible = true;
            guideBridge.resolveNode("PMSubmitRE").enabled = true;
        }
        guideBridge.resolveNode("PMREAttachPanel").visible = false;
        guideBridge.resolveNode("PreviewPMRE").visible = false;
        //PMDateProj indicates value getting from hidden field in pm6210-DRB/DRA fragment
        //guideBridge.resolveNode("PMDateCalResponseRE").value = guideBridge.resolveNode("PMDateProj").value;
        if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
            //let reName = guideBridge.resolveNode("ResidentEngineerDRB").value;
			guideBridge.resolveNode("PMCalNameRE").value = "<p>"+guideBridge.resolveNode("ResidentEngineerDRB").value+"</p>";
			guideBridge.resolveNode("textdraw1666266187182").value = "<p>"+progressMeetID+"</p>";
        }
        else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
            //let reName = guideBridge.resolveNode("ResidentEngineerDRA").value;
			guideBridge.resolveNode("PMCalNameRE").value = "<p>"+guideBridge.resolveNode("ResidentEngineerDRA").value+"</p>";
            guideBridge.resolveNode("textdraw1666266187182").value = "<p>"+progressMeetID+"</p>";
        }
        guideBridge.resolveNode("PMSucNoteRE").visible = false;
        guideBridge.resolveNode("PMErrNoteRE").visible = false;
    });
    $('#guideContainer-rootPanel-panel_652182736-panel_1490683276-panel-panel1656252988382-panel_769133156_copy___guide-item-nav').click(function(){
        // for getting existing Contractor info from establishment form
		let count = guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager").instanceCount-1;
        let progressMeetID;
        let disList =  guideBridge.resolveNode("ProgressDashTable.Row1.instanceManager.instances");
        for(var i=0;i < count;i++){
            if(disList[i].tableItem11.value==='Y'){
                progressMeetID = disList[i].table1_item1.value;
                break;
            }
        }
        guideBridge.resolveNode("PMCONPanel").resetData();
        if(guideBridge.resolveNode("userRole").value !== "CONTRACTOR"){
			guideBridge.resolveNode("PMCONPanel1").enabled=false;
            guideBridge.resolveNode("PMSubmitCON").visible = false;
        }
        else{
        	guideBridge.resolveNode("PMCONPanel1").enabled=true;
            guideBridge.resolveNode("PMSubmitCON").visible = true;
            guideBridge.resolveNode("PMSubmitCON").enabled = true;
        }
        guideBridge.resolveNode("PMCONAttachPanel").visible = false;
        //PMDateProj indicates value getting from hidden field in pm6210-DRB/DRA fragment
        //guideBridge.resolveNode("PMDateConResponseCON").value = guideBridge.resolveNode("PMDateProj").value;
        if(guideBridge.resolveNode("SelectDRADRB").value === "DRB"){
			guideBridge.resolveNode("PMConNameCON").value = guideBridge.resolveNode("ContractorDRB").value;
			guideBridge.resolveNode("PMIDNoValueCON").value = "<p>"+progressMeetID+"</p>";
        }
        else if(guideBridge.resolveNode("SelectDRADRB").value === "DRA"){
            guideBridge.resolveNode("PMConNameCON").value = guideBridge.resolveNode("ContractorDRA").value;
            guideBridge.resolveNode("PMIDNoValueCON").value = "<p>"+progressMeetID+"</p>";
        }
        guideBridge.resolveNode("PMSucNoteCON").visible = false;
        guideBridge.resolveNode("PMErrNoteCON").visible = false;
    });
});