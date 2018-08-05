# hi-calendar
Make Calendar width React

### 달력 만들기

> 2018.08.03
  - title : 초기 설정
  - content : create-react-app 생성, Date() 활용 월별 날짜 생성
  - idea : 역시나.. 쉽게 생각했지만 쉽지 않앗다.
           일단 시작은 해야될 것 같아서 월별 날짜를 가져오는 것 까진 정리가 됬는데,
           요일별로 나누는 걸 어떻게 시작하면 좋을지 감이 잘 오지 않는다.
           구글링을 조금 해봐야겠다.

> 2018.08.04
  - title : 달력 출력
  - content : .getDay()로 요일을 확인한 후 일주일을 채우기 위해서 이전 달, 다음 달의 몇일이 필요한지 확인.
              for문으로 이전 달에서 필요한 날, 다음 달에서 필요한 날 산출해서 배열에 담기.
              for문에서 dates 배열 요소를 담을 때 fulldate, month, date를 키로 가지는 객체를 담았는데,
              fulldate는 today를 받아내기 위해서, month는 1일날 해당 월 받기 위해서, date는 일자 출력을 위해서 담았다.
              랜더가 진행 되어야 today를 찾을 수 있어서 componentDidMount 에 find_today,
              상태가 변경 될 때 today class가 원래 있떤 순서에 그대로 남아 있어서, componentDidUpdate 에도 find_today..
              (Q : 이거 해결할려면 어떻게 빌드를 해야되지...?)
  - idea : 7일 단위로 끊는 일이 생각보다 많이 어려웠다. 7개씩 row를 묶어서 반환을 해야되는건지, 일주일치를 채워서 달력을 구성해야될지,
           이전 달과 다음 달에 대한 날짜도 받아와야 할지, 그냥 해당 월에 대한 날짜만 구성하면 될지,
           머리로는 뭔가 그려질것 같은데 도대체 이걸 어떻게 구현시켜야 되는 걸까 참 오랫동간 고민했던 것 같다.
           결과적으로는 클린코드, DRY코드 이런 것들 신경쓰지 않고 일단은 적어도 구현만 시켜보자는 생각으로 필요한 작업은 다 한 것 같다.
           기능은 어느정도 정리가 됬으니 이제 css를 다듬고나서 나머지 필요한 것들을 더 고민해 보자.

> 2018.08.05
  - title : CSS 추가
  - content : 해당 월이 아닌 부분은 연하게 표현하기 위해서 get_month 2번째 for문에서 넘기는 객체에 include 추가.
              클릭하면 해당 fulldate 콘솔에 출력.
              CSS 정리
  - idea : (지난 Q에 대한 A : 이미 get_month에서 상태를 변환시키니깐 componentDidMount에서 find_today가 필요가 없었다.)
           원래는 이런 모양을 기획했던건 아닌데, 작업할 때 날짜를 확인하려고 맥북 달력을 참고하다보니,
           자연스럽게 맥 달력을 벤치마킹 만들게됬다.
           코드 한 번 훑어보고 마무리 작업하자.

> 2018.08.05
  - title : 마무리 정리
  - content : 클릭한 날짜 표시. 
              키보드로 달력 전환.
              CSS일부 수정.
  - idea : 달력 전환하는 함수도.. get_month에서 for문 돌아가는 부분도.. 
           분명히 DRY 한 코드가 아닌건 알겠는데, 어떻게 클린 코드로 리팩토링 해야될지 아직은 감이 잘 잡히지 않는다.
           find_today하는 부분도, 동기적으로 getMonth다음에 실행하면 될 것도 같은데..
           일단은 이렇게 마무리 짓고 다음 업데이트 때, 아쉬웠던 부분들 추가해서 보완하자.
           그리고 충분히 공부할 것. ('promise, async/await' 부분 더 공부해 볼 것)