// interface.ts

//! === 인터페이스(interface) === //
// : 객체(속성, 메서드) 구조를 정의하는 TS 기능
// +) 함수 타입 정의도 가능
// - 컴파일 시점에 타입 체킹을 사용
//    : 다양한 구현체에 동일한 인터페이스 사용으로 일관성과 재사용성 향상

//? cf) 타입 별칭(type alias)
// : 데이터 명시
// - 원시 타입, 유니온, 인터섹션 등의 모든 타입을 별칭으로 지정 가능
type UserType = {
  name: string;
  age: number;
};

//? 1) 인터페이스 구현 방법
// : interface 키워드 사용
// - 인터페이스명은 대문자로 사용
// - 객체의 문법 체계 모두 사용 가능 (옵셔널 ?, 읽기 전용 readonly 등)
interface IUser {
  // 인터페이스명: I+타입명
  // 타입별칭: 타입명Type
  name?: string;
  readonly age: number;

  // 객체 메서드 명시
  // : 메서드명(매개변수: 타입): 반환타입
  greet(message: string): void;
}
let userA: IUser = {
  age : 50,

  // greet(name) {
  //   console.log(`${name} hello ~`);
  // }

  // 메서드 형식은 화살표 함수 권장
  greet: (name) => {
    console.log(`${name} hello ~`);
  }
}

userA.greet('홍길동'); // 홍길동 hello ~

//? 2) 클래스에서 인터페이스 구현
// : interface 키워드 사용
// - 해당 타입을 가지는 클래스 정의
class Student implements IUser {
  // 2) 클래스의 해당 속성이 반드시 초기화 될 것을 "개발자"가 컴파일러에게 안내
  //    > "컴파일러! 내가 책임질게! 나중에 반드시 초기화 될거야"
  //    > Definite Assignment Assertion (확실한 할당 주장) 
  name: string;
  age: number;
  // Property 'name' has no initializer and is not definitely assigned in the constructor.
  // : TS 클래스는 객체 속성이 생성자 내에서 초기화 되지 않으면 오류 발생
  
  // 1) 클래스 필드 초기화 관련 오류 해결: 생성자에서 모두 초기화
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(name: string): void {
    console.log(`Hello1, my name is ${name}`);
    console.log(`Hello2, my name is ${this.name}`);
  }
}
const student1 = new Student('홍길동', 20); // this.name === '홍길동'
student1.greet('홍길서'); // name === '홍길서'
// Hello1, my name is 홍길서
// Hello2, my name is 홍길동

const Student2 = new Student('홍기남', 30);
Student2.greet('홍길북');
// Hello1, my name is 홍길북
// Hello2, my name is 홍기남

//? 인터페이스 확장
// A extends B 키워드
// : A와 B가 같은 형식 (클래스 / 인터페이스)

// cf) A implements B 키워드
// : A와 B가 다른 형식 (A: 클래스, B: 인터페이스)

interface Shape {
  color: string;
}

interface Squatre extends Shape {
  sideLength: number;
  // coler: string; - 해당 속성이 생략된 것 처럼 작동
}

let square1: Squatre = {
  sideLength: 10,
  color: 'red',
}

// === interface vs type alias ===
// 1) interface
// - ectend 키워드로 확장 가능 (A인터페이스 extends B인터페이스)
// - 같은 이름으로 여러 번 선언 가능 (자동 병합)
interface A { a:string;}
interface A { b:string;}
interface A { c:string;} // interface A { a: string; b: string; c: string; } interface A는
// - 객체 형태만! 정의 가능
// - implements 사용 가능 (클래스 구현)
// >> 선언 목적: 구조 중심 객체 설계 

// 2) type alias
// - &(인터섹션, 교차 타입)으로 확장 가능 (A타입별칭 & B타입별칭)
// - 같은 이름으로 여러 번 선언 불가 (오류 발생)
type B = { a:string; }
// type B = { b:string; } // 오류 발생! Duplicate identifier 'B'
// - 원시 타입, 유니온, 인터섹션, 튜플 등 모든 타입 정의 가능
// - implements 사용은 가능 하지만 권장하지 않음
// >> 선언 목적: 타입조합(Uninon, Intersection) 중심 타입 설계