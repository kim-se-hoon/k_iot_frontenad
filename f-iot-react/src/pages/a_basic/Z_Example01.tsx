import React from 'react'

interface GreetingProps {
  name: string;
  message?: string;
}

const GreetingCard: React.FC<GreetingProps> = ({ name, message}) => {
  return (
    <div>
      {/* message가 없으면 'Hello!'를 대신 출력 */}
      <p>{name}: {message || "Hello!"}</p>
    </div>
  );
};



function Z_Example01_Answer() {
  const users = [
    { name: "곰", message: "오늘도 화이팅!"},
    { name: "호랑이"},
    { name: "사자", message: "리액트 어라라라?"}
  ];
  

  return (
    <div>
      <h2>인사 카드 리스트</h2>
      {users.map((user, index) => (
        <GreetingCard key={index} name={user.name} message={user.message} />
      ))}
    </div>
  )
}

export default Z_Example01_Answer