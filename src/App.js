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
  componentDidMount(){
    this._find_today()
  }
  componentDidUpdate(){
    this._find_today()
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
            return (
              value.date === 1 ? <span className="dates" data-fulldate={value.fulldate} data-month={value.month} key={i}>{value.month}월 {value.date}일</span> : <span className="dates" data-fulldate={value.fulldate} data-month={value.month} key={i}>{value.date}일</span>
            )
          })}
        </section>
        <div>
          오늘은 {this.state.now} 입니다.
        </div>
      </div>
    );
  }

  _get_month = () => {
    const first = new Date(year, month -1 , 1),
          last = new Date(year, month, 0),
          dates = [],
          first_day = first.getDay(),
          last_day = last.getDay()
    for(var be = first_day; be > 0; be--){
      const be_newDate = new Date(year, month -1, 1 - be),
            be_month = be_newDate.getMonth() + 1,
            be_date = be_newDate.getDate(),
            be_fulldate = be_newDate.toLocaleDateString()
      dates.push({month : be_month, date : be_date, fulldate : be_fulldate})
    }
    for(var i = 1; i <= last.getDate(); i++){
      const this_newDate = new Date(year, month -1 , i),
            this_month = this_newDate.getMonth() + 1,
            this_date = this_newDate.getDate(),
            this_fulldate = this_newDate.toLocaleDateString()
      dates.push({month : this_month, date : this_date, fulldate : this_fulldate})
    }
    for(var af = 1; af < 7 - last_day; af++){
      const af_newDate = new Date(year, month, af),
            af_month = af_newDate.getMonth() + 1,
            af_date = af_newDate.getDate(),
            af_fulldate = af_newDate.toLocaleDateString()
      dates.push({month : af_month, date : af_date, fulldate : af_fulldate})
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

  _find_today = () => {
    const getToday = new Date().toLocaleDateString(),
          list = document.querySelectorAll('.dates')
    for(var i = 1; i < list.length; i++){
      list[i].classList.remove('today')
      if(list[i].dataset.fulldate === getToday){
        list[i].classList.add('today')
      }
    }
  }
}

export default App;
