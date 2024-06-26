import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { TablePagination } from "@mui/material";
import Modal from "@mui/material/Modal";
import { RxBorderWidth } from "react-icons/rx";
import dayjs from "dayjs";
import Layout from "../../components/profile/layout";
import styles from "@/styles/profile.module.scss";
import apiHelper from "@/utils/apiHelper";

const ViewOrderDetailPopup = ({ toggleAddressForm, isToggleAddressForm, orderData }) => {

  

  return (
    <>
      <div className=" py-0.5  text-[#1973e8]    text-sm  " onClick={() => toggleAddressForm(true)}>
        <button className="font-bold  underline">View Details</button>
      </div>
      <Modal
        open={isToggleAddressForm}
        onClose={() => toggleAddressForm()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "transparent" }}
        className={`my-2 ${styles.__modal}`}
      >
        <div className={`flex items-center justify-center  ${styles.__viewOrderPopup}`}>
          <div className="w-full flex flex-col items-start justify-start p-10 rounded-lg  border-gray-500/10    relative z-10 bg-white">
            <div className="order_header">
              <span className="order flex flex-row gap-1 text-sm">
                <span className="order_id font-semibold">Order ID</span>
                <span className="order_date">60415766(1 item)</span>
              </span>
            </div>
            <div className=" w-full flex flex-row gap-8  justify-between items-start rounded-lg   p-4  cursor-pointer">
              <div className="flex-col flex   items-start">
                <div className="flex flex-row gap-1  ">
                  <span className="font-bold">Flipkart E-Gift Card base</span>
                </div>
                <div className="flex flex-row gap-1 text-sm">
                  <span className="">{dayjs("2024-03-07T07:11:14.127Z").format("YYYY-MM-DD HH:mm:ss")}</span>
                </div>
                <div className="flex flex-row gap-1 ">
                  <span className="text-xs font-light">TRN : 12423-32423-2323</span>
                </div>
                <div className="px-2 py-0.5 text-sm  text-green-700   absolute top-0 left-0">
                  <button className="font-bold ">Success</button>
                </div>
                <span className="amount text-sm gap-1 flex  mt-2 ">
                  <span className="amount_id font-semibold">Amount</span>
                  <span className="amount_date">₹100</span>
                </span>
              </div>
              <div className="image_container">
                <Image
                  src={"/images/gift_card/Fastrack_E-Gift_Card_dtp.jpg"}
                  className="object-contain h-full w-40 rounded-lg"
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
            </div>
            <div
              className="cross absolute top-1 right-1 font-extrabold cursor-pointer hover:text-[#1973e8] hover:delay-200 transition ease-in-out delay-200"
              onClick={() => toggleAddressForm(false)}
            >
              X
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// const order = [
//   {
//     _id: "65eef527b07fd58fb68e7616",
//     associatedUserId: "65e968b4de651fb93ff77dde",
//     orderId: "TZF11032024567537",
//     woohooOrderId: "ABF5550924866",
//     qty: 1,
//     amount: 100,
//     sku: "GBV2PLEGC001",
//     refno: "efghifj",
//     woohoOrderStatus: "PROCESSING",
//     __v: 0,
//     createdAt: "2024-03-21T07:45:33.051Z",
//   },
//   {
//     _id: "65f03167b44bd1b48128b73b",
//     associatedUserId: "65e968b4de651fb93ff77dde",
//     orderId: "TZF12032024130372",
//     woohooOrderId: "ABF5550925088",
//     qty: 2,
//     amount: 200,
//     sku: "GBV2PLEGC001",
//     refno: "refno106523",
//     woohoOrderStatus: "PROCESSING",
//     createdAt: "2024-03-12T10:41:43.154Z",
//     __v: 0,
//   },
//   {
//     _id: "65f03262b44bd1b48128b747",
//     associatedUserId: "65e968b4de651fb93ff77dde",
//     orderId: "TZF12032024750172",
//     woohooOrderId: "ABF5550925090",
//     qty: 2,
//     amount: 200,
//     sku: "GBV2PLEGC001",
//     refno: "refno782107",
//     woohoOrderStatus: "PROCESSING",
//     createdAt: "2024-03-12T10:45:54.871Z",
//     __v: 0,
//   },
// ];

const giftCardResponse = {
  _id: "65e96892d190d555e5ba4fb5",
  sku: "GBV2PLEGC001",
  nameOnWoohoo: "Flipkart E-Gift Card base",
  minPrice: 100,
  maxPrice: 10000,
  offersOnGC: [],
  productImgMob: "/images/gift_card/Fastrack_E-Gift_Card_dtp.jpg",
  productImgWeb: "/images/gift_card/Fastrack_E-Gift_Card_dtp.jpg",
  giftCardProvider: "woohoo",
  isActive: true,
  isNewGiftCard: true,
  availableCoupon: [],
  createdAt: "2024-03-07T07:11:14.127Z",
  __v: 0,
};

export default function Index() {
  const [isToggleAddressForm, setIsToggleAddressForm] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [trancactionData, setTrancactionData] = useState([]);
  const userDetail = useSelector((state) => state.userDetail);
  const router = useRouter();
  const tab = router.query.tab || 0;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log("userDetail", userDetail);
  useEffect(() => {
    //All orders
    const getAllOrder = async () => {
      const baseUrl = `orders/get-all-order`;
      try {
        const orderResponse = await apiHelper(baseUrl, { associatedUserId: userDetail.user_id }, "GET");
        console.log("orderResponse", orderResponse);
        setOrderData(orderResponse.orders);
      } catch (error) {
        throw error;
      }
    };

    getAllOrder();
    getOrderDetails();
  }, []);
  useEffect(() => {
    //All tranctions
    const getStatus = async () => {
      const baseUrl = `transaction/get-all-transactions`;
      try {
        const transactionResponse = await apiHelper(baseUrl, { userId: userDetail.user_id }, "GET");
        console.log("orderResponse", transactionResponse);
        setTrancactionData(transactionResponse.transactions);
      } catch (error) {
        console.log(`error`, error);
        throw error;
      }
    };

    getStatus();
  }, []);
  console.log("orderData", orderData);

  const getWoohoProductDetailById = async (arrOfTransactions) => {
    if (!arrOfTransactions) return;
    if (arrOfTransactions.transactions[i].status === "SUCCESS") return;
    const baseUrl = `woohooproduct/getdetails/`;
    for (let i = 0; i < arrOfTransactions.transactions.length; i++) {}
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAddressForm = () => {
    setIsToggleAddressForm(!isToggleAddressForm);
  };

  const getOrderDetails = async (orderId) => {
    if (!orderId) return;
    const baseUrl = `woohooproduct/get-order-details/${orderId}`;
    try {
      const searchResult = await apiHelper(baseUrl, {}, "GET");
      console.log("searchResult", searchResult);
      return searchResult;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout session={userDetail} tab={tab}>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between w-full items-center">
          <div className="text-lg font-semibold flex flex-row items-center justify-center">
            <span className="">
              <RxBorderWidth />
            </span>
            <span>My Order</span>
          </div>
        </div>
        <hr className="divide-y divide-solid w-full my-1" />
        <div className="text-lg w-full font-semibold flex flex-row items-center justify-between">
          <span className="">Orders</span>
        </div>
        <hr className="divide-y divide-solid w-full my-1" />
        <ul className="w-full flex flex-col items-start justify-start my-2 pl-8">
          {/* {
        _id: '665db9a9578b9c9321f0a243',
        userId: '66474bb12461d8afa8a01082',
        cashFreeOrderId: '2182364679',
        TXNID: 'TXN0060611203062024',
        orderId: {
          _id: '665db9a9578b9c9321f0a240',
          associatedUserId: '66474bb12461d8afa8a01082',
          orderId: 'TZF03062024058816',
          qty: 1,
          amount: 101,
          sku: 'UBEFLOW',
          refno: 'REF03062024058816',
          woohoOrderStatus: 'ORDER_FAILED',
          createdAt: '2024-06-03T12:40:09.457Z',
          __v: 0
        },
        Status: 'PAID',
        createdAt: '2024-06-03T12:40:09.585Z',
        __v: 0
      }, */}
          {trancactionData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
            return (
              <li
                key={order._id}
                className="w-full flex flex-col items-start justify-start border-b-2 border-gray-500/10 py-2 "
              >
                <div className="order_header">
                  <span className="order flex flex-row gap-1 text-sm">
                    <span className="order_id font-semibold">{order.orderId.orderId}</span>
                    <span className="order_date">{` ${order.orderId.refon} (${order.orderId.qty} item)`}</span>
                    {/* <span className="order_date">60415766(1 item)</span> */}
                  </span>
                </div>
                <div className=" w-full flex flex-row border-2 border-gray-100/95 justify-between items-start rounded-lg shadow-lg p-4 hover:shadow-inner hover:shadow-[#1973e875]  transition ease-in-out duration-300 hover:duration-300 cursor-pointer">
                  <div className="flex-col flex gap-2 items-start">
                    <div className="flex flex-row gap-1  ">
                      <span className="font-bold">Flipkart E-Gift Card base</span>
                    </div>
                    <div className="flex flex-row gap-1 text-sm">
                      <span className="">{dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded-md  text-sm shadow-md border-green-700 text-green-700 border-2">
                      <button className="font-bold ">Success</button>
                    </div>
                    <ViewOrderDetailPopup
                      toggleAddressForm={toggleAddressForm}
                      isToggleAddressForm={isToggleAddressForm}
                      orderData={orderData}
                    />
                  </div>
                  <div className="image_container">
                    <Image
                      src={giftCardResponse?.productImgMob}
                      className="object-contain h-full w-40 rounded-lg"
                      width={500}
                      height={500}
                      alt=""
                    />
                    <span className="amount text-sm gap-1 flex  mt-2 ">
                      <span className="amount_id font-semibold">Amount</span>
                      <span className="amount_date">₹100</span>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orderData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Layout>
  );
}
