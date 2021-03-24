import React from "react";
import axios from 'axios';
import ColorThief from 'colorthief';
import colorContrast from 'color-contrast'
import HOC from '../HOC';
import "./music.css";
export function Song(props) {
  let payload = []
  const [colors, setColors] = React.useState({
    primary: '',
  })
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

  let CapWord = "";
  if(!loading){
    const Name = responseData.name;
    CapWord = "";
    const wordArr = Name.split(" ");
    CapWord = wordArr.map((word) => { 
      return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
  }

  if(loading){
    return <img id="Loading" src="https://cdn.discordapp.com/attachments/808322477784694825/823870314835869716/giphy.gif" height="50px"/>
  }
  else{
    return ( 
      <div className="App">
        <span style={{position:"fixed", left:"0"}}><HOC/></span>
        <div class="music-player">
          <img
            src={responseData.img_url}
            style={{ width: '100vw', height: '100vw', margin:"0 0 0 0", objectFit: 'contain'}}
            alt={CapWord}
          />
        </div>
        <div class="player-text">
          <h2>{CapWord}</h2>
          <h3>{responseData.artist}</h3>
          <audio id="song" controls autoPlay>
            <source src={responseData.song_url} type="audio/mp3" />
          </audio>
          <p id="demo"></p>
        </div>
      </div>
    )
}}