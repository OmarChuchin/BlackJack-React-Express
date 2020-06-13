import React from "react";
import Player from "./Player";

const cardsValues = {
    "A"     : 11,
    "2"     : 2,
    "3"     : 3,
    "4"     : 4,
    "5"     : 5,
    "6"     : 6,
    "7"     : 7,
    "8"     : 8,
    "9"     : 9,
    "10"    : 10,
    "J"     : 10,
    "Q"     : 10,
    "K"     : 10,
}

class Partida extends React.Component{

    myPlayer = 0;

    constructor(props){
        super();
        this.state = {
            "idGame"    :   props.url.substr("/partida/".length),
            "ip"        :   props.ip
        };
    }
  
    componentDidMount(){
        // console.log(this.state);
        // console.log(this.myPlayer);
    }

    componentWillMount(){
        fetch(`http://${this.props.ip}:8081/unirse-partida?id=${this.state.idGame}`)
        .then(res=>res.json())
        .then(resData=>{
            // console.log(resData);
            this.myPlayer = resData.players.length - 1;
            this.setState(resData);
            // console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    // componentWillUnmount(){

    // }

    getScore(){
        let score = 0;
        let numAces = 0;
        let cartas = this.getPlayer(this.myPlayer).cards;
        cartas.forEach(card=>{
            let valueOfCard = card.charAt(0);
            const zeroPosition = card.charAt(1);
            if(zeroPosition === "0"){
                valueOfCard += zeroPosition;
            }
            score += cardsValues[valueOfCard];
            if(valueOfCard === "A"){
                numAces++;
            }
        });
        while(score>21 && numAces>0){
            numAces--;
            score -= 10;
        }
        return score;
    }
  
    pedirCarta=(e)=>{
        e.preventDefault();
        let valueOfMyCards = this.getScore();
        if(valueOfMyCards>=21){//You cannot ask for more cards
            window.alert(`Your Score is ${valueOfMyCards}\nYou cannot ask for more`);
        } else {
            fetch(`http://${this.props.ip}:8081/pedirCarta`,{
            method:'POST',
            body:JSON.stringify({
                partyID   :   this.state.idGame,
                playerID  :   this.myPlayer
            }),
            headers:{
                'Content-Type':'application/json'
            }
            }).then(res=>res.json())
            .then(resData=>{
                if(resData.notYourTurn === undefined){
                    this.setState(resData);
                }
                else {
                    window.alert("It is not your turn");
                    this.setState(resData.game);
                }
            })
            .catch(err=>{
                console.log(err);
            });
        }
    };

    getPlayers(){
        return this.state.players;
    }

    getPlayer(player){
        return this.getPlayers()[player];
    }

    getHouse(){
        return {playerID : "The House", cards : this.state.houseCards};
    }

    terminarTurno = (e)=>{
        e.preventDefault();
        const url = "http://"+this.state.ip+":8081/terminarTurno";
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                partyID   :   this.state.idGame,
                playerID  :   this.myPlayer
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then(resData=>{
            this.setState(resData);
        })
        .catch(err=>{
            console.log(err);
        });
    };

    reiniciarPartida = (e) => {
        e.preventDefault();
        const url = "http://"+this.state.ip+":8081/resetParty";
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                partyID   :   this.state.idGame,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then(resData=>{
            if(resData.reset !== undefined){
                this.setState(resData.game);
            } else {
                window.alert(`Cannot reset the game because someone is still playing.
                \nClick "Finish Turn" if you want to update the screen."`);
                this.setState(resData);
            }
        })
        .catch(err=>{
            console.log(err);
        });
    }
    
    render(){
        if(this.getPlayers() === undefined){
            return(
                <div>
                    <h1>Esto es un Partida Wahoo!!!</h1>
                    <button onClick={this.pedirCarta}>Pedir una Carta</button>
                </div>
            )
        } else {
            return(
                <div>
                    <h1 id={"Title"}>BLACKJACK 21</h1>
                    {/* La casa */}
                    <Player data = {this.getHouse()} mini={true}/>
                    {/* El jugador */}
                    <button onClick={this.pedirCarta}>Pick a Card</button>
                    <button onClick={this.terminarTurno}>Finish Turn</button>
                    <button onClick={this.reiniciarPartida}>Reset the Game</button>
                    <Player data={this.getPlayer(this.myPlayer)} mini={false} playerName={"You"}/>
                    {/* Los demas */}
                    <h2>All players</h2>
                    <div id="Players"><ul>{this.getPlayers().map(player => <li><Player data={player} mini={true}/></li>)}</ul></div>
                </div>
            )
        }
    }
}

export default Partida;