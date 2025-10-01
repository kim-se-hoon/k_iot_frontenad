// main.js
//! 자바스크립트 파일 확장자: .js

// cf) 주석
// 단축키: ctrl + /

// 1) 한 줄 주석: //
// 2) 여러줄 주석: /**/

// JS의 주석 입니다.
/*
JS의
여러 줄
주석입니다.
*/

// 기능
// : 버튼을 클릭하면 새로운 이름을 입력받는 창이 생성, 작성된 이름으로로 버튼 내의 Player 명이 변경

// 현재 웹 문서에서 button 태그를 찾아 저장
// ? query(질문하다)Selector(선택자를)
const button = document.querySelector('button');

// 저장된 변수에 클릭 이벤트 추가
// 변수명.기능();
// >> 객체의 속성/메서드 사용 .연산자 사용
// ? add(더하다)EventListner(이벤트읽기를)
button.addEventListener('click', updateName);

// updateName: 새로운 이름을 입력받고 버튼을 수정하는 기능
// 사용자 정의 함수
function updateName() {

  const name = prompt('새로운 이름을 입력해주세요.')
  
  button.textContent = `player 1: ${name}`;

  
}

// ! 플러그인 설치
// - 코드 스니펫(JavaScript (ES6) code snippets) 설치
// >> JS 단축키 제공

// clg: console.log();
// >> 출력문(콘솔 창 출력)
//     - 간단한 코드, 결과값 출력 (개발자 친화적 코드)
// >> [개발자 도구(f12, ctrl + shift + i)] - [Consle(콘솔)]
console.log('안녕하세요');

// fun
function name(params) {
  
}

// fof
for (const item of object) {
  
}

// fin
for (const item in object) {
  
}

// imp
// import moduleName from 'module';