import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [courses, setCourses] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Стани для вбудованої інформаційної панелі
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [panelStep, setPanelStep] = useState('program'); // 'program' або 'register'
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    // Індивідуальні покрокові плани для всіх 10 курсів відповідно до назв
    const coursePrograms = {
        "Основи Web-програмування: HTML, CSS, JavaScript": [
            "Модуль 1: Вступ до веб-технологій та семантична розмітка HTML5",
            "Модуль 2: Стилізація інтерфейсів за допомогою CSS3, Flexbox та Grid Layout",
            "Модуль 3: Адаптивна верстка, медіа-запити та використання фреймворку Bootstrap",
            "Модуль 4: Основи синтаксису JavaScript: змінні, типи даних, функції та масиви",
            "Модуль 5: Робота з DOM-деревом, обробка подій та базові скрипти динаміки"
        ],
        "Розробка додатків на React.js": [
            "Модуль 1: Архітектура компонентів у React, робота з JSX та Virtual DOM",
            "Модуль 2: Передача даних за допомогою Props та керування станом сайту через useState",
            "Модуль 3: Життєвий цикл компонентів та використання хуку ефектів useEffect",
            "Модуль 4: Налаштування маршрутизації Single Page Application через React Router",
            "Модуль 5: Глобальне керування даними (Context API) та інтеграція з REST API сервера"
        ],
        "Серверні технології Node.js та Express": [
            "Модуль 1: Робота з асинхронною платформою Node.js та керування пакетами через NPM",
            "Модуль 2: Створення модулів, робота з потоками даних та вбудованою системою файлів fs",
            "Модуль 3: Створення веб-сервера за допомогою фреймворку Express.js",
            "Модуль 4: Проєктування архітектурних маршрутів та кінцевих точок REST API",
            "Модуль 5: Використання проміжного ПЗ (Middleware) для автентифікації та обробки помилок"
        ],
        "Бази даних: Від SQL до NoSQL MongoDB": [
            "Модуль 1: Огляд архітектури баз даних та відмінності між SQL та NoSQL",
            "Модуль 2: Основи роботи з MongoDB: колекції, BSON-документи, CRUD операції",
            "Модуль 3: Об'єктно-документальне моделювання в Node.js за допомогою бібліотеки Mongoose",
            "Модуль 4: Створення гнучких схем даних, індексація та побудова складних агрегацій",
            "Модуль 5: Адміністрування, безпека та підключення хмарного кластера MongoDB Atlas"
        ],
        "Інтернет-Маркетинг та просування брендів": [
            "Модуль 1: Огляд digital-ринку та дослідження цільової аудиторії бренду",
            "Модуль 2: Пошукова оптимізація (SEO) та побудова ефективної контент-стратегії",
            "Модуль 3: Налаштування реклами (SMM) у соціальних мережах та інструментах Google Ads",
            "Модуль 4: Email-маркетинг, побудова автоматизованих лійкових систем продажів",
            "Модуль 5: Вебаналітика за допомогою Google Analytics 4 та розрахунок окупності ROI"
        ],
        "Основи Кібербезпеки та захисту даних": [
            "Модуль 1: Огляд кіберзагроз, класифікація шкідливого ПЗ та вразливостей систем",
            "Модуль 2: Криптографія, протоколи шифрування даних SSL/TLS та хэшування",
            "Модуль 3: Вивчення вразливостей вебдодатків (OWASP Top 10): захист від SQL-inj та XSS",
            "Модуль 4: Безпека корпоративних мереж, налаштування брандмауерів та систем моніторингу",
            "Модуль 5: Розробка політики конфіденційності, захист персональних даних та бекапи"
        ],
        "Управління IT-проектами (Agile, Scrum)": [
            "Модуль 1: Роль PM в ІТ-індустрії та етапи життєвого циклу розробки програмного ПЗ",
            "Модуль 2: Гнучкі методології: Маніфест Agile, детальний розбір фреймворків Scrum та Kanban",
            "Модуль 3: Спринти, декомпозиція вимог, оцінка завдань та ведення продуктового беклогу",
            "Модуль 4: Робота з професійними трекерами завдань (Jira, Trello) та побудова звітів",
            "Модуль 5: Управління ризиками проєкту, комунікаційні матриці та ретроспективи команд"
        ],
        "Дизайн інтерфейсів UI/UX у Figma": [
            "Модуль 1: Дослідження користувацького досвіду (UX) та побудова карт шляху клієнта",
            "Модуль 2: Правила інтерфейсів (UI): робота з типографікою, колористика та модульною сіткою",
            "Модуль 3: Вивчення інструментарію Figma: фрейми, вектори, автолейаути та компоненти",
            "Модуль 4: Створення складних клікабельних інтерактивних прототипів та мікроанімацій",
            "Модуль 5: Юзабіліті-тестування макетів, адаптація под смартфони та передача у розробку"
        ],
        "Аналітика даних за допомогою Python": [
            "Модуль 1: Основи програмування на Python для аналізу інформації: структури та цикли",
            "Модуль 2: Обробка та очищення великих масивів структурованих таблиць у бібліотеці Pandas",
            "Модуль 3: Математичні обчислення, робота з багатовимірними матрицями в NumPy",
            "Модуль 4: Побудова інформативних діаграм та графіків за допомогою Matplotlib та Seaborn",
            "Модуль 5: Статистичні гіпотези, виявлення аномалій та збір даних з відкритих вебсайтів"
        ],
        "Основи Штучного Інтелекту та Prompt-Engineering": [
            "Модуль 1: Огляд архітектури великих мовних моделей ШІ (LLM) та машинного навчання",
            "Модуль 2: Принципи формулювання чітких, контекстуальних запитів (промптів) для нейромереж",
            "Модуль 3: Використання генеративного ШІ для автоматизації коду, текстів та аналітики",
            "Модуль 4: Мультимодальні інструменти штучного інтелекту для розробки графіки та дизайну",
            "Модуль 5: Обмеження систем ШІ, етика використання та отимізація бізнес-задач за допомогою ШІ"
        ]
    };

    useEffect(() => {
        fetch('https://course-portal-backend-uo2f.onrender.com/api/courses/popular')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const nextSlide = () => {
        setActiveSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!userName.trim() || !userEmail.trim()) {
            setErrorMessage('Помилка: Дані не введено!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            setErrorMessage('Помилка: Неправильний формат пошти! Адреса повинна містити знак @');
            return;
        }

        setIsRegistered(true);
    };

    const openPanel = (course, step) => {
        setSelectedCourse(course);
        setPanelStep(step);
        setUserName('');
        setUserEmail('');
        setErrorMessage('');
        setIsRegistered(false);
        setIsPanelOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="container text-center my-5"><h4>Завантаження даних...</h4></div>;
    }

    return (
        <div className="container my-4 px-3 fade-in-page">
            <h1 className="mb-4 fw-bold text-dark text-center" style={{ fontFamily: 'Times New Roman', fontSize: 'calc(1.3rem + 1.2vw)' }}>
                EduSpace - Портал онлайн-курсів
            </h1>

            {/* ВБУДОВАНИЙ БЛОК: СЛАЙДЕР АБО ПАНЕЛЬ ЗМІСТУ */}
            {!isPanelOpen ? (
                courses.length > 0 && (
                    <div className="position-relative bg-dark text-white rounded-4 p-4 p-md-5 mb-5 shadow border border-secondary text-center">
                        <div className="px-5 mx-2">
                            <span className="badge bg-warning text-dark mb-3 fw-bold text-uppercase px-3 py-2 rounded-pill">Популярний курс</span>
                            <h2 className="fw-bold text-warning mb-3 fs-3 fs-md-2" style={{ fontFamily: 'Times New Roman' }}>{courses[activeSlide]?.title}</h2>
                            <p className="text-white-55 fs-5 mb-4 text-justify px-2" style={{ lineHeight: '1.6' }}>
                                {courses[activeSlide]?.description}
                            </p>
                            <button
                                className="btn btn-warning btn-lg fw-bold px-4 py-2 rounded-pill shadow"
                                onClick={() => openPanel(courses[activeSlide], 'register')}
                            >
                                Почати навчання
                            </button>
                        </div>
                        {/* Симетрично вирівняні та адаптовані стрілочки */}
                        <button onClick={prevSlide} className="btn btn-outline-warning rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 ms-md-4 fw-bold" style={{ width: '40px', height: '42px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>◀</button>
                        <button onClick={nextSlide} className="btn btn-outline-warning rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 me-md-4 fw-bold" style={{ width: '40px', height: '42px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>▶</button>
                    </div>
                )
            ) : (
                selectedCourse && (
                    <div className="bg-white rounded-4 border p-4 mb-5 shadow-sm animate-card-item">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                            <h3 className="fw-bold text-primary mb-0" style={{ fontFamily: 'Times New Roman' }}>{selectedCourse.title}</h3>
                            <button type="button" className="btn-close" onClick={() => setIsPanelOpen(false)}></button>
                        </div>

                        {panelStep === 'program' ? (
                            <div>
                                <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-1 rounded-pill">{selectedCourse.category}</span>
                                <h5 className="fw-bold text-dark mb-3">Детальний план освітньої програми:</h5>
                                <ul className="list-group list-group-flush mb-4 text-start">
                                    {(coursePrograms[selectedCourse.title] || [
                                        "Модуль 1: Основні поняття та аналітика предметної області",
                                        "Модуль 2: Проєктування архітектури та структури інформаційних рішень",
                                        "Модуль 3: Практична реалізація та розробка програмного коду",
                                        "Модуль 4: Тестування рішень, оптимізація та фінальний реліз проєкту"
                                    ]).map((stepText, index) => (
                                        <li key={index} className="list-group-item bg-transparent text-dark px-0 py-2.5 small border-bottom">
                                            ✔ {stepText}
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-warning fw-bold py-2.5 px-4 rounded-3 text-dark shadow-sm flex-grow-1"
                                        onClick={() => setPanelStep('register')}
                                    >
                                        Записатися на навчання
                                    </button>
                                    <button type="button" className="btn btn-secondary px-4 rounded-3" onClick={() => setIsPanelOpen(false)}>Повернутись</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {!isRegistered ? (
                                    <div className="bg-light p-3 rounded-3 border text-start">
                                        <h6 className="fw-bold text-primary mb-3">Введіть дані для відкриття навчального доступу:</h6>

                                        {errorMessage && <div className="alert alert-danger py-2 small fw-bold">{errorMessage}</div>}

                                        <div className="row g-2">
                                            <div className="col-12 col-sm-6">
                                                <input type="text" className="form-control" placeholder="Ваше ім'я" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <input type="text" className="form-control" placeholder="Ваш Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2 mt-3">
                                            <button className="btn btn-success fw-bold rounded-3 flex-grow-1 py-2" onClick={handleRegistration}>
                                                Підтвердити реєстрацію
                                            </button>
                                            {/* Виправлений логічний напис замість "Назад до плану" */}
                                            <button type="button" className="btn btn-outline-secondary fw-bold rounded-3 px-3" onClick={() => setPanelStep('program')}>План навчання</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-3">
                                        <div className="alert alert-success fw-semibold mb-3 py-4 rounded-3">
                                            Вітаємо, {userName}! Реєстрація успішна. Інструкції доступу надіслано на {userEmail}.
                                        </div>
                                        <button className="btn btn-primary px-4 fw-bold rounded-3" onClick={() => setIsPanelOpen(false)}>Повернутися до головної</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            )}

            <h3 className="border-bottom pb-3 mb-4 fw-bold text-secondary text-start" style={{ fontFamily: 'Times New Roman' }}>Рекомендовані програми:</h3>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 text-start mb-4">
                {courses.slice(0, 6).map((course, idx) => (
                    <div className="col animate-card-item" key={course._id} style={{ animationDelay: `${idx * 0.05}s` }}>
                        <div className="card h-100 rounded-4 shadow-sm border p-3 bg-white d-flex flex-column justify-content-between custom-card-style">
                            <div className="card-body p-2">
                                <div className="d-flex justify-content-between align-items-center mb-3 gap-2 flex-wrap">
                                    <span className="badge bg-secondary-subtle text-secondary-emphasis px-3 py-1 rounded-pill small fw-semibold">{course.category}</span>
                                    <span className="text-warning fw-bold">★ {course.rating}</span>
                                </div>
                                <h4 className="card-title fw-bold text-dark mb-2 fs-5" style={{ fontFamily: 'Times New Roman' }}>{course.title}</h4>
                                <p className="card-text text-muted small text-justify">{course.description}</p>
                            </div>
                            <div className="p-2 mt-auto">
                                <button
                                    className="btn btn-primary w-100 fw-bold py-2 rounded-3"
                                    onClick={() => openPanel(course, 'program')}
                                >
                                    Переглянути програму
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center my-5">
                <button
                    className="btn btn-outline-primary btn-lg fw-bold px-5 py-3 rounded-4 shadow-sm"
                    onClick={() => navigate('/courses')}
                >
                    Переглянути всі програми →
                </button>
            </div>
        </div>
    );
}

export default Home;