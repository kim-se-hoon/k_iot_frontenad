import React, { useEffect, useRef, useState } from 'react'

// 

function Practice02() {
  //^ === Hooks === //
  const [messages, setMessages] = useState<string[]>([
    "메세지 1",
    "메세지 2",
    "메세지 3",
    "메세지 4",
    "메세지 5",
    "메세지 6",
    "메세지 7",
    "메세지 8"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 1 ~ 메시지 15의 유사 배열을 실제 배열로 변환
  // const messages = Array.from({ length: 15}, (_, i) => `메시지 ${i + 1}` );

  //? messages 값이 갱신될 때마다 콜백 함수 실행
  useEffect(() => {
    // block 속성: 스크롤 맞춤 설정 (end: 하단 맞춤, center: 중앙 맞춤)
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [messages]);

  const handleAddMessage = () => {
    const newMessage = `메시지 ${messages.length + 1}`;
    setMessages(prev => [...prev, newMessage]);
  }


  return (
    <>
      <button onClick={handleAddMessage}>메서지 추가</button>
    <div
      style={{
        backgroundColor: '#fafafa',
        padding: '10px',
        border: '1px solid #ccc',
        // 콘탠츠가 지정된 영역을 넘어설 때에만 스크롤바를 자동으로 생성
        overflowY: 'auto',
        height: '200px'
      }}
    >
      {messages.map(msg => <div key={msg}>{msg}</div>)}
      <div ref={messagesEndRef} />
    </div>
    </>
  )
}

export default Practice02