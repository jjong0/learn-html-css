// DOM 선택
const container = document.querySelector('.container');

// 함수 구현
function handleToggleClick(event) {
  const btn = event.target.closest('.toggle');
  if (!btn) return;
  const sibling = btn.nextElementSibling;
  if (sibling) {
    sibling.classList.toggle('is-active');
  }
}

// 이벤트 위임 방식으로 이벤트 바인딩
if (container) {
  container.addEventListener('click', handleToggleClick);
}
