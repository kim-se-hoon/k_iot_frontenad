export const tmp = "";

//! === Props (Properties) ===

//? 1. props는 무엇을 전달하기 위한 수단인가?
// A. 부모 → 자식 컴포넌트로 데이터 전달
// 단방향 데이터 흐름: 데이터는 부모에서 자식방향으로만 전달
// 읽기 전용: 자식 컴포넌트는 전달받은 props를 직접 수정 안됨 부모 컨포넌트에 의해 업데이트될 때만 변경
// 재사용성 증가: props를 활용하면 다양한 데이터를 전달하여 하나의 컴포넌트를 여러곳에서 사용할수 있음

// B. 자식 → 부모로 데이터 전달
// C. 전역 상태 공유
// D. 컴포넌트 내부 변수

//? 2. props는 어떤 형태로 컴포넌트에 전달되는가?
// A. 함수의 매개변수
// Props는 부모 컴포넌트가 자식 컴포넌트에 데이터를 전달하는데 사용
// React에서 함수형 컴포넌트는 props를 함수의 매개변수로 받음
// 매개변수는 부모의 컴포넌트에서 전달된 모든 속성을 포함하는 하나의 객체임

// B. 전역 변수
// C. DOM 속성
// D. Redux store

//? 3. TypeScript에서 props의 타입은 보통 어떻게 지정하나?
// A. interface 또는 type
//# interface를 사용하는 예시

// import React from 'react';

// interface UserProfileProps {
//   name: string;
//   age: number;
// }

// const UserProfile: React.FC<UserProfileProps> = ({ name, age }) => {
//   return (
//     <div>
//       <p>이름: {name}</p>
//       <p>나이: {age}</p>
//     </div>
//   );
// };

//# type을 사용하는 예시
// import React from 'react';

// type UserProfileProps = {
//   name: string;
//   age: number;
// };

// const UserProfile: React.FC<UserProfileProps> = ({ name, age }) => {
//   return (
//     <div>
//       <p>이름: {name}</p>
//       <p>나이: {age}</p>
//     </div>
//   );
// };

// B. var
// C. let
// D. class

//? 4. 다음 중 props를 받는 올바른 방식은?

// type Props = { name: string };
// const Hello = (props: Props) => <h1>{props.name}</h1>;

// A. 올바름
// props는 객체의 형태의 TypeScript 타입으로 정의한것

// B. 타입 오류
// C. JSX 문법 오류
// D. props 접근 오류

//? 5. props는 컴포넌트 내부에서 수정할 수 있다. (O/X)
// React에서 props는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 읽기 전용 데이터이므로 자식 컴포넌트 내부에서 전달받은 props는 직접 수정할 수 없습니다.

//? 6. props 기본값을 지정하려면?
// A. defaultProps 사용
//Props의 기본값을 지정하는 방법은 defaultProps를 사용하여 부모 컴포넌트로 부터 props가 전달되지 않았을 때 미리 설정해둔 기본값이 사용됨 보통 매개변수 비구조화 할당시 기본값을 직접 지정하는 방식을 사용

//# 매개변수 비구조화 할당 예시
// const MyComponent = ({ name = '기본 이름' }) => {
//   return <div>안녕하세요, 제 이름은 {name}입니다.</div>;
// };

// B. useState
// C. constructor
// D. export default

//? 7. 구조분해 할당을 이용한 props 접근 예시는?

// const Greeting = ({ name }: { name: string }) => <p>Hello {name}</p>;

// A. 올바름 (✔️)

// B. 문법 오류

//? 8. props로 함수를 전달할 수 있다. (O/X)
// React에서는 props로 함수를 전달할 수 있음 즉 부모 컴포넌트에서 정의한 함수를 자식 컴포넌트에 넘겨서 자식이 그 함수를 실행할 수 있게 하는 방식이 가능함
// function parent() {
//   const handleClick = () => {
//     alert("자식 컴포넌트에서 호출됨!");
//   };

//   return <Child onButtonClick={handleClick} />;
// }

//  자식 컴포넌트
// type ChildProps = {
//   onButtonClick: () => void; // 함수 타입을 props로 받음
// };

// function Child({ onButtonClick }: ChildProps) {
//   return <button onclick={onButtonClick}>클릭</button>;
// }

//? 9. props로 전달된 값은 자식이 변경할 수 없다. (O/X)
// React와 같은 UI 라이브러리에서 props로 전달된 값은 읽기 전용으므로 자식 컴포넌트에서 직접 변경할수 없음

//? 10. props는 “읽기 전용(read-only)”이다. (O/X)
// React에서 props(properties)는 컴포넌트 간에 데이터를 전달하는데 사용되며 읽기 전용 속성을 가지고 있음 주요 특징으로는
// 수정 불가: 부모 컴포넌트로부터 자식 컴포넌트로 전달된 props 데이터는 자식 내에서 직접 수정할 수 없습니다 단반향 데이터 흐름을 유지함
// 데이터 업데이트: 자식 컴포넌트에서 props값을 변경해야 한다면 부모 컴포넌트가 상태(state)를 변경하여 새로운 props를 전달하는 방식으로 업데이트 진행해야함
