import React from 'react'

//! 렌더링(Rendering)
// : 작성한 코드를 화면에 출력하는 기능
// - React가 코드(JSX/TSX)를 실제 브라우저 화면(UI)로 바꾸는 과정

// cf) React는 데이터(state, props)가 변경되면 필요한 부분만 다시 렌더링
//    > 화면 전체가 아니라 변경된 컴포넌트만 효율적으로 갱신! (재렌더링)

interface ItemType {
  // 여행 짐 싸기
  // : 짐 항목의 이름, 준비 완료 여부
  name: string;
  isPacked: boolean;
}

//! 자식 컴포넌트
function Item({name, isPacked}: ItemType) {
  // 로그인 성공 시: 토큰 반환 + 로그인 성공 상태 반환
  let isLogged = false; //true로그인 됨(로그아웃버튼 나타남) false 로그아웃 됨(로그인 버튼 나타남) 

  //? 조건부 렌더링
  // : 조건에 따라 UI를 다르게 보여주는 방법
  // - if문: 가장 명확, JSX 안에서 사용 불가 (return 위에서 처리)
  // - 삼항연산자: JSX 안에서 표현 가능, 한 줄로 간결
  // - 논리 연산자: "조건이 참인 경우에만 and", "조건이 거짓인 경우에만 and"

  //@ 1. if 조건문을 사용한 조건부 렌더링
  //? react의 JSX는 괄호가 문법적 요소로 사용 - return문 위에서 작성
  // if (isPacked) {
  //   return (
  //     <li>{name} ✔️</li>
  //   )
  // } else {
  //   return (
  //     <li>{name}</li>
  //   )
  // }

  //@ 2. 삼항 연산자를 사용한 조건부 렌더링
  // 조건 ? 참일 경우 : 거짓일 경우
  // return (
  //   <li>{isPacked ? name + '✔️' : name}</li>
  // )

  //@ 3. 논리 연산자를 사용한 조건부 렌더링
  return (
    <li>
      {/* 
        == 논리 연산자 A && B ==
        : 모든 값이 true여야 true값 반환
        - A가 false면 B값 출력 안됌
        - A가 true면 B값 출력 됨
      */}
      {name} {isPacked && '✔️'}
      {isLogged && '이승아님 안녕하세요'}
      <button>{isLogged ? '로그아웃' : '로그인'}</button>

    </li> 
  )
}

function I_Rendering() {
  //! 배열 렌더링
  // : 배열 렌더링 시 map() 메서드를 사용
  // - 리액트는 return문 안에서 JSX 요소들의 배열을 랜더링
  // > 순회한 후 데이터 값이 있어야 element에 데이터 전달

  // cf) forEach()는 단순 반복 실행만 하고 리턴값이 없음!
  const people = ['홍길동', '홍기남', '홍기범', '홍기열', '홍남아']

  const pepleDescription = [
    {
      id: 0,
      name: '홍길동',
      job: '괴도'
    },
    {
      id: 1,
      name: '홍길서',
      job: '경찰'
    },
    {
      id: 2,
      name: '홍길남',
      job: '은행직원'
    },
    {
      id: 3,
      name: '홍길북',
      job: '괴도'
    },
    {
      id: 4,
      name: '홍길여',
      job: '경찰'
    },
  ];

  //@ map 콜백함수를 사용한 배열 렌더링
  // : 요소 개수 변화 안됌
  // - 전체 내용 렌더링
  const listItems = people.map ((person, index) => {
    return <li key={index}>{person}</li>
  });

  //@ filter 콜백함수를 사용한 배열 렌더링
  // : 요소 개수 변화가 가능함
  // - 조건에 따른 렌더링
  const businessPeople = pepleDescription.filter(person => person.job === '괴도');

  const businessPeopleRender = businessPeople.map(person => <li key={person.id}>{person.name}</li>);

  //! === React 렌더링 시 key 속성 === //
  // : React에서 배열의 각 항목을 식별하고 성능을 최적화하기 위해 사용
  // -map()을 통해 여러 요소를 렌더링할 때
  // , key는 React가 어떤 항목이 변경, 추가 또는 삭제 되었는지 파악하는 용도로 사용
  //? 같은 배열 내에서 유일 (데이터의 PK값을 주로 사용)

  return (
    <div>
      <p>여행용 짐 목록</p>
      <Item name='과자' isPacked={true} />
      <Item name='음료수' isPacked={false} />

      <hr />
      <p>Map을 사용한 전체 리스트 렌더링</p>
      <ul>{listItems}</ul>

      <hr />
      <p>Filter를 사용한 조건부 렌더링</p>
      <ul>{businessPeopleRender}</ul>
    </div>
  )
}

export default I_Rendering