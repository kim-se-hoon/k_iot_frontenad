// main.ts

/*
  ==========================================
  HTML5 Canvas + TypeScript 그림판 프로젝트
  ==========================================

  ✔ 핵심 개념
  - <canvas> : 브라우저에서 2D 그래픽을 직접 그릴 수 있는 HTML5 요소
  - JS로 접근하여 선, 도형, 이미지, 애니메이션 등을 표현 가능
  - 브라우저 내 "도화지" 역할

  ✔ 학습 포인트
  - TypeScript의 제네릭, keyof, 타입 정의
  - DOM 조작
  - Canvas API (2D Context)
  - 이벤트 핸들러 (mousedown, mousemove 등)
*/

const app = document.getElementById('app'); // <div id="app"> 요소 가져오기

// =======================================================
// 1. 툴(도구) 상태를 담는 타입 정의
// =======================================================
type ToolState = {
  color: string;      // 현재 선택된 색상 (브러시 색)
  size: number;       // 브러시 굵기
  isEraser: boolean;  // 지우개 모드 여부
};

// =======================================================
// 2. 초기 툴 상태 (기본값)
// =======================================================
const toolState: ToolState = {
  color: '#000000', // 기본 색상: 검정
  size: 5,          // 기본 두께: 5px
  isEraser: false,  // 기본 모드: 펜
};

// =======================================================
// 3. 상태 변경 함수 (제네릭 사용)
// =======================================================
/*
  - keyof ToolState
    : 'color' | 'size' | 'isEraser' 형태의 문자열 리터럴 유니언 반환

  - 제네릭 <K extends keyof ToolState>
    : K는 ToolState의 키 중 하나만 받을 수 있음

  - value: ToolState[K]
    : key에 맞는 타입 자동 추론 (color면 string, size면 number)
*/
function setTool<K extends keyof ToolState>(key: K, value: ToolState[K]) {
  toolState[key] = value; // 상태 업데이트
}

// =======================================================
// 4. 툴바 생성 함수 (색상, 두께, 지우개, 초기화, 저장)
// =======================================================
function createToolbar(): HTMLElement {
  // 색상 선택 input
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = toolState.color; // 초기값 설정
  colorInput.oninput = () => setTool('color', colorInput.value); // 색상 변경 시 상태 업데이트

  // 브러시 크기 조절 (슬라이더)
  const sizeInput = document.createElement('input');
  sizeInput.type = 'range';
  sizeInput.min = '1';
  sizeInput.max = '10';
  sizeInput.value = toolState.size.toString();
  sizeInput.oninput = () => setTool('size', parseInt(sizeInput.value));

  // 지우개 버튼
  const eraserButton = document.createElement('button');
  eraserButton.textContent = '지우개';
  eraserButton.onclick = () => {
    toolState.isEraser = !toolState.isEraser; // 상태 토글
    eraserButton.textContent = toolState.isEraser ? '펜' : '지우개';
  };

  // 캔버스 초기화 버튼
  const clearButton = document.createElement('button');
  clearButton.textContent = '초기화';
  clearButton.onclick = () => ctx?.clearRect(0, 0, canvas.width, canvas.height);
  // clearRect(x, y, w, h): 지정 영역을 투명하게 지움 (전체 초기화 시 전체 캔버스 지정)

  // 그림 저장 버튼
  const saveButton = document.createElement('button');
  saveButton.textContent = '저장';
  saveButton.onclick = () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';        // 저장 파일명
    link.href = canvas.toDataURL();       // 현재 그림을 Base64 PNG로 변환
    link.click();                         // 클릭 이벤트로 다운로드 실행
  };

  // 툴바 묶기
  const toolbar = document.createElement('div');
  toolbar.className = 'toolbar';
  toolbar.append(colorInput, sizeInput, eraserButton, clearButton, saveButton);

  return toolbar; // HTMLElement 반환
}

// =======================================================
// 5. 캔버스 생성 및 설정
// =======================================================
const canvas = document.createElement('canvas');
canvas.width = 800;  // 캔버스 너비
canvas.height = 500; // 캔버스 높이

// =======================================================
// 6. 2D 그리기 컨텍스트 가져오기
// =======================================================
const ctx = canvas.getContext('2d'); // 2D 그래픽용 컨텍스트 객체
if (ctx) {
  ctx.lineCap = 'round'; // 선 끝을 둥글게 처리
}

// =======================================================
// 7. 마우스 이벤트로 그림 그리기 로직 구현
// =======================================================

// 현재 마우스를 누르고 있는지 여부
let isDrawing = false;

// 마우스를 누른 시점
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  ctx?.beginPath();                   // 새로운 선 경로 시작
  ctx?.moveTo(e.offsetX, e.offsetY);  // 선의 시작 좌표 설정
});

// 마우스를 이동하는 동안 (그리고 있는 중)
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return; // 누르고 있지 않으면 종료

  if (ctx) {
    // 현재 상태에 맞게 색상, 두께 설정
    ctx.strokeStyle = toolState.isEraser ? '#ffffff' : toolState.color;
    ctx.lineWidth = toolState.size;
    ctx.lineTo(e.offsetX, e.offsetY); // 선의 끝점 지정
    ctx.stroke(); // 실제 선 그리기
  }
});

// 마우스를 뗐을 때
canvas.addEventListener('mouseup', () => {
  isDrawing = false;  // 그리기 중단
  ctx?.closePath();   // 현재 경로 닫기
});

// 마우스가 캔버스 밖으로 나갔을 때도 중단
canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
  ctx?.closePath();
});

// =======================================================
// 8. 모든 요소를 페이지에 추가
// =======================================================
app?.appendChild(createToolbar()); // 툴바 추가
app?.appendChild(canvas);          // 캔버스 추가