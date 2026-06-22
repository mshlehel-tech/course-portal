import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import CoursesList from './pages/CoursesList';
import Contacts from './pages/Contacts';

function NavigationBar() {
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname === path
            ? "nav-link text-warning small fw-bold border-bottom border-warning pb-1 text-nowrap"
            : "nav-link text-white small fw-bold text-nowrap";
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow border-bottom border-warning">
                <div className="container overflow-x-auto">
                    <Link className="navbar-brand d-flex align-items-center fw-bold me-3" to="/">
                        <span className="text-warning me-1">Edu</span>Space
                    </Link>
                    <div className="navbar-nav ms-auto d-flex flex-row gap-2 gap-sm-3 py-1">
                        <Link className={getLinkClass("/")} to="/">Головна</Link>
                        <Link className={getLinkClass("/about")} to="/about">Про нас</Link>
                        <Link className={getLinkClass("/gallery")} to="/gallery">Галерея</Link>
                        <Link className={getLinkClass("/courses")} to="/courses">Курси</Link>
                        <Link className={getLinkClass("/contacts")} to="/contacts">Контакти</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <NavigationBar />

                <main className="flex-grow-1 my-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/courses" element={<CoursesList />} />
                        <Route path="/contacts" element={<Contacts />} />
                    </Routes>
                </main>

                <footer className="bg-dark text-light py-3 mt-auto text-center border-top border-secondary">
                    <p className="mb-0 small px-2">© 2026 Інформаційний портал «EduSpace» — Каталог онлайн-курсів</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;