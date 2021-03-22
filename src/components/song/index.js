import React from "react";
import axios from 'axios';
export function Song(props) {
  let [responseData, setResponseData] = React.useState('');
  React.useEffect(() => {
    // const {id} = props.match.url;
    axios.get(`http://localhost:4000/api/${props.match.url}`)
    .then((response) => {
      const responseData = response.data;
      setResponseData(responseData);
    })
    .catch(error => console.error(`Error:${error}`));
  }, []) 
    return ( 
        //Insert MusicPLayer Sundari Code
        <h1></h1>
    )
}