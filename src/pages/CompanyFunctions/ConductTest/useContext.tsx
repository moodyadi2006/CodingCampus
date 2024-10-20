import React, { createContext, useContext } from 'react';

// Create the context
const CompanyContext = createContext({ companyId: "" });

// Create a provider component
export const CompanyProvider: React.FC<{ companyId: string, children: React.ReactNode }> = ({ companyId, children }) => {
  return (
    <CompanyContext.Provider value={{ companyId }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Use this provider to wrap your application or the component tree where you need the company ID

//<input
{/*}
onChange={(e) => setTest({ ...test, title: e.target.value })}
type='text'
placeholder='Test Title'
value={test.title}
className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
/>
<input
onChange={(e) => setTest({ ...test, description: e.target.value })}
type='text'
placeholder='Test Description'
value={test.description}
className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
/>*/}