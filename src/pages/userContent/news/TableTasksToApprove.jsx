import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { Popup } from '../../../components/Shared/Popup';
import { format } from 'date-fns';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';
import '../../../components/Shared/SharedStyles.css'
import { PopupInfoTaskToApprove } from './PopupInfoTaskToApprove';

function TableTasksToApprove(props) {
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
                <PopupInfoTaskToApprove
                    selectedNew={selectedNew}
                    closePopup = {closePopup}
                />
            )}
        </Popup>
        <div className="table-tasks">
            <TableContainer>
                <Table>
                    <TableHead className="tasks-summary-head">
                        <TableRow>
                            <TableCell className="task-summary-headers">Title</TableCell>
                            <TableCell className="task-summary-headers">Source</TableCell>
                            <TableCell className="task-summary-headers">Publication Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tasks-summary-body">
                        {dataNews.map((row) => {
                            return (
                            <TableRow className={`task-summary-row pointer`} onClick={() => handleRowClick(row)} key={row.id}>
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

export { TableTasksToApprove };