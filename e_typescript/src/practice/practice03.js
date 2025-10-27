// practice03.ts
document.addEventListener('DOMContentLoaded', function () {
    // 1) DOM 요소 타입 단언
    var input = document.getElementById('username');
    var button = document.getElementById('saveButton');
    var resultDiv = document.getElementById('result');
    // 2) 버튼 클릭 시 동작
    button.addEventListener('click', function () {
        var username = input.value.trim();
        if (username) {
            resultDiv.innerText = '이름을 입력해주세요.';
            return;
        }
        // 3) JSON 문자열 생성
        var jsonData = JSON.stringify({ name: username, age: 30 });
        var user = JSON.parse(jsonData);
        // 5) DOM 반영
        resultDiv.innerText = "".concat(user.name, " (").concat(user.age, ")");
    });
});
