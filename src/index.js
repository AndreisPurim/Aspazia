import React from 'react';
import ReactDOM from 'react-dom';


import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import nlp from 'compromise'
import plg from 'compromise-syllables'
nlp.extend(plg)

let RiTa = require('rita');

function Title(){
  return(
    <Grid item xs={12} style={{textAlign:'center'}} >
      <Typography variant="h3" style={{borderBottom: '1px solid black', textAlign:'center'}}>
        iAmbic
      </Typography>
      <Typography variant="subtitle1">
        Hello! This is an online iambic, rhyme and sillable detector. I created it in lunchtime because there were no other tools available.
      </Typography>
      <Typography variant="subtitle1">
        It uses <a href="https://rednoise.org/rita/index.html">RiTa</a> for detecting patterns. If you like this tools and have suggestions for it, please <a href="andreis.lv">contact me</a>
      </Typography>
    </Grid>
  )
}

// function Main2(){
//   let doc = nlp('Chocolate microscopes?')
//   doc.compute('syllables')
//   console.log(doc.terms())
//   return(<h1>Hey</h1>)
// }

function Main(){
  const [poem,setPoem] = React.useState({
    text: "Her curt emotional abuse research",
    syllables: RiTa.syllables("Her curt emotional abuse research").split(" "),
    syl_num: RiTa.syllables("Her curt emotional abuse research").split(" ").map((word)=>{return word.split("/").length}),
    stresses: RiTa.stresses("Her curt emotional abuse research").split(" "),
  });
  const changePoem=(event)=>{
    setPoem({
      text: event.target.value,
      syllables: RiTa.syllables(event.target.value).split(" "),
      syl_num: RiTa.syllables(event.target.value).split(" ").map((word)=>{return word.split("/").length}),
      stresses: RiTa.stresses(event.target.value).split(" ")
    });
  }
  function color(i){
    switch(poem.stresses[i]){
      case '0': return {color: 'black'}
      case '1': return {color: 'red'}
      default: return {color: 'yellow'}
    }
  }
  console.log(poem)
  // console.log(nlp('Chocolate microscopes?').terms().syllables())
  // {poem.syl_num[i]===1?
  //   <span style={color(i)}>{word}</span>
  // :
  //   word
  // }       
              // word
  return(
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Title />
      <Grid item xs={6}>
        <TextField value={poem.text} onChange={changePoem} fullWidth multiline rows={30} label="Your poem here!"/>
      </Grid> 
      <Grid item xs={6}>
        {poem.text.split("\n").map(line=><p>{
          line.split(" ").map(
            function(word,i){
              return <span style={color(i)}>{word} </span>
            }
        )}</p>)}
      </Grid>
    </Grid>
  )
}
ReactDOM.render(<Main />,document.getElementById('root'));
