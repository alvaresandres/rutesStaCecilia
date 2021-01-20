$(document).ready(function(){

	var ruteSanJose = '<tr><td style="background: #03a9f49e;"><img src="img/icons/amanecer.png" /> 04:30 am</td>'+
								'<td style="background: #8BC34A;">04:30 am</td>'+
								'<td style="background: #FF9800;">04:30 am</td></tr>'+
								'<tr><td style="background: #03a9f49e;"><img src="img/icons/atardecer-en-la-playa.png" />02:30 pm</td>'+
								'<td style="background: #8BC34A;">02:30 pm</td>'+
								'<td style="background: #FF9800;">02:30 pm</td></tr>';

   $("#routeFrom").change(function(){
        var ruteSelected = $(this).children("option:selected").text();
        validateStopPoint(ruteSelected);
    });


function validateStopPoint(id){	

	var listCities = new Array("Sta. Cecilia - La Cruz", "Sta. Cecilia - San Jose", "Upala","San Jose","La Virgen","Santa Elena","El Caoba");
	var newlistCities = new Array();

	for(var i in listCities){
		
		if(listCities[i]===id){
			$("#content_table").empty();
			$("#content_table").append(ruteSanJose);

		}
	}

}


});