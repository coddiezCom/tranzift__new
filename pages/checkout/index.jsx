// import liabary
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// import styles
import styles from "@/styles/checkout.module.scss";
// import react icons
import { LuLoader2 } from "react-icons/lu";
// import react toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import cashfree payment
import { load } from "@cashfreepayments/cashfree-js";
// import redux liabary
import { useDispatch, useSelector } from "react-redux";
import { SetUserDetail } from "../../store/UserSlice";
// import user api requests
import apiHelper from "@/utils/apiHelper";
// import react icons
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
// import components
import AddressPopup from "../../components/checkout/shipping/AddressPopup";
import { getAddress } from "../../requests/user";
// import MUI Modal
import Modal from "@mui/material/Modal";

const getGiftCardDetail = (sku) => {
  const baseUrl = `giftcards/gcdetails/${sku}`;
  try {
    const giftCardDetail = apiHelper(baseUrl);
    return giftCardDetail;
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    throw error;
  }
};

export const ProductDetailLayout = ({
  data,
  Heading,
  useFor,
  billingAddressExist,
  handleBillingAddress,
  setIsToggleAddressForm,
  isToggleAddressForm,
  setPopupRole,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 ">
      {useFor != "billing" ? (
        <div className={"flex justify-start mr-auto"}>
          <h2 className="font-extrabold font-serif text-xl">{Heading}</h2>
        </div>
      ) : (
        <div className={"flex justify-between w-full mr-auto"}>
          <h2 className="font-extrabold font-serif text-xl md:text-2xl">{Heading}</h2>

          {billingAddressExist && (
            <span
              className="w-6 h-6 flex flex-row items-center justify-center shadow-md  text-[#1973e8] rounded cursor-pointer hover:text-white hover:bg-[#1973e8] transition-all ease-linear delay-150 "
              onClick={() => {
                setPopupRole("edit");
                setIsToggleAddressForm(!isToggleAddressForm);
              }}
            >
              <button>
                <FaEdit />
              </button>
            </span>
          )}
          <span
            className="w-6 h-6  flex flex-row items-center justify-center  shadow-md  text-[#1973e8] rounded cursor-pointer hover:text-white hover:bg-[#1973e8] transition-all ease-linear delay-150 "
            onClick={() => {
              setPopupRole("add");
              setIsToggleAddressForm(!isToggleAddressForm);
            }}
          >
            <button>
              <MdAdd size={20} />
            </button>
          </span>
        </div>
      )}
      <div className={`flex ${useFor == "billing" ? "flex-row" : "flex-col"} w-full gap-0`}>
        {useFor != "billing" ? (
          data.map((detail, index) => (
            <div key={index} className="  flex flex-row bg-gray-50/20  w-full py-1 px-2 justify-between">
              {detail.label && <span className="w-4/12 md:w-1/2 sm:text-sm text-xs">{detail.label}</span>}
              {detail.label === "Gift Card" ? (
                <span className="w-4/6 md:w-1/2 sm:text-sm text-xs">
                  <Image
                    src={detail.value}
                    className="w-3/4 h-full object-contain rounded-lg"
                    alt="Gift Card"
                    width={500}
                    height={500}
                  />
                </span>
              ) : (
                <span className="w-4/6 md:w-1/2 sm:text-sm text-xs">{detail.value}</span>
              )}
            </div>
          ))
        ) : (
          <div className={`w-full inline gap-0 ${styles._address}`}>
            {data.map(
              (detail, index) =>
                detail?.value && (
                  <p key={index} className={`sm:text-sm text-xs ${styles._add}`}>
                    {detail?.value}
                  </p>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const TermAndConditionModal = ({ data }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleTermAndConditionPopup = (value) => {
    setIsPopupVisible(value);
  };
  const {
    couponCode,
    minOrderPrice,
    applicableDays,
    applicableTimes,
    applicablePerDays,
    discountAmount,
    discountAmountType,
    applicableMedium,
    usageLimit,
    isUserVerificationRequired,
    isApplicableToAll,
    isVisibleToAll,
    createdAt,
  } = data;
  const formattedApplicableDays = applicableDays.join(", ");
  const offerData = [
    {
      icon: "🛍️",
      heading: "Coupon Code:",
      desc: couponCode,
    },
    {
      icon: "📦",
      heading: "Minimum Order:",
      desc: minOrderPrice,
    },
    {
      icon: "⏳",
      heading: "Applicable Days:",
      desc: formattedApplicableDays.toUpperCase(),
    },
    {
      icon: "📅",
      heading: "Usage Limit:",
      desc: `${applicableTimes} Times per ${applicablePerDays} Days per user`,
    },
    {
      icon: "💰",
      heading: "Discount:",
      desc: `${discountAmount}${discountAmountType == "percentage" ? "%" : "₹"}`,
    },
  ];
  return (
    <>
      <p className="underline text-red-700 cursor-pointer " onClick={() => handleTermAndConditionPopup(true)}>
        T&Cs
      </p>
      <Modal
        open={isPopupVisible}
        onClose={() => handleTermAndConditionPopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`${styles.__modalContent}`}
      >
        <div className="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-2/4 bg-white rounded-md border-solid p-10 shadow-md">
          <div className="relative">
            <span
              className="absolute top-0 right-0 cursor-pointer text-3xl   transition-all duration-500 "
              onClick={() => handleTermAndConditionPopup(false)}
            >
              X
            </span>
            <div className="font-serif">
              <h2 className="font-extrabold font-serif text-2xl py-2">🎉 Limited Period Offer! 🎉</h2>
              <ul className="flex flex-col gap-2 items-start pl-9 mt-1">
                {offerData?.map((items, index) => {
                  return (
                    <li key={index} className="flex flex-row cursor-pointer">
                      <span>{items?.icon}</span>
                      <span className="flex flex-row items-center">
                        <b>{items?.heading}</b>
                        <p>{items?.desc}</p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export const OrderSummary = ({ doPayment, giftCardState, handleDiscount, discount, gift_card, gift_card_coupon }) => {
  console.log(doPayment, giftCardState, handleDiscount, discount, gift_card, gift_card_coupon);
  const [showMoreCoupon, setShowMoreCoupon] = useState(null);
  const [couponData, setCouponData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const UserDetail = useSelector((state) => state.userDetail);
  console.log(UserDetail, "UserDetail");
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const baseUrl = "coupon/getallcoupons";
        const res = await apiHelper(baseUrl, {
          isActive: true,
          isVisibleToAll: true,
          isApplicableToAll: true,
        });
        setCouponData(res?.coupons);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoupon();
  }, []);

  let existingCoupon = [];
  existingCoupon = gift_card_coupon?.map((item) => {
    return item;
  });

  const updatedCoupon = [...existingCoupon, ...couponData];
  const billSumary = [
    {
      title: "Amount",
      value: `₹${giftCardState?.denomination || 0}`,
    },
    {
      title: "Quantity",
      value: `${giftCardState?.quantity || 0}`,
    },
    {
      title: "Discount",
      value: `${
        discount.type == "cashback"
          ? `₹${discount?.discountAmount || 0} (cashback)`
          : `₹${discount?.discountAmount || 0}`
      }`,
    },
    {
      title: "Other Charges",
      value: "₹0",
    },
    {
      title: "Order Total",
      value: `₹${giftCardState?.denomination * giftCardState?.quantity - discount?.discountAmount || 0}  `,
    },
  ];
  const handleToggleCoupon = (code) => {
    setShowMoreCoupon((showMoreCoupon) => !showMoreCoupon);
  };

  return (
    <>
      <ToastContainer />
      <div className={"shadow-2xl p-4 rounded-md w-[30%] flex flex-col gap-6    "}>
        <div className={"flex justify-start mr-auto"}>
          <h2 className="font-extrabold font-serif text-2xl">Cart Total</h2>
        </div>
        <div className="flex flex-col  w-full gap-0">
          {billSumary.map((items, index) => {
            return (
              <div key={index} className="flex flex-row    w-full py-2 px-4 justify-between text-sm">
                <span className="w-1/2 font-[verdana] text-xs sm:text-sm ">{items?.title}</span>
                <span className="w-1/2 text-end font-[verdana] text-xs sm:text-sm">{items?.value}</span>
              </div>
            );
          })}
          <button
            onClick={() => doPayment()}
            className="px-4 py-2 ml-auto text-center mt-4 text-base rounded-lg border-2 w-fit  border-solid text-[#1973e8]  border-[#1973e8] transition duration-300 ease-in-out transform hover:scale-105  hover:bg-[#1973e8] hover:text-white font-bold     "
          >
            Proceed To Pay
          </button>
        </div>

        <div className={"border-2 border-gray-300 flex flex-col w-full justify-start mr-auto p-2 rounded-md"}>
          <h2 className="font-thin font-serif mr-auto text-sm">If you have a coupon code, please apply it below.</h2>
          <div className=" w-full">
            <div className="relative border-2 border-gray-400 rounded-md mt-3">
              <label for="Search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="Search"
                value={discount.code}
                onChange={(e) => {
                  handleDiscount(e.target.value, "Write_Code");
                }}
                placeholder="Coupon Code."
                className={`${
                  discount.isActive ? "text-gray-800" : "text-gray-800"
                } w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm px-2`}
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                  <span className="sr-only">Search</span>
                  <span>
                    {discount?.code ? (
                      <span onClick={() => handleDiscount(null, "Remove_Code")} className="cursor-pointer ">
                        <RxCross2 className="w-4 h-4 text-red-700  rounded-full shadow-md border-2   box-content p-1 hover:shadow-lg hover:border-gray-400/15  hover:bg-red-700 hover:text-white transition ease-in-out duration-300 " />
                      </span>
                    ) : (
                      <span>{/* <FaCheck /> */}</span>
                    )}
                  </span>
                </button>
              </span>
            </div>
            <span className="appliedCouponDesc flex flex-row justify-center ">
              {discount.type && (
                <span className="text-xs text-green-700 my-1">
                  {discount?.type.toUpperCase()} ₹{discount?.discountAmount} will be credited on sucessful payment
                </span>
              )}
              {/* <span className="text-xs text-red-700 my-1">cashback of ₹10 will be credited on sucessful payment</span> */}
            </span>

            <div>
              <ul className="flex flex-col w-full justify-start items-center mr-auto px-4 p-2 rounded-md ">
                <div className={`max-h-64 w-full snap-x ${showMoreCoupon ? "overflow-y-scroll" : ""} `}>
                  {(!showMoreCoupon || updatedCoupon?.length < 3 ? updatedCoupon?.slice(0, 3) : updatedCoupon)?.map(
                    (item, index) => {
                      return (
                        <li
                          key={index}
                          className={`flex flex-col  justify-start items-start   border-b-[0.5px] border-gray-300 w-[100%]  py-2  gap-1 `}
                        >
                          <span className="flex flex-row font-sans text-base justify-between w-full items-baseline">
                            <p
                              className="cursor-pointer text-gray-600 border-2 px-1 py-0.5 text-xs font-bold rounded-sm border-dashed border-gray-800 hover:text-orange-800 hover:border-orange-800"
                              onClick={() => handleDiscount(item, "apply")}
                            >
                              {item?.couponCode}
                            </p>

                            <button
                              className={`  text-sm underline transition ease-in-out duration-500   ${
                                discount?.code == item?.couponCode
                                  ? "text-green-700 hover:text-green-800 cursor-not-allowed"
                                  : "text-[#1973e8] hover:text-blue-800 cursor-pointer"
                              } `}
                              onClick={() => handleDiscount(item, "apply")}
                              disabled={discount?.code == item?.couponCode}
                            >
                              {discount?.code == item?.couponCode ? "Applied" : "Apply"}
                            </button>
                          </span>
                          <span className="flex flex-row font-[verdana] ">
                            <p className="font-light text-sm text-black">Enjoy special discounts on your Gift card </p>
                          </span>
                          <span className="flex flex-row font-sans text-sm   ">
                            <TermAndConditionModal data={item} />
                            {/* <p className="text-[#087830]">Save ₹{item?.discountAmount}</p> */}
                          </span>
                        </li>
                      );
                    }
                  )}
                </div>
                {updatedCoupon?.length > 3 && (
                  <li
                    onClick={handleToggleCoupon}
                    className="flex flex-row font-serif text-base justify-center w-full pt-2 items-baseline"
                  >
                    <p className="underline text-sm text-[#087830] cursor-pointer flex items-center justify-center">
                      {showMoreCoupon ? "View Less" : "View All"} {isLoading && <LuLoader2 className="animate-spin" />}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const ProductDetails = ({ giftCardState }) => {
  console.log("giftCardState", giftCardState);
  const UserDetail = useSelector((state) => state.userDetail);
  console.log("UserDetail", UserDetail);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isToggleAddressForm, setIsToggleAddressForm] = useState(false);
  const [popupRole, setPopupRole] = useState(" ");
  const dispatch = useDispatch();
  const router = useRouter();
  const productDetails = [
    { label: "Product Name", value: giftCardState?.gift_card_name || "----" },
    { label: "Gift Card", value: "/images/gift_card/Fastrack_E-Gift_Card_dtp.jpg" }, // TODO: Replace with actual image
    { label: "Price", value: "₹" + giftCardState?.denomination || "----" },
    { label: "Quantity", value: giftCardState?.quantity || "----" },
  ];

  const receiverDetails = [
    { label: "Name", value: giftCardState?.reciver_name || "----" },
    { label: "Email", value: giftCardState?.reciver_email || "----" },
    { label: "Mobile", value: giftCardState?.reciver_phone_number || "----" },
    { label: "Message", value: "purchasing gift card" },
    {
      label: "Delivery Mode",
      value:
        giftCardState?.reciver_email && giftCardState?.reciver_phone_number
          ? "Email and Phone"
          : giftCardState?.reciver_email
          ? "Email"
          : "Phone",
    },
  ];
  useEffect(() => {
    const fetchAddressById = async () => {
      // defaultAddress nhi h kyu ki defaultAddress set hi nahi kiya
      const baseUrl = `address/address/${UserDetail?.defaultAddress}`;
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
    fetchAddressById();
  }, [UserDetail?.defaultAddress]);
  useEffect(() => {
    const fetchAddresses = async (userId) => {
      try {
        // Assuming getAddresses is an async function to fetch addresses
        const addresses = await getAddress(userId);
        setAddresses(addresses.addresses);
        return addresses.addresses;
      } catch (error) {
        console.log("[ADDRESS_PAGE]", error);
        setAddresses([]);
        return [];
      }
    };
    const loadAddresses = async () => {
      try {
        const addresses = await fetchAddresses(UserDetail?.user_id);
        setAddresses(addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]);
      }
    };

    loadAddresses();
  }, [UserDetail?.user_id]);

  const BillingDetails = [
    { label: "Address 1", value: userAddress?.addressLineOne || "" },
    { label: "Address 2", value: userAddress?.addressLineTwo || "" },
    { label: "City", value: userAddress?.city || "" },
    { label: "State", value: userAddress?.state + " - " || "" },
    { label: "Post/zip code", value: userAddress?.pincode || "" },
    { label: "Country", value: userAddress?.country || "" },
  ];
  const handleBillingAddress = (type) => {
    setIsToggleAddressForm(!isToggleAddressForm);
    return type;
  };

  const saveShippingHandler = async (shipping) => {
    const createAddressBaseUrl = "address/create-address";
    const getAddressBaseUrl = `address/get-all-address?associatedUser=${UserDetail?.user_id}`;
    const setDefaultAddressBaseUrl = `user/setdefaultaddress/${UserDetail?.user_id}`;
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
      setUserAddress(res?.address);
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
      throw new Error(error);
    } finally {
      setIsToggleAddressForm(false);
    }

    try {
      const res = await apiHelper(setDefaultAddressBaseUrl, {}, "PATCH", {
        addressId: userAddress?._id,
      });
      dispatch(
        SetUserDetail({
          ...UserDetail,
          defaultAddress: res?.user?.defaultAddress,
        })
      );
    } catch (error) {
      throw new Error("default address could not be set", error);
    }

    try {
      const getAddresses = await apiHelper(getAddressBaseUrl, {}, "GET");
      setAddresses(getAddresses?.addresses);
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
      throw new Error(" address could not be fetched in checkout", error);
    }
  };
  const UpdateAddress = async (shipping) => {
    const baseUrl = `address/address/${userAddress?._id}`;
    try {
      const res = await apiHelper(baseUrl, {}, "PATCH", {
        addressType: shipping.addressType || "shipping",
        addressLineOne: shipping.address1,
        addressLineTwo: shipping.address2 || "",
        landmark: shipping.landmark || "",
        city: shipping.city,
        state: shipping.state,
        country: shipping.country,
        pincode: Number(shipping.zipCode),
      });
      setUserAddress(res?.address);
      dispatch(
        SetUserDetail({
          ...UserDetail,
          defaultAddress: res?.user?.defaultAddress,
        })
      );
    } catch (error) {
      console.log("[SHIPING_PAGE]", error);
    } finally {
      setIsToggleAddressForm(false);
    }
  };
  // const toggleAddressForm = ( toggle ) => {
  //   // setIsToggleAddressForm(!isToggleAddressForm);
  //   setIsToggleAddressForm(toggle);
  // };
  const handleSelectedAddress = async (addressId) => {
    try {
      const res = await changeActiveAddress(addressId, UserDetail);
      dispatch(
        SetUserDetail({
          ...UserDetail,
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
      <div
        className={`shadow-xl p-4 rounded-md w-[70%] flex flex-wrap flex-row gap-6 ${styles.__productDetails__container}`}
      >
        <ProductDetailLayout data={productDetails} Heading={"Product Details"} />
        <ProductDetailLayout data={receiverDetails} Heading={"Receiver Details"} />
        <div>
          <ProductDetailLayout
            data={BillingDetails}
            Heading={"Billing Address"}
            useFor="billing"
            handleBillingAddress={handleBillingAddress}
            billingAddressExist={userAddress ? true : false}
            isToggleAddressForm={isToggleAddressForm}
            setIsToggleAddressForm={setIsToggleAddressForm}
            setPopupRole={setPopupRole}
          />
          {popupRole == "edit" ? (
            <AddressPopup
              usedIn={"checkout"}
              role={"edit"}
              address={userAddress}
              handleSubmit={UpdateAddress}
              setIsToggleAddressForm={setIsToggleAddressForm} // todo : change this on other place too
              isToggleAddressForm={isToggleAddressForm}
              user={UserDetail}
              setAddresses={setAddresses}
            />
          ) : (
            <AddressPopup
              usedIn={"checkout"}
              role={"add"}
              handleSubmit={saveShippingHandler}
              setIsToggleAddressForm={setIsToggleAddressForm}
              isToggleAddressForm={isToggleAddressForm}
              setAddresses={setAddresses}
            />
          )}
        </div>
      </div>
    </>
  );
};
const Index = ({}) => {
  const [giftCardDetails, setGiftCardDetails] = useState({
    gift_card: "",
    gift_card_coupon: [],
    sku: "",
  });
  const router = useRouter();
  const UserDetail = useSelector((state) => state.userDetail);
  const giftCardState = useSelector((state) => state.giftCardDetail);
  console.log(UserDetail, "UserDetail");
  const { gift_card, gift_card_coupon, sku } = giftCardDetails;
  useEffect(() => {
    const { query } = router;
    if (!query) {
      throw new Error("Query not found");
    }
    const gift_card_sku = query?.gift_card;
    console.log(gift_card_sku, "gift_card_sku");
    const fetchGiftCardDetails = async () => {
      console.log(gift_card_sku, "gift_card_sku");
      try {
        const gift_card_detail = await getGiftCardDetail(gift_card_sku);
        setGiftCardDetails({
          gift_card: gift_card_detail?.GCDetails,
          gift_card_coupon: gift_card_detail?.availableCoupons,
          sku: gift_card_sku,
        });
      } catch (error) {
        console.log("[CHECKOUT_ERROR]:", error);
      }
    };
    fetchGiftCardDetails();
    // initializeSDK(); // this is for cashfree
  }, []);

  

  const [discount, setDiscount] = useState({
    value: "",
    type: "",
    code: "",
    discountAmount: 0,
    netAmount: giftCardState?.denomination * giftCardState?.quantity,
    isActive: false,
  });
  const handleDiscount = async (coupon, type) => {
    if (type === "Write_Code") {
      // toast.success(`coply to clipboard: Write_Code`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } else if (type === "Remove_Code") {
      setDiscount({
        value: "",
        code: "",
        discountAmount: 0,
        netAmount: 0,
        type: "",
        isActive: false,
      });
    } else {
      try {
        const couponCode = coupon?.couponCode;
        const price = parseInt(giftCardState?.denomination);
        const quantity = parseInt(giftCardState?.quantity);
        const baseUrl = `coupon/validate-coupon`;
        const res = await apiHelper(baseUrl, {}, "POST", {
          price: price,
          qty: quantity,
          couponCode: couponCode,
          useremail: UserDetail?.email_id,
        });
        const { data } = res;
        setDiscount({
          ...discount,
          code: couponCode,
          discountAmount: data?.discount ? data?.discount : 0,
          netAmount: data?.netAmount,
          isActive: true,
          type: coupon?.discountApplicationType,
        });
        toast.success(`coply to clipboard: ${res.status}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error?.response?.data?.message} `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const doPayment = async () => {
    console.log("doPayment", giftCardState);
    const cashfree = await load({
      mode: "sandbox", //or production
    });
    console.log(cashfree);
    const baseUrl = "payment/createorder";
    try {
      const sampleData = {
        amount: discount?.netAmount,
        _id: UserDetail?.user_id,
        username: UserDetail?.firstName + UserDetail?.lastName,
        name: UserDetail?.firstName,
        email: UserDetail?.email_id,
        mobile: `${UserDetail?.phone}`,
      };
      console.log(sampleData, "sampleData");
      const orderResponse = await apiHelper(baseUrl, {}, "POST", sampleData);
      console.log(orderResponse, "orderResponse");
      console.log(orderResponse.data.payment_session_id, "orderResponse");
      let checkoutOptions = {
        paymentSessionId: orderResponse.data.payment_session_id,
        redirectTarget: "_self",
      };
      console.log(checkoutOptions, "checkoutOptions");
      const res = await cashfree.checkout(checkoutOptions);
      console.log(res, "res");
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <div className={`flex items-center justify-center ${styles.__checkout}`}>
      <div
        className={`  flex-wrap   m-4   rounded-md     flex flex-row items-start justify-between ${styles.__checkout__wrapper}`}
      >
        <ProductDetails giftCardState={giftCardState} />
        <OrderSummary
          doPayment={doPayment}
          giftCardState={giftCardState}
          handleDiscount={handleDiscount}
          discount={discount}
          gift_card={gift_card}
          gift_card_coupon={gift_card_coupon}
        />
      </div>
    </div>
  );
};

export default Index;
// export async function getServerSideProps(context) {
//   try {
//     const { query } = context;
//     const gift_card_sku = query?.gift_card;
//     const gift_card_detail = await getGiftCardDetail(gift_card_sku);
//     return {
//       props: {
//         gift_card: gift_card_detail?.GCDetails,
//         gift_card_coupon: gift_card_detail?.availableCoupons,
//         sku: gift_card_sku,
//         error: null, // Set error to null when there is no error
//       },
//     };
//   } catch (error) {
//     console.log("[CHECKOUT_ERROR]:", error);
//     return {
//       props: {
//         gift_card: null, // Set gift_card to null when there is an error
//         sku: null,
//         gift_card_coupon: null,
//         error: error.message || "error occurred",
//       },
//     };
//   }
// }

// const getGiftCardDetail = (sku) => {
//   try {
//     const baseUrl = `giftcards/gcdetails/${sku}`;
//     const giftCardDetail = apiHelper(baseUrl);
//     return giftCardDetail;
//   } catch (error) {
//     console.error("Error fetching gift cards:", error);
//     throw error;
//   }
// };
