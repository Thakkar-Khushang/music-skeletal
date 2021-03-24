import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
export default function HOC(){
    const history = useHistory();
    const handleClick = () =>{
        history.goBack();
    }
    return (
        <>
        <IconButton aria-label="search" color="default" onClick = {handleClick}  style={{color:"white"}}>
              <ArrowBackIcon/>
        </IconButton>
        </>
    )
}