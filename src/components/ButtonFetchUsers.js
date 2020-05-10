import React from 'react';

const ButtonFetchUsers = props => {
  return ( 
    <button style={{padding: '10px 20px',
                    margin: '20px',
                    border: '2px solid black',
                    backgroundColor: 'white'}} 
            onClick={props.click}>
            Add 5 users
    </button>
  );
}
 
export default ButtonFetchUsers;