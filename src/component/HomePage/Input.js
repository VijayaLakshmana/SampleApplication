import React from "react";
import PropTypes from "prop-types";
export default function InputField(props) {
  return (
    <>
      <input
        type={props.type}
        onChange={props.onChange}
        className={props.className}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        pattern={props.pattern}
        title={props.title}
        required
      />
    </>
  );
}
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  pattern:PropTypes.string,
  title:PropTypes.string,
};
