import React, {Component} from 'react';
import './App.css';
import SwitchButton from './SwitchButton';

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
  console.log(data);
}, 8000)


class App extends Component {
  state = {
    time: 0,
    active: false,
    comments: [...data]
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
    console.log('aktualizacja');
    if(this.state.comments.length !== data.length) {
      this.setState({
      comments: [...data]
    })
    } else {console.log('data the same - no actualization')}
  }

  componentDidMount() {
    this.idI = setInterval(this.getData, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.idI)
  }

  render() {
    const comments = this.state.comments.map(comment => (
      <div key={comment.id}>
        <h4>{comment.title}</h4>
        <div>{comment.body}</div>
      </div>
    ))
    return (
      <div>
        <div className='app'>
          <p>{this.state.time}</p>
          <SwitchButton click={this.handleClick} active={this.state.active}/>
        </div>

        <div className='app'>
          {comments.reverse()}
        </div>
      </div>
     
    )
  }
}

export default App;
