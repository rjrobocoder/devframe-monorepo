import React from "react";
import Layout from "../components/Layout";
import MasonryCards from "../components/MasonryCards";

const HomePage = ({ data }) => {
  return (
    <Layout>
      <MasonryCards data={data}/>
    </Layout>
  );
};

export default HomePage;
