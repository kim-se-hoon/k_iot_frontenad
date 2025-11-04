import React, { useEffect, useState } from 'react'
// React 라이브러리에서 필요한 기능을 불러옴
// useState: "값을 저장하고 바꾸는 기능"
// useEffect: "특정 시점에 자동으로 실행되는 기능"

/*
  🌟 useEffect 사용할 때 주의해야 할 점 🌟
  1️⃣ 의존성 배열 누락
      - useEffect 안에서 쓰는 값(state, props 등)은 반드시 deps(의존성 배열)에 써줘야 함!
  2️⃣ 무한 렌더링 루프
      - useEffect 안에서 setState를 잘못 쓰면 화면이 계속 새로고침됌 (⚠️ 조심!)
  3️⃣ 비동기 함수 직접 전달 금지
      - useEffect(async () => {...}) ❌
      - 대신 안에서 async 함수 만들어서 호출하기 ✅
*/

// 🎯 우리가 만들 것은 “푸드트럭 예약 관리 화면”임
// 관리자가 예약 목록을 보고, 버튼으로 승인/취소를 할 수 있음.

/*
  기능 요약 🧩
  1️⃣ 예약 목록 불러오기 (처음 화면 켤 때 1번만 실행)
  2️⃣ 30초마다 자동으로 새로고침 (서버에 새 데이터 확인)
  3️⃣ 예약 상태 변경 버튼 (승인 / 취소)
  4️⃣ 로딩 중 / 에러 / 정상 상태 구분해서 보여주기
  5️⃣ useEffect의 정리(clean-up)로 메모리 낭비 막기
*/

// ========================
// ✨ 1. 데이터 타입 정의 ✨
// ========================

// 예약 상태: "대기중 / 승인됨 / 취소됨" 세 가지 중 하나만 가능
type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

// 예약 한 건의 정보 구조 (객체 형태)
type Reservation = {
  id: number;                   // 예약 고유 번호 (각각 다른 숫자)
  customer_name: string;        // 고객 이름
  truck_name: string;           // 예약한 푸드트럭 이름
  time_slot: string;            // 예약 시간대 (예: 12:30 PM)
  status: ReservationStatus;    // 현재 예약 상태
}

// =============================
// ✨ 2. API 주소 (가짜 데이터) ✨
// =============================
// 지금은 진짜 서버가 없으니까, 임시로 JSONPlaceholder 무료 API를 사용!
// 진짜로는 ~/api/v1/reservations 이런 REST API 주소를 쓸 거임
const API_URL = "https://jsonplaceholder.typicode.com/users";

