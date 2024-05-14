// import react liabary
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "@/styles/profile.module.scss";
// import validation liabary
import * as Yup from "yup";
import { Form, Formik } from "formik";
// import react-icons
import { FaEdit } from "react-icons/fa";
// import components
import Layout from "@/components/profile/layout";
import FormInput from "@/components/inputs/FormInput";
import apiHelper from "@/utils/apiHelper";
export function EditProfile({ user }) {
  console.log(user, "user");
  const router = useRouter();
  const tab = router.query.tab || 0; // Accessing tab from query parameters
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };
  const [userDetail, setUserDetail] = useState(initialValues);
  const { firstName, lastName, phoneNumber, zipCode, email } = userDetail;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      // .test('is-phone', 'Phone number is not valid', phone())
      .min(3, "Phone number must be atleast 3 characters long.")
      .max(30, "Phone number must be less than 20 characters long."),
    email: Yup.string().email("Email is not valid.").required("Email is required."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({ ...userDetail, [name]: value });
  };
  const handleSubmit = async (userDetail) => {
    console.log("handleSubmit is Clicked");
    try {
      const baseUrl = "authenticate/updateme";
      const res = await apiHelper(baseUrl, {}, "PATCH", {
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        email: userDetail.email,
        phoneNo: userDetail.phoneNumber,
        id: user.user_id,
      });
      console.log(res, "response");
      alert("update success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.__editProfile__container}>
      <div className={styles.header}>
        <h1>EDIT PROFILE</h1>
        <FaEdit />
      </div>
      <div className={styles.__form}>
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            email,
            phoneNumber,
          }}
          validationSchema={validate}
          onSubmit={(e) => {
            handleSubmit(userDetail);
          }}
        >
          {(formik) => (
            <Form>
              <FormInput name="firstName" placeholder="First Name*" onChange={handleChange} />
              <FormInput name="lastName" placeholder="Last Name*" onChange={handleChange} />
              <FormInput name="phoneNumber" placeholder="Phone number*" onChange={handleChange} />
              <FormInput name="email" placeholder="Email ID*" onChange={handleChange} />
              <button
                type="submit"
                onClick={() => console.log(formik)}
                className={`shadow-md px-1 py-2 text-sm font-bold bg-[#6176fe] w-24 text-[#fff] shadow-gray-500 transition delay-200  rounded-md  hover:bg-[#6176fe] hover:text-[#fff] `}
              >
                Save
              </button>
              {/* <button type="submit" className="hover:bg-red-500">Save Changes</button> */}
              <span>
                <button>cancel</button>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
const editProfile = ({ user }) => {
  const userData = useSelector((state) => state.userDetail);
  const router = useRouter();
  const tab = router.query.tab || 0; // Accessing tab from query parameters
  return (
    <Layout session={userData} tab={tab}>
      <EditProfile user={userData} />
    </Layout>
  );
};

export default editProfile;
