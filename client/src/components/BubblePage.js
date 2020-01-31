import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
	const [ colorList, setColorList ] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const logout = e => {
    localStorage.removeItem('token');
		props.history.push('/');
	};
	useEffect(() => {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      setColorList(res.data);
    })
    .catch(err => console.log(`No colors still`, err));
}, []);

  return (
    <div className="BubblePage">
      <div className="BubblePage--colors">
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      </div>
      <button onClick={logout}>Logout</button>
    </div>
    );
};

export default BubblePage;
