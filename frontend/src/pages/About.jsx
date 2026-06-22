import React from 'react';

function About() {
    return (
        <div className="container my-4 px-3 fade-in-page">
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
                <h2 className="text-primary mb-4 fw-bold" style={{ fontFamily: 'Times New Roman' }}>
                    Про веб-портал EduSpace
                </h2>
                <p className="fs-5 text-justify mb-4" style={{ color: '#212529', lineHeight: '1.7' }}>
                    Цей веб-ресурс є інтегрованим інформаційним каталогом, розробленим для зручного пошуку, структуризації та систематизації актуальних освітніх програм та онлайн-курсів.
                </p>

                <div className="alert alert-warning p-4 rounded-4 border-start border-4 border-warning shadow-sm mb-0">
                    <p className="mb-0 text-justify fw-semibold text-dark fs-6" style={{ lineHeight: '1.6' }}>
                        Метою створення цього додатку є надання користувачам безкоштовного та швидкого доступу до сучасних знань у сферах веб-програмування, штучного інтелекту, кібербезпеки та менеджменту бізнесу.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;