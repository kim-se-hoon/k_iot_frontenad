import React, { useState, useEffect } from "react";
// React에서 화면을 만들 때 꼭 가져와야 하는 기본 도구
// useState, useEffect는 React가 제공하는'훅(Hook)'이라는 특별한 기능임  
// Hook이란? - 함수형 컴포넌트(Functional Component)가 클래스형 컴포넌트(Class Component)의기능을 사용 할 수 있도록 해주는' 특별한 기능임
// useState → 상태(값)을 저장하고 바꿀 때 사용
// useEffect → 화면이 처음 켜질 때나 값이 바뀔 때 어떤 일을 자동으로 시키는 기능

// 아래는 각각의 리액트 예제 파일을 불러오는 코드
// 예를 들어 State01 파일 안에는 useState를 사용하는 예제가 들어있음 
import State01 from "./a_useState/State01";
import State02 from "./a_useState/State02";
import State03 from "./a_useState/State03";
import State04 from "./a_useState/State04";
import State05 from "./a_useState/State05";
import State06 from "./a_useState/State06";

// useRef 예제들
import Ref01 from "./b_useRef/Ref01";
import Ref02 from "./b_useRef/Ref02";
import Ref_Practice01 from "./b_useRef/Practice01";
import Ref_Practice02 from "./b_useRef/Practice02";

// useEffect 예제들
import Effect01 from "./c_useEffect/Effect01";
import Effect02 from "./c_useEffect/Effect02";
import Effect_Practice01 from "./c_useEffect/Practice01";

// CollapsibleSection은 "눌렀을 때 열리고 닫히는 박스"를 그려주는 컴포넌트임
// 이걸 아래에서 여러 번 재사용함
import CollapsibleSection from "@/components/CollapsibleSection";
import A_UseCallback from "./d_callback_memo/A_UseCallback";
import B_UseMemo from "./d_callback_memo/B_UseMemo";
import Reducer01 from "./e_useReducer/Reducer01";
import Reducer02 from "./e_useReducer/Reducer02";
import Custom01 from "./f_custom/Custom01";
import Custom02 from "./f_custom/Custom02";
import Custom03 from "./f_custom/Custom03";
import ToggleSection from "@/components/ToggieSection";
import TodoAppLocalStorage from "@/_practices/c_hooks/TodoAppLocalStorage";
import Webcam from "./Webcam";

// Index 컴포넌트: 이 파일의 주인공 함수
// 모든 리액트 훅(useState, useRef, useEffect)을 모아서 보여주는 페이지
function Index() {
  // === [1] 섹션 데이터 목록 만들기 ===
  // 화면에 표시할 '리액트 훅' 종류를 배열로 모아둠
  // title은 제목, contents는 안에 들어갈 컴포넌트들
  const sectionsData = [
    {
      title: "1️리액트 Hooks - useState", // 첫 번째 섹션 이름
      contents: [<State01 />, <State02 />, <State03 />, <State04 />, <State05 />, <State06 />], // 해당 예제들
    },
    {
      title: "️2리액트 Hooks - useRef", // 두 번째 섹션 이름
      contents: [<Ref01 />, <Ref02 />, <Ref_Practice01 />, <Ref_Practice02 />], // 해당 예제들
    },
    {
      title: "️3리액트 Hooks - useEffect", // 세 번째 섹션 이름
      contents: [<Effect01 />, <Effect02 />, <Effect_Practice01 />], // 해당 예제들
    },
    {
      title: "️4리액트 Hooks - useEffect", // 네 번째 섹션 이름
      contents: [<A_UseCallback />, <B_UseMemo/>], // 해당 예제들
    },
    {
      title: "️5리액트 Hooks - useEffect", // 다섯 번째 섹션 이름
      contents: [<Reducer01 />, <Reducer02/> ], // 해당 예제들
    },
    {
      title: "️6리액트 Hooks - useEffect", // 여섯 번째 섹션 이름
      contents: [<Custom01 />, <Custom02 />, <Custom03 />], // 해당 예제들
    },
    {
      title: "️7리액트 Hooks - Todo", // 일곱 번째 섹션 이름
      contents: [<TodoAppLocalStorage />], // 해당 예제들
    },
    {
      title: "️8리액트 Hooks - Webcam", // 일곱 번째 섹션 이름
      contents: [<Webcam />] // 해당 예제들
    },
  ];

  // === [2] 어떤 섹션이 열려 있는지를 기억하는 상태 ===
  // 예를 들어 openIndex가 0이면, 첫 번째 섹션만 열려있다는 뜻!
  // 처음엔 아무것도 열려 있지 않게 null로 시작함
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // === [3] 화면이 처음 켜질 때 자동으로 최신 섹션을 열기 ===
  // useEffect는 "특정 상황에서 자동으로 동작하는 코드"를 넣는 곳임
  // 여기서는 sectionsData의 개수가 바뀌면 (보통 3개) → 마지막(최신) 섹션을 열게 함
  useEffect(() => {
    setOpenIndex(sectionsData.length - 1); // 마지막 섹션의 인덱스 번호를 계산해서 열어줌
  }, [sectionsData.length]); // ← 이 값이 바뀌면 위 코드가 자동으로 다시 실행됨

  // === [4] 섹션을 클릭했을 때 열고 닫는 기능 ===
  // 사용자가 섹션 제목을 클릭하면 이 함수가 실행됨
  // 만약 이미 열려 있던 섹션을 다시 누르면 닫히고,
  // 다른 섹션을 누르면 새로 열림!
  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    // prev는 이전 상태 (현재 열려 있는 번호)
    // 같으면 null(닫기), 다르면 새로운 번호로 바꾸기
  };

  // === [5] 실제 화면에 보여줄 부분 (JSX 영역) ===
  return (
    // 전체를 감싸는 큰 상자 div
    <div style={{ fontFamily: "Pretendard, sans-serif" }}>
      {/* 큰 제목 */}
      <h1
        style={{
          background: "linear-gradient(90deg, #111, #333)", // 검은색 그라데이션
          color: "#fff", // 글씨는 하얀색
          padding: "12px 16px", // 안쪽 여백
          borderRadius: "6px", // 모서리를 둥글게
        }}
      >
        === 리액트 Hooks ===
      </h1>

      {/* 섹션들을 하나씩 반복해서 보여줌 */}
      <div style={{ marginTop: "12px" }}>
        {sectionsData.map((section, i) => (
          // CollapsibleSection: 클릭하면 열리고 닫히는 박스
          <CollapsibleSection
            key={i} // React가 각각을 구분할 수 있게 고유한 번호
            title={section.title} // 제목 전달
            isOpen={openIndex === i} // 현재 열린 섹션과 번호가 같으면 열기
            onToggle={() => handleToggle(i)} // 클릭 시 실행될 함수 전달
          >
            {/* contents 안에 들어있는 컴포넌트(State01 등)를 전부 보여줌 */}
            {section.contents.map((Component, idx) => (
              <div key={idx} style={{ marginBottom: "16px" }}>
                {/* 실제 컴포넌트 */}
                {Component}

                {/* 각 예제 사이에 줄(hr) 넣기 (마지막은 빼기) */}
                {idx !== section.contents.length - 1 && <hr />}
              </div>
            ))}
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
}

// 다른 파일에서 이 Index를 불러올 수 있게 내보내기
export default Index;
