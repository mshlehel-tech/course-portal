const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mshlehel_db_user:Q48GXZsRVjDLqu3S@cluster0.tyh66up.mongodb.net/courses_db?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('DB Error:', err));

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    rating: Number,
    isPopular: Boolean
});

const Course = mongoose.model('Course', courseSchema);

// Ендпоінт для отримання популярних курсів
app.get('/api/courses/popular', async (req, res) => {
    try {
        const popularCourses = await Course.find({ isPopular: true }).limit(10);
        res.json(popularCourses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Ендпоінт для отримання всіх курсів
app.get('/api/courses', async (req, res) => {
    try {
        const allCourses = await Course.find();
        res.json(allCourses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Скрипт заповнення бази текстовими даними (Кирилиця безпечно зберігається в БД)
app.get('/api/seed', async (req, res) => {
    try {
        await Course.deleteMany({});

        const customCourses = [
            { title: "Основи Web-програмування: HTML, CSS, JavaScript", description: "Базовий курс з розробки адаптивних веб-сайтів для початківців з нуля.", category: "IT Технології", rating: 4.9, isPopular: true },
            { title: "Розробка додатків на React.js", description: "Вивчення компонентного підходу, хуків, маршрутизації та створення Single Page Applications.", category: "IT Технології", rating: 4.8, isPopular: true },
            { title: "Серверні технології Node.js та Express", description: "Створення та проектування серверних додатків, побудова REST API та інтеграція з базами NoSQL.", category: "IT Технології", rating: 4.7, isPopular: true },
            { title: "Бази даних: Від SQL до NoSQL MongoDB", description: "Проектування схем даних, робота з колекціями, запитами та хмарними серверами Atlas.", category: "IT Технології", rating: 4.9, isPopular: true },
            { title: "Інтернет-Маркетинг та просування брендів", description: "Стратегії digital-маркетингу, робота з таргетованою рекламою та аналітикою.", category: "Бізнес та Маркетинг", rating: 4.6, isPopular: true },
            { title: "Основи Кібербезпеки та захисту даних", description: "Головні принципи безпеки веб-додатків, захист від основних типів уразливостей та XSS атак.", category: "IT Технології", rating: 4.8, isPopular: true },
            { title: "Управління IT-проектами (Agile, Scrum)", description: "Практичні навички управління командами розробників, планування спринтів та релізів.", category: "Бізнес та Маркетинг", rating: 4.5, isPopular: true },
            { title: "Дизайн інтерфейсів UI/UX у Figma", description: "Створення прототипів сайтів, мобільних додатків та вивчення користувацького досвіду.", category: "Дизайн", rating: 4.7, isPopular: true },
            { title: "Аналітика даних за допомогою Python", description: "Вивчення бібліотек Pandas, NumPy та Matplotlib для аналізу великих масивів інформації.", category: "IT Технології", rating: 4.9, isPopular: true },
            { title: "Основи Штучного Інтелекту та Prompt-Engineering", description: "Робота з нейромережами та оптимізація запитів для вирішення прикладних бізнес-задач.", category: "IT Технології", rating: 4.8, isPopular: true }
        ];

        await Course.insertMany(customCourses);
        res.json({ success: true, message: 'Database seeded successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Seed error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});