import styles from "./styles.module.scss";
// import user api requests
import { updateAddress, changeActiveAddress, deleteAddress, getAddress, saveAddress } from "@/requests/user";
// import react icons
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import mui modal
import Modal from "@mui/material/Modal";
// import component
import AddressForm from "./AddressForm";
import apiHelper from "@/utils/apiHelper";

const AddressPopup = ({ address, role, usedIn, user, setAddresses, isToggleAddressForm, setIsToggleAddressForm,handleSubmit }) => {
 

  // const saveShippingHandler = async (shipping) => {
  //   const createAddressBaseUrl = "address/create-address";
  //   const getAddressBaseUrl = `address/get-all-address?associatedUser=${user?.user_id}`;

  //   try {
  //     const res = await apiHelper(createAddressBaseUrl, {}, "POST", {
  //       email: user?.email_id,
  //       addressType: shipping.addressType || "shipping",
  //       addressLineOne: shipping.address1,
  //       addressLineTwo: shipping.address2 || "",
  //       landmark: shipping.landmark || "",
  //       city: shipping.city,
  //       state: shipping.state,
  //       country: shipping.country,
  //       pincode: Number(shipping.zipCode),
  //     });
  //     console.log(res, "res -> saveShippingHandler -> AddressPopup");
  //   } catch (error) {
  //     console.log("[SHIPING_PAGE]", error);
  //     throw new Error("address could not be saved in AddressPopup");
  //   } finally {
  //     setIsToggleAddressForm(false);
  //   }

  //   try {
  //     const getAddresses = await apiHelper(getAddressBaseUrl, {}, "GET");
  //     console.log(getAddresses, "getAddresses");
  //     setAddresses(getAddresses?.addresses);
  //   } catch (error) {
  //     console.log("[SHIPING_PAGE]", error);
  //     throw new Error("address could not be fetched in AddressPopup");
  //   }
  // };

  // const UpdateAddress = async (shipping) => {
  //   console.log(shipping, "UpdateAddress -> shippingData");
  //   const baseUrl = `address/address/${address?._id}`;
  //   try {
  //     // const res = await updateAddress(shipping, user); // name is same as parent function name(UpdateAddress)
  //     const res = await apiHelper(baseUrl, {}, "PATCH", {
  //       addressType: shipping.addressType || "shipping",
  //       addressLineOne: shipping.address1,
  //       addressLineTwo: shipping.address2 || "",
  //       landmark: shipping.landmark || "",
  //       city: shipping.city,
  //       state: shipping.state,
  //       country: shipping.country,
  //       pincode: Number(shipping.zipCode),
  //     });
  //     console.log(res, "res");
  //     setAddresses(res?.addresses); // Todo for thuesday make update address functionalty
  //   } catch (error) {
  //     console.log("[SHIPING_PAGE]", error);
  //   } finally {
  //     setIsToggleAddressForm(false);
  //   }
  // };
  // const handleSubmit = (address) => {
  //   if (role == "add") {
  //     saveShippingHandler(address);
  //   } else if (role == "edit") {
  //     UpdateAddress(address);
  //   }
  // };
  return (
    <>
      {/* {!usedIn ? ( 
        role == "edit" ? (
          <button
            className={`${styles.address__Edit} text-[#6176fe] font-bold cursor-pointer`}
            onClick={() => setIsToggleAddressForm(true)}
          >
            Edit
          </button>
        ) : (
          <button className={styles.hide_show} onClick={() => setIsToggleAddressForm(true)}>
            <span className="border-2 purple-blue-800  ">
              <span>{isToggleAddressForm ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
              Add Address
            </span>
          </button>
        )
      ) : (
        ""
      )} */}
      {/* {role == "edit" ? (
        <button
          className={`${styles.address__Edit} text-[#6176fe] font-bold cursor-pointer`}
          onClick={() => setIsToggleAddressForm(true)}
        >
          Edit
        </button>
      ) : role == "add" ? (
        <button className={styles.hide_show} onClick={() => setIsToggleAddressForm(true)}>
          <span className="border-2 purple-blue-800  ">
            <span>{isToggleAddressForm ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            Add Address
          </span>
        </button>
      ) : (
        ""
      )} */}
      <Modal
        open={isToggleAddressForm}
        onClose={() => setIsToggleAddressForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "transparent" }}
        className={`my-2 ${styles.__modal}`}
      >
        <AddressForm
          role={role}
          address={address}
          handleSubmit={handleSubmit}
          closeForm={() => setIsToggleAddressForm(false)}
        />
      </Modal>
    </>
  );
};
export default AddressPopup;
