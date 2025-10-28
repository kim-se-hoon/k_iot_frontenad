// main.ts
// https://jsonplaceholder.typicode.com/users
// ↑ 가짜 유저 데이터를 제공하는 공개 API 주소

//! ========================== 사용자 정보 정의 ==========================

//! User 인터페이스: 한 명의 사용자 정보를 표현하는 설계도
interface User {
  id: number;           // id: number → 아이디는 숫자 타입
  name: string;         // name: string → 이름은 문자열 타입
  username: string;     // username: string → 사용자명은 문자열 타입
  email: string;        // email: string → 이메일은 문자열 타입
  phone: string;        // phone: string → 전화번호는 문자열 타입
  website: string;      // website: string → 웹사이트 주소는 문자열 타입
}

//! UsersType: 사용자 여러 명을 한꺼번에 담는 배열 타입
type UsersType = User[]; // UsersType = User 객체 여러 개로 이루어진 배열

//! ========================== 1. 사용자 정보 가져오기 ==========================

//@ fetchUsers 함수: 외부 API에서 사용자 정보를 비동기로 가져옴
const fetchUsers = async (): Promise<UsersType> => {
  // async → 비동기 함수, 항상 Promise를 반환함
  try {
    // fetch()로 외부 API 호출
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // 서버 응답이 정상인지 검사 (200~299)
    if (!response.ok) {
      throw new Error('Network response was not ok'); // 오류 발생시키기
    }

    // 응답을 JSON 형태로 변환
    const users: UsersType = await response.json();

    // 변환된 users 배열을 반환 (Promise.resolve(users))
    return users;

    // ※ async 함수는 자동으로 Promise 형태로 감싸서 반환함
  } catch (e) {
    // 오류 발생 시 콘솔에 출력
    console.error('Fetch error: ', e);
    // 오류 시 빈 배열 반환
    return [];
  }
};

//! ========================== 2. 사용자 카드 만들기 ==========================

//@ createUserCard 함수: 한 명의 사용자 정보를 받아 카드 형태 HTML 요소로 변환
const createUserCard = (user: User): HTMLElement => {
  const userCard = document.createElement('div'); // <div> 요소 생성

  userCard.className = 'user-card'; // class="user-card" 설정

  // data-userId 속성 추가 → HTML에서 이 div가 어떤 사용자(id)인지 표시
  userCard.dataset.userId = user.id.toString(); // 숫자를 문자열로 변환

  // 사용자 정보 표시용 HTML 구조 작성
  userCard.innerHTML = `
    <h2>${user.name}</h2>                       <!-- 이름 -->
    <p><strong>Username: </strong>${user.username}</p> <!-- 사용자명 -->
    <p><strong>Email: </strong>${user.email}</p>       <!-- 이메일 -->
  `;

  return userCard; // 완성된 카드 요소 반환
};

//! ========================== 3. 사용자 목록 화면 표시 ==========================

//@ displayUsers 함수: 사용자 배열을 받아 HTML에 카드로 표시
const displayUsers = (users: UsersType) => {
  // id="user-list"인 요소를 찾아서 (카드들이 들어갈 영역)
  const userList = document.getElementById('user-list');

  if (userList) {
    // 기존 내용 초기화 (새로 그리기 전에 비움)
    userList.innerHTML = '';

    // 사용자 배열 반복 → 각 사용자마다 카드 생성 및 추가
    users.forEach(user => {
      const userCard = createUserCard(user); // 한 명의 카드 생성
      userList.appendChild(userCard);        // 화면에 추가
    });
  }
};

//! ========================== 4. 모달 창에 사용자 정보 표시 ==========================

//@ showModal 함수: 클릭한 사용자의 상세 정보를 모달 창에 띄움
const showModal = (user: User) => {
  const modal = document.getElementById('user-modal'); // 모달 전체 영역
  const modalContent = document.getElementById('modal-user-details'); // 내용 부분

  if (modal && modalContent) {
    // 선택된 사용자 정보를 HTML로 작성
    modalContent.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Username: </strong>${user.username}</p>
      <p><strong>Email: </strong>${user.email}</p>
      <p><strong>Phone: </strong>${user.phone}</p>
      <p><strong>Website: </strong>${user.website}</p>
    `;

    // 모달 창 표시 (기본은 display:none 상태일 것)
    modal.style.display = 'block';
  }
};

//! ========================== 5. 이벤트 리스너 추가 ==========================

//@ addEventListeners 함수: 클릭 이벤트로 카드 클릭 → 모달 띄우기 + 모달 닫기 처리
const addEventListeners = (users: UsersType) => {
  const userList = document.getElementById('user-list'); // 카드 목록 영역

  if (userList) {
    // 카드 목록 전체에 클릭 이벤트 등록 (이벤트 위임)
    userList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement; // 클릭된 실제 요소 (예: h2, p 등)
      const userCard = target.closest('.user-card') as HTMLElement | null;
      // 클릭된 곳에서 가장 가까운 .user-card 찾기

      if (userCard) {
        // 카드의 data-userId 속성에서 사용자 ID 가져오기
        const userId = parseInt(userCard.dataset.userId || '0', 10); // 문자열→숫자

        // users 배열에서 해당 id를 가진 사용자 찾기
        const user = users.find(user => user.id === userId);

        // 해당 사용자 있으면 모달 띄우기
        if (user) {
          showModal(user);
        }
      }
    });
  }

  // 모달 닫기 관련 요소들
  const modal = document.getElementById('user-modal') as HTMLElement;
  const closeModal = document.querySelector('.close') as HTMLElement;

  if (modal && closeModal) {
    // "X" 버튼 클릭 시 모달 닫기
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // 모달 바깥 영역 클릭 시 닫기
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
};

//! ========================== 6. 초기 실행 함수 ==========================

//@ init 함수: 페이지 로드 시 자동 실행
const init = async () => {
  const users = await fetchUsers(); // 사용자 데이터 가져오기
  displayUsers(users);              // 화면에 사용자 카드 표시
  addEventListeners(users);         // 이벤트 리스너 등록
};

//! ========================== 7. 페이지 로드 시 init 실행 ==========================

// DOMContentLoaded → HTML이 모두 로드되면 실행
document.addEventListener('DOMContentLoaded', init);
