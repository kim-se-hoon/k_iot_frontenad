// generic02.ts

//! 제네릭 제약 조건
// : 타입 매개변수가 특정 조건을 만족해야 함을 명시
// - 제네릭 타입의 사용 범위 제한!

function printLength<T>(age: T): void {
  console.log(arg.length); // Property 'length' does not exist on Type 'T'
}

//? 제약 조건 예시
interface ILength {
  length: number;
}

// T의 타입 변수가 반드시! ILength 인터페이스를 포함하는 타입
// '타입변수' extends '반드시 포함될 타입'
// > 타입 검증이 타입 변수 지정 시에 결정
function consraints<T extends ILength>(arg: T): void {
  console.log(arg.length);
}

// consraints<boolean>(true) // Type 'boolean' does not satisfy the constraint 'ILength'.
// consraints<number>(true) // Type 'number' does not satisfy the constraint 'ILength'.
consraints<string>('안녕하세요'); // 5

console.log(consraints({
  length: 10, // 필수 속성만 명시되어 있으면 가능 - length 속성을 반드시 포함 (구조적 타이핑, 덕 타이핑)
  value: 3,
  addedOption: 'hi'
}));

//? keyof 연산자
// : 개체 속성을 타입으로 간주

type Type = {
  name: string;
  age: number;
}

type Union = keyof Type;
// Union = "name" | "age";
// : 객체 형태의 타입에서 속성만 뽑아 유니온 타입으로 생성해주는 연산자

let keyofValue1: Union = "name"; // 리터럴 타입
let keyofValue2: Union = "age";

//? 조건부 타입
// : 타입 매개변수에 대한 조건 표현식 사용
// - 조건 키워드 사용
type Check<T> = T extends string ? 'String' : 'Not a String'; // 타입에 따라 리터럴 타입을 반환

type Type1 = Check<string>;
type Type2 = Check<number>;

let a: Type1 = 'String'
let b: Type2 = 'Not a String'; // 타입만 보고도 조건을 분기할 수 있음

function checkType<T>(value:T): Check<T> {
  let result = typeof value === 'string' ? ('String' as Check<T>) : ('Not a String' as Check<T>);
  return result;
}

console.log(checkType('문자열 전달')); // Sting
console.log(checkType(500)); // Not a Sting

