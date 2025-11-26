// 播放导航栏悬停音效
function playNavHoverSound() {
    const navHoverSound = document.getElementById('navHoverSound');
    if (navHoverSound) {
        navHoverSound.currentTime = 0;
        navHoverSound.volume = 0.3; // 设置音量
        navHoverSound.play().catch(e => {
            console.log("导航音效播放失败:", e);
        });
    }
}

// 为导航栏项添加悬停事件
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-menu li');
    
    navItems.forEach(item => {
        // 鼠标进入时播放音效
        item.addEventListener('mouseenter', function() {
            playNavHoverSound();
            
            // 添加额外的悬停类用于更复杂的动画
            this.classList.add('nav-hover');
            
            // 随机颜色变化效果（可选）
            const colors = ['#1d45b5', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.setProperty('--hover-color', randomColor);
        });
        
        // 鼠标离开时移除悬停类
        item.addEventListener('mouseleave', function() {
            this.classList.remove('nav-hover');
        });
        
        // 点击时添加点击效果
        item.addEventListener('click', function(e) {
            // 移除所有active类
            navItems.forEach(navItem => {
                navItem.classList.remove('nav-active');
            });
            // 添加当前active类
            this.classList.add('nav-active');
        });
    });
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        const activeNav = document.querySelector('.nav-menu li a:focus');
        if (activeNav && (e.key === 'Enter' || e.key === ' ')) {
            playNavHoverSound();
        }
    });
});