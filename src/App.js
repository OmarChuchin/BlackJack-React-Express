import React,{useState} from 'react';
import Partida from "./components/Partida";
import GIF from "./assets/loading.gif";
import './App.css';

import {BrowserRouter,Route,Switch,NavLink,useHistory} from 'react-router-dom';

const Form = props => {
  const history = useHistory();
  const [partyID, setPartyID] = useState();

  const handleChangePartyID = e => {
    setPartyID(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = '/partida/'+partyID;
    history.push(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      Party ID:
      <input
        type="text"
        value={partyID}
        onChange={handleChangePartyID}
      />
    </form>
  );
};

function Home(){
  return(<div>
    <h1 id="Title">BlackJack 21</h1>
    <div id="Menu">
      <h2>Create a new Party</h2>
      <NavLink to="/crearPartida" activeClassName="is-active"><button className="w3-button w3-black">Play</button></NavLink>
      <h2>Join a Party</h2>
      <Form/>
    </div>
  </div>);
}

//Esta es la IP a cambiar para que funcione
const IPr='18.188.40.128';

const LoadingScreen = props => {
  const url = "http://"+IPr+":8081/crearPartida";
  const history = useHistory();

  const backGroundLoad = ()=>{
    fetch(url,{ method: 'GET',
      cache: "no-cache" })
      .then(res=>res.json())
      .then(resData=>{
        let success = resData.success;
        if(success){
          const newURL = "/partida/"+resData.gameID;
          history.push(newURL);
        } else {
          history.push("/");
        }
      })
      .catch(err =>{
        console.log(err);
      })
  };

  backGroundLoad();


  return(<div>
    <img src={GIF} alt={"Loading"} className="centered"/>
  </div>);
};

function e404(){
  return(
    <div>
      <h1>404</h1>
      <h2>I swear I can explain </h2>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path="/partida/:id" render={props => <Partida url={props.location.pathname} ip={IPr}/>}/>
        <Route path="/crearPartida" component={LoadingScreen}/>
        <Route component={e404}/>;
      </Switch>
    </BrowserRouter>
  );
}

export default App;
