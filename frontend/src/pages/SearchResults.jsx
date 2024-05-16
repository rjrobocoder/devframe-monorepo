import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import MasonryCards from "../components/MasonryCards";
import axios from "axios";
import { Helmet } from "react-helmet";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_UNSPLASH_API_BASE_URL}/search/photos`,
        {
          params: {
            client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
            per_page: 20,
            query: query,
          },
        }
      );
      setSearchResults(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setPage((prev) => prev + 1);
    try {
      const nextPage = page + 1;
      const response = await axios.get(
        `${process.env.REACT_APP_UNSPLASH_API_BASE_URL}/search/photos`,
        {
          params: {
            client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
            page: nextPage,
            per_page: 20,
            query: query,
          },
        }
      );
      setSearchResults((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Move setLoading outside of try-catch
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
    // Cleanup function
    return () => {};
    // eslint-disable-next-line
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>100+ {query} Pictures | Download Free Images on DevFrame</title>
      </Helmet>
      <Layout>
        <div className="max-w-[1320px] w-full mx-auto px-[20px] pt-[24px]">
          <h1 className="text-[28px] font-bold">{query}</h1>
        </div>
        <MasonryCards data={searchResults} />
        <div className="max-w-[1320px]  mx-auto px-[20px] pt-[48px] pb-[55px]">
          <button
            className="h-[64px] w-full text-[15px] text-[#767676] hover:text-[#000000] leading-[42px] px-[16px] border border-[#d1d1d1] hover:border-[#000000] rounded-[6px]"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      </Layout>
    </>
  );
};

export default SearchResults;
