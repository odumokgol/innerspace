// TCI 가이드 - 인터랙션 스크립트

// --- 정보 패널 토글 ---
document.querySelectorAll('.link-btn-toggle').forEach(btn => {
  const targetId = btn.dataset.target;
  const panel = document.getElementById(targetId);
  if (!panel) return;

  btn.addEventListener('click', () => {
    const isOpen = panel.classList.contains('open');

    // 다른 패널 모두 닫기
    document.querySelectorAll('.info-panel.open').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.link-btn-toggle.active').forEach(b => b.classList.remove('active'));

    if (!isOpen) {
      panel.classList.add('open');
      btn.classList.add('active');
    }
  });
});

// --- 링크 버튼 탭 리플 효과 ---
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('pointerdown', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.06);
      transform:scale(0); animation:ripple 0.5s ease forwards;
    `;
    if (!this.style.position || this.style.position === 'static') {
      this.style.position = 'relative';
    }
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// 리플 키프레임 동적 주입
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log('TCI 가이드 로드 완료 ✅');
