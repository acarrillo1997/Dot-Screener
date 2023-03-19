import React, { useState } from 'react';
import axios from 'axios'; 
import { useTable, Column } from 'react-table';


interface DotFormProps {}

const DotForm: React.FC<DotFormProps> = () => {
  const [dotNumber, setDotNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);
  const [operatingStatus, setOperatingStatus] = useState<string | null>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('DOT Number:', dotNumber);
    setSubmitted(true);
    fetchCompanyData(dotNumber);
  };
  
  const fetchCompanyData = async (dotNumber: string) => {
    try {
      const response = await axios.get(
        `https://mobile.fmcsa.dot.gov/qc/services/carriers/${dotNumber}?webKey=fbe540b0ab17796e7746341d8a7b37e1e57d65fa`
      );
      const data = response.data;
  
      if (data && data.content && data.content.carrier) {
        const carrier = data.content.carrier;
        setCompanyName(carrier.legalName);
  
        if (carrier.allowedToOperate) {
          setOperatingStatus(carrier.allowedToOperate === 'Y' ? 'Eligible' : 'Not Eligible');
        } else {
          console.error('Error: Invalid operating status data');
        }
  
        if (carrier.carrierOperation) {
          setOperationType(carrier.carrierOperation.carrierOperationDesc);
        } else {
          console.error('Error: Invalid operation type data');
        }
      } else {
        console.error('Error: Invalid carrier data');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };
  
  const data = React.useMemo(
    () => [
      {
        companyName: companyName,
        operatingStatus: operatingStatus,
        operationType: operationType,
      },
    ],
    [companyName, operatingStatus, operationType]
  );

  const columns = React.useMemo<Column<object>[]>(() => [
    {
      Header: 'Company Name',
      accessor: 'companyName',
    },
    {
      Header: 'Operating Status',
      accessor: 'operatingStatus',
    },
    {
      Header: 'Operation Type',
      accessor: 'operationType',
    },
  ], []);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
<form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="dotNumber" className="block text-sm font-medium text-gray-700">
          DOT Number
        </label>
        <input
          type="text"
          name="dotNumber"
          id="dotNumber"
          value={dotNumber}
          onChange={(e) => setDotNumber(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold text-sm px-6 py-2 rounded-md hover:bg-indigo-500"
      >
        Search
      </button>
      {submitted && !companyName && (
        <div className="mt-4 text-center text-red-500">Unable to fetch company data. Please try again.</div>
      )}
      <div className="mt-4">
       <table {...getTableProps()} className="w-full divide-y divide-gray-200 border-collapse bg-white shadow-md rounded-md border">
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-lg font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                        <td {...cell.getCellProps()} className="px-8 py-6 whitespace-normal font-medium text-gray-900 border-b border-gray-200">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default DotForm;