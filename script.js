// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // 滚动动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // 进度条动画
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 简单的本地存储功能（可选）
const NiceDayApp = {
    // 保存感恩日记
    saveGratitude: function(entry) {
        const entries = this.getGratitudeEntries();
        entries.push({
            date: new Date().toISOString(),
            content: entry
        });
        localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
    },
    
    // 获取感恩日记条目
    getGratitudeEntries: function() {
        const entries = localStorage.getItem('gratitudeEntries');
        return entries ? JSON.parse(entries) : [];
    },
    
    // 保存积极自我对话记录
    savePositiveDialogue: function(negative, positive) {
        const entries = this.getPositiveDialogues();
        entries.push({
            date: new Date().toISOString(),
            negative: negative,
            positive: positive
        });
        localStorage.setItem('positiveDialogues', JSON.stringify(entries));
    },
    
    // 获取积极自我对话记录
    getPositiveDialogues: function() {
        const entries = localStorage.getItem('positiveDialogues');
        return entries ? JSON.parse(entries) : [];
    },
    
    // 保存每日练习记录
    savePractice: function(practiceType, completed) {
        const practices = this.getPractices();
        const today = new Date().toDateString();
        
        if (!practices[today]) {
            practices[today] = {};
        }
        
        practices[today][practiceType] = completed;
        localStorage.setItem('dailyPractices', JSON.stringify(practices));
    },
    
    // 获取每日练习记录
    getPractices: function() {
        const practices = localStorage.getItem('dailyPractices');
        return practices ? JSON.parse(practices) : {};
    },
    
    // 检查是否已完成今日练习
    isPracticeCompletedToday: function(practiceType) {
        const practices = this.getPractices();
        const today = new Date().toDateString();
        return practices[today] && practices[today][practiceType];
    },
    
    // 获取连续练习天数
    getStreakDays: function() {
        const practices = this.getPractices();
        const dates = Object.keys(practices).sort().reverse();
        
        if (dates.length === 0) return 0;
        
        let streak = 0;
        let currentDate = new Date();
        
        for (let i = 0; i < dates.length; i++) {
            const practiceDate = new Date(dates[i]);
            const diffTime = Math.abs(currentDate - practiceDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 1) {
                streak++;
                currentDate = practiceDate;
            } else {
                break;
            }
        }
        
        return streak;
    }
};

// 将应用对象暴露到全局（可选）
window.NiceDayApp = NiceDayApp;