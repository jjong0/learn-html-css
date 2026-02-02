// 20-keyframes-animation.js

document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.keyframes-wrapper');
  if (!wrapper) return;

  // 범용 애니메이션 대상 찾기 함수
  const getTargetAndClass = () => {
    // 버튼에 data-animation-target="클래스명" 속성 사용
    // 없으면 .target-animation의 첫 번째 클래스를 animationClass로 사용
    const target = wrapper.querySelector('.target-animation');
    if (!target) return { target: null, animationClass: null };
    const defaultClass = Array.from(target.classList).find((cls) => cls !== 'target-animation');
    return {
      target,
      animationClass: defaultClass || null,
    };
  };

  const toggleBtn = wrapper.querySelector('.toggle-animation');

  // 범용 애니메이션 초기화 함수
  const resetAnimation = () => {
    const { target, animationClass } = getTargetAndClass();
    if (!target || !animationClass) return;
    target.classList.remove(animationClass);
    void target.offsetWidth;
    target.classList.add(animationClass);
    target.style.setProperty('--play-state', 'paused');
    target.style.setProperty('--after-play-state', 'paused');
    toggleBtn.textContent = '재생';
  };

  // 범용 애니메이션 재생/일시정지 토글 함수
  const toggleAnimation = () => {
    const { target } = getTargetAndClass();
    if (!target) return;
    const isPaused = getComputedStyle(target).getPropertyValue('--play-state').trim() === 'paused';
    if (isPaused) {
      target.style.setProperty('--play-state', 'running');
      target.style.setProperty('--after-play-state', 'running');
      toggleBtn.textContent = '일시정지';
    } else {
      target.style.setProperty('--play-state', 'paused');
      target.style.setProperty('--after-play-state', 'paused');
      toggleBtn.textContent = '재생';
    }
  };

  // 이벤트 위임
  wrapper.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.classList.contains('reset-animation')) {
      resetAnimation();
    } else if (e.target.classList.contains('toggle-animation')) {
      toggleAnimation();
    }
  });
});
