// ============================================================================
// main.ts
//! 사용자로부터 입력받은 "할 일(Task)"을 관리하는 Task Logger 프로그램
// - 새로운 할 일 추가
// - 기존 할 일 삭제
// - 시간 기록 (timestamp)
// - 화면에 표시 / 삭제 버튼 작동
// ============================================================================


//@ 1. 할 일(Task)의 기본 구조 정의 - 인터페이스(interface)
interface Task {
  id: number;             // 고유 식별번호 (각 할 일마다 구분되는 ID)
  description: string;    // 할 일 내용 (사용자가 입력한 텍스트)
  timestamp: Date;        // 할 일이 등록된 시간 (생성 시간)
}


//@ 2. Task 저장소 역할을 하는 클래스 (OOP 기반)
// : 내부에 할 일 목록 배열과 관련 기능(추가/삭제/렌더링)을 정의함
class TaskLogger {
  //! 현재 등록된 모든 할 일을 담는 배열
  private tasks: Task[] = [];

  //! ID 생성을 위한 내부 카운터 (매번 할 일 추가 시 +1)
  private taskIdCounter = 0; 


  //@ (1) 새로운 할 일 추가 기능
  addTask(description: string): Task {
    // 새로운 Task 객체 생성
    const newTask: Task = {
      id: this.taskIdCounter++,    // 현재 카운터 값 사용 후 1 증가
      description,                 // 입력받은 설명 저장
      timestamp: new Date()        // 현재 시각 기록
    }

    // 만들어진 Task를 배열에 추가
    this.tasks.push(newTask);

    // 화면에 목록 다시 렌더링 (즉시 갱신)
    this.renderTasks();

    // 추가된 Task를 반환 (필요 시 외부에서 접근 가능)
    return newTask;
  }


  //@ (2) 특정 할 일 삭제 기능
  deleteTask(taskId: number): void {
    // filter(): 조건에 맞는 요소만 남김
    // 현재 배열을 돌며 id가 삭제할 id가 아닌 것만 남겨 새 배열로 대체
    this.tasks = this.tasks.filter(task => task.id !== taskId);

    // 삭제 후 화면을 다시 렌더링
    this.renderTasks();
  }


  //@ (3) 개별 Task를 HTML 요소로 만드는 내부 함수
  private createTaskElement(task: Task) {
    // <div> 요소 생성
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item'; // CSS 스타일 지정

    // innerHTML로 카드(한 줄) 구성
    taskItem.innerHTML = `
      <span>${task.description} - ${task.timestamp.toLocaleString()}</span>
      <button data-task-id=${task.id}>Delete</button>
    `;

    // 완성된 요소 반환
    return taskItem;
  }


  //@ (4) 현재 tasks 배열을 HTML에 출력 (렌더링)
  private renderTasks() {
    // HTML에서 id="task-list" 요소 선택
    const taskList = document.getElementById('task-list');

    // 요소가 존재하면 내용 초기화 후 다시 그림
    if (taskList) {
      taskList.innerHTML = ''; // 기존 목록 초기화

      // 각 Task 객체를 반복하면서 화면에 추가
      this.tasks.forEach(task => {
        const taskItem = this.createTaskElement(task);
        taskList.appendChild(taskItem);
      });

      // 새로 생성된 Delete 버튼에 이벤트 등록
      this.addDeleteEventListeners();
    }
  }


  //@ (5) 각 Delete 버튼에 클릭 이벤트 연결
  private addDeleteEventListeners() {
    // 모든 task-item 안의 버튼 선택
    const deleteButtons = document.querySelectorAll('.task-item button');

    // 각 버튼마다 클릭 이벤트 등록
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // 클릭된 버튼의 data-task-id 값 추출
        const taskId = parseInt(
          (e.target as HTMLButtonElement).dataset.taskId || '0', 
          10
        );

        // 해당 ID의 할 일 삭제
        this.deleteTask(taskId);
      });
    });
  }
}



// ============================================================================
//! 3. 프로그램의 진입점 (초기화 함수)
// : HTML 요소 선택 → 이벤트 등록 → TaskLogger 인스턴스 동작 연결
// ============================================================================
const init = (): void => {
  // TaskLogger 객체 생성 (실제 할 일 관리 담당)
  const taskManger = new TaskLogger();

  // HTML 요소들 선택
  const logTaskButton = document.getElementById('log-task-button'); // 할 일 추가 모달 열기 버튼
  const taskModal = document.getElementById('task-modal');          // 모달 전체 영역
  const closeModalButton = document.querySelector('.close');        // 모달 닫기(X)
  const addTaskButton = document.getElementById('add-task-button'); // 실제로 추가 버튼
  const taskInput = document.getElementById('task-input') as HTMLInputElement; // 입력창


  //@ (1) "할 일 기록(Log Task)" 버튼 클릭 시 → 모달 열기
  if (logTaskButton) {
    logTaskButton.addEventListener('click', () => {
      if (taskModal) {
        taskModal.style.display = 'block'; // 모달 보이기
        taskInput.focus(); // 입력창에 자동 커서 이동
      }
    });
  }


  //@ (2) 닫기(X) 버튼 클릭 시 → 모달 닫기
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      if (taskModal) {
        taskModal.style.display = 'none';
      }
    });
  }


  //@ (3) 모달 외부 영역 클릭 시 → 모달 닫기
  window.addEventListener('click', (e) => {
    // 클릭된 영역이 모달 자체일 때 (내용이 아닌 배경)
    if (e.target === taskModal) {
      if (taskModal) {
        taskModal.style.display = 'none';
      }
    }
  });


  //@ (4) 실제 할 일 추가 로직
  const handleAddTask = () => {
    const description = taskInput.value; // 입력된 텍스트 가져오기

    // 유효성 검사 (공백만 입력 방지)
    if (description && description.trim() !== '') {
      // 새로운 할 일 추가
      taskManger.addTask(description.trim());
      taskInput.value = ''; // 입력창 비우기

      // 모달 닫기 (널 아님 단언 연산자 ! 사용)
      taskModal!.style.display = 'none';
    } else {
      alert('Task 설명은 필수값입니다. 내용을 입력해주세요.');
    }
  };

  //@ (5) 추가 버튼 클릭 시 → handleAddTask 실행
  addTaskButton?.addEventListener('click', handleAddTask);

  //@ (6) 엔터키 입력 시에도 할 일 추가
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  });
};


// HTML 문서 로딩 완료 시 init() 실행
document.addEventListener('DOMContentLoaded', init);
