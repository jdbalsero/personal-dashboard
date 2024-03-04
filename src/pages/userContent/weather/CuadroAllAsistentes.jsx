import React from 'react'
import imgDefaultUser from '../../../assets/images/programador.png';
import { IoIosStar } from 'react-icons/io';
import './AllAssistants.css'

function CuadroAllAsistentes(props) {

    const { asistente } = props;
    return (
        <div className='cuadroInfo sombra2' style={{background: asistente.bgColor}}>
            <div className='name-container'>
                <div className="assistant-name">
                    <span>{asistente.nombre}</span>
                </div>
            </div>
            <div className='img-container'>
                <img className='imgUser' src={imgDefaultUser} alt="usuario" />
            </div>
            <div className='rating-box'>
                {Array.from({ length: asistente.calification }).map((element, index) => 
                     <div key={index}>
                        <IoIosStar className='rating-star'/>
                     </div>
                )}
            </div>
            <div>
                <p><strong>Email: </strong> {asistente.correo}</p>
            </div>
        </div>
    )
}


export { CuadroAllAsistentes };