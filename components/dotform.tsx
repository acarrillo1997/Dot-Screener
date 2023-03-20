import React, { useState } from 'react';
import axios from 'axios'; 
import { useTable, Column } from 'react-table';
import styles from './dotform.module.css';


interface DotFormProps {}

const DotForm: React.FC<DotFormProps> = () => {
  const [dotNumber, setDotNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);
  const [operatingStatus, setOperatingStatus] = useState<string | null>(null);
  const [driverOOS, setdriverOOS] = useState<string | null>('');


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
  
        if (carrier.driverOosRate !== null && carrier.driverOosRate !== undefined) {
          setdriverOOS(`${carrier.driverOosRate}`);
        } else {
          console.error('Error: Invalid driverOOS data');
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
        driverOOS: driverOOS,
      },
    ],
    [companyName, operatingStatus, operationType, driverOOS]
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
    {
      Header: 'Driver OOS',
      accessor: 'driverOOS',
    },
  ], []);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="dotNumber" className="text-sm font-medium" style={{ color: 'black' }}>
            Insert DOT Number to Search:
          </label>
          <input
            type="text"
            name="dotNumber"
            id="dotNumber"
            value={dotNumber}
            onChange={(e) => setDotNumber(e.target.value)}
            className={`${styles.input} transition-all duration-200 ease-in-out focus:outline-none focus:shadow-outline focus:border-blue-300`}
            required
          />
          <button
            type="submit"
            className={`${styles.button} transition-all duration-200 ease-in-out focus:outline-none focus:shadow-outline`}
          >
            Search DOT
          </button>
        </div>
        {submitted && !companyName && (
          <div className={styles.error}>Unable to fetch company data. Please try again.</div>
        )}
        <div className="mt-4">
          <table {...getTableProps()} className={styles.table}>
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 font-medium text-gray-900 border-b border-gray-200"
                        >
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
    </div>
  );
};

export default DotForm;