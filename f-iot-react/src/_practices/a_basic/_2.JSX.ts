export const tmp = '';

//! === JSX 문법 ===

//? 1. JSX는 무엇의 조합인가?
// A. JavaScript + XML
// JSC(JavaScript XML)는 React(리액트)에서 UI를 만들기 위해 자바스크립트를 확장한 문법

// B. JSON + XML
// C. Java + XAML
// D. JS + CSS

//? 2. JSX를 사용하기 위해 반드시 React를 import 해야 하나요?
// A. 예전에는 필요했지만, React 17 이후는 필요 없음
// React17이전에는 JSX를 호출로 변환했기 때문에 JSX문법을 사용하는 모든 파일에서 명시적으로 작성 해야했지만 17버전 부터 새로운 트랜스폼이 도입되어 가져오지 않아도 사용가능

// B. 항상 필요하다
// C. JSX는 React와 무관하다
// D. import 안 하면 자동 추가됨

//? 3. JSX에서 여러 요소를 반환할 때 어떻게 감싸야 하는가?
// A. <div> 또는 <> </>
// JSX는 자바스크립트 객체로 변환되는데 여러개의 최상위 객체를 반환할 수 없기 때문에 여러 요소를 반환할 때는 반드시 하나의 루트 요소로 감싸야 합니다.

// B. <p>
// C. <section>만 가능
// D. 여러 개 그대로 반환

//? 4. JSX 안에서 JavaScript 표현식을 사용할 때는?
// A. { }
// 중괄호 사용 
// const User = {
//   firstName: '홍',
//   lastName: '길동'
// };


// B. ( )
// C. [ ]
// D. < >

//? 5. JSX 내 class 속성은 어떤 이름으로 사용해야 하는가?
// A. class
// B. css

// C. className
// JSX는 JavaScript의 확장 문법이므로 class는 JavaScript에서 클래스를 정의 하는데 사용하는 예약어 이기 때문에 충돌 방지를 위해 사용함

// D. style

//? 6. JSX 내에서 주석을 쓰는 방법은?
// A. // comment
// 단일행 주석

// B. /* comment */
// 복수형 주석

// C. {/* comment */}
// JSX내에서 사용하는 주석

// D. <!-- comment -->

//? 7. JSX는 반드시 하나의 루트 요소만 반환해야 한다. (O/X)
// JSX는 반드시 하나의 최상위(루트)요소를 반환해야 하는 규칙이 있음 이는 JSX가 함수 호출로 변환되어 하나의 단일객체를 반환하기 때문 만약 여러 요소를 반환해햐 할때에는 <div>같은 부모요소로 감싸거나 DOM에 추가적인 노드를 만들지 않는 꺽쇠괄호(Fragment)를 사용해야함

//# <div> 반환 예시
// return (
//   <div>
//     <h1>Hello</h1>
//     <p>World</p>
//   </div>
// );

//# 꺽쇠괄호 (Fragment) 반환 예시
// return (
//   <>
//     <h1>Hello</h1>
//     <p>World</p>
//   </>
// );



//? 8. JSX에서 조건문을 직접 if 문으로 쓸 수 있다. (O/X)
// JSX 안에서는 표현식만 쓸 수 있음 사용할려면 JSX 밖에서 if문 사용
// 대신 삼항 연산자를 사용하거나 논리 연산자를 사용함

//# if문 사용 예시

// let content;
// if (isLogin) {
//   content = <p>환영합니다!</p>;
// } else {
//   content = <p>로그인해주세요.</p>;
// }
//   return <div>{content}</div>;

//# 삼항 연산자 사용 예시

// return (
//   <div>
//   {isLogin ? <p>환영합니다.</P> : <p>로그인해주세요.</P>}
//   </div>
// );

//# 논리 연산자 사용 예시
// return (
  //   <div>
  //     {isLogin && <p>환영합니다</P>}
  //   </div>
  // );
  
// 논리 연산자는 참일때만 표시해서 (로그인 해주세요가 없음) 거짓이면 아무것도 나타나지가 않음 나타 나게 할려면 삼항 연산자를 사용해야함 그래야 참일때 '환영합니다' 거짓일때 '로그인해주세요'가 나옴


//? 9. JSX 안의 태그는 반드시 닫혀야 한다. (O/X)
// JSX는 JavaScript + XML 형태라서 모든 태그는 반드시 닫혀야함 HTML처럼 빈 태그도 슬래시로 닫기(/)

//# 닫는 태그 예시
// return (
//   <div>
//     <p>안녕하세요!</p>
//     <img src="logo.png" />
//     <br />
//   </div>
// );


//? 10. JSX에서는 속성 이름이 camelCase를 따른다. (O/X)
// JSX는 JavaScript 문법 기반이기에 HTML처럼 소문자 대신 camelCase(카멜 표기법)을 사용해야함

//# camelcase(카멜 표기법) 사용한 예시
// <div 
//   className="box" 
//   onClick={handleClick}
//   >
//   <input 
//   type="text" 
//   placeholder="입력하세요" 
//   />
//   <button disabled={true}>버튼</button>
// </div>

//# camelcase(카멜 표기법) 잘못 사용한 예시
// <div class="box" onClick="handleClick()">
// 중괄호 꼭 넣기