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

const AddressPopup = ({ address, role, usedIn, user, setAddresses , handleSetDefaultAddress=()=>{} }) => {
  const [isToggleAddressForm, setIsToggleAddressForm] = useState(false);
  // TODO : make this SavingShippingHandler or UpdateAddress in Shipping Component
  const saveAddressHandler = async (shipping) => {
    // console.log(shipping, "saveShippingHandler -> shippingData");
    const res = await saveAddress(shipping, user);
    try {
      const getAddresses = await getAddress(res.associatedUser);
      setAddresses(getAddresses?.addresses);
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    } finally {
      setIsToggleAddressForm(false);
    }
  };

  const UpdateAddress = async (shipping) => {
    console.log(shipping, "UpdateAddress -> shippingData");
    try {
      const res = await updateAddress(shipping, user); // name is same as parent function name(UpdateAddress)
      console.log(res , "res");
      // setAddresses(res?.addresses);
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    } finally {
      setIsToggleAddressForm(false);
    }
  };
  const handleSubmit = (address) => {
    if (role == "edit") {
      UpdateAddress(address);
    } else {
      saveAddressHandler(address);
    }
  };
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
