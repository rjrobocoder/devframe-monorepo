import React from "react";
import Layout from "../components/Layout";
import MasonryCards from "../components/MasonryCards";
import { Helmet } from "react-helmet";

const HomePage = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>Beautiful Free Images &amp; Pictures | DevFrame</title>
      </Helmet>
      <Layout>
        <MasonryCards data={data} />
      </Layout>
    </>
  );
};

export default HomePage;
