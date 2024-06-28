import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/signup.module.scss";
import Image from "next/image";
// react-icons
import { HiMiniLockClosed } from "react-icons/hi2";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
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
import { useMediaQuery } from "react-responsive";
import apiHelper from "@/utils/apiHelper";
// import yup validation
import { Form, Formik } from "formik";
import FormInput from "@/components/inputs/FormInput";
const blueShadeStyle = {
  textTransform: "capitalize",
  backgroundImage: "linear-gradient(to bottom right, #00c6ff, #0072ff)",
  fontSize: "1em",
  fontWeight: "700",
  color: "white",
  "&:hover": {},
};
const index = ({ goToLogin, toggleUserMenu }) => {
  const dispatch = useDispatch();
  const initValue = {
    fName: "",
    lName: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const [userDetails, setUserDetails] = useState(initValue);

  const validationSchema = Yup.object().shape({
    fName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z ]+$/, " Name should contain only letters"),
    lName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z ]+$/, " Name should contain only letters"),
    phone: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    cPassword: Yup.string().required("Confirm Password is required"),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const { fName, lName, phone, email, password, cPassword } = userDetails;
  const isEmailAlreadyExists = async (email) => {
    if (email) {
      try {
        const baseUrl = "user/checkisemailunique";
        const isEmailExist = await apiHelper(baseUrl, {}, "POST", {
          email: email,
        });
        if (!isEmailExist.isUnique) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is already taken",
          }));
        } else {
          // Clear email error if it was previously set
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      console.log("handleSubmit is Clicked");
      const baseUrl = "authenticate/signup";
      const signup = await apiHelper(baseUrl, {}, "POST", {
        firstName: fName,
        lastName: lName,
        phoneNo: phone,
        // userName: formData1?.userName,
        email: email,
        password: password,
        confirmPassword: cPassword,
      });
      console.log(signup, "signup");
      // console.log(signup, "signup");
      if (signup.status == "success") {
        // console.log("success");
        console.log(signup, "signup");
        dispatch(
          SetUserDetail({
            user_id: signup.user._id,
            email_id: signup?.user?.email,
            token: signup?.token,
            firstName: signup?.user?.firstName,
            lastName: signup?.user?.lastName,
            phone: signup?.user?.phoneNo,
          })
        );
        // Set the token in a cookie
        setCookie(null, "token", signup.token, {
          path: "/", // Set the cookie path
          maxAge: 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 30 days)
          // Other options can be set as well, such as 'secure', 'httpOnly', 'sameSite', etc.
        });
        toggleUserMenu(false);
      } else {
        alert("error");
      }
    } catch (error) {
      console.error("Error during signup:", error); // Log the full error for debugging
      if (error?.response?.data?.message) {
        // If there's a specific error message from the server, show it
        alert(error.response.data.message);
      } else {
        // Otherwise, show a generic error message
        alert("An error occurred during signup.");
      }
    }
  };
  const isTablet = useMediaQuery({ query: "(max-width:768px)" });

  return (
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
          <h3 className="mt-1 text-center text-xl font-extrabold text-gray-700 font-serif">Sign Up To Tranzift</h3>
        </div>
        <div className={`${styles.__container__form__wrapper} `}>
          <Formik
            enableReinitialize
            initialValues={{
              fName,
              lName,
              phone,
              email,
              password,
              cPassword,
            }}
            validationSchema={validationSchema}
            onSubmit={(e)=>handleSubmit(e)}
          >
            {(formik) => (
              <Form>
                <FormInput
                  name="fName"
                  placeholder="First Name"
                  styleType={"type2"}
                  value={fName}
                  onChange={handleChange}
                />
                <FormInput
                  styleType={"type2"}
                  name="lName"
                  placeholder="Last Name"
                  value={lName}
                  onChange={handleChange}
                />
                <FormInput
                  name="phone"
                  styleType={"type2"}
                  placeholder="Phone Number"
                  value={phone}
                  onChange={handleChange}
                />
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
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
                <FormInput
                  name="cPassword"
                  styleType={"type2"}
                  placeholder="Confirm Password"
                  value={cPassword}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className={`shadow-md px-1 py-2 text-sm font-bold bg-[#6176fe] w-24 text-[#fff] shadow-gray-500 transition delay-200  rounded-md  hover:bg-[#6176fe] hover:text-[#fff] `}
                >
                  Sign Up
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
              <button onClick={goToLogin} className="capitalize font-sans text-base my-1 font-semibold text-[#1976d2]">
                log In
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
                {/* <MainLogo fontSize={"1.2em"} /> */}
                <Image src={"/logo.png"} alt="RMYLogo" width={100} height={100} />
              </Link>
            </div>
            <div className={styles.__container__sideBar__wrapper__content__text}>
              <h3 className={`font-semibold text-2xl font-serif text-zinc-800  `}>Welcome to Tranzift</h3>
              <p className={`font-sans text-xl my-1 font-semibold`}>If You have an account?</p>
              <Button
                className=" "
                variant="outlined"
                color="error"
                sx={{ textTransform: "capitalize " }}
                onClick={goToLogin}
              >
                log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
