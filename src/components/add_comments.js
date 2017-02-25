import React from 'react';
import { Field } from 'redux-form';
import Textarea from 'react-textarea-autosize';
import CSSModules from 'react-css-modules';
import styles from './component.scss';

const renderInput = (field) => {
  const { input, meta } = field;

  return (
    <div>
      <Textarea
        minRows={6}
        maxRows={9}
        placeholder="Enter some words"
        onFocus={input.onFocus}
        onBlur={input.onBlur}
      />
      {meta.touched && meta.error &&
      <span className="error" styleName="err_text">{meta.error}</span>}
    </div>
  );
};

const AddComments = () => (
  <div>
    <Field name="commentContent" component={CSSModules(renderInput, styles)} type="text" />
  {/*name is comentcontent to stay consistent with the name in database*/}
  </div>
  );

export default AddComments;
