import React, { useMemo, useState, memo } from "react";

/*
  === useMemo + React.memo 예제 ===

  📘 목표:
    1. useMemo로 "복잡한 계산"을 기억해두기
    2. React.memo로 "컴포넌트 자체"를 기억해두기
       -> 토글을 닫았다가 다시 열어도, 기억된 결과를 유지하도록

  🔍 개념 요약:
    - useMemo: "값 계산"을 기억해둠 (ex. 계산기 결과)
    - React.memo: "컴포넌트 자체"를 기억해둠 (ex. 화면 모양)
*/

//! 복잡한 계산 함수
// : 시간이 오래 걸리는 연산을 흉내 내기 위한 예시
const expensiveCalc = (num: number) => {
  console.log("💭 계산 시작...");
  for (let i = 0; i < 999999999; i++) {} // (의미 없는 반복문으로 딜레이)
  return num + 100;
};

//!  실제 계산 컴포넌트
// : React.memo()로 감싸서, props가 바뀌지 않으면 다시 렌더링 안 됨
const CalcDisplay = memo(({ count }: { count: number }) => {
  /*
      useMemo 역할:
      - count가 바뀔 때만 expensiveCalc() 실행
      - count가 같다면 이전 결과를 그대로 사용
  */
  const memoizedResult = useMemo(() => {
    const result = expensiveCalc(count);
    return result;
  }, [count]);

  return (
    <div>
      <h4>🔢 계산 결과 (Count + 100): {memoizedResult}</h4>
    </div>
  );
});


//! 메인 컴포넌트
function B_UseMemo_Optimized() {
  // 상태값 2개
  const [count, setCount] = useState<number>(0); // 숫자 상태
  const [text, setText] = useState<string>("");  // 텍스트 상태

  return (
    <div
      style={{
        background: "#f7f7f7",
        padding: "16px",
        borderRadius: "10px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <h3>=== useMemo + React.memo (토글 유지 버전) ===</h3>

      {/* count를 변경하면 memoizedResult가 다시 계산됨 */}
      <p>⏲️ Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+ 증가</button>

      {/* ⚙️ 실제 계산 표시 */}
      <CalcDisplay count={count} />

      <hr />

      {/* 텍스트 입력 */}
      <p>📑 아래 입력창은 계산과 상관없어요!</p>
      <input
        type="text"
        placeholder="여기에 글 써보세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>입력값: {text}</p>
    </div>
  );
}

export default B_UseMemo_Optimized;
