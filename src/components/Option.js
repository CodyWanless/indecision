import React from 'react';

const Option = (props) => {
    const optionText = props.optionText;
    return (
        <div className="option">
            <p className="option__text">{props.count}. {optionText}</p>
            <button 
                className="button button--link"
                onClick={e => props.handleDeleteOption(optionText)}>
                Remove
            </button>
        </div>
    );
};

export default Option;