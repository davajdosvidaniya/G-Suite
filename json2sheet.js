function insertData(sheet, dataRes) {
  var dataAll = JSON.parse(dataRes);
  var objects = [];

  for (var i = 0; i < dataAll.result.length; i++){
    var obj = dataAll.result[i];
    var object = [];
    for (var key in obj){
      if (isObject_(obj)) {
         for (var skey in obj[key]) 
           if (skey !== "link") object.push(obj[key][skey]);
      }
      else object.push(obj[key]);
    }
    objects.push(object);
  }
  insertData_(sheet, objects);
}

function insertData_(sheet, data) {
  if ( data.length > 0) {
    try {
      if ( 1 < sheet.getMaxRows() ) sheet.deleteRows(2, sheet.getMaxRows()-1);
      sheet.insertRowsAfter(1, data.length+1);
      sheet.getRange(2, 1, data.length, data[1].length).setValues(data);
    } catch (e) {
      Logger.log(e.fileName  + ":" +  e.lineNumber + "\t\t" + e.message);
    }
  }
}
