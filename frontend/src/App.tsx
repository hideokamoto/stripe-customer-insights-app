import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import {StripeTOPCustomer} from './interfaces';
import { CustomerTable } from './Table';


/**
 * Get the API URL
 * @param path 
 * @returns 
 */
const getAPIURL = (path: string = '' ) => {
  const paths = [ 
    process.env.REACT_APP_API_URL || 'http://localhost:3100',
    path.replace(/^\//, '')
  ]
  return paths.filter(Boolean).join('/')
}


function App() {
  const [fetchStatus, setFetchStatus] = useState<'' | 'loading' | 'success' | 'failed'>('')
  const [customers, setCustomers] = useState<StripeTOPCustomer[]>([]) 

  /**
   * Fetch API to load customers
   */
  useEffect(() => {
    setFetchStatus('loading')
    fetch(getAPIURL('top_customers'))
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        setFetchStatus('success')
        setCustomers(json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
        setFetchStatus('failed')
      })
  }, [setFetchStatus])

  return (
    <div className="App">
      <Navbar expand="lg">
        <Navbar.Brand>Stripe Customer insights</Navbar.Brand>
      </Navbar>
      <Container>
        {fetchStatus === 'loading' ? 'Loading...' : (
          <CustomerTable customers={customers} />
        )}
      </Container>
    </div>
  );
}

export default App;
