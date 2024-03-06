import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { Popup } from '../../../components/Shared/Popup';
import { format } from 'date-fns';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';
import '../../../components/Shared/SharedStyles.css'
import { PopupInfoNews } from './PopupInfoNews';

function TableNews(props) {
    const { setActiveBlur } = useContext(GlobalContext)
    const [dataNews, setDataNews] = useState(props.data);
    const [selectedNew, setSelectedNew] = useState();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        setDataNews(props.data);
    }, [props.data]);

    const handleRowClick = ((rowData) => {
        setSelectedNew(rowData);
        setIsPopupOpen(true);
        setActiveBlur(true);
    })

    function closePopup() {
        setIsPopupOpen(false);
        setActiveBlur(false);
    }

    return <React.Fragment>
        <Popup isOpen={isPopupOpen} onClose={closePopup} modalClass="popup-info-task">
            {selectedNew && (
                <PopupInfoNews
                    selectedNew={selectedNew}
                    closePopup = {closePopup}
                />
            )}
        </Popup>
        <div className="table-news">
            <TableContainer>
                <Table>
                    <TableHead className="news-summary-head">
                        <TableRow>
                            <TableCell className="news-summary-headers">Title</TableCell>
                            <TableCell className="news-summary-headers">Source</TableCell>
                            <TableCell className="news-summary-headers">Publication Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="news-summary-body">
                        {dataNews.map((row, index) => {
                            return (
                            <TableRow className={`news-summary-row pointer`} onClick={() => handleRowClick(row)} key={index}>
                                <TableCell>{row.title ? row.title : ''}</TableCell>
                                <TableCell>{row.source.name ? row.source.name : 'No Source Specified'}</TableCell>
                                <TableCell>{row.publishedAt ? format(new Date(row.publishedAt), 'MM/dd/yyyy HH:mm') : 'No Date Specified'}</TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </React.Fragment>
}

export { TableNews };