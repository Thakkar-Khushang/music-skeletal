import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import analyze from 'rgbaster';
import colorContrast from 'color-contrast'
import HOC from '../HOC';
import "./music.css";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
export function Song(props) {

  let [playing, setPlaying] = React.useState(true);
  const [dom, setDom] = React.useState('');
  const [audio,setAudio] = React.useState("");
  let [responseData, setResponseData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function togglePlay() {
    let audio = document.getElementById("song");
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }
  
  

  React.useEffect(() => {
    axios.get(`https://iste-musicapp.azurewebsites.net/api${props.match.url}`)
    .then((response) => {
      const responseData = response.data;
      setResponseData(responseData);
      setAudio(responseData.song_url);
      setLoading(false);
      
    })
    .catch(error => console.error(`Error:${error}`));
    
  }, [])
  

  let CapWord = "";
  
  if(loading){
    return <img id="Loading" src="https://cdn.discordapp.com/attachments/808322477784694825/823870314835869716/giphy.gif" height="50px"/>
  }
  else{
    // fetchColors();
    analyze(responseData.img_url).then(results => {
      let secondary
      for (let i = 1; i < results.length; i++) {
        secondary = results[i].color
        if (colorContrast(secondary, 'rgb(255,255,255)') >= 7) {
          setDom(secondary);
          break;
        }
      }
    });
    console.log(`The dominant color is ${dom}`);
    const Name = responseData.name;
    CapWord = "";
    const wordArr = Name.split(" ");
    CapWord = wordArr.map((word) => { 
      return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
    return ( 
      <div className="App" style={{backgroundColor: dom}}>
        <span style={{position:"fixed", left:"0"}}><HOC/></span>
        <div className="music-player">
          <img
            src={responseData.img_url}
            style={{ width: '100vw', height: '100vw', margin:"0 0 0 0", objectFit: 'contain'}}
            alt={CapWord}
          />
        </div>
        <div className="player-text">
          <h2>{CapWord}</h2>
          <h3>{responseData.artist}</h3>
          
          <button onClick={togglePlay}>
          {playing
            ?<PauseIcon fontSize="large" className="btn" id="playBtn" style={{display:"inline"}}/>
            :<PlayArrowIcon fontSize="large" className="btn" id="pauseBtn" style={{display:"inline"}}/>}
          </button>
          <p id="demo"></p>
        </div>
      </div>
    )
}}