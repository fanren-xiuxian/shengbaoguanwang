document.addEventListener("DOMContentLoaded", function () {
    // 1. 头部滚动效果
    const header = document.querySelector(".main-header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. 滚动reveal动画
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15, // 元素15%可见时触发
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // 只动画一次
            }
        });
    }, observerOptions);
    document.querySelectorAll(".reveal-on-scroll").forEach((section) => {
        observer.observe(section);
    });

    // 3. 轮播图逻辑（修改为支持多个轮播）
document.querySelectorAll(".carousel").forEach(carousel => {
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".carousel-control.prev");
    const nextBtn = carousel.querySelector(".carousel-control.next");
    let currentIndex = 0;
    let intervalId;

    // 显示指定索引的轮播项
    function showSlide(index) {
        items[currentIndex].classList.remove("active");
        currentIndex = (index + items.length) % items.length;
        items[currentIndex].classList.add("active");
    }

    // 下一张
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // 上一张
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 自动播放
    function startAutoPlay() {
        intervalId = setInterval(nextSlide, 5000); // 每5秒切换一次
    }

    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(intervalId);
    }

    // 事件监听
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // 重启计时器
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // 重启计时器
        });
    }

    // 鼠标悬浮停止自动播放，离开继续
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);

    // 初始化自动播放
    startAutoPlay();
});

    // 4. 平滑滚动（可选增强）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});