import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear("token");
    window.location.reload(false);
  };

  return (
    <Router>
      <button onClick={logOut}>LogOut</button>
      <div className="App">
        
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/protected" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;

/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */
