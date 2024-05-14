import React, { useState } from "react";
import styles from "@/styles/register.module.scss";
// Mui-Components
import Modal from "@mui/material/Modal";
// Mui color
import * as Yup from "yup"; // Import Yup for validation
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { SetToggleRegisterPopup } from "../../store/ToggleRegisterPopup";
import LoginForm from "@/components/Register/LoginForm";
import SignUpForm from "@/components/Register/SignUpForm";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});
const Index = ( ) => {
  const [selectedOption, setSelectedOption] = useState("Login");
  const dispatch = useDispatch();
  const { toggleRegisterPopup } = useSelector((state) => ({ ...state }));
  const handleModal = (value) => {
    console.log("hii");
    dispatch(SetToggleRegisterPopup(value));
  };
  return (
    <>
      <div onClick={() => handleModal(true)} className={styles.registerBtn}>
        Login/Signup
      </div>
      <Modal
        open={toggleRegisterPopup}
        onClose={() => handleModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.__mainContainer}>
          <div className={`${styles.__mainContainer__container}  rounded-lg overflow-hidden`}>
            <div className={`${styles.__mainContainer__container__closeIcon} `} onClick={() => handleModal(false)}>
              <AiOutlineClose />
            </div>
            {selectedOption == "Login" ? (
              <LoginForm handleModal={handleModal} gotoSignUp={() => setSelectedOption("SignUP")} />
            ) : (
              <SignUpForm handleModal={handleModal} goToLogin={() => setSelectedOption("Login")} />
            )}
          </div>
          <div className={styles.__mainContainer__overlay} onClick={() => handleModal(false)}></div>
        </div>
      </Modal>
    </>
  );
};

export default Index;
