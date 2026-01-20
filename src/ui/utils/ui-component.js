// ===== DOM 선택 =====
const selectCopyButtons = () => document.querySelectorAll('.copy-component');

const selectParentComponent = (button) => button.closest('.ui-component');

const selectComponentContent = (component) => {
  const clone = component.cloneNode(true);
  const copyButton = clone.querySelector('.copy-component');
  if (copyButton) {
    copyButton.remove();
  }
  return clone.innerHTML.trim();
};

// ===== 함수 구현 =====
/**
 * 마크업을 클립보드에 복사
 * @param {string} html - 복사할 HTML 마크업
 */
const copyToClipboard = async (html) => {
  try {
    await navigator.clipboard.writeText(html);
    return true;
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
};

/**
 * 버튼 텍스트를 임시로 변경하고 원래대로 복구
 * @param {HTMLElement} button - 대상 버튼
 * @param {string} tempText - 임시 텍스트
 * @param {number} duration - 표시 시간 (ms)
 */
const updateButtonText = (button, tempText, duration = 2000) => {
  const originalText = button.textContent;
  button.textContent = tempText;
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, duration);
};

/**
 * 버튼 클릭 이벤트 핸들러
 * @param {Event} event - 클릭 이벤트
 */
const handleCopyClick = async (event) => {
  const button = event.currentTarget;
  const component = selectParentComponent(button);

  if (!component) {
    console.error('ui-component를 찾을 수 없습니다.');
    return;
  }

  const htmlContent = selectComponentContent(component);
  const success = await copyToClipboard(htmlContent);

  if (success) {
    updateButtonText(button, '복사됨', 2000);
  }
};

// ===== 이벤트 바인딩 =====
const bindCopyEvents = () => {
  const copyButtons = selectCopyButtons();
  copyButtons.forEach((button) => {
    button.addEventListener('click', handleCopyClick);
  });
};

// 초기화
document.addEventListener('DOMContentLoaded', bindCopyEvents);
