document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Анимация заголовка при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Кнопка "Наверх"
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Анимация прогресс-баров навыков при прокрутке
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (skillSection && progressBars.length) {
        const animateSkills = () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            
            if (sectionPos < screenPos) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                
                // Отключаем наблюдение после запуска анимации
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        // Запускаем проверку при загрузке страницы
        animateSkills();
        
        // И при прокрутке
        window.addEventListener('scroll', animateSkills);
    }
    
    // Отправка формы контактов
    const contactForm = document.querySelector('.contact-form');
        
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Форма отправлена:', { name, email, message });
            
            // Временная имитация отправки
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Сообщение успешно отправлено!');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Очистка данных админ-панели
    localStorage.removeItem('siteContent');
});