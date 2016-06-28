var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/vehicles/:id', function(req, res) {
	request.post(
		'http://gmapi.azurewebsites.net/getVehicleInfoService',
		{json:{id:req.params.id,responseType:'JSON'}},
		
		function(error, response, body){
			var acquiredGM = body;
			 if (!body) return res.sendStatus(400);
			 var doors=0;
			 if(body.data.fourDoorSedan.value){
			 	doors=4; 
			 }
			 else{
			 	doors=2;
			 }
  			var toSend = JSON.parse('{"vin" : '+'"' + body.data.vin.value + '","color":'+'"' + body.data.color.value + '","doors": '+'"' + doors + '","driveTrain":'+'"' + body.data.driveTrain.value + '"}');
			
			res.send(toSend);
			
		}

		);

  
});

router.get('/vehicles/:id/doors', function(req, res) {
	request.post(
		'http://gmapi.azurewebsites.net/getSecurityStatusService',
		{json:{id:req.params.id,responseType:'JSON'}},
		
		function(error, response, body){
			var acquiredGM = body;
			 if (!body) return res.sendStatus(400);
			 
			 var s = body.data.doors.values;
			//  var jsons=[];
			// for (var i=s.length;i--;) jsons[i]=JSON.stringify(s[i]);
			//  // var json = JSON.stringify(s);
			//  // var jsons = s.map(JSON.stringify);
			 var A = [];
			
			
  			 // var toSend = JSON.parse(body.data.doors.values);
  			 var txt="";
			for(var i=0;i<s.length;i++){
				
				if(i!=0){
					txt = txt+',';
				}
				else{
					txt = txt+'[';
				}
				txt =txt+'{"location":'+'"'+s[i].location.value +'","locked":'+'"'+s[i].locked.value +'"}';
				
				//txt.replace(/@"\\"/g,/@"\\"/);
				console.log(txt);
				

			}
			
			txt=txt+']';
			console.log("this is tits"+txt);
			
			//var myJsonString = JSON.stringify(A);
			 //  var test1 = '[{"location":"frontLeft","loacked":"true"},{"location":"frontRight","loacked":"true"}]';
			 // console.log("this is testundefined"+test1);
			//var json = JSON.stringify(A);
			//console.log(A);
			res.send(JSON.parse(txt));
			
		}

		);

  
});



router.get('/vehicles/:id/fuel', function(req, res) {
	request.post(
		'http://gmapi.azurewebsites.net/getEnergyService',
		{json:{id:req.params.id,responseType:'JSON'}},
		
		function(error, response, body){
			var acquiredGM = body;
			 if (!body) return res.sendStatus(400);
			
  			var toSend = JSON.parse('{"percent" : '+'"' + body.data.tankLevel.value +'"}');
			
			res.send(toSend);
			
		}

		);

  
});




router.get('/vehicles/:id/battery', function(req, res) {
	request.post(
		'http://gmapi.azurewebsites.net/getEnergyService',
		{json:{id:req.params.id,responseType:'JSON'}},
		
		function(error, response, body){
			
			if (!body) return res.sendStatus(400);
			
  			var toSend = JSON.parse('{"percent" : '+'"' + body.data.batteryLevel.value +'"}');
			
			res.send(toSend);
			
		}

		);

  
});



module.exports = router;