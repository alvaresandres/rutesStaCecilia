$(document).ready(function () {

  consultRute("Sta Cecilia - La Cruz", false);
  //consultRute("La Cruz - Sta Cecilia",true);
  $("#divMap").toggle("hidden");

  $("#routeFrom").change(function () {

    var ruteSelected = $(this).children("option:selected").text();

    var rutestring = ruteSelected.split('-')

    $("#listSchedule").empty()
    $("#listScheduleSab").empty()

    //var ruteReverted = revertRute(rutestring)

    //$("#revertedRute").empty()

    //$("#revertedRute").append('<span class="fa fa-undo"></span> '+ruteReverted)

    consultRute(ruteSelected, false);
    //consultRute(ruteReverted,true);

  });


  $("#btnShowMap").click(function () {
    $("#divMap").toggle("slow");
  });


  function consultRute(rute, isReverted) {

    ref.on("value", function (snapshot) {

      managmetData(snapshot, rute, isReverted)

    }, function (error) {
      console.log("Error: " + error.code);
    });
  }

  function managmetData(dataJson, ruteP, isReverted) {

    var listRutes = JSON.stringify(dataJson)
    var obj = JSON.parse(listRutes);

    var ruteComplete = "";
    var ruteCompleteSab = "";
    
    for (var i in obj) {
      if ("Todos" === ruteP || obj[i].ruta.name === ruteP ) {
        let nameRoute = obj[i].ruta.name

        var nameRouteSplited = nameRoute.split(' - ')
        var arrayNameRoute=[];

        arrayNameRoute = [nameRouteSplited[0],"--",nameRouteSplited[1]]
        if(nameRouteSplited.length>2){

          arrayNameRoute = [nameRouteSplited[0],nameRouteSplited[1],nameRouteSplited[2]]
        }        
  
        for (var j in obj[i].ruta.IDA) {
          
          var horarioSplited = (obj[i].ruta.IDA[j]).split(" ")
          var b = toDate(horarioSplited[0],"h:m")
          console.log(b)
          ruteComplete = '<tr><th>' + arrayNameRoute[0] + '</th><th><span class="badge badge-pill badge-success">'
                         + horarioSplited[0] + '</span></th><th><span class="badge badge-pill badge-secondary">'+arrayNameRoute[1]
                         + '<br>05:00am </span></th><th><span class="badge badge-pill badge-warning">'+horarioSplited[1]+'</span></th><th>' + arrayNameRoute[2] + '</th></tr>'
          if (!isReverted) {
            if(horarioSplited[2]==='LUN_VI'){
              fillTable("listSchedule", ruteComplete)            
            }else if(horarioSplited[2]==='SAB'){
              fillTable("listScheduleSab", ruteComplete)            
            }
          } else {
            //ruteComplete += '<tr><td class="weekDay_revert">' + luVi[j] + '</td><td class="saturDay_revert">' + sab[j] + '</td><td class="weekDay_revert">' + dom[j] + '</td></tr>';
          }
        }
      }

    }

    /*if (!isReverted) {
      fillTable("listSchedule", ruteComplete)
      //fillTable("listScheduleSab",ruteCompleteSab) 
    } else {
      fillTable("content_table_return", ruteComplete)
    }*/
  }

  function revertRute(array) {

    var tam = array.length

    //var newString = [];
    var revertedString = "";

    for (var i = (tam - 1); i >= 0; i--) {
      //console.log(array[i].trim());
      revertedString += array[i].trim() + " - "
    }

    newStr = revertedString.slice(0, -3);

    return newStr.trim()

  }

  function fillTable(idTable, bodyTable) {
    //$("#" + idTable).toggle("hidde");
    //$("#" + idTable).empty();
    $("#" + idTable).append(bodyTable);
    //$("#" + idTable).toggle("slow");
  }

  function toDate(dStr,format) {
    var now = new Date();
    const timeTo= dStr.slice(0, -2)
    if (format == "h:m") {
       now.setHours(timeTo.substr(0,timeTo.indexOf(":")));
       now.setMinutes(timeTo.substr(timeTo.indexOf(":")+1));
       now.setSeconds(0);
       return now;
    }else 
      return "Invalid Format";
  }

});
