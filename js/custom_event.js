$(document).ready(function(){

  consultRute("Sta Cecilia - La Cruz",false);
  consultRute("La Cruz - Sta Cecilia",true);

$("#routeFrom").change(function(){

        var ruteSelected = $(this).children("option:selected").text();

        var rutestring = ruteSelected.split('-')

        var ruteReverted = revertRute(rutestring)

        $("#revertedRute").empty()

        $("#revertedRute").append('<span class="fas fa-arrow-left"></span> '+ruteReverted)

        consultRute(ruteSelected,false);
        consultRute(ruteReverted,true);

 });


function consultRute(rute,isReverted){

    ref.on("value", function(snapshot) {
      
      managmetData(snapshot,rute,isReverted)

    }, function (error) {
        console.log("Error: " + error.code);
    });
}

function managmetData(dataJson,ruteP,isReverted){

    var listRutes = JSON.stringify(dataJson)
    var obj =  JSON.parse(listRutes);
    
    var ruteComplete="";

    for (var i in  obj) {
      if(obj[i].name===ruteP){
      
          var luVi = obj[i].HO.LUN_VI
          var sab = obj[i].HO.SAB
          var dom = obj[i].HO.DOM

          for (var j in luVi) {
            if(sab[j] === undefined){
              sab[j]="";
            }
            if(dom[j] === undefined){
              dom[j]="";
            }
            //console.log("Lun:"+luVi[j]+"SAB:"+sab[j]+"Dom:"+dom[j] )  
            if(!isReverted){
              ruteComplete +='<tr><td class="weekDay">'+luVi[j]+'</td><td class="saturDay">'+sab[j]+'</td><td class="weekDay">'+dom[j]+'</td></tr>';
            }else{
              ruteComplete +='<tr><td class="weekDay_revert">'+luVi[j]+'</td><td class="saturDay_revert">'+sab[j]+'</td><td class="weekDay_revert">'+dom[j]+'</td></tr>';
            }
          }
        }
      }

      if(!isReverted){
        fillTable("content_table",ruteComplete)        
      }else{
        fillTable("content_table_return",ruteComplete)
      }
}

function revertRute(array){

  var tam = array.length

  //var newString = [];
  var revertedString="";

  for(var i=(tam-1); i>=0; i--){
    //console.log(array[i].trim());
    revertedString += array[i].trim() + " - "
  }

  newStr = revertedString.slice(0, -3);

  return newStr.trim()
  
}

function fillTable(idTable, bodyTable){
  $("#"+idTable).toggle("hidde");
  $("#"+idTable).empty();
  $("#"+idTable).append(bodyTable);
  $("#"+idTable).toggle("slow");  
}

});
