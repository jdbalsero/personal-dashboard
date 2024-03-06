import React from "react";
import { format } from 'date-fns';
import './PopupInfoNews.css'

function PopupInfoNews(props) {
    const { selectedNew, classHeader, closePopup } = props;
    const isMobile = window.innerWidth <= 600;

    return (
        <React.Fragment>
            <div className="full-news-modal">
                <div className="modal-task-upper">
                    <div className={`modal-task-header ${classHeader}`}>
                        <section className="modal-news-header-right">
                            <label className="modal-news-label">Publication Date: {selectedNew.publishedAt ? format(new Date(selectedNew.publishedAt), 'MM/dd/yyyy HH:mm') : 'Unkown'}</label>
                            <label className="modal-news-label">Author: {selectedNew.author ? selectedNew.author : 'Unknown'}</label>
                            <label className="modal-news-label">Source: {selectedNew.source.name ? selectedNew.source.name : 'Unknown'}</label>
                        </section>
                    </div>
                    <div className="modal-news-header-title">
                        <h2>{selectedNew.title}</h2>
                    </div>
                </div>
                <div className="modal-task-description">
                    <p className="modal-task-description-text">{selectedNew.description ? selectedNew.description : 'Description: No Description Provided.'}</p>
                </div>
                <div className="modal-task-description">
                    <p className="modal-task-description-text">Source URL: <a href={selectedNew.url} target="_blank" rel="noreferrer">Go to New</a></p>
                </div>
            </div>
        </React.Fragment>
    )
}

export { PopupInfoNews };