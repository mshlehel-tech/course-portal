import { useState, useEffect } from 'react';

function CoursesList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [panelStep, setPanelStep] = useState('program');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

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
            "Модуль 4: Проєткування архітектурних маршрутів та кінцевих точок REST API",
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
            "Модуль 2: Криптографічні методи, протоколи шифрування даних SSL/TLS та хэшування",
            "Модуль 3: Вивчення вразливостей вебдодатків (OWASP Top 10): захист від SQL-inj та XSS",
            "Модуль 4: Безпека корпоративних мереж, налаштування брандмауерів та систем моніторингу",
            "Модуль 5: Розробка політики конфіденційності, захист персональних даних та бекапи"
        ],
        "Управління IT-проектами (Agile, Scrum)": [
            "Модуль 1: Роль PM в ІТ-індустрії та етапи життєвого циклу розробки програмного ПЗ",
            "Модуль 2: Гнучкі методології: Маніфест Agile, фреймворки Scrum та Kanban",
            "Модуль 3: Спринти, декомпозиція вимог, оцінка завдань та ведення продуктового беклогу",
            "Модуль 4: Робота з таск-трекерами (Jira, Trello) та побудова діаграм згорання задач",
            "Модуль 5: Управління ризиками проєкту, комунікаційні матриці та ретроспективи команд"
        ],
        "Дизайн інтерфейсів UI/UX у Figma": [
            "Модуль 1: Дослідження користувацького досвіду (UX) та побудова карт шляху клієнта",
            "Модуль 2: Правила інтерфейсів (UI): робота з типографікою, колористика, сітки",
            "Модуль 3: Вивчення інструментарію Figma: фрейми, вектори, автолейаути та компоненти",
            "Модуль 4: Створення складних клікабельних інтерактивних прототипів та мікроанімацій",
            "Модуль 5: Юзабіліті-тестування макетів, адаптація під смартфони та передача у розробку"
        ],
        "Аналітика даних за допомогою Python": [
            "Модуль 1: Основи програмування на Python для аналізу інформації: структури та цикли",
            "Модуль 2: Обробка та очищення великих масивах структурованих таблиць у бібліотеці Pandas",
            "Модуль 3: Математичні обчислення, робота з багатовимірними матрицями в NumPy",
            "Модуль 4: Побудова інформативних діаграм та графіків за допомогою Matplotlib та Seaborn",
            "Модуль 5: Статистичні гіпотези, виявлення аномалій та збір даних з відкритих вебсайтів"
        ],
        "Основи Штучного Інтелекту та Prompt-Engineering": [
            "Модуль 1: Поняття нейромереж, машинного навчання та архітектури великих мовних моделей ШІ (LLM)",
            "Модуль 2: Принципи формулювання чітких, контекстуальних запитів (промптів) для нейромереж",
            "Модуль 3: Використання генеративного ШІ для автоматизації коду, текстів та аналітики",
            "Модуль 4: Мультимодальними інструменти штучного інтелекту для розробки графіки та дизайну",
            "Модуль 5: Обмеження систем ШІ, етика використання та оптимізація бізнес-задач за допомогою ШІ"
        ]
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
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

    const handleRegistration = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!userName.trim() || !userEmail.trim()) {
            setErrorMessage('Помилка: Дані не введено!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            setErrorMessage('Помилка: Неправильний формат пошти! Має бути присутній символ @');
            return;
        }

        setIsRegistered(true);
    };

    const openPanel = (course) => {
        setSelectedCourse(course);
        setPanelStep('program');
        setUserName('');
        setUserEmail('');
        setErrorMessage('');
        setIsRegistered(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="container text-center my-5"><h4>Завантаження каталогу...</h4></div>;
    }

    return (
        <div className="container my-4 px-3 fade-in-page">
            <h2 className="mb-4 text-dark text-center fw-bold" style={{ fontFamily: 'Times New Roman' }}>
                Всі доступні навчальні програми
            </h2>

            {/* Вбудована верхня панель перегляду для сторінки курсів (захист від чорного тла) */}
            {selectedCourse && (
                <div className="bg-white rounded-4 border p-4 mb-4 shadow-sm animate-card-item">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <h4 className="fw-bold text-dark mb-0" style={{ fontFamily: 'Times New Roman' }}>{selectedCourse.title}</h4>
                        <button type="button" className="btn-close" onClick={() => setSelectedCourse(null)}></button>
                    </div>

                    {panelStep === 'program' ? (
                        <div>
                            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-1 rounded-pill">{selectedCourse.category}</span>
                            <h5 className="fw-bold mb-3 small text-secondary">План занять навчального курсу:</h5>
                            <ul className="list-group list-group-flush mb-4 text-start">
                                {(coursePrograms[selectedCourse.title] || [
                                    "Модуль 1: Основні поняття та аналітика предметної області",
                                    "Модуль 2: Проєткування логічної структури та компонентів",
                                    "Модуль 3: Практична реалізація та веб-розробка",
                                    "Модуль 4: Тестування та фінальне розгортання проєкту"
                                ]).map((stepText, index) => (
                                    <li key={index} className="list-group-item bg-transparent text-dark px-0 py-2 small">
                                        ✔ {stepText}
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex gap-2">
                                <button className="btn btn-success fw-bold py-2 px-4 rounded-3 flex-grow-1" onClick={() => setPanelStep('register')}>
                                    Почати навчання
                                </button>
                                <button type="button" className="btn btn-outline-secondary px-4 rounded-3" onClick={() => setSelectedCourse(null)}>Сховати план</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {!isRegistered ? (
                                <div className="bg-light p-3 rounded-3 border text-start">
                                    <h6 className="fw-bold text-primary mb-3">Заповніть реєстраційну форму:</h6>
                                    {errorMessage && <div className="alert alert-danger py-2 small fw-bold">{errorMessage}</div>}
                                    <div className="row g-2">
                                        <div className="col-12 col-sm-6"><input type="text" className="form-control" placeholder="Ваше ім'я" value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
                                        <div className="col-12 col-sm-6"><input type="text" className="form-control" placeholder="Ваш Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /></div>
                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button className="btn btn-success fw-bold rounded-3 flex-grow-1 py-2" onClick={handleRegistration}>
                                            Зареєструватися
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary fw-bold rounded-3 px-3" onClick={() => setPanelStep('program')}>Назад до програми</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-2">
                                    <div className="alert alert-success text-center fw-semibold mb-3">
                                        Реєстрація пройшла успішно! Матеріали курсу надіслано на пошту {userEmail}.
                                    </div>
                                    <button className="btn btn-secondary px-4 rounded-3 fw-bold" onClick={() => setSelectedCourse(null)}>Закрити панель</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="d-flex flex-column gap-3">
                {courses.map(course => (
                    <div key={course._id} className="p-3 p-md-4 bg-white rounded-4 border shadow-sm d-flex justify-content-between align-items-stretch flex-column flex-md-row gap-3 custom-card-style">
                        <div style={{ flex: '1' }}>
                            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill small fw-semibold">{course.category}</span>
                                <span className="text-warning small fw-bold">★ {course.rating}</span>
                            </div>
                            <h5 className="mb-2 text-dark fw-bold" style={{ fontFamily: 'Times New Roman' }}>{course.title}</h5>
                            <p className="mb-0 text-muted small text-justify">{course.description}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-outline-primary fw-bold px-4 py-2 w-100 text-nowrap rounded-3"
                                onClick={() => openPanel(course)}
                            >
                                Детальніше
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CoursesList;