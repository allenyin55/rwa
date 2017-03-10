import React from 'react';
import Textarea from 'react-textarea-autosize';
import CSSModules from 'react-css-modules';
import styles from '../components/modal_component.scss';

const renderInput = ({ input, meta, placeholder, defaultValue, maxRows, minRows }) => {

  if(placeholder){
    return (
    <div>
      <Textarea
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
      />
      {meta.touched && meta.error &&
      <span className="error" styleName="err_text">{meta.error}</span>}
    </div>
  );
  }

  return (
    <div>
      <Textarea
        minRows={minRows}
        maxRows={maxRows}
        defaultValue={defaultValue}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
      />
      {meta.touched && meta.error &&
      <span className="error" styleName="err_text">{meta.error}</span>}
    </div>
  );
};

export default CSSModules(renderInput, styles);