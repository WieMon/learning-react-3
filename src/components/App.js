import React, {Component} from 'react';
import './App.css';
import SwitchButton from './SwitchButton';
import Word from './Word';
import ButtonFetchUsers from './ButtonFetchUsers';
import UserList from './UserList';

//Project 2
const data = [
  {
    id: 1,
    title: 'Title 1',
    body: 'Text 1'
  },
  {
    id: 2,
    title: 'Title 2',
    body: 'Text 2'
  }
]

setInterval(() => {
  const index = data.length + 1;
  data.push({
    id: index,
    title: `Title ${index}`,
    body: `Text ${index}`
  })
  //console.log(data);
}, 8000)

//Project 5
const API = 'https://randomuser.me/api/?results=1';

class App extends Component {
  state = {
    time: 0,               //Project 1
    active: false,         //Project 1
    comments: [...data],   //Project 2
    words: [],             //Project 3
    isLoaded: false,       //Project 3
    users: [],             //Project 4
    users2: []           //Project 5
  }

  //Project 1
  handleClick = () => {
      if(this.state.active) {
        clearInterval(this.idInterval)
      } else {
        this.idInterval = setInterval(() => this.addSecond(), 1000)
      }

      this.setState({
        active: !this.state.active
      })
    }

  addSecond = () => {
    this.setState({
      time: this.state.time + 1
    })
  }

  //Project 2
  getData = () => {
    //console.log('aktualizacja');
    if(this.state.comments.length !== data.length) {
      this.setState({
      comments: [...data]
    })
    } else {console.log('data the same - no actualization')}
  }

  /*componentDidMount() {
    this.idI = setInterval(this.getData, 5000)
  }*/ //cannot be two 'componentDidMount'

  /*componentWillUnmount() {
    clearInterval(this.idI)
  }*/

  //Project 3
  /*componentDidMount() {
    //setTimeout(this.fetchData, 3000)
    fetch('data/words.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          words: data.words,
          isLoaded: true
        })
      })
  }*/

  //Project 4
  componentDidMount() {
    // this.requestData()
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

    // xhr.onload = () => {
    //   console.log(xhr.status);
    //   if (xhr.status === 200) {
    //     const users = JSON.parse(xhr.response)
    //     console.log(users);
    //     this.setState({ users })
    //   }
    //   // console.log(typeof xhr.response);
    // }

    xhr.addEventListener('load', () => {
      //console.log(xhr.status);
      if (xhr.status === 200) {
        const users = JSON.parse(xhr.response)
        //console.log(users);
        this.setState({ users })
      }
    })
    xhr.send(null)
  }

  //Project 5
  handleDataFetch = () => {
    // console.log("click");
    fetch(API)
      .then(response => {
        if (response.ok) {
          // console.log(response);
          return response;
        }
        throw Error(response.status)
      })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        const user2 = data.results
        this.setState(prevState => ({
          users2: prevState.users2.concat(user2)
        }))

      })
      .catch(error => console.log(error + " sth is wrong"))
  }


  render() {
    const comments = this.state.comments.map(comment => (
      <div key={comment.id}>
        <h4>{comment.title}</h4>
        <div>{comment.body}</div>
      </div>
    ))
    const words = this.state.words.map(word => (
      <Word key={word.id} 
            english={word.en}
            polish={word.pl} />
    ))
    const users = this.state.users.map(user => (
      <div key={user.id}>
        <h4>{user.name}</h4>
        <p>{user.city}</p>
      </div>
    ))
    const users2 = this.state.users2;
    return (
      <div>
        <div className='app'>
          <p>{this.state.time}</p>
          <SwitchButton click={this.handleClick} active={this.state.active}/>
        </div>

        <div className='app'>
          {comments.reverse()}
        </div>

        <ul>
          {this.state.isLoaded ? words : 'Uploading data'}
        </ul>

        <div>
          {users}
        </div>

        <div>
          <ButtonFetchUsers click={this.handleDataFetch} />
          {users2.length > 0 ? <UserList users={users2} /> : users2}
        </div>
      </div>
     
    )
  }
}

export default App;
