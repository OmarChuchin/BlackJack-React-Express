import React from 'react';
//Diamonds
import AD       from "../assets/cartas/AD.png";
import JD       from "../assets/cartas/JD.png";
import QD       from "../assets/cartas/QD.png";
import KD       from "../assets/cartas/KD.png";
import Dtwo     from "../assets/cartas/2D.png";
import Dthree   from "../assets/cartas/3D.png";
import Dfour    from "../assets/cartas/4D.png";
import Dfive    from "../assets/cartas/5D.png";
import Dsix     from "../assets/cartas/6D.png";
import Dseven   from "../assets/cartas/7D.png";
import Deight   from "../assets/cartas/8D.png";
import Dnine    from "../assets/cartas/9D.png";
import Dten     from "../assets/cartas/10D.png";
//Spades
import AS       from "../assets/cartas/AS.png";
import JS       from "../assets/cartas/JS.png";
import QS       from "../assets/cartas/QS.png";
import KS       from "../assets/cartas/KS.png";
import Stwo     from "../assets/cartas/2S.png";
import Sthree   from "../assets/cartas/3S.png";
import Sfour    from "../assets/cartas/4S.png";
import Sfive    from "../assets/cartas/5S.png";
import Ssix     from "../assets/cartas/6S.png";
import Sseven   from "../assets/cartas/7S.png";
import Seight   from "../assets/cartas/8S.png";
import Snine    from "../assets/cartas/9S.png";
import Sten     from "../assets/cartas/10S.png";
//Hearts
import AH       from "../assets/cartas/AH.png";
import JH       from "../assets/cartas/JH.png";
import QH       from "../assets/cartas/QH.png";
import KH       from "../assets/cartas/KH.png";
import Htwo     from "../assets/cartas/2H.png";
import Hthree   from "../assets/cartas/3H.png";
import Hfour    from "../assets/cartas/4H.png";
import Hfive    from "../assets/cartas/5H.png";
import Hsix     from "../assets/cartas/6H.png";
import Hseven   from "../assets/cartas/7H.png";
import Height   from "../assets/cartas/8H.png";
import Hnine    from "../assets/cartas/9H.png";
import Hten     from "../assets/cartas/10H.png";
//Clovers
import AC       from "../assets/cartas/AC.png";
import JC       from "../assets/cartas/JC.png";
import QC       from "../assets/cartas/QC.png";
import KC       from "../assets/cartas/KC.png";
import Ctwo     from "../assets/cartas/2C.png";
import Cthree   from "../assets/cartas/3C.png";
import Cfour    from "../assets/cartas/4C.png";
import Cfive    from "../assets/cartas/5C.png";
import Csix     from "../assets/cartas/6C.png";
import Cseven   from "../assets/cartas/7C.png";
import Ceight   from "../assets/cartas/8C.png";
import Cnine    from "../assets/cartas/9C.png";
import Cten     from "../assets/cartas/10C.png";
//hidden card
import hiddenCard from "../assets/cartas/red_back.png";

const cardImgs = {
    "AD"    : AD,
    "JD"    : JD,    
    "QD"    : QD,    
    "KD"    : KD,    
    "2D"    : Dtwo,  
    "3D"    : Dthree,
    "4D"    : Dfour, 
    "5D"    : Dfive, 
    "6D"    : Dsix,  
    "7D"    : Dseven,
    "8D"    : Deight,
    "9D"    : Dnine, 
    "10D"   : Dten,  
    "AS"    : AS    ,
    "JS"    : JS    ,
    "QS"    : QS    ,
    "KS"    : KS    ,
    "2S"    : Stwo  ,
    "3S"    : Sthree,
    "4S"    : Sfour ,
    "5S"    : Sfive ,
    "6S"    : Ssix  ,
    "7S"    : Sseven,
    "8S"    : Seight,
    "9S"    : Snine ,
    "10S"   : Sten  ,
    "AH"    : AH    ,
    "JH"    : JH    ,
    "QH"    : QH    ,
    "KH"    : KH    ,
    "2H"    : Htwo  ,
    "3H"    : Hthree,
    "4H"    : Hfour ,
    "5H"    : Hfive ,
    "6H"    : Hsix  ,
    "7H"    : Hseven,
    "8H"    : Height,
    "9H"    : Hnine ,
    "10H"   : Hten  ,
    "AC"    : AC    ,
    "JC"    : JC    ,
    "QC"    : QC    ,
    "KC"    : KC    ,
    "2C"    : Ctwo  ,
    "3C"    : Cthree,
    "4C"    : Cfour ,
    "5C"    : Cfive ,
    "6C"    : Csix  ,
    "7C"    : Cseven,
    "8C"    : Ceight,
    "9C"    : Cnine ,
    "10C"   : Cten
};

const Card = (props) => {

    let cardClass   = (props.mini) ? "mini-carta" : "carta";
    let hidden      =   props.hidden ?? false;

    if(hidden){
        return <li><img className={cardClass} src={hiddenCard} alt="?"/></li>
    }
    return <li><img className={cardClass} src={cardImgs[props.cardKey]} alt={props.cardKey}/></li>
}

export default Card;