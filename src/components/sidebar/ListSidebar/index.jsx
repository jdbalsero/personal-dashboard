import React from 'react';
import { ButtonSidebar } from '../ButtonSidebar';
import '../ButtonSidebar/ButtonSidebar.css';

function ListSidebar(props) {

    const { selectedOption, isCollapsed } = props;

    return (
        <ul className={props.className}>
            {props.options.map((option) => (
                <li key={option.name}>
                    {(option.name === "Support" || option.name === "Messages Admin")? 
                        <ButtonSidebar
                            className={`ButtonSidebar ${isCollapsed ? 'collapsed' : ''} ${selectedOption === option.name ? 'selected' : ''}`
                            }
                            onClick={() => props.onOptionClick(option.name)}
                            selected={props.selectedOption === option.name}
                            icon={option.icon}
                            children={!isCollapsed && option.name}
                        >
                        </ButtonSidebar>
                        : <ButtonSidebar
                            className={`ButtonSidebar ${isCollapsed ? 'collapsed' : ''} ${selectedOption === option.name ? 'selected' : ''}`
                            }
                            onClick={() => props.onOptionClick(option.name)}
                            selected={props.selectedOption === option.name}
                            icon={option.icon}
                            children={!isCollapsed && option.name}
                        >
                        </ButtonSidebar>
                    }
                </li>
            ))}
        </ul>
    );
}

export { ListSidebar };
