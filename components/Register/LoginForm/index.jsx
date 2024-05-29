import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import FormInput from "@/components/inputs/FormInput";
// react-icons
import { HiMiniLockClosed } from "react-icons/hi2";
// Mui-Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// Mui colors
import * as Yup from "yup"; // Import Yup for validation
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { setCookie } from "nookies"; // Import nookies package
import { useDispatch } from "react-redux";
import { SetUserDetail } from "@/store/UserSlice";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { SetToggleRegisterPopup } from "@/store/ToggleRegisterPopup";
import { useMediaQuery } from "react-responsive";
import apiHelper from "@/utils/apiHelper";
import { Form, Formik } from "formik";
const blueShadeStyle = {
  textTransform: "capitalize",
  backgroundImage: "linear-gradient(to bottom right, #00c6ff, #0072ff)",
  fontSize: "1em",
  fontWeight: "700",
  color: "white",
  "&:hover": {},
};

const validationSchema_ = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

const index = ({ gotoSignUp, handleModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initValue = {
    email: "",
    password: "",
    cPassword: "",
  };
  const [userDetails, setUserDetails] = useState(initValue);
  const { email, password, cPassword } = userDetails;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginRes = await apiHelper("authenticate/login", {}, "Post", {
        email: email,
        password: password,
      });
      dispatch(
        SetUserDetail({
          user_id: loginRes.user._id,
          email_id: loginRes.user.email,
          token: loginRes.token,
          firstName: loginRes.user.firstName,
          lastName: loginRes.user.lastName,
          phone: loginRes.user.phoneNo,
          defaultAddress: loginRes.user.defaultAddress,
        })
      );
      // Set the token in a cookie
      setCookie(null, "token", loginRes.token, {
        path: "/", // Set the cookie path
        maxAge: 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 30 days)
        // Other options can be set as well, such as 'secure', 'httpOnly', 'sameSite', etc.
      });
      handleModal(false);
    } catch (validationErrors) {
      console.log(validationErrors, "validationErrors");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    cPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const isTablet = useMediaQuery({ query: "(max-width:768px)" });
  return (
    <>
      <div className={`${styles.__container} `}>
        <div className={`${styles.__container__form} `}>
          {isTablet && (
            <div className={`fw-bold   flex items-center justify-center ${styles.__container__form__icon}`}>
              <Link href={"/"} className=" w-14  flex">
                <Image src={"/logo.png"} alt="RMYLogo" width={100} height={100} />
              </Link>
            </div>
          )}
          <div className={`flex justify-center flex-col mx-auto ${styles.__container__form__heading} `}>
            <h3 className="mt-1 text-center text-xl font-extrabold text-gray-700 font-serif">Log In To Tranzift</h3>
          </div>
          <div className={`${styles.__container__form__wrapper} `}>
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
                cPassword,
              }}
              validationSchema={validationSchema}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {(formik) => (
                <Form
                  className={styles.__container__leftContainer__formContainer__form}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <FormInput
                    name="email"
                    styleType={"type2"}
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange}
                  />
                  <FormInput
                    name="password"
                    styleType={"type2"}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                  <FormInput
                    name="cPassword"
                    type="password"
                    styleType={"type2"}
                    placeholder="Confirm Password"
                    value={cPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className={`shadow-md px-1 py-2 text-sm font-bold bg-[#6176fe] w-24 text-[#fff] shadow-gray-500 transition delay-200  rounded-md  hover:bg-[#6176fe] hover:text-[#fff] `}
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {/* {isTablet && (
          <div>
            <hr />
            <div className="m-auto flex flex-row items-center justify-center">
              <p className={`font-sans text-base my-1 font-semibold `}>Don`t have an account?</p>
              <button onClick={gotoSignUp} className="capitalize font-sans text-base my-1 font-semibold text-[#1976d2]">
                Sign Up
              </button>
            </div>
          </div>
        )} */}
        </div>
        <div className={`${styles.__container__sideBar}`}>
          <div className={` ${styles.__container__sideBar__wrapper}`}>
            <div className={` ${styles.__container__sideBar__wrapper__bgImg}`}></div>
            <div className={`text w-100  ${styles.__container__sideBar__wrapper__content}`}>
              <div className={`fw-bold   flex items-center justify-center ${styles.__container__form__icon}`}>
                <Link href={"/"} className="brand flex">
                  <Image src={"/logo.png"} alt="RMYLogo" width={100} height={100} />
                </Link>
              </div>
              <div className={styles.__container__sideBar__wrapper__content__text}>
                <h3 className={`font-semibold text-2xl font-serif text-zinc-800  `}>Welcome to Tranzift</h3>
                <p className={`font-sans text-xl my-1 font-semibold`}>Don`t have an account?</p>
                <Button
                  className=" "
                  variant="outlined"
                  color="error"
                  sx={{ textTransform: "capitalize " }}
                  onClick={gotoSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
