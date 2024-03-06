import React from 'react';
import './SharedStyles.css';

function ContentHeader(props) {

    const { text } = props;

    return (
        <React.Fragment>
            <h1 className='ContentHeader' style={{color:'#5873FE', fontWeight:'normal'}}>
                {text}
            </h1>
        </React.Fragment>
    );
}


export { ContentHeader };

