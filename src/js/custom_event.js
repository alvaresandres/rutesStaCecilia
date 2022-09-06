$(document).ready(function(){

  consultRute("Sta Cecilia - La Cruz",false);
  //consultRute("La Cruz - Sta Cecilia",true);
  $("#divMap").toggle("hidden");

$("#routeFrom").change(function(){

        var ruteSelected = $(this).children("option:selected").text();

        var rutestring = ruteSelected.split('-')
        
        $("#listSchedule").empty()
        
        //var ruteReverted = revertRute(rutestring)

        //$("#revertedRute").empty()

        //$("#revertedRute").append('<span class="fa fa-undo"></span> '+ruteReverted)

        consultRute(ruteSelected,false);
        //consultRute(ruteReverted,true);

 });


 $( "#btnShowMap" ).click(function() {
   $("#divMap").toggle("slow");
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
    var ruteCompleteSab="";

    for (var i in  obj) {
      if("Todos"===ruteP){
      
        var luVi = obj[i].HO.LUN_VI
        var sab = obj[i].HO.SAB
        var dom = obj[i].HO.DOM
        var nameRoute = obj[i].name
        nameRoute=nameRoute.split(' - ')

        for (var j in luVi) {
          if(sab[j] === undefined){
            sab[j]="";
          }
          if(dom[j] === undefined){
            dom[j]="";
          }
          //console.log("Lun:"+luVi[j]+"SAB:"+sab[j]+"Dom:"+dom[j] )  
          if(!isReverted){
            
            ruteComplete +='<tr><th>'+nameRoute[0]+'</th><th><span class="badge badge-pill badge-success">'
                        +luVi[j]+'</span></th><th><span class="badge badge-pill badge-warning">+30</span></th><th>'+nameRoute[1]+'</th></tr>'
            //ruteCompleteSab +='<li class="list-group-item"><p class="card-text"><span class="badge badge-pill badge-success"> <i class="fas fa-plane-departure"></i> ' +sab[j]+'</span> <i class="fas fa-angle-right"></i> <span class="badge badge-pill badge-warning"> <i class="fas fa-plane-arrival"></i>7:30 am</span> </p></li>'
            
          }else{
            ruteComplete +='<tr><td class="weekDay_revert">'+luVi[j]+'</td><td class="saturDay_revert">'+sab[j]+'</td><td class="weekDay_revert">'+dom[j]+'</td></tr>';
          }
        }
      }
      if(obj[i].name===ruteP){
      
          var luVi = obj[i].HO.LUN_VI
          var sab = obj[i].HO.SAB
          var dom = obj[i].HO.DOM
          var nameRoute = obj[i].name
          nameRoute=nameRoute.split(' - ')

          for (var j in luVi) {
            if(sab[j] === undefined){
              sab[j]="";
            }
            if(dom[j] === undefined){
              dom[j]="";
            }
            //console.log("Lun:"+luVi[j]+"SAB:"+sab[j]+"Dom:"+dom[j] )  
            if(!isReverted){
              
              ruteComplete +='<tr><th>'+nameRoute[0]+'</th><th><span class="badge badge-pill badge-success">'
                          +luVi[j]+'</span></th><th><span class="badge badge-pill badge-warning">+30</span></th><th>'+nameRoute[1]+'</th></tr>'
              //ruteCompleteSab +='<li class="list-group-item"><p class="card-text"><span class="badge badge-pill badge-success"> <i class="fas fa-plane-departure"></i> ' +sab[j]+'</span> <i class="fas fa-angle-right"></i> <span class="badge badge-pill badge-warning"> <i class="fas fa-plane-arrival"></i>7:30 am</span> </p></li>'
              
            }else{
              ruteComplete +='<tr><td class="weekDay_revert">'+luVi[j]+'</td><td class="saturDay_revert">'+sab[j]+'</td><td class="weekDay_revert">'+dom[j]+'</td></tr>';
            }
          }
        }
      }

      if(!isReverted){
        fillTable("listSchedule",ruteComplete)        
        //fillTable("listScheduleSab",ruteCompleteSab) 
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
