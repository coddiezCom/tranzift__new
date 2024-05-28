// import components
import Layout from "../../components/profile/layout";
import Shipping from "../../components/checkout/shipping";
import styles from "@/styles/profile.module.scss";
// import react library
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAddress } from "../../requests/user";
import { useRouter } from "next/router"; // Import the useRouter hook

export default function Index() {
  const UserDetail = useSelector((state) => state.userDetail);
  const [addresses, setAddresses] = useState([]);
  const router = useRouter(); // Initialize the useRouter hook
  console.log(UserDetail, "UserDetail");

  const tab = router.query.tab || 0; // Access the query parameters using useRouter
  // console.log("tab", tab);

  useEffect(() => {
    const fetchAddresses = async (userId) => {
      try {
        // Assuming getAddresses is an async function to fetch addresses
        const addresses = await getAddress(userId);
        console.log("addresses", addresses);
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

  return (
    <Layout session={UserDetail} tab={tab}>
      <Shipping user={UserDetail} addresses={addresses} setAddresses={setAddresses} profile />
    </Layout>
  );
}
