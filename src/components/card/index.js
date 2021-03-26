import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import './card.css';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
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
  export default function SongCard(props) {
    const classes = useStyles();
    const Name = props.name;
    let CapWord = "";
    const wordArr = Name.split(" ");
    CapWord = wordArr.map((word) => { 
      return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
    
    return (   
        
        <Grid item xs={6} sm={4} md={3} style={ { display: "flex", justifyContent: "space-around"} }>
        
        <Card style={{backgroundColor: "black"}} className={classnames("card",classes.root)}>
        <Link to={{pathname:`/songs/${props._id}`}}>
            <CardMedia
              component="img"
              alt={props.name}
              className={classnames("album-art",classes.media)}
              image={props.img_url}
              title={props.name}
            />
           </Link>
           <Link to={{pathname:`/songs/${props._id}`}}>
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
              {CapWord}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {props.artist}
              </Typography>
            </CardContent>
          </Link>
          </Card>
         
        </Grid>
        
    )
    }