import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import Card from './Card';


const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}


// let Box = ({color}) => (<div class="boxes" style={{backgroundColor: color}} />);

class MemoryGame extends Component {
  // static defaultProps = {
  //   colors: ['#128c7e', '#ff4500', '#3f4d51', '#d55548', ' #4a154b', '#42704f', '#fcb643', '#409092',
  //            '#128c7e', '#ff4500', '#3f4d51', '#d55548', ' #4a154b', '#42704f', '#fcb643', '#409092']
  // }

  constructor(props){
    super(props);
    let cards = [
      {id: 0,  cardState: CardState.HIDING, backgroundColor:'#128c7e'},
      {id: 1,  cardState: CardState.HIDING, backgroundColor:'#128c7e'},
      {id: 2,  cardState: CardState.HIDING, backgroundColor:'#ff4500'},
      {id: 3,  cardState: CardState.HIDING, backgroundColor:'#ff4500'},
      {id: 4,  cardState: CardState.HIDING, backgroundColor:'#3f4d51'},
      {id: 5,  cardState: CardState.HIDING, backgroundColor:'#3f4d51'},
      {id: 6,  cardState: CardState.HIDING, backgroundColor:'#d55548'},
      {id: 7,  cardState: CardState.HIDING, backgroundColor:'#d55548'},
      {id: 8,  cardState: CardState.HIDING, backgroundColor:'#4a154b'},
      {id: 9,  cardState: CardState.HIDING, backgroundColor:'#4a154b'},
      {id: 10, cardState: CardState.HIDING, backgroundColor:'#42704f'},
      {id: 11, cardState: CardState.HIDING, backgroundColor:'#42704f'},
      {id: 12, cardState: CardState.HIDING, backgroundColor:'#fcb643'},
      {id: 13, cardState: CardState.HIDING, backgroundColor:'#fcb643'},
      {id: 14, cardState: CardState.HIDING, backgroundColor:'#409092'},
      {id: 15, cardState: CardState.HIDING, backgroundColor:'#409092'}
    ]
    cards = this.shuffle(cards);
    this.state = {cards, noClick: false}
    this.handleClick   = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  shuffle(arg) {
     let copy = [...arg];
     for(var i = 0 ; i<= 10; i++) {
        let random = Math.floor( Math.random() * copy.length),
              rand = Math.floor( Math.random() * copy.length);
        copy.splice(rand, 0, ...copy.splice(random, 1));
    }
     return copy;
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
        ...c, cardState : CardState.HIDING
    }));
    cards =  this.shuffle(cards);
    this.setState({cards});
  }
  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if(idsToChange.includes(c.id)) {
          return {
          ...c, cardState : newCardState
          }
        }
        return c;
      })
    }

    const foundCard = this.state.cards.find(c => c.id === id);

    if(this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    const showingCards = cards.filter((c) => c.cardState
   === CardState.SHOWING);

   console.log(cards, 'cards')
   const ids = showingCards.map(c => c.id);
  console.log(ids, 'ids')
   if(showingCards.length === 2
      && showingCards[0].backgroundColor === showingCards[1].backgroundColor){
        cards = mapCardState(cards, ids, CardState.MATCHING)
      } else if(showingCards.length === 2) {
        let hidingCards = mapCardState(cards, ids, CardState.HIDING);

        noClick = true;

        this.setState({cards, noClick}, () => {
          setTimeout(() => {
            this.setState({cards: hidingCards, noClick:false
            }

        )}, 1300)
        })

        return;
      }

      this.setState({cards, noClick});
    // this.setState(prevState => {
    //   let cards = prevStat e.cards.map(c => (
    //    c.id === id ?
    //    {...c, cardState: c.cardState === CardState.HIDING  ? CardState.MATCHING :  CardState.HIDING
    //    } : c
    //  ))
    //  return {cards};
    // })

  }

  render() {
    const cards = this.state.cards.map((card) => (
      <Card key={card.id}
            showing={card.cardState !== CardState.HIDING}
            backgroundColor={card.backgroundColor}
            onClick={() => this.handleClick(card.id)}/>
    ));

    return (
        <div className="App">
        <Navbar onNewGame={this.handleNewGame}/>
          {cards}
        </div>
      );
  }
}
export default MemoryGame;
