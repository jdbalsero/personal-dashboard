import React, { useContext, useState, useEffect, useRef } from "react";
import { format } from 'date-fns';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CustomizedSnackbar } from '../../../components/Shared/Snackbar';
import { GlobalContext } from '../../../context/GlobalContext'
import './PopupInfoTaskToApprove.css'
const MySwal = withReactContent(Swal);

function PopupInfoTaskToApprove(props) {
    const { selectedNew, classHeader, closePopup } = props;
    const SnackbarRef = useRef();
    const isMobile = window.innerWidth <= 600;

    return (
        <React.Fragment>
            <CustomizedSnackbar
                open={SnackbarRef.open}
                severity={SnackbarRef.snackbarType}
                message={SnackbarRef.snackbarMessage}
                handleClose={SnackbarRef.handleClose}
                ref={SnackbarRef}
            />
            <div className="full-task-modal">
                <div className="modal-task-upper">
                    <div className={`modal-task-header ${classHeader}`}>
                        <section className="modal-task-header-right">
                            <label className="modal-task-label">Publication Date: {selectedNew.publishedAt ? format(new Date(selectedNew.publishedAt), 'MM/dd/yyyy HH:mm') : 'Unkown'}</label>
                            <label className="modal-task-label">Author: {selectedNew.author ? selectedNew.author : 'Unknown'}</label>
                            <label className="modal-task-label">Source: {selectedNew.source.name ? selectedNew.source.name : 'Unknown'}</label>
                        </section>
                    </div>
                    <div className="modal-task-header-title">
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

export { PopupInfoTaskToApprove };