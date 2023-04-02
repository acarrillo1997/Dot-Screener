import React, { FormEvent, useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import styles from './Search.module.css';
import { useEffect } from 'react';

interface SearchResult {
  carrierName: string;
  dotNumber: number;
  safetyRating: string | null;
  driverOosRate: string;
  vehicleOosRate: string;
  location: string;
  fleetSize: number;
  insuranceRenewal: string | null;
}

interface SearchProps {
  searchHistory: SearchResult[];
  setSearchHistory: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}

const Search: React.FC<SearchProps> = ({ searchHistory, setSearchHistory }) => {
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const fetchByDot = async (dotNumber: string) => {
    const apiKey = 'fbe540b0ab17796e7746341d8a7b37e1e57d65fa';
    const apiUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${dotNumber}?webKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    const carrier = data.content.carrier;

    const result: SearchResult = {
      carrierName: carrier.legalName,
      dotNumber: carrier.dotNumber,
      safetyRating: carrier.safetyRating,
      driverOosRate: carrier.driverOosRate.toFixed(2),
      vehicleOosRate: carrier.vehicleOosRate.toFixed(2),
      location: `${carrier.phyCity}, ${carrier.phyState}`,
      fleetSize: carrier.totalPowerUnits,
      insuranceRenewal: carrier.safetyReviewDate,
    };
    return result; // Add this line to return the result object
    setSearchResult(result);
  };

  const fetchByName = async (name: string) => {
    const apiKey = 'fbe540b0ab17796e7746341d8a7b37e1e57d65fa';
    const apiUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/name/${name}?webKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    const carrier = data.content.carriers[0]; // Access the first carrier in the list

    const result: SearchResult = {
      carrierName: carrier.legalName,
      dotNumber: carrier.dotNumber,
      safetyRating: carrier.safetyRating,
      driverOosRate: carrier.driverOosRate.toFixed(2),
      vehicleOosRate: carrier.vehicleOosRate.toFixed(2),
      location: `${carrier.phyCity}, ${carrier.phyState}`,
      fleetSize: carrier.totalPowerUnits,
      insuranceRenewal: carrier.safetyReviewDate,
    };
    return result; // Add this line to return the result object
    setSearchResult(result);
  };

  const fetchByMc = async (mc: string) => {
    const apiKey = 'fbe540b0ab17796e7746341d8a7b37e1e57d65fa';
    const apiUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/${mc}?webKey=${apiKey}`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
    const carrier = data.content[0].carrier; // Change this line to access the first carrier in the array
  
    const result: SearchResult = {
      carrierName: carrier.legalName,
      dotNumber: carrier.dotNumber,
      safetyRating: carrier.safetyRating,
      driverOosRate: carrier.driverOosRate ? carrier.driverOosRate.toFixed(2) : 'N/A',
      vehicleOosRate: carrier.vehicleOosRate ? carrier.vehicleOosRate.toFixed(2) : 'N/A',
      location: `${carrier.phyCity}, ${carrier.phyState}`,
      fleetSize: carrier.totalPowerUnits,
      insuranceRenewal: carrier.safetyReviewDate,
    };
    return result; // Add this line to return the result object
    setSearchResult(result);
  };
  
  

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    let result: SearchResult | null = null;
  
    if (searchField === 'dot') {
      result = await fetchByDot(searchValue);
    } else if (searchField === 'mc') {
      result = await fetchByMc(searchValue);
    } else if (searchField === 'carrierName') {
      result = await fetchByName(searchValue);
    } else if (searchField === 'carrierDba') {
      // Add logic for fetching data by Carrier DBA
    } else if (searchField === 'carrierEmail') {
      // Add logic for fetching data by Carrier Email
    }
  
    if (result !== null) {
      setSearchResult(result);
      setSearchHistory((prevHistory) => [result, ...prevHistory].filter((item) => item !== null) as SearchResult[]);
    }
  };
  


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">DOT Screener</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" active>
               Search
              </Nav.Link>
            <Nav.Link href="#history">
               History
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3" controlId="searchField">
            <Form.Label>Search Field</Form.Label>
            <Form.Control as="select" value={searchField} onChange={(e) => setSearchField(e.target.value)}>
              <option value="">Select field</option>
             <option value="dot">DOT</option>
             <option value="mc">MC</option>
             {/* <option value="carrierName">Carrier Name</option>
             <option value="carrierDba">Carrier DBA</option>
            <option value="carrierEmail">Carrier Email</option>  */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="searchValue">
            <Form.Label>Search Value</Form.Label>
            <Form.Control type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        {searchResult && (
          <div className={styles.summary}>
            <h3>{searchResult.carrierName}</h3>
            <p>DOT Number: {searchResult.dotNumber}</p>
            <p>Safety Ratings: {searchResult.safetyRating}</p>
            <p>Driver OOS Rate: {searchResult.driverOosRate}%</p>
            <p>Vehicle OOS Rate: {searchResult.vehicleOosRate}%</p>
            <p>Location: {searchResult.location}</p>
            <p>Fleet Size: {searchResult.fleetSize}</p>
            <p>Upcoming Insurance Renewal: {searchResult.insuranceRenewal}</p>
          </div>
        )}
      </Container>
    </>
  );
        };

        export type { SearchResult };
        export default Search;
