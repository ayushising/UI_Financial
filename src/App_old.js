// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateCaseForm.css';

// function App() {
  
 
//       // State for the main form fields
//     const [camNumber, setCamNumber] = useState('');
//     const [borrowerName, setBorrowerName] = useState('');
  
//     // State for the *current* file being added
//     const [currentFile, setCurrentFile] = useState(null);
//     const [currentDocType, setCurrentDocType] = useState('Annual Report');
    
//     // This is the list of all documents to be uploaded
//     const [documents, setDocuments] = useState([]);
  
//     // State for loading and API messages
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState('');
  
//     /**
//      * Handles adding the selected file and its type to the 'documents' list.
//      */
//     const handleAddDocument = (e) => {
//       // We use 'e.preventDefault()' if this is a button of type "button" inside a form.
//       // Since we'll make it a separate button, it's good practice.
//       e.preventDefault(); 
  
//       if (currentFile && currentDocType) {
//         setDocuments([
//           ...documents,
//           { file: currentFile, type: currentDocType }
//         ]);
        
//         // Reset the file input and doc type
//         setCurrentFile(null);
//         // We can reset the file input field's display value like this:
//         document.getElementById('file-input').value = null;
//       } else {
//         alert('Please select a file and a document type.');
//       }
//     };
  
//     /**
//      * Handles the final submission of the entire form
//      */
//     const handleSubmit = async (e) => {
//       e.preventDefault();
      
//       if (documents.length === 0) {
//         setMessage('Error: Please add at least one document.');
//         return;
//       }
  
//       setIsLoading(true);
//       setMessage('');
  
//       // 1. Create FormData
//       const formData = new FormData();
//       formData.append('camNumber', camNumber);
//       formData.append('borrowerName', borrowerName);
  
//       // 2. Append all files and docTypes from our 'documents' list
//       documents.forEach(doc => {
//         formData.append('files', doc.file);
//         formData.append('docTypes', doc.type);
//       });
  
//       // 3. Send to Spring Boot API
//       try {
//         const response = await axios.post('http://localhost:8080/api/cases/create', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
  
//         setMessage(`Success! Case created with ID: ${response.data.caseId}`);
//         setIsLoading(false);
        
//         // Clear the form
//         setDocuments([]);
//         setCamNumber('');
//         setBorrowerName('');
  
//       } catch (error) {
//         const errorMsg = error.response?.data?.error || 'An unexpected error occurred.';
//         setMessage(`Error: ${errorMsg}`);
//         setIsLoading(false);
//       }
//     };
  
//     return (
//       <div className="form-page">
//         <header className="form-header">
//           <h1>Financial Commentry - GenAI</h1>
//           <span>Ayushi Singh (401250)</span>
//         </header>
  
//         <main className="form-container">
//           <form onSubmit={handleSubmit}>
            
//             {/* --- Main Form Fields --- */}
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="camNumber">CAM Number *</label>
//                 <input
//                   type="text"
//                   id="camNumber"
//                   value={camNumber}
//                   onChange={(e) => setCamNumber(e.target.value)}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="borrowerName">Borrower Name *</label>
//                 <input
//                   type="text"
//                   id="borrowerName"
//                   value={borrowerName}
//                   onChange={(e) => setBorrowerName(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
  
//             {/* --- Document Upload Section --- */}
//             <div className="add-document-section">
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="file-input">Upload Document *</label>
//                   <div className="file-input-wrapper">
//                     <input
//                       type="text"
//                       placeholder="No file selected"
//                       value={currentFile ? currentFile.name : ''}
//                       readOnly
//                     />
//                     <label htmlFor="file-input" className="file-upload-btn">Upload File</label>
//                     <input
//                       type="file"
//                       id="file-input"
//                       onChange={(e) => setCurrentFile(e.target.files[0])}
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="docType">Type of Document *</label>
//                   <select
//                     id="docType"
//                     value={currentDocType}
//                     onChange={(e) => setCurrentDocType(e.target.value)}
//                   >
//                     <option>Annual Report</option>
//                     <option>Call Transcript</option>
//                     <option>Email Communication</option>
//                     <option>Investor Presentation</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="add-btn-container">
//                 <button onClick={handleAddDocument} className="add-doc-btn">Add Document</button>
//               </div>
//             </div>
  
//             {/* --- List of Added Documents --- */}
//             {documents.length > 0 && (
//               <div className="document-list">
//                 <h3>Documents to be Uploaded:</h3>
//                 <ul>
//                   {documents.map((doc, index) => (
//                     <li key={index}>
//                       <span>{doc.file.name}</span>
//                       <span className="doc-type-badge">{doc.type}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
  
//             {/* --- Submit Section --- */}
//             <div className="submit-section">
//               <button type="submit" className="submit-btn" disabled={isLoading}>
//                 {isLoading ? 'Submitting...' : 'Submit'}
//               </button>
//               {message && (
//                 <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>
//                   {message}
//                 </p>
//               )}
//             </div>
//           </form>
//         </main>
//       </div>
//     );
//   };
  

// export default App;
