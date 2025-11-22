import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinancialApp.css';
// We use lucide-react for icons. Install with: npm install lucide-react
import { DownloadCloud,  Plus } from 'lucide-react';
const Dashboard = ({ onNavigate }) => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch cases
  const fetchCases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8080/api/cases');
      // Sort cases to show the newest first
      setCases(response.data.sort((a, b) => b.id - a.id));
    } catch (err) {
      setError('Failed to fetch cases. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

   //useEffect to fetch data on load
   useEffect(() => {
     fetchCases();
   }, []); // The empty array [] means this runs once when the component mounts

  // Re-fetch cases when navigating back (e.g., after creation)
  // This is a common pattern. We can also pass a prop to trigger this.
  // For simplicity, we can pass fetchCases to the create form, but
  // the current implementation handles this by re-mounting.
  // Let's add a small effect to refetch when the component is focused.
  useEffect(() => {
    const handleFocus = () => fetchCases();
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-gray-500">Loading cases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Create New Case Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => onNavigate('createCase')}
          className="flex items-center bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-red-900 transition duration-300"
        >
          <Plus size={20} className="mr-2" />
          Create New Case
        </button>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAM No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download File</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No cases found. Create a new one to get started!
                </td>
              </tr>
            ) : (
              cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.caseId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.camNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.borrowerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-red-700 hover:text-red-900 transition duration-300">
                      <DownloadCloud size={24} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;