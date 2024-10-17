import React from "react";
import ReactInputMask from "react-input-mask";

const NumberInput = (props) => {
  const { value, onChange, title, name, placeholder } = props;

  const phoneMask = "0 999 99 99 99";

  return (
    <div className="inputSend">
      <p>{title}</p>
      <ReactInputMask
        mask={phoneMask} // Маска для ввода номера телефона
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default NumberInput;