// =============================
// ✨ 3. 메인 컴포넌트 시작 ✨
// =============================
function Practice01() {

  // === [1] 예약 목록 저장할 변수 ===
  // 처음엔 비어있는 배열([]), 나중에 fetch로 받아온 데이터 넣음
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // === [2] 로딩 중 표시 상태 ===
  // API 요청할 때 true, 끝나면 false
  const [loading, setLoading] = useState<boolean>(false);

  // === [3] 에러 메시지 저장 상태 ===
  // 요청 중 오류가 났을 때 메시지 보여주기용
  const [error, setError] = useState<string | null>(null);

  // =============================
  // ✨ 4. 예약 데이터를 가져오는 함수 ✨
  // =============================
  const fetchReservations = async () => {
    setLoading(true);   // “로딩 중...” 표시 켜기
    setError(null);     // 에러 초기화 (이전 오류는 지움)

    try {
      // API 서버로 데이터 요청
      const response = await fetch(API_URL);

      // 응답 코드가 정상(200~299)이 아니면 에러 발생시킴
      if (!response.ok) {
        throw new Error(`HTTP 에러! 상태코드: ${response.status}`);
      }

      // 응답을 JSON 형태로 바꾸기
      const data = await response.json();

      // 우리가 필요한 구조(Reservation)에 맞게 변환하기
      const mappedData: Reservation[] = data.slice(0, 5).map((item: any, idx: number) => ({
        id: item.id, // mock id
        customer_name: item.name, // 고객 이름
        truck_name: `Truck-${idx + 1}`, // 트럭 이름 예시
        time_slot: `12:${idx}0 PM`, // 예: 12:00, 12:10, 12:20 ...
        status: idx % 2 === 0 ? "PENDING" : "CONFIRMED" // 홀짝에 따라 상태 다르게
      }));

      // 화면에 표시될 예약 목록 저장
      setReservations(mappedData);
      setLoading(false); // 로딩 끝!
    } catch (e) {
      // 에러 발생 시
      setLoading(false);
      setError((e as Error).message); // 에러 메시지 저장
    }
  };

  // =============================
  // ✨ 5. 화면 처음 켜질 때 한 번만 실행 ✨
  // =============================
  // useEffect의 의존성 배열 [] → 한 번만 실행 (mount 시점)
  useEffect(() => {
    fetchReservations(); // 예약 데이터 불러오기 실행
  }, []); // 의존성 배열 비워둬서 “한 번만 실행”

  // =============================
  // ✨ 6. 30초마다 자동 새로고침 ✨ (폴링)
  // =============================
  useEffect(() => {
    // setInterval: 일정 시간마다 함수를 반복 실행
    const interval = setInterval(() => {
      console.log("예약 데이터 자동 새로고침");
      // 새로고침 시 fetchReservations() 호출해도 됨 (지금은 콘솔만 출력)
    }, 30000); // 30초마다 한 번 실행

    // 💡 clean-up 함수: 컴포넌트가 화면에서 사라질 때 실행됨
    // 타이머 멈추기 (메모리 누수 방지)
    return () => {
      clearInterval(interval);
      console.log("폴링 중단 (컴포넌트 언마운트)");
    };
  }, []); // 한 번만 설정

  // =============================
  // ✨ 7. 예약 상태 바꾸는 함수 ✨
  // =============================
  const updateReservationStatus = async (id: number, newStatus: ReservationStatus) => {
    try {
      // 실제 서버에서는 PUT 요청을 보냄
      console.log(`PUT /api/v1/reservations/${id} -> ${newStatus}`);

      // 화면에 바로 반영 (state 업데이트)
      setReservations(prev =>
        prev.map(reservation =>
          // id가 같은 예약만 상태를 바꿔줌
          reservation.id === id ? { ...reservation, status: newStatus } : reservation
        )
      );
    } catch (e) {
      console.error("예약 상태 변경 실패", e);
    }
  };

  // =============================
  // ✨ 8. 화면에 보여주는 부분 ✨
  // =============================

  // 로딩 중일 때
  if (loading) return <p>🔃 예약 정보를 불러오는 중입니다...</p>;
  // 에러가 발생했을 때
  if (error) return <p>⛔ 오류 발생: {error}</p>;

  // 실제 화면 구성
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "12px" }}>
      <h2>🚚 푸드트럭 예약 대시보드</h2>

      {/* 예약 데이터가 없을 경우 */}
      {reservations.length === 0 && <p>현재 예약이 없습니다.</p>}

      {/* 예약 목록 출력 */}
      <ul>
        {reservations.map(reservation => (
          <li
            key={reservation.id}
            style={{
              background: "white",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {/* 예약 정보 표시 */}
            <h4>
              {reservation.customer_name} ({reservation.truck_name})
            </h4>
            <p>시간대: {reservation.time_slot}</p>
            <p>
              상태:{" "}
              <b
                style={{
                  color:
                    reservation.status === "CONFIRMED"
                      ? "green"
                      : reservation.status === "PENDING"
                      ? "orange"
                      : "red",
                }}
              >
                {reservation.status}
              </b>
            </p>

            {/* 상태 변경 버튼 */}
            <div style={{ marginTop: "8px" }}>
              {/* 아직 승인 안 된 예약이면 "승인" 버튼 표시 */}
              {reservation.status !== "CONFIRMED" && (
                <button onClick={() => updateReservationStatus(reservation.id, "CONFIRMED")}>
                  승인
                </button>
              )}

              {/* 아직 취소 안 된 예약이면 "취소" 버튼 표시 */}
              {reservation.status !== "CANCELLED" && (
                <button onClick={() => updateReservationStatus(reservation.id, "CANCELLED")}>
                  취소
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보내기
export default Practice01;
