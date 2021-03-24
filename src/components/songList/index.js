import SongCard from "../card";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import './card.css';
import classnames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function SongList() {
    const classes = useStyles();
    let [responseData, setResponseData] = useState([{}]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://iste-musicapp.azurewebsites.net/api/songs`)
        .then((response) => {
            const responseData = response.data;
            setResponseData(responseData);
            setLoading(false)
        },[responseData])
        .catch(error => console.error(`Error:${error}`));
    },[]);
    if(loading){
      return  <img id="Loading" src="https://cdn.discordapp.com/attachments/808322477784694825/823870314835869716/giphy.gif" height="50px"/>
    }
    else{
    return (
       
        <div className={classes.root}>
            
          <AppBar position="static">
              <Toolbar  className="navbar" disableGutters>
              <img src="https://i.pinimg.com/originals/dd/ca/b7/ddcab749bde82b971c58cc6e80c462e4.jpg" height="50px"></img>
              <h3 id="home">
                  Home
              </h3>
              <Link to={{pathname:`/search`}}>
              <IconButton aria-label="search" color="inherit" style={{paddingRight:"30px"}}>
                  <SearchIcon  />
              </IconButton>
              </Link>
              </Toolbar>
          </AppBar>
          <Grid
              
              container
              spacing={4}
              className={classes.gridContainer}
              justify="flex-start">
        {responseData.map((item) => {
            return <SongCard {...item} key={item._id} /> 
        }
        )}
        </Grid>
        </div>
      ) 
    }}