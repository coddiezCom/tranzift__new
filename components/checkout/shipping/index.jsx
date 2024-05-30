// import liabary
import { useEffect, useState } from "react";
import styles from "@/components/checkout/shipping/styles.module.scss";
import { useRouter } from "next/router";
// import redux
import { useDispatch, useSelector } from "react-redux";
import { SetUserDetail } from "@/store/UserSlice";
// import UserDetail api requests
import { changeActiveAddress, deleteAddress } from "@/requests/user";
// import react icons
import { MdDelete } from "react-icons/md";
// import react toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stringAvatar } from "@/utils/avatarGenerator";
// import react Avatar
import { Avatar } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// import component
import AddressPopup from "./AddressPopup";
import apiHelper from "@/utils/apiHelper";

export default function Shipping({ profile }) {
  console.log({ profile });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isToggleAddressForm, setIsToggleAddressForm] = useState(false);
  const dispatch = useDispatch();
  const UserDetail = useSelector((state) => state.userDetail);
  const router = useRouter();
  const fullName = UserDetail?.firstName + " " + UserDetail?.lastName;
  console.log(UserDetail, userAddress, addresses);

  useEffect(() => {
    fetchDefaultAddressById();
  }, [UserDetail?.defaultAddress]);

  useEffect(() => {
    fetchAddresses();
  }, [UserDetail?.user_id]);

  const fetchDefaultAddressById = async () => {
    const baseUrl = `address/address/${UserDetail?.defaultAddress}`;
    console.log(UserDetail);
    console.log(baseUrl, "fetchAddressById -> baseUrl");
    //TODO: setup a tooltip to show alert that default address is not set

    if (!UserDetail?.defaultAddress) {
      return;
    }
    try {
      const response = await apiHelper(baseUrl);
      if (response?.addressDetails) {
        setUserAddress(response?.addressDetails);
      }
    } catch (error) {
      console.log("[ADDRESS_PAGE]", error);
    }
  };

  const fetchAddresses = async () => {
    const getAddressBaseUrl = `address/get-all-address?associatedUser=${UserDetail?.user_id}`;
    try {
      const getAddresses = await apiHelper(getAddressBaseUrl, {}, "GET");
      console.log(getAddresses, "getAddresses");
      setAddresses(getAddresses?.addresses);
    } catch (error) {
      throw new Error(" address could not be fetched in shipping ", error);
    }
  };

  const saveShippingHandler = async (shipping) => {
    console.log(shipping, "shipping");
    const createAddressBaseUrl = "address/create-address";
    try {
      const res = await apiHelper(createAddressBaseUrl, {}, "POST", {
        email: UserDetail?.email_id,
        addressType: shipping.addressType || "shipping",
        addressLineOne: shipping.address1,
        addressLineTwo: shipping.address2 || "",
        landmark: shipping.landmark || "",
        city: shipping.city,
        state: shipping.state,
        country: shipping.country,
        pincode: Number(shipping.zipCode),
      });
      console.log(res, "res -> saveShippingHandler -> AddressPopup");
      setUserAddress(res?.address); // set user address
      handleSelectedAddress(res?.address?._id);
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
      throw new Error(error);
    } finally {
      setIsToggleAddressForm(false);
    }

    fetchAddresses();
  };

  const handleSelectedAddress = async (addressId) => {
    console.log(addressId, "addressId");
    const setDefaultAddressBaseUrl = `user/setdefaultaddress/${UserDetail?.user_id}`;
    console.log(setDefaultAddressBaseUrl, "setDefaultAddressBaseUrl");

    try {
      // const res = await changeActiveAddress(addressId, UserDetail);
      const res = await apiHelper(setDefaultAddressBaseUrl, {}, "PATCH", {
        addressId: addressId,
      });
      console.log(res, "res -> saveShippingHandler -> AddressPopup");
      dispatch(
        SetUserDetail({
          ...UserDetail,
          defaultAddress: res?.user?.defaultAddress,
        })
      );
    } catch (error) {
      throw new Error("default address could not be set", error);
    } finally {
      setSelectedAddress(addressId);
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
      // router.reload();
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    } finally {
      fetchAddresses();
    }
  };

  const toggleAddressForm = () => {
    setIsToggleAddressForm(!isToggleAddressForm);
  };
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container} `}>
        {!profile && (
          <div className={styles.header}>
            <h3>Shipping Informations</h3>
          </div>
        )}
        <button className={styles.hide_show} onClick={() => setIsToggleAddressForm(!isToggleAddressForm)}>
          <span className="border-2 purple-blue-800  ">
            <span>{isToggleAddressForm ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
            Add Address
          </span>
        </button>
        <AddressPopup
          role={"add"}
          handleSubmit={saveShippingHandler}
          UserDetail={UserDetail}
          setAddresses={setAddresses}
          setIsToggleAddressForm={setIsToggleAddressForm}
          isToggleAddressForm={isToggleAddressForm}
        />
        <div className={`${styles.container__addresses}`}>
          {addresses?.map((address, index) => {
            return (
              <div
                className={`w-[32%] ${
                  UserDetail?.defaultAddress === address._id ? "" : "hover:scale-[1.05]"
                }   transition ease-in-out duration-700`}
                key={index}
              >
                <div
                  className={`${styles.address} ${address.active && styles.active} ${
                    UserDetail?.defaultAddress === address._id ? "shadow-inner shadow-[#6176fe]   " : "shadow-md  "
                  } rounded-xl  `}
                  key={address._id}
                  onClick={() => handleSelectedAddress(address._id)}
                >
                  <div className={`${styles.address__header} `}>
                    <div className={`${styles.address__header__avatar}`}>
                      <Avatar {...stringAvatar(fullName.toUpperCase())} />
                      <span>{fullName}</span>
                    </div>
                  </div>
                  <div className={`${styles.address__col}`}>
                    <div>{address.addressLineOne}</div>
                    <div>{address.addressLineTwo}</div>
                    <div>
                      {address.city}, {address.state} - {address.pincode}
                    </div>
                    <div>{address.country}</div>
                  </div>
                  <div className={`${styles.address__delete} text-red-700 `} onClick={() => deleteHandler(address._id)}>
                    <MdDelete />
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
