import React, { Component } from 'react';
import './App.css';

// new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);

let today = new Date(),
    month = today.getMonth() + 1,
    year = today.getFullYear()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      now : today.toLocaleDateString(),
      thisYear : year,
      thisMonth : month,
      thisDates : []
    }
  }
 
  componentWillMount(){
    this._get_month()
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div>{this.state.thisYear}년 {this.state.thisMonth}월</div>
            <button onClick={this._prev_month}> ← </button>
            <button onClick={this._back_today}> Today </button>
            <button onClick={this._next_month}> → </button>
          </nav>
        </header>
        <section>
          {this.state.thisDates.map((value, i) => {
            return <span key={i}>{value}</span>
          })}
        </section>
        <div>
          오늘은 {this.state.now} 입니다.
        </div>
      </div>
    );
  }
  _get_month = () => {
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const dates = []
    for(var i = 1; i <= last.getDate(); i++){
      i === 1 ? dates.push(month + '월' + i + '일') : dates.push(i + '일')
    }
    this.setState({
      thisYear : year,
      thisMonth : month,
      thisDates : dates
    })
  }

  _next_month = () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    month = today.getMonth() + 1
    year = today.getFullYear()
    this._get_month()
  }

  _prev_month = () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    month = today.getMonth() + 1
    year = today.getFullYear()
    this._get_month()
  }

  _back_today = () => {
    today = new Date()
    month = today.getMonth() + 1
    year = today.getFullYear()
    this._get_month()
  }
}

export default App;
