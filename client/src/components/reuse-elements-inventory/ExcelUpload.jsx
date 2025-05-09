import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelToJson() {
  const [jsonData, setJsonData] = useState([]);
 
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];

        let jsonOutput = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 
        const headers = jsonOutput[0];

        
        const formattedData = jsonOutput.slice(1).map((row) => {
          let rowObject = {}; 
          headers.forEach((header, index) => {
            rowObject[header] = row[index] || ""; 
          });
          return rowObject;
        });

        setJsonData(formattedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>Upload an Excel file</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {jsonData && (
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
        // <p>Uploading...</p>
        // <button>Upload to Database!</button>
      )}
    </div>
  );
};

