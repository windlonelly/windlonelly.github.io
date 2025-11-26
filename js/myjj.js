// ########### 动态名言飘落效果 ###########
// 学习名言库
const quotes = [
    "学而不思则罔，思而不学则殆",
    "温故而知新，可以为师矣",
    "书山有路勤为径，学海无涯苦作舟",
    "业精于勤，荒于嬉；行成于思，毁于随",
    "三更灯火五更鸡，正是男儿读书时",
    "少壮不努力，老大徒伤悲",
    "知之者不如好之者，好之者不如乐之者",
    "敏而好学，不耻下问",
    "锲而不舍，金石可镂",
    "博观而约取，厚积而薄发",
    "非学无以广才，非志无以成学",
    "读书破万卷，下笔如有神",
    "学而时习之，不亦说乎",
    "千里之行，始于足下",
    "勤能补拙是良训，一分辛劳一分才"
];

const quoteContainer = document.getElementById('quoteContainer');
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const maxQuotes = 20; // 同时显示的最大名言数量
let activeQuotes = [];

// 创建单个名言元素
function createQuote() {
    // 限制最大数量
    if (activeQuotes.length >= maxQuotes) return;

    const quote = document.createElement('div');
    quote.className = 'quote-item';
    
    // 随机选择名言
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.textContent = randomQuote;

    // 随机位置（仅在页面两侧）
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const posX = side === 'left' 
        ? Math.random() * screenWidth * 0.1 // 左侧10%区域
        : screenWidth - (Math.random() * screenWidth * 0.1) - 80; // 右侧10%区域（80是文本宽度）
    
    // 初始位置在页面顶部外
    quote.style.left = `${posX}px`;
    quote.style.top = `-100px`;

    // 随机样式（基于修改后的基础样式，增强醒目度）
    quote.style.fontSize = `${14 + Math.random() * 4}px`; // 14-18px
    const opacity = 0.3 + Math.random() * 0.2; // 0.3-0.5透明度（更醒目）
    quote.style.color = `rgba(20, 80, 180, ${opacity})`;

    // 随机下落速度
    const speed = 0.8 + Math.random() * 0.8; // 0.8-1.6px/帧（稍快，更易感知）

    // 添加到容器
    quoteContainer.appendChild(quote);
    quote.style.opacity = 1;

    // 存储名言信息
    activeQuotes.push({
        element: quote,
        speed: speed,
        top: -100
    });
}

// 更新名言位置
function updateQuotes() {
    // 遍历所有活跃名言
    for (let i = activeQuotes.length - 1; i >= 0; i--) {
        const q = activeQuotes[i];
        q.top += q.speed;
        q.element.style.top = `${q.top}px`;

        // 超出页面底部则移除
        if (q.top > screenHeight + 100) {
            quoteContainer.removeChild(q.element);
            activeQuotes.splice(i, 1);
        }
    }

    // 提高生成频率，让名言更密集
    if (Math.random() > 0.9) {
        createQuote();
    }

    requestAnimationFrame(updateQuotes);
}

// 启动动画
updateQuotes();

// 窗口大小变化时更新尺寸
window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});
// 滚动动画控制器 - 精确控制元素进入视口时的动画
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要动画的元素
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    // 创建Intersection Observer实例
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当元素进入视口时（距离视口底部20%时触发）
            if (entry.isIntersecting) {
                // 添加延迟以确保动画在正确时机触发
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, 50);
                
                // 动画触发后停止观察该元素
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 触发阈值：当元素20%进入视口时开始动画
        threshold: 0.2,
        // 提前100px开始检测，为动画预留时间
        rootMargin: '0px 0px -100px 0px'
    });

    // 开始观察所有动画元素
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // 卡片级动画控制
    const animateCards = () => {
        const cardContainers = document.querySelectorAll('.levels-container, .features-container, .access-container, .notices-grid');
        
        cardContainers.forEach(container => {
            const cards = container.querySelectorAll('.level-card, .feature-card, .access-card, .notice-card, .video-card');
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // 为每个卡片设置不同的延迟，创造错落有致的效果
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100 + 200);
                        
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            cards.forEach(card => {
                // 初始化卡片状态
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                cardObserver.observe(card);
            });
        });
    };

    // 初始化卡片动画
    setTimeout(animateCards, 500);
});