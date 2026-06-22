import React from 'react';

function Gallery() {
    const galleryItems = [
        { id: 1, src: "/1.jpg" },
        { id: 2, src: "/2.jpg" },
        { id: 3, src: "/3.jpg" },
        { id: 4, src: "/4.jpg" },
        { id: 5, src: "/5.jpg" },
        { id: 6, src: "/6.jpg" }
    ];

    return (
        <div className="container my-4 px-3 fade-in-page">
            <h2 className="mb-4 text-center text-primary fw-bold" style={{ fontFamily: 'Times New Roman' }}>
                Медіагалерея сайту EduSpace
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {galleryItems.map((img, index) => (
                    <div className="col animate-card-item" key={img.id} style={{ animationDelay: `${index * 0.08}s` }}>
                        <div className="card h-100 shadow-sm overflow-hidden border-0 rounded-4 bg-white">
                            <div className="overflow-hidden bg-light" style={{ height: '230px' }}>
                                <img
                                    src={img.src}
                                    alt={`Елемент медіа ${img.id}`}
                                    className="w-100 h-100 img-fluid"
                                    loading="lazy"
                                    style={{
                                        transition: 'transform .4s ease',
                                        cursor: 'pointer',
                                        objectFit: 'cover'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div className="p-3 bg-white border-top">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;