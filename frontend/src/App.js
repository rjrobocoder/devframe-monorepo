import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_UNSPLASH_API_BASE_URL}/photos?page=${page}`,
        {
          params: {
            client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
            per_page: 50, // Number of photos per page
          },
        }
      );
      setData((prev) => [...prev, ...response.data]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Cleanup function
    return () => {
      // Cancel the request if component unmounts before completion
      // (optional, but can prevent memory leaks)
    };
  }, [page]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/s/photos/:query" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
