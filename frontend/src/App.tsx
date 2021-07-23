import { useCallback, useEffect, useState } from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { StripeTOPCustomer } from "./interfaces";
import { CustomerTable } from "./Table";

/**
 * Get the API URL
 * @param path
 * @returns
 */
const getAPIURL = (path: string = "", queryString: string = "") => {
  const paths = [
    process.env.REACT_APP_API_URL || "http://localhost:3100",
    path.replace(/^\//, ""),
  ];
  const api = paths.filter(Boolean).join("/");
  if (!queryString) return api;
  return `${api}?${queryString}`;
};

function App() {
  const [fetchStatus, setFetchStatus] = useState<
    "" | "loading" | "success" | "failed"
  >("");
  const [customers, setCustomers] = useState<StripeTOPCustomer[]>([]);

  const fetchAPI = useCallback(
    async (avoidCache = false) => {
      const api = getAPIURL(
        "top_customers",
        avoidCache ? `avoid-cache-key=${Math.random() * 100}` : ""
      );
      setFetchStatus("loading");
      fetch(api)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setFetchStatus("success");
          setCustomers(json);
        })
        .catch(function (ex) {
          console.log("parsing failed", ex);
          setFetchStatus("failed");
        });
    },
    [setCustomers, setFetchStatus]
  );
  /**
   * Fetch API to load customers
   */
  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return (
    <div className="App">
      <Navbar expand="lg">
        <Navbar.Brand>Stripe Customer insights</Navbar.Brand>
        <div className="mr-auto" />
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            fetchAPI(true);
          }}
        >
          <Button variant="outline-primary" type="submit">
            Re fetch
          </Button>
        </Form>
      </Navbar>
      <Container>
        {fetchStatus === "loading" ? (
          "Loading..."
        ) : (
          <CustomerTable customers={customers} />
        )}
      </Container>
    </div>
  );
}

export default App;
