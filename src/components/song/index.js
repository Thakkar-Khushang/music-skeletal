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
import useSound from 'use-sound';

export function Song(props) {
  let payload = []
  let [playing, setPlaying] = React.useState(false);
  const [dom, setDom] = React.useState('');
  const [cont, setCont] = React.useState('');
  
  function togglePlay() {
    if (playing) {
      stop();
    } else {
      play();
    }
        
      setPlaying(!playing);
  }
        
  let [responseData, setResponseData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [play, {stop}] = useSound(responseData.song_url);
        
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
    const fetchColors = async () => {
      const results = await analyze(responseData.img_url, {ignore: ['rgb(255, 255, 255)', 'rgb(0,0,0)']});
  
      let dom = results[0].color;
      let white = '#ffffff'
  
      for(let i = 1; i < results.length; i++) {
        let contrast = results[i].color;
        if(colorContrast(white, contrast) >= 4.5) {
          setCont(contrast);
          break;
        }
      }
    }
  
    fetchColors();
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
          <h2>{CapWord}</h2>
          <h3>{responseData.artist}</h3>
          <button onClick={togglePlay}>{playing 
          ? <PauseIcon fontSize="large" className="btn" />
          : <PlayArrowIcon fontSize="large" className="btn" />}
          </button>
          {/* <audio id="song" autoPlay>
            <source src={responseData.song_url} type="audio/mp3" />
          </audio> */}
          <p id="demo"></p>
        </div>
      </div>
    )
}}