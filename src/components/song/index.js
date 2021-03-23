import React from "react";
import axios from 'axios';
import "./music.css";
export function Song(props) {
  let [responseData, setResponseData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // const {id} = props.match.url;
    axios.get(`https://iste-musicapp.azurewebsites.net/api${props.match.url}`)
    .then((response) => {
      const responseData = response.data;
      setResponseData(responseData);
      setLoading(false);
    })
    .catch(error => console.error(`Error:${error}`));
  }, [])
  
  if(loading){
    return("Data is Loading")
  }
    return ( 
      <>
      <img
        src={responseData.img_url}
        style={{ maxWidth: '300px', maxHeight: '300px', margin:"5em 0 0 0"}}
        alt={responseData.name}
      />
      <h2>{responseData.name}</h2>
      <h3>{responseData.artist}</h3>
      <audio id="song" controls autoplay>
        <source src={responseData.song_url} type="audio/mp3" />
      </audio>
      <p id="demo"></p>
      </>
    )
}