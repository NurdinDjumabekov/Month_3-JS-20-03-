import "./style.scss";
import krest from "../../assets/icons/krest.svg";
import { useEffect } from "react";

const Modals = (props) => {
  const { openModal, children, closeModal, title } = props;
  const closeModalFN = () => closeModal();

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [openModal]);

  if (openModal) {
    return (
      <div className="modal">
        <div className="modal__shadow" onClick={closeModalFN}></div>
        <div className="modal__inner">
          <h6>{title}</h6>
          <button className="krest" onClick={closeModalFN}>
            <img src={krest} alt="x" />
          </button>
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
};

export default Modals;
