import React, { useState, useEffect } from 'react';
import axios from 'axios';
// We use lucide-react for icons. Install with: npm install lucide-react
import { DownloadCloud, Upload, Plus, X, FileText, ArrowLeft } from 'lucide-react';
import './CreateCaseForm.css';
const CreateCaseForm = ({ onNavigate }) => {
  const [camNumber, setCamNumber] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [industryName, setindustryName] = useState('');

  const [currentFile, setCurrentFile] = useState(null);
  const [currentDocType, setCurrentDocType] = useState('');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Used to reset file input

  const handleAddDocument = () => {
    if (currentFile && currentDocType) {
      setDocuments([...documents, { file: currentFile, type: currentDocType }]);
      setCurrentFile(null);
      setFileInputKey(Date.now()); // Reset the file input
    } else {
      setMessage('Please select a file and a document type to add.');
    }
  };
  
  const handleRemoveDocument = (indexToRemove) => {
    setDocuments(documents.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (documents.length === 0) {
      setMessage('Error: Please add at least one document.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('camNumber', camNumber);
    formData.append('borrowerName', borrowerName);
    formData.append('industryName', industryName);


    documents.forEach(doc => {
      formData.append('files', doc.file);
      formData.append('docTypes', doc.type);
    });

    try {
      const response = await axios.post('http://localhost:8080/api/cases/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(`Success! Case created with ID: ${response.data.caseId}`);
      setIsLoading(false);
      
      // Clear form and navigate back to dashboard after a short delay
      setTimeout(() => {
        setDocuments([]);
        setCamNumber('');
        setBorrowerName('');
        setMessage('');
        onNavigate('dashboard'); // Navigate back to the dashboard
      }, 1000);

    } catch (error) {
      const errorMsg = error.response?.data?.error || 'An unexpected error occurred.';
      setMessage(`Error: ${errorMsg}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-md">
      
      {/* --- Back to Dashboard Button --- */}
      <button
        type="button"
        onClick={() => onNavigate('dashboard')}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition duration-300"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Dashboard
      </button>

      <form onSubmit={handleSubmit}>
        {/* --- Main Form Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="camNumber" className="block text-sm font-medium text-gray-700 mb-1">CAM Number *</label>
            <input
              type="text"
              id="camNumber"
              value={camNumber}
              onChange={(e) => setCamNumber(e.target.value)}
              required
              className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700 mb-1">Borrower Name *</label>
            <input
              type="text"
              id="borrowerName"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              required
              className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
              <label htmlFor="docType" className="block text-sm font-medium text-gray-700 mb-1">Industry Name *</label>
              <select
                id="docType"
                value={industryName}
                onChange={(e) => setindustryName(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Chemical</option>
                <option>Trade wholesale</option>
                <option>Industrial</option>
                <option>Electrical </option>
                </select>
          </div>
        </div>

        {/* --- Document Upload Section --- */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="form-group">
              <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-1">Upload Document *</label>
              <div className="flex">
                <label htmlFor="file-input" className="flex items-center cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md border border-gray-300 hover:bg-gray-300">
                  <Upload size={16} className="mr-2" />
                  <span>Choose File</span>
                </label>
                <input
                  type="file"
                  id="file-input"
                  key={fileInputKey} // This key helps reset the input
                  onChange={(e) => setCurrentFile(e.target.files[0])}
                  className="hidden"
                />
                <span className="flex-1 px-4 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-gray-500 truncate">
                  {currentFile ? currentFile.name : 'No file selected'}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="docType" className="block text-sm font-medium text-gray-700 mb-1">Type of Document *</label>
              <select
                id="docType"
                value={currentDocType}
                onChange={(e) => setCurrentDocType(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Annual Report</option>
                <option>Brokerage Report</option>
                <option>Rating Agency Report</option>
                <option>Call Transcript</option>
                <option>Email Communication</option>
                <option>Investor Presentation Q1</option>
                <option>Investor Presentation Q2</option>
                <option>Investor Presentation Q3</option>
                <option>Investor Presentation Q4</option>
                <option>Last CAM</option>
                <option>CMA Standalone</option>
                <option>CMA Consolidated</option>
                <option>OAS Approval</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleAddDocument}
              className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
            >
              <Plus size={20} className="mr-2" />
              Add Document
            </button>
          </div>
        </div>

        {/* --- List of Added Documents --- */}
        {documents.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Documents to Upload:</h3>
            <ul className="space-y-2">
              {documents.map((doc, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex items-center min-w-0"> {/* Added min-w-0 for truncation */}
                    <FileText size={18} className="mr-2 text-gray-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-800 truncate">{doc.file.name}</span>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs font-medium mr-3">{doc.type}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* --- Submit Section --- */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            type="submit"
            className="bg-red-800 text-white font-bold py-3 px-10 rounded-md shadow-lg hover:bg-red-900 transition duration-300 disabled:bg-gray-400"
            disabled={isLoading || documents.length === 0}
          >
            {isLoading ? 'Submitting...' : 'Submit Case'}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCaseForm;