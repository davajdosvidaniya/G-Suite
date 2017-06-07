###filter example: from:zillow.com older_than:14d and not label:starred

function processCleaners() {
  
  var spreadsheet  = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName("clean"));
  var cleanSet = spreadsheet.getActiveSheet();
  
  var startRow = 1;
  var lastRow = cleanSet.getLastRow();
  
  var range = cleanSet.getRange(1,1,lastRow-startRow+1,1);
  var numRows = range.getNumRows();
  var filters = range.getValues();
  
  for (var i = 0; i <= numRows - 1; i++) {
    try {
      var deleted = 0;    
      var threads = GmailApp.search(filters[i][0], 0, 100);
      Logger.log("Processing %s...", filters[i][0]);
      for (var ii=0; ii<threads.length; ii++) {
        var messages = GmailApp.getMessagesForThread(threads[ii]);
        deleted = deleted + messages.length;
        for (var j=0; j<messages.length; j++) {
            var email = messages[j];   
            email.moveToTrash();
        }
      }
      Logger.log("Deleted %s %s", filters[i][0], deleted);
    } catch (e) {MailApp.sendEmail("akotler@gmail.com", "[ERROR] processCleaners [" + filters[i][0] + "]", "Msg: " + e.message + " Line: " + e.lineNumber );}  
  }
}
