import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComLayout from "@/components/layout";

const Home = () => {
  return <div>
    <ComLayout/>
    This is Home Page!!
    <br/>
    Jump to:
    <Link to="/login" style={{ padding: 5 }}>
      login
    </Link>

    <div className="App">
    </div>

  </div>;
};

export default Home;
