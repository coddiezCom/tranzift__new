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
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email_id || "",
    phoneNumber: user?.phone || "",
  };
  const [userDetail, setUserDetail] = useState(initialValues);
  const { firstName, lastName, phoneNumber, email } = userDetail;
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
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
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
      if (res.status === "success") {
        setUserDetail({
          ...user,
          firstName: res?.data?.user?.firstName,
          lastName: res?.data?.user?.lastName,
          email: res?.data?.user?.email,
          phoneNumber: res?.data?.user?.phoneNo,
        });
      }
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
              <FormInput
                name="firstName"
                placeholder="First Name*"
                onChange={handleChange}
              />
              <FormInput
                name="lastName"
                placeholder="Last Name*"
                onChange={handleChange}
              />
              <FormInput
                name="phoneNumber"
                placeholder="Phone number*"
                onChange={handleChange}
              />
              <FormInput
                name="email"
                placeholder="Email ID*"
                onChange={handleChange}
              />
              <span>
               <button type="submit" className="">Save Changes</button>
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
