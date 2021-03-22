import {useEffect,useState,Fragment} from "react"
import axios from 'axios';
export function Search(props) {
  let [responseData, setResponseData] = useState('');
  let [title, setTitle] = useState('')
useEffect(() => {
    axios.get(`https://iste-musicapp.azurewebsites.net/api/songs/search?q=${title}`)
    .then((response) => {
        const responseData = response.data;
        setResponseData(responseData);
      },[responseData])
    .catch(error => console.error(`Error:${error}`));
  },[title]);
  console.log(responseData);
    return ( 
        <Fragment>
            <input type="text" onChange={event => setTitle(event.target.value)} />
            <h1>{responseData[0].name}</h1>
        </Fragment>

    )
}