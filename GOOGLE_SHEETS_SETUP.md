# Google Sheets Integration Setup

To receive form submissions directly into a Google Sheet in addition to emails, follow these steps to create a Google Apps Script webhook:

1. Go to [Google Sheets](https://docs.google.com/spreadsheets) and create a new blank spreadsheet. Name it something like "Little Affair Sariska Bookings".
2. Add headers to the first row (A1, B1, C1, etc.) matching your form fields. Make sure A1 is "Timestamp". Other headers to include: 
   - `First_Name`
   - `Last_Name`
   - `Email`
   - `Phone`
   - `Check-in_Date`
   - `Check-out_Date`
   - `Number_of_Guests`
   - `Number_of_Rooms`
   - `Traveling_with_children`
   - `Traveling_with_pet`
   - `Adventures`
3. Click on **Extensions > Apps Script** in the top menu of your Google Sheet.
4. Delete any code in the editor and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter;
    
    // Automatically setup headers if the sheet is blank
    if (sheet.getLastColumn() === 0) {
      var initialHeaders = ['Timestamp', 'First_Name', 'Last_Name', 'Email', 'Phone', 'Check-in_Date', 'Check-out_Date', 'Number_of_Guests', 'Number_of_Rooms', 'Traveling_with_children', 'Traveling_with_pet', 'Adventures'];
      sheet.appendRow(initialHeaders);
    }
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function(header) {
      if (header === 'Timestamp') {
        return new Date();
      }
      return data[header] || '';
    });
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click the **Save** icon (floppy disk).
6. Click **Deploy > New deployment** in the top right.
7. Click the gear icon next to "Select type" and choose **Web app**.
8. Set the configuration to:
   - **Description**: Booking Form Webhook
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
9. Click **Deploy**. (Google will ask you to "Authorize access". Click it, select your account, click "Advanced", and click "Go to script").
10. Copy the **Web app URL** provided at the end of the deployment.
11. Add this URL to your **Vercel project environment variables** as `VITE_GOOGLE_SHEETS_WEBHOOK_URL`.
12. (Optional) Make sure `VITE_WEB3FORMS_ACCESS_KEY` is also set in Vercel for the email to `Info@littleaffairsariska.com`.
13. **Redeploy your site** on Vercel so the environment variables take effect.

**IMPORTANT UPDATE INSTRUCTIONS**: If you ever update the code inside the Apps Script, clicking "Save" is **not enough**. You must click **Deploy > New deployment** and replace the old URL in Vercel.
