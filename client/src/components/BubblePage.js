import React, { useState, useEffect } from "react";
 

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../util/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

 useEffect(() => {
   axiosWithAuth()
   .get("/colors")
   .then(res => setColorList(res.data))
   .catch(err => console.log("ERR", err))
 }, [])


 const logOut = (e) => {
  e.preventDefault();
  localStorage.clear("token");
  window.location.reload(false);
};

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <button onClick={logOut}>LogOut</button>
    </>
  );
};

export default BubblePage;
