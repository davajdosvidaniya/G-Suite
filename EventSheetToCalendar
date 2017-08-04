function ScanCreate() {
  var funcName = 'ScanCreate';
  var calendarName = 'CalendarExcelSheet';
  var sheetName = 'Events';
  var className = '9';
  var classCol = -1;
  var vGuests = "emails here, delimiter ;";
  var vSendInvites = false;
  var vLocation = "Any Location";
  var vYear = "2016";
  
  var fileSheet = DriveApp.getFilesByName(sheetName);
  var spreadSheet = SpreadsheetApp.open(fileSheet.next());
  
  try {
    var oCalendar = CalendarApp.getOwnedCalendarsByName(calendarName);
    oCalendar.deleteCalendar();
  } catch(e) {
    Logger.log(funcName + ' non exist');
  }
  
  try {
    var oCalendar = CalendarApp.createCalendar(calendarName, {
      summary: 'A calendar' + vYear,
      color: CalendarApp.Color.GREEN
    });
  } catch (e) {
    Logger.log(funcName + ' failed in calendar create');
    return 2;
  }
  
  Logger.log(funcName + ': The calendar is named "%s".', oCalendar.getName()); 
  
  try {
    var sheets = spreadSheet.getSheets();
    for (var i = 0; i < sheets.length ; i++ ) {
      var sheet = sheets[i];
      Logger.log(sheet.getName());            
      Logger.log(sheet.getLastColumn() + ':' + sheet.getMaxColumns());
      
      classCol = 11;
//      var range = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues();
//      for (var j = sheet.getLastColumn() - 1 ; j > - 1 && -1 == classCol; j--) {
//        //save the class column for future use
//        if ( range[0][j] === className ) classCol = j;
//      }
      
      if ( -1 != classCol ) {
        Logger.log('Max Rows ' + sheet.getLastRow() + ' classCol ' + classCol);
        var range = sheet.getRange(2, 1, sheet.getLastRow(), classCol).getValues();
        for (var j = 0 ; j <= sheet.getLastRow() - 1; j++) {
          if ( typeof range[j][classCol-1] === 'string' && range[j][classCol-1] !== "" && range[j][classCol-1] !== "שבת" ) {
            if ( sheet.getName() === 'January' ) vYear='2017';
            Logger.log('\t\t' + range[j][0] + ' ' + sheet.getName() + ' ' + vYear + '\t\t[' + range[j][classCol-1] + ']');
            try {
              var event = oCalendar.createAllDayEvent('[GO] '+range[j][classCol-1], new Date(range[j][0] + ' ' + sheet.getName() + ',' + vYear), {location: vLocation});
              event.addPopupReminder(2880);
              event.addPopupReminder(720);
              Logger.log('\t\t\tEvent ID: ' + event.getId());
            } catch (e) {
              Logger.log(funcName + ' failed create event ' + range[j][classCol-1]);
            }
          }
        }
      } else {
        Logger.log('Expected ' + className + ' not found');
      }
      
//      return 0;
    }
  } catch(e) {
    Logger.log(funcName + ' sheet error ' +  e.message + ':' + e.lineNumber);
    return 1;
  }
  
  return 0;
  
}
