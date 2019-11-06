import Papa from 'papaparse';
import convert from 'xml-js';

/**
 * Extract the file name given a string of the form fileName + ext
 * @param {string} nameExt File name + extension (e.g. 'my_image.png')
 * @return {string} The name without the extension, or the full name if
 * there was no '.' in the string (e.g. 'my_image')
 */
const extractFileName = function(nameExt) {
    const nameParts = nameExt.split('.', 1);
    return nameParts[0];
};

/**
 * Handle downloading a web file from a given URL 
 * @param {string} url The URL of the file
 * @param {Function} onComplete The function that handles the parsed data
 * @param {Function} onError The function that handles any error loading the file
 */
const handleWebFileUpload = function(url, onComplete, onError) {
  //Handle web file upload
  onComplete(url, [{ "name": "testFile", "num": 123 }]);
}


/**
 * Handle the upload and parse of a data file (csv, XML, and JSON supported)
 * @param {Input} fileInput The <input/> element that contains the file being loaded
 * @param {Function} onComplete The function that handles the parsed data
 * @param {Function} onError The function that handles any error loading the file
 */
const handleDataFileUpload = function(fileInput, onComplete, onError) {
  if(fileInput.files.length === 0) {
    return;
  }

  for(let i = 0; i < fileInput.files.length; i++) {
    let file = fileInput.files[i];
    let fileName = extractFileName(file.name);

    //CSV File
    if(file.type === "application/vnd.ms-excel") {
      const config = {
        header: true,
        complete: ((results) => handleResult(results.data, fileName, onComplete))
      };
    
      Papa.parse(file, config);     
    }
    //XML File
    else if(file.type === "text/xml") {
      let reader = new FileReader();
      reader.onloadend = (() => {
        const results = convert.xml2js(reader.result, { compact: true, nativeType: true });    // to convert xml text to javascript object
        
        //Re-parse objects to remove _text property
        const rows = results.root.row;
        const newRows = rows.map((row) => {
          let newRow = {};
          for (let key in row) {
            if (row.hasOwnProperty(key)) {
                newRow[key] = row[key]._text;
            }
          }
          return newRow;
        });
    
        handleResult(newRows, fileName, onComplete);
      });
      reader.readAsText(file);
    }
    else if(file.type ==="application/json") {
      let reader = new FileReader();
      reader.onloadend = (() => {
        const results = JSON.parse(reader.result);
        handleResult(results, fileName, onComplete);
      });
      reader.readAsText(file);
    }
    else {
      onError("Invalid file type.");
    }
  }
  
  //Clear input once we've processed all of the files
  fileInput.value = null;
}


/**
 * A function to handle the result of parsing a file, parses any 
 * potential number values
 * @param {Array} results An array of parsed results
 * @param {string} fileName The name of the parsed file
 * @param {Function} onComplete The function to call once parsing has completed
 */
const handleResult = function(results, fileName, onComplete) {
    const parsedResults = results.map((row) => {
    let newRow = {};
    for (let key in row) {
      if (row.hasOwnProperty(key)) {
          if(typeof(row[key]) === "string" && checkIfNum(row[key])) {
            newRow[key] = parseNumber(row[key]);
          }
          else {
            newRow[key] = row[key];
          }
      }
    }
    return newRow;
  });

  onComplete(fileName, parsedResults);
}

/**
 * Checks whether or not a string is a comma separated number
 * to make sure that we only parse numbers when needed
 * @param {string} s The value string being checked
 * @return {bool} Whether or not the string is actually a number
 */
const checkIfNum = function(s) {
  let i = s.length;
  while (i--) {
    let c = s.charAt(i);
    if((c < "0" || c > "9") && c !== ",") {
      return false;
    }
  }
  return true;
}

/**
 * Found at https://stackoverflow.com/questions/11665884/how-can-i-parse-a-string-with-a-comma-thousand-separator-to-a-number
 * Parses a number from a localized string 
 * @param {string} value The initial string value (e.g. '453,323')
 * @param {string} locale The locale used to parse the string, defaults to the navigator's locale
 * @return {int} The float value of the string (e.g. 453323)
 */
const parseNumber = function(value, locale = navigator.language) {
  const example = Intl.NumberFormat(locale).format('1.1');
  const cleanPattern = new RegExp(`[^-+0-9${ example.charAt( 1 ) }]`, 'g');
  const cleaned = value.replace(cleanPattern, '');
  const normalized = cleaned.replace(example.charAt(1), '.');

  return parseFloat(normalized);
}

export {
  handleDataFileUpload, 
  handleWebFileUpload
};
