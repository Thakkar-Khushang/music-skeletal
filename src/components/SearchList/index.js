import {useState, useEffect} from 'react';
import axios from 'axios';
import {fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HOC from '../HOC';
import SongCard from "../card";
import Grid from '@material-ui/core/Grid';
import "./search.css"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: 30,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

export default function SearchList() {
  let top4 = []
  const classes = useStyles();
  let [responseData, setResponseData] = useState([{}]);
  let [loading, setLoading] = useState(true);
  let [query, setQuery] = useState('')
  useEffect(() => {
      top4 = []
      setLoading(true);
      axios.get(`https://iste-musicapp.azurewebsites.net/api/search?q=${query}`)
      .then((response) => {
          const responseData = response.data;
          setResponseData(responseData);
          setLoading(false);
        },[responseData])
      .catch(error => console.error(`Error:${error}`));
    },[query]);
    if(responseData.length>4){
      var i;
      for (i = 0; i < 4; i++) {
        top4.push(responseData[i]);
      }
    }
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor:"black"}}>
        <Toolbar>
        <HOC/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
              onChange={event => setQuery(event.target.value)}
              placeholder="Search Songs"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          
        </Toolbar>
      </AppBar>
      {query.trim()===''
      ? <></>
      : <div><h1>Most Relevant</h1></div>
      }
      {loading===true
      ? <img id="Loading" src="https://cdn.discordapp.com/attachments/808322477784694825/823870314835869716/giphy.gif" height="50px"/>
      // : query !== '' && responseData.length !== 0
        // ? <div><h1>Most Relevant</h1></div>
        // : <></>
      : responseData.length !== 0
      ? <>
      <Grid
              container
              spacing={4}
              className={classes.gridContainer}
              justify="flex-start">
        {/* {loading === true
        ? <img id="Loading" src="https://cdn.discordapp.com/attachments/808322477784694825/823870314835869716/giphy.gif" height="50px"/>
        :       
        responseData.length === 0
            ? <img id="Find" src="https://cdn.discordapp.com/attachments/808322477784694825/823873449084583956/Group_1.png" width="300vw"/>
            :  */}
            {responseData.length > 4 && query !== ''
            ? top4.map((item) => {
              return <SongCard {...item} key={item._id} /> 
              })
            : responseData.map((item) => {
              return <SongCard {...item} key={item._id} />
            }
        )
        }
        </Grid>
        </>
        : <img id="Find" src="https://cdn.discordapp.com/attachments/808322477784694825/823873449084583956/Group_1.png" width="300vw"/>
}</div>
      
  );
            }
