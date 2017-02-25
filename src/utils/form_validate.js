const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a Title';
  }

  if (!values.review) {
    errors.review = 'Enter some review';
  }
  if(!values.noteTitle) {
    errors.content = "Enter the note title";
  }
  if(!values.content) {
    errors.content = "Enter some notes";
  }
  if(!values.commentContent){
    errors.commentContent = "Enter some comments"
  }
  if(!values.word){
    errors.word = "Enter a word"
  }

  return errors;
};

export default validate;
