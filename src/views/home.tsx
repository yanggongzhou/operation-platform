import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <div>
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
