// ===== DOM 선택 =====
const selectCopyButtons = () => document.querySelectorAll('.copy-component');

const selectAvatarButtons = () => document.querySelectorAll('.avatar');

const selectParentComponent = (button) => button.closest('.ui-component');

const selectComponentContent = (component) => {
  const clone = component.cloneNode(true);
  const copyButton = clone.querySelector('.copy-component');
  if (copyButton) {
    copyButton.remove();
  }
  return clone.innerHTML.trim();
};

const selectStatusText = (avatarButton) => avatarButton.querySelector('.sr-only');

// ===== 함수 구현 =====

// ===== Copy Component Functions =====

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

// ===== Avatar Toggle Functions =====

/**
 * 현재 상태를 반환 (online 또는 offline)
 * @param {HTMLElement} avatarButton - 아바타 버튼
 * @returns {string} 현재 상태
 */
const getCurrentStatus = (avatarButton) => {
  return avatarButton.classList.contains('online') ? 'online' : 'offline';
};

/**
 * 새로운 상태를 반환 (현재 상태의 반대)
 * @param {string} currentStatus - 현재 상태
 * @returns {string} 새로운 상태
 */
const getToggleStatus = (currentStatus) => {
  return currentStatus === 'online' ? 'offline' : 'online';
};

/**
 * 아바타 버튼의 상태를 토글
 * @param {HTMLElement} avatarButton - 토글할 아바타 버튼
 */
const toggleAvatarStatus = (avatarButton) => {
  const currentStatus = getCurrentStatus(avatarButton);
  const newStatus = getToggleStatus(currentStatus);

  // 클래스 토글
  avatarButton.classList.remove(currentStatus);
  avatarButton.classList.add(newStatus);

  // sr-only 텍스트 업데이트
  const statusText = selectStatusText(avatarButton);
  if (statusText) {
    const statusLabel = newStatus === 'online' ? '온라인' : '오프라인';
    statusText.textContent = statusLabel;
  }

  // aria-pressed 속성 업데이트
  const isPressedStatus = newStatus === 'online' ? 'true' : 'false';
  avatarButton.setAttribute('aria-pressed', isPressedStatus);
};

/**
 * 아바타 버튼 클릭 이벤트 핸들러
 * @param {Event} event - 클릭 이벤트
 */
const handleAvatarClick = (event) => {
  const button = event.currentTarget;
  toggleAvatarStatus(button);
};

// ===== 이벤트 바인딩 =====

/**
 * Copy 버튼 이벤트 바인딩
 */
const bindCopyEvents = () => {
  const copyButtons = selectCopyButtons();
  copyButtons.forEach((button) => {
    button.addEventListener('click', handleCopyClick);
  });
};

/**
 * Avatar 버튼 이벤트 바인딩
 */
const bindAvatarEvents = () => {
  const avatarButtons = selectAvatarButtons();
  avatarButtons.forEach((button) => {
    button.addEventListener('click', handleAvatarClick);
  });
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  bindCopyEvents();
  bindAvatarEvents();
});
