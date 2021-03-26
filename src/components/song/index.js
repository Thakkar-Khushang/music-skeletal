import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import colorContrast from 'color-contrast';
import analyze from 'rgbaster';
import HOC from '../HOC';
import "./music.css";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { Pause } from "@material-ui/icons";
import WaveSurfer from 'wavesurfer.js';

export function Song(props) {
  let payload = []
  let [playing, setPlaying] = React.useState(true);
  const [dom, setDom] = React.useState('');
  const [cont, setCont] = React.useState('');

  function togglePlay() {
    let audio = document.getElementById("song");
    if (playing) {
      document.getElementById("playBtn").style.display = "inline";
      document.getElementById("pauseBtn").style.display = "none";
      audio.pause();
    } else {
      document.getElementById("playBtn").style.display = "none";
      document.getElementById("pauseBtn").style.display = "inline";
      audio.play();
    }
    setPlaying(!playing);
  }
  
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
  
  const fetchColors = async () => {
    const results = await analyze('https://ia801908.us.archive.org/4/items/mbid-31cecd61-fac6-4632-b1d0-4c71cee49ea8/mbid-31cecd61-fac6-4632-b1d0-4c71cee49ea8-26741963134.jpg', {ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']});

    let dom = results[2].color;

    for(let i = 1; i < results.length; i++) {
      let contrast = results[i].color;
      if(colorContrast(dom, contrast) >= 4.5) {
        setCont(contrast);
        break;
      }
    }

    console.log(`The dominant color is ${dom} and it's contrast is ${cont}`);
  }

  fetchColors();
  
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
        <div className="music-player">
          <img
            src={responseData.img_url}
            style={{ width: '100vw', height: '100vw', margin:"0 0 0 0", objectFit: 'contain'}}
            alt={CapWord}
          />
        </div>
        <div className="player-text" style={{backgroundColor: cont}}>
          <h2 style={{color: dom}}>{CapWord}</h2>
          <h3 style={{color: dom}}>{responseData.artist}</h3>
          <button onClick={togglePlay}>
            <PlayArrowIcon fontSize="large" className="btn" id="playBtn" />
            <PauseIcon fontSize="large" className="btn" id="pauseBtn" />
          </button>
          <audio id="song" autoPlay>
            <source src={responseData.song_url} type="audio/mp3" />
          </audio>
          <p id="demo"></p>
        </div>
      </div>
    )
}}