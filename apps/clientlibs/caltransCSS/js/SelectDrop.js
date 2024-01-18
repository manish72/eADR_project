$(function () {
  $("select").select2();
});
/*
$(document).ready(function(){ 
    $("#guideContainer-rootPanel-panel_652182736-panel___guide-item-nav").click(function(){
        var params = new URLSearchParams(window.location.search);
        var b=params.get('input');
        guidelib.util.GuideUtil.navigateToURL('/lc/content/forms/af/caltrans-eadr/welcome-statement.html?wcmmode=disabled&input='+b,'SAME_TAB');
    });
    $('#guideContainer-rootPanel-panel_652182736-panel_27202745-panel-panel1656252988382-panel_1774090199_cop___guide-item-nav').click(function(){
        alert("Hai");
		guideBridge.resolveNode("StatusPPCon").value="<p>Heello</p>";
	});
});*/

function getxml(){
var FormData = submitPOcreateJSON();
console.log(FormData);
var output = OBJtoXML(FormData);
console.log(output);
    output="<Data>"+output+"</Data>";
    console.log(output);
}

function submitPOcreateJSON(){
  	var formData = {};
  	formData.FormName = "fomname";
 	formData.ContactId = "contactID";
  	formData.OrderType = "TypeofOrder";
  	formData.ProductType = "TypeofProduct";
  return formData;
}

function OBJtoXML(obj) {
  var xml = '<data>';
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  xml=xml+"</data>";
  return xml;
}
function createdisputeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function OBJtoXML1(obj) {
  var xml = '';
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML1(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML1(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml;
}
function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }