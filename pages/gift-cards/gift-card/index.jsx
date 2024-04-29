import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

// import MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ToastContainer } from "react-toastify";

import apiHelper from "../../../utils/apiHelper";
import { setGiftCardDetail } from "../../../store/GiftCardSlice";
import GiftCardDetails from "../../../components/GiftCard/GiftCardDetails";
import DeliveryMode from "../../../components/GiftCard/DeliveryMode";
import BuyForSelf from "../../../components/GiftCard/BuyForSelf";
import { SetToggleRegisterPopup } from "../../../store/ToggleRegisterPopup";
import { TfiGift } from "react-icons/tfi";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../styles/gift-card.module.scss";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}
MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};
const getGiftCardDetail = (sku) => {
  try {
    const baseUrl = `giftcards/gcdetails/${sku}`;
    const giftCardDetail = apiHelper(baseUrl);
    return giftCardDetail;
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    throw error;
  }
};
const getGiftCardById = async (productid) => {
  try {
    const searchResult = await apiHelper(`/woohooproduct/getdetails/${productid}`);
    return searchResult.giftCardDetails;
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    throw error;
  }
};
const getRedeemInstructionByBrandId = async (brandId) => {
  const baseUrl = "http://localhost:3000/api/v3/gift-cards/redeem";
  const redeemInstructionParam = {
    brandId,
  };
  try {
    const searchResult = await axios.get(baseUrl, { params: redeemInstructionParam });
    return searchResult.data;
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    throw error;
  }
};
const index = () => {
  const router = useRouter();
  const { sku } = router.query;
  const [gift_card, setGift_card] = useState("");
  useEffect(() => {
    const fetchGiftCard = async (sku) => {
      try {
        const giftCard = await getGiftCardDetail(sku);
        setGift_card(giftCard);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGiftCard(sku);
  }, []);
  console.log(gift_card);
  //   console.log(sku, "router_query");
  return <div>gift_card</div>;
};

export default index;
