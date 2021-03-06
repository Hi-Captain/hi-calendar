import React, { Component } from 'react';
import './App.css';

// new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);

let today = new Date(),
    month = today.getMonth() + 1,
    year = today.getFullYear(),
    days = ['일', '월', '화', '수', '목', '금', '토']

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
 
  componentDidMount(){
    this._get_month()
  }
  componentDidUpdate(){
    //Update 될 때, .today, .click을 다시 찾아주지 않으면 기존에 있던 자리에 그대로 남아있게 된다.
    this._find_today()
    this._click_date()
  }
  render() {
    return (
      <div className="App">
        <header>
          <div className="nowView">{this.state.thisYear}년 {this.state.thisMonth}월</div>
          <nav>
            <button className="btn prevBtn" onClick={this._prev_month}> &lt; </button>
            <button className="btn todayBtn" onClick={this._back_today}> Today </button>
            <button className="btn nextBtn" onClick={this._next_month}> &gt; </button>
          </nav>
        </header>
        <section>
          <div className="days">
            {days.map((value, i) => {
              return <span className="day" key={i}>{value}</span>
            })}
          </div>
          <div className="main">
            {this.state.thisDates.map((value, i) => {
              return (
                <span className={value.include ? "dates include" : "dates others"} 
                      onClick={this._click_date}
                      data-fulldate={value.fulldate} 
                      data-month={value.month}
                      key={i}>
                  {value.date === 1 ? value.month + '월 ' : ''}<b>{value.date}</b>일
                </span>
              )
            })}
          </div>
        </section>
        {/* <div>
          오늘은 {this.state.now} 입니다.
        </div> */}
      </div>
    );
  }

  _get_month = () => {
    const first = new Date(year, month -1 , 1),
          last = new Date(year, month, 0),
          dates = [],
          first_day = first.getDay(),
          last_day = last.getDay()
    for(var be = first_day; be > 0; be--){ //첫째 주 이전 달 부분 
      const be_newDate = new Date(year, month -1, 1 - be),
            be_month = be_newDate.getMonth() + 1,
            be_date = be_newDate.getDate(),
            be_fulldate = be_newDate.toLocaleDateString()
      dates.push({month : be_month, date : be_date, fulldate : be_fulldate})
    }
    for(var i = 1; i <= last.getDate(); i++){ // 이번달 부분
      const this_newDate = new Date(year, month -1 , i),
            this_month = this_newDate.getMonth() + 1,
            this_date = this_newDate.getDate(),
            this_fulldate = this_newDate.toLocaleDateString()
      dates.push({month : this_month, date : this_date, fulldate : this_fulldate, include: true})
    }
    for(var af = 1; af < 7 - last_day; af++){ // 마지막 주 다음달 부분
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

  _prev_month = () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    month = today.getMonth() + 1
    year = today.getFullYear()
    this._get_month()
  }

  _next_month = () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
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
  
  _click_date = (e) => {
    const list = document.querySelectorAll('.dates')
    for(var i = 1; i < list.length; i++){
      list[i].classList.remove('click')
    }
    if(e){
      e.target.classList.add('click')
      console.log("선택한 날짜는 " + e.target.dataset.fulldate + " 입니다.")
    }
  }
}

export default App;

/* 키보드 화살표로 달력 전환 */
document.addEventListener("keydown", keyPress);
function keyPress(e) {
  const value = e.key
  const prev = document.querySelector(".prevBtn")
  const next = document.querySelector(".nextBtn")

  if(value === 'ArrowLeft' || value === 'ArrowUp'){
    prev.click();
    console.log('방향키로 이전 달(月)로 이동했습니다.')
  } else if (value === 'ArrowRight' || value === 'ArrowDown') {
    next.click();
    console.log('방향키로 다음 달(月)로 이동했습니다.')
  }
}