// https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
// https://gist.github.com/tanaikech/2f16f467c94612dc83920a3158614d95

//  1a Enter sheet name where data is to be written below
//  1b Enter name for image folder in Google Drive
const SHEET_NAME_PRODUCTION = 'Einreichungen';
// const SHEET_NAME_STAGING = 'Testeinreichungen';
const IMAGE_FOLDER_NAME = 'Bilder der Kunstwerke';

//  2. Run > setup
//
//  3. Publish > Deploy as web app
//    - enter Project Version name and click 'Save New Version'
//    - set security level and enable service (most likely execute as 'me' and
//    access 'anyone, even anonymously)
//
//  4. Copy the 'Current web app URL' and post this in your form/script action
//
//  5. Insert column names on your destination sheet matching the parameter names
//  of the data you are passing in (exactly matching case)

const SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

function uploadFileToGoogleDrive(data, mimetype, filename) {
  let folder = DriveApp.getFoldersByName(IMAGE_FOLDER_NAME);

  if (folder.hasNext()) { // if folder exists
    folder = folder.next();
  } else {
    folder = DriveApp.createFolder(IMAGE_FOLDER_NAME); // create folder
  }

  const decodedData = Utilities.base64Decode(data);
  const blob = Utilities.newBlob(decodedData, mimetype, filename);
  return folder.createFile(blob).getUrl();
}

function mailSuccess(emailAddress) {
  const mailHtml = HtmlService.createTemplateFromFile('mail-template').evaluate().getContent();

  MailApp.sendEmail({
    to: emailAddress,
    subject: 'Wir haben Ihre Einreichung erhalten',
    htmlBody: mailHtml,
  });
}

function handleResponse(e) {
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  const lock = LockService.getPublicLock();
  lock.waitLock(30000); // wait 30 seconds before conceding defeat.

  // If you are passing JSON in the body of the request uncomment this block
  // var jsonString = e.postData.getDataAsString();
  // e.parameter = JSON.parse(jsonString);

  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    const doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
    const sheet = doc.getSheetByName(SHEET_NAME_PRODUCTION);

    // headers in google sheet must match names of input fields in form html
    const headRow = 4;
    const headers = sheet.getRange(headRow, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1; // get next row
    const row = [];

    // loop through the header columns
    headers.forEach((header) => {
      if (header === 'timestamp') {
        row.push(new Date());
      } else if (header.includes('image')) {
        const index = parseInt(header.slice(-1), 10) - 1; // get index of image from cellname
        let cellContent = '';

        // if image exists
        if (e.parameters.data[index]) {
          const img = e.parameters.data[index];
          const mimetype = e.parameters.mimetype[index];
          const fileExtension = `.${mimetype.substr(mimetype.indexOf('/') + 1)}`;
          const fileName = `${e.parameter.title.replace(/\s+/g, '-').toLowerCase()}-${index}${fileExtension}`;
          const fileUrl = uploadFileToGoogleDrive(img, mimetype, fileName);
          cellContent = `=HYPERLINK("${fileUrl}";"${fileName}")`;
        }

        // write in cell
        row.push(cellContent);
      } else {
        // use header name to get rest of form data and populate sheet
        row.push(e.parameter[header]);
      }
    });

    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // send success e-mail
    mailSuccess(e.parameter.email);

    // return json success results
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (errorMessage) {
    // if error return this
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: errorMessage, event: e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally { // release lock is executed always
    lock.releaseLock();
  }
}

/* eslint-disable no-unused-vars */
function doGet(e) {
  return handleResponse(e);
}

/* eslint-disable no-unused-vars */
function doPost(e) {
  return handleResponse(e);
}

/* eslint-disable no-unused-vars */
function setup() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty('key', doc.getId());
  DriveApp.getRootFolder(); // just for setup purposes to give authorization
}
