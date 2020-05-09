import React from 'react';

const Word = props => (
  <li>
    Word in English: <strong>{props.english}</strong>
    <br/>
    Translation: <strong>{props.polish}</strong>
  </li>
)

export default Word;