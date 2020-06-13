import React from 'react';
import Card from "./Card";

class Player extends React.Component{

    prevProps = {};
    mini = false;
    name = "";

    constructor(props){
        super();
        this.state = props.data;
        this.mini = props.mini;
        this.prevProps = props.data;
        this.name = (props.playerName !== undefined)?props.playerName:this.prevProps.playerID
    }

    componentDidUpdate(){
        if(this.prevProps.cards !== this.props.data.cards){
            this.prevProps = this.props.data;
            this.mini       = this.props.mini;
            this.setState(this.props.data);
        }
    }

    showCards(){
        let cards = this.state.cards;
        if(cards.length < 1){
            return <h3>When this party finishes you'll be able to play</h3>
        } else {
            return(<ul>
                {cards.map(card => <Card cardKey={card} mini={this.mini}/>)}
            </ul>);
        }
    }

    render(){
        return(<div className={"player"}>
            <h1>{this.name}</h1>
            {this.showCards()}
        </div>);
    }
}

export default Player;