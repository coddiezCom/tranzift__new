// import react liabary
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/profile.module.scss";
// import validation liabary
import * as Yup from "yup";
import { Form, Formik } from "formik";
// import react-icons
import { FaEdit } from "react-icons/fa";
// import components
import Layout from "../../components/profile/layout";
import ShippingInput from "../../components/inputs/shippingInput";
export function EditProfile({}) {
  const router = useRouter();
  const tab = router.query.tab || 0; // Accessing tab from query parameters
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    zipCode: "",
  };
  const [shipping, setShipping] = useState(initialValues);
  const { firstName, lastName, phoneNumber, zipCode, email } = shipping;
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
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
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
            zipCode,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              <ShippingInput name="firstName" placeholder="First Name*" onChange={handleChange} />
              <ShippingInput name="lastName" placeholder="Last Name*" onChange={handleChange} />
              <ShippingInput name="phoneNumber" placeholder="Phone number*" onChange={handleChange} />
              <ShippingInput name="email" placeholder="Email ID*" onChange={handleChange} />
              <ShippingInput name="zipCode" placeholder="*PIN code*" onChange={handleChange} />
              <span>
                <button type="submit">Save Changes</button>
                <button type="submit">cancel</button>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
const editProfile = ({ user }) => {
  const router = useRouter();
  const tab = router.query.tab || 0; // Accessing tab from query parameters
  return (
    <Layout session={user?.user} tab={tab}>
      <EditProfile user={user} />
    </Layout>
  );
};

export default editProfile;
