function logActivity_(spreadSheet, activityName) {
  try {
    var timeStamp = new Date();
    var data = [];
  
    data.push(timeStamp);
    var sheet = spreadSheet.getSheetByName("activityName");
    if ( null != sheet ) {
      //check the limits before add new remove old
      if ( sheet.getLastRow() === sheet.getMaxRows() ) sheet.insertRowsAfter(sheet.getLastRow(), 1);
      sheet.getRange(sheet.getLastRow()+1, 1, 1, data.length).setValues([data]);
    }
  } catch (e) {
      Logger.log(e.fileName  + ":" +  e.lineNumber + "\t\t" + e.message);
  }
}
