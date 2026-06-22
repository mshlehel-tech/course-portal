import React from 'react';

function Contacts() {
    return (
        <div className="container my-4 px-3">
            <div className="row g-4 align-items-stretch">
                {/* Інформаційний блок */}
                <div className="col-12 col-md-5">
                    <div className="bg-white p-4 rounded-4 shadow-sm border h-100 d-flex flex-column justify-content-center">
                        <h3 className="text-primary mb-4 fw-bold" style={{ fontFamily: 'Times New Roman' }}>
                            Контактна інформація
                        </h3>
                        <div className="fs-6 lh-lg text-dark">
                            <p className="mb-3">
                                <strong>Адреса:</strong> проспект Віталія Грицаєнка, 24, Полтава, Полтавська область, 36000 м. Полтава, Україна
                            </p>
                            <p className="mb-3">
                                <strong>Телефон:</strong> +38 (0532) 56-16-04
                            </p>
                            <p className="mb-0">
                                <strong>Університет:</strong> Національний університет "Полтавська політехніка імені Юрія Кондратюка"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Блок з картою */}
                <div className="col-12 col-md-7">
                    <div className="bg-white p-2 rounded-4 shadow-sm border h-100 overflow-hidden" style={{ minHeight: '350px' }}>
                        <iframe
                            title="Google Map Poltava"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.326265773646!2d34.56627097687834!3d49.5915598414451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d51a660a9161cb%3A0x6b8660dd75d3f237!2z0L_RgNC-0YHQvy4g0JLQuNGC0LDQu9C40Y8g0JPRgNC40YbQsNC10L3QutCwLCAyNCwg0J_QvtC70YLQsNCy0LAsINCf0L7Qu9GC0LDQstGB0LrQsNGPINC-0LHQuy4sIDM2MDAw!5e0!3m2!1suk!2sua!4v1718742000000!5m2!1suk!2sua"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '350px', display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;