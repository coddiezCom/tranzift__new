// import components
import Layout from "../../components/profile/layout";
import Shipping from "../../components/checkout/shipping";
import styles from "../../styles/profile.module.scss";
// import react library
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAddress } from "../../requests/user";
import { useRouter } from "next/router"; // Import the useRouter hook

export default function Index() {
  const { userDetail } = useSelector((state) => ({ ...state }));
  const [addresses, setAddresses] = useState([]);
  const router = useRouter(); // Initialize the useRouter hook

  const tab = router.query.tab || 0; // Access the query parameters using useRouter

  useEffect(() => {
    const fetchAddresses = async (userId) => {
      try {
        // Assuming getAddresses is an async function to fetch addresses
        const addresses = await getAddress(userId);
        return addresses.addresses;
      } catch (error) {
        console.log("[ADDRESS_PAGE]", error);
        setAddresses([]);
        return [];
      }
    };

    const loadAddresses = async () => {
      try {
        const addresses = await fetchAddresses(userDetail?.user_id);
        setAddresses(addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]);
      }
    };

    loadAddresses();
  }, [userDetail?.user_id]);

  return (
    <Layout session={userDetail} tab={tab}>
      <Shipping user={userDetail} addresses={addresses} setAddresses={setAddresses} profile />
    </Layout>
  );
}
