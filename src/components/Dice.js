import React from 'react';

export default function Dice(props){

  return(
    <div className='dice-face'
    style={{backgroundColor: props.isHeld? '#59E391':'#fff'}}
    onClick={()=>props.hold(props.id)}>

    <h2 className='dice-num'>
    {props.value}
    </h2>
    </div>
  )
}
