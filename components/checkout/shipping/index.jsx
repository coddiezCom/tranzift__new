// import liabary
import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
// import redux
import { useDispatch, useSelector } from "react-redux";
import { SetUserDetail } from "@/store/UserSlice";
// import user api requests
import { updateAddress, changeActiveAddress, deleteAddress, getAddress, saveAddress } from "../../../requests/user";
// import react icons
import { MdDelete } from "react-icons/md";
// import react toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stringAvatar } from "@/utils/avatarGenerator";
// import react Avatar
import { Avatar } from "@mui/material";
// import component
import AddressPopup from "./AddressPopup";

export default function Shipping({ user, addresses, setAddresses, profile }) {
  console.log(addresses, "addresses");
  const fullName = user?.firstName + " " + user?.lastName;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isToggleAddressForm, setIsToggleAddressForm] = useState(false);
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const saveShippingHandler = async (shipping) => {
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
      setAddresses(res?.addresses);
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    } finally {
      setIsToggleAddressForm(false);
    }
  };

  const deleteHandler = async (addressId) => {
    console.log("addressId", addressId);
    try {
      await deleteAddress(addressId);
      toast.success(`Address deleted Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.reload();
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    }
  };
  const toggleAddressForm = () => {
    setIsToggleAddressForm(!isToggleAddressForm);
  };
  const handleSelectedAddress = async (addressId) => {
    try {
      const res = await changeActiveAddress(addressId, user);
      dispatch(
        SetUserDetail({
          ...userDetail,
          defaultAddress: res?.user?.defaultAddress,
        })
      );
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    } finally {
      setSelectedAddress(addressId);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className={`${styles.shipping} flex flex-col w-full`}>
        {!profile && (
          <div className={styles.header}>
            <h3>Shipping Informations</h3>
          </div>
        )}

        <AddressPopup handleSubmit={saveShippingHandler} user={user} setAddresses={setAddresses} />
        <div className={`flex flex-wrap items-start w-full ${styles.addresses}`}>
          {addresses?.map((address, index) => {
            return (
              <div
                style={{ position: "relative" }}
                className={`w-1/3 ${
                  userDetail?.defaultAddress === address._id ? "" : "hover:scale-[1.05]"
                }   transition ease-in-out duration-700`}
                key={index}
              >
                <AddressPopup
                  role={"edit"}
                  user={user}
                  address={address}
                  handleSubmit={UpdateAddress}
                  setAddresses={setAddresses}
                />
                <div
                  className={`${styles.address__delete} text-gray-400 hover:text-red-700 transition ease-in-out delay-75 `}
                  onClick={() => deleteHandler(address._id)}
                >
                  <MdDelete />
                </div>
                <div
                  className={`${styles.address} ${address.active && styles.active} ${
                    userDetail?.defaultAddress === address._id ? "shadow-inner shadow-[#6176fe]   " : "shadow-md  "
                  } rounded-xl  `}
                  key={address._id}
                  onClick={() => handleSelectedAddress(address._id)}
                >
                  <div className={`${styles.address__side}`}>
                    <Avatar {...stringAvatar(fullName.toUpperCase())} />
                    <span>{fullName}</span>
                  </div>

                  <div className={`${styles.address__col}`}>
                    <span>{address.addressLineOne}</span>
                    <span>{address.addressLineTwo}</span>
                    <span>
                      {address.city}, {address.state} - {address.pincode}
                    </span>
                    <span>{address.country}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
