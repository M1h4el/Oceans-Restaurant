import styles from "./Layout.module.scss";
import { IoHome } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { TbAdjustments } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Icons from "../../components/Icons/Icons";

interface LayoutProps {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

function Layout({ setScreen }: LayoutProps) {
  const iconButtons = [
    {
      icon: <IoHome />,
      typeButton: "link",
      nameButton: "/dashboard",
    },
    {
      icon: <MdSell />,
      typeButton: "link",
      nameButton: "/dashboard/sells",
    },
    {
      icon: <TbAdjustments />,
      typeButton: "link",
      nameButton: "/dashboard/settings",
    },
    {
      icon: <CgProfile />,
      displayable: true,
      nameButton: "/dashboard/profile",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>Logo</div>
      <div className={styles.button_list}>
        {iconButtons.map(
          ({ icon, typeButton, nameButton, displayable }, index) => (
            <Icons
              key={index}
              typeButton={typeButton}
              nameButton={nameButton}
              displayable={displayable}
              setScreen={setScreen}
            >
              {icon}
            </Icons>
          )
        )}
      </div>
    </div>
  );
}

export default Layout;
