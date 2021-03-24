import './App.css'
import React, { useEffect, useState, useRef } from 'react'
import analyze from 'rgbaster'
import WaveSurfer from 'wavesurfer.js'
import colorContrast from 'color-contrast'
// import Wavesurfer from 'react-wavesurfer'
// import 'wavesurfer.js'

function App() {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [playing, setPlay] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [colors, setColors] = useState({
    primary: '',
    secondary: '',
  })
  // const image = '/jaden.png'
  const image = '/presk.jpg'
  const url = '/jaden.mp3'
  useEffect(() => {
    setPlay(false)

    const formWaveSurferOptions = (ref) => ({
      container: ref,
      // waveColor: colors.primary,
      waveColor: colors.secondary,
      progressColor: colors.primary,
      cursorColor: colors.primary,
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      height: 150,
      // If true, normalize by the maximum peak instead of 1.0.
      normalize: true,
      // Use the PeakCache to improve rendering speed of large waveforms.
      partialRender: true,
    })
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WaveSurfer.create(options)

    wavesurfer.current.load(url)

    wavesurfer.current.on('ready', function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume)
        setVolume(volume)
      }
    })

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy()
  }, [])

  useEffect(() => {
    const x = async () => {
      const results = await analyze(image)
      let primary = results[0].color
      let secondary
      // let secondary = results[1].color
      // console.log(result)
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
  }, [])

  const handlePlayPause = () => {
    setPlay(!playing)
    wavesurfer.current.playPause()
  }

  return (
    <div className="App" style={{ backgroundColor: colors.primary }}>
      <header className="App-header">
        <img src={image} className="App-logo" alt="art" />
        <div
          ref={waveformRef}
          style={{ width: '25vw', paddingTop: '3rem', paddingBottom: '3rem' }}
        />
        <div
          style={{
            background: colors.secondary,
            fontSize: '2rem',
            border: '1px solid transparent',
            color: colors.primary,
            height: '60px',
            width: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.25rem',
            borderRadius: '50%',
          }}
          onClick={handlePlayPause}
        >
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-pause"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-play"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
