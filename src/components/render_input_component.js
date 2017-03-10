import React from 'react';
import { Input } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './component.scss';

const renderInput = ({ input, meta, defaultValue }) => {

  console.log(defaultValue)

  return (
    <div>
      <Input
        type="textarea"
        autosize={{ minRows: 6, maxRows: 9 }}
        placeholder="Enter some words"
        defaultValue={defaultValue}
        {...input}
      />
      {meta.touched && meta.error &&
      <span className="error" styleName="err_text">{meta.error}</span>}
    </div>
  );
};

export default CSSModules(renderInput, styles);
