import React, { useState, useEffect } from 'react';
import axios from 'axios';
// We use lucide-react for icons. Install with: npm install lucide-react
import { DownloadCloud, Upload, Plus, X, FileText, ArrowLeft } from 'lucide-react';

/*
================================================================================
Component 1: Reusable Header
================================================================================
*/
export const Header = () => (
  <header className="bg-red-900 text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-bold">Financial Commentry - GenAI</h1>
    <span className="text-sm">Ayushi Singh (401250)</span>
  </header>
);
export default Header;