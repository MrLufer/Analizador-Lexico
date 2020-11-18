import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";


import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container-fluid" style={{background: "linear-gradient(#e66465, #9198e5)"}}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
