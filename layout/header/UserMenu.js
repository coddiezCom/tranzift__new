import styles from "./styles.module.scss";
// imports
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { SetUserDetail } from "@/store/UserSlice";
import Avatar from "@mui/material/Avatar";
import { stringAvatar, stringToColor } from "@/utils/avatarGenerator";
// react-Icons
import { FaUserCog } from "react-icons/fa";
import { FaClipboardList, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
// Components
import Register from "../../components/Register";
import { setCookie, destroyCookie } from "nookies";
import limitCharacter from "@/utils/limitCharacter";
export default function UserMenu({ userDetail, visible, toggleUserMenu }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const signOut = () => {
    // console.log("sign out");
    dispatch(
      SetUserDetail({
        user_id: "",
        user_name: "",
        email_id: "",
        token: "",
        firstName: "",
        lastName: "",
        phone: "",
      })
    );
    destroyCookie(null, "token", {
      path: "/",
    });
    router.push("/");
  };
  const userMenuAfterLogin = [
    {
      icon: <FaUserCog />,
      name: "Account",
      link: "/profile",
    },
    {
      icon: <FaClipboardList />,
      name: "My Orders",
      link: "/profile/orders",
    },
    {
      icon: <IoWallet />,
      name: "Wallet",
      link: "/profile/wallet",
    },
    {
      icon: <FaMapMarkerAlt />,
      name: "Manage Address",
      link: "/profile/address",
    },
    {
      icon: <FaSignOutAlt />,
      name: "Logout",
    },
  ];

  return (
    <div className={styles.menu} style={{ display: visible ? "flex" : "none" }}>
      {!userDetail.token && <h4>Welcome to tranzift !</h4>}
      {userDetail.token ? (
        <div className={styles.flex}>
          <Avatar {...stringAvatar(userDetail?.firstName + " " + userDetail?.lastName)} />
          {/* <Avatar {...stringAvatar(userDetail?.firstName + " " + userDetail?.lastName)} /> */}
          <div className={styles.col}>
            <span>Welcome </span>
            {/* <h3>{userDetail?.firstName + " " + userDetail?.lastName}</h3> */}
            <h3>{limitCharacter(userDetail?.firstName + " " + userDetail?.lastName, 10, "...")}</h3>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <Register toggleUserMenu={toggleUserMenu} />
        </div>
      )}
      {userDetail.token && (
        <ul>
          {userMenuAfterLogin.map((item, index) => {
            return (
              <li key={index} onClick={() => (item.name == "Logout" ? signOut() : router.push(item?.link))}>
                <span>{item?.icon}</span>
                <span>{item?.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
