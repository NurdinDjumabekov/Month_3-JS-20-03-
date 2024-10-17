import React from "react";

const SendInput = (props) => {
  const { value, onChange, title, name, placeholder } = props;
  const { type, maxLength, typeInput } = props;

  return (
    <div className="inputSend">
      <p>{title}</p>
      {typeInput == "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
        />
      ) : (
        <input
          type={type ? type : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          maxLength={type == "number" ? 14 : 100}
        />
      )}
    </div>
  );
};

export default SendInput;
