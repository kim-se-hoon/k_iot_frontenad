export const tmp = '';

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

//? 6. props 기본값을 지정하려면?
// A. defaultProps 사용
// B. useState
// C. constructor
// D. export default

//? 7. 구조분해 할당을 이용한 props 접근 예시는?

// const Greeting = ({ name }: { name: string }) => <p>Hello {name}</p>;


// A. 올바름
// B. 문법 오류

//? 8. props로 함수를 전달할 수 있다. (O/X)

//? 9. props로 전달된 값은 자식이 변경할 수 없다. (O/X)

//? 10. props는 “읽기 전용(read-only)”이다. (O/X)