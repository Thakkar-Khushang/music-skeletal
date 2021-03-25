import React from "react";
import axios from 'axios';
import analyze from 'rgbaster';
import colorContrast from 'color-contrast'
import HOC from '../HOC';
import "./music.css";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
export function Song(props) {
  let [playing, setPlaying] = React.useState(true);
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

    var img = document.createElement('img');
    img.setAttribute('src',responseData.img_url);
    const x = async () => {
      const results = await analyze(img)
      let primary = results[0].color
      let secondary
      for (let i = 1; i < results.length; i++) {
        secondary = results[i].color
        if (colorContrast(primary, secondary) >= 7) {
          break
        }
      }
      setColors({
        primary,
        secondary,
      })

      // setTertiaryColor(result[2].color)
    }
    x()
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
        <div className="player-text">
          <h2>{CapWord}</h2>
          <h3>{responseData.artist}</h3>
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