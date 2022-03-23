import React from 'react';
import Dice from './Dice';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {
    const[dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [step, setStep] =React.useState(0)

    React.useEffect(()=>{
      const notHeld = dice.filter(die => !die.isHeld)
      const diceNum  = dice.map(die => die.value)
      if (notHeld.length === 0 && new Set(diceNum).size === 1){
        setTenzies(true)
      }
    },[dice])

     function generateDice(){
       return {
         value:Math.floor(Math.random()*6+1),
         isHeld:false,
         id:nanoid()
       }
     }

      function allNewDice(){
          const diceArr = []
          for(let i = 0;  i < 10 ; i++){
            diceArr.push(generateDice())
          }
          return diceArr
        }

      function holdDice(id){
        setDice(oldDice => oldDice.map(dice => {
          return dice.id === id ? {...dice, isHeld: !dice.isHeld } :
          dice
        }))
        setStep(step+1)
      }

        function rollDice(){
        if (!tenzies){
          setDice(oldDice => oldDice.map(dice => {
            return dice.isHeld ? dice: generateDice()
          }))
        }  else {
          setDice(allNewDice())
          setTenzies(false)
        }

        }


  const diceElements = dice.map(dice =>(<Dice key={dice.id} id={dice.id} value={dice.value} isHeld={dice.isHeld} hold={holdDice}/>));

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
    {tenzies ? (<h2 className='congrats'>You win, Congratulations!<br/>You used {step} steps.<br/>Do better next run?</h2>):
    (<p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>)}
      <div className='dice-box'>
        {diceElements}
      </div>
      <button
        className='roll-button'
        onClick={rollDice}
        >{tenzies? 'New Game' :'Roll'}</button>
      {tenzies && (<Confetti />)}
    </main>
  )

}

export default App;
