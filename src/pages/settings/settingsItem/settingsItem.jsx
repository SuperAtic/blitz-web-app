import { useLocation, useNavigate } from "react-router-dom";
import SafeAreaComponent from "../../../components/safeAreaContainer";
import PageNavBar from "../../../components/navBar/navBar";
import AboutPage from "../pages/about/about";
import "./settingsItem.css";
import ViewMnemoinc from "../../viewkey/viewKey";
import SparkInformation from "../pages/sparkInfo/sparkInfo";

export default function SettingsContentIndex() {
  const location = useLocation();
  const props = location.state;
  const selectedPage = props.for?.toLowerCase();
  const navigate = useNavigate();

  if (
    selectedPage === "display currency" ||
    selectedPage === "point-of-sale" ||
    selectedPage === "edit contact profile"
  ) {
    return (
      <>
        {selectedPage === "display currency" && <FiatCurrencyPage />}
        {selectedPage === "point-of-sale" && <PosSettingsPage />}
        {selectedPage === "edit contact profile" && (
          <EditMyProfilePage fromSettings={true} pageType="myProfile" />
        )}
      </>
    );
  }
  return (
    <SafeAreaComponent addedClassName={"settingsContentIndexContianer"}>
      <PageNavBar textClassName={"navbarText"} text={`${selectedPage}`} />
      <div className="settingsContentIndex">
        {selectedPage === "about" && <AboutPage />}
        {selectedPage === "node info" && <NodeInfo />}
        {selectedPage === "display options" && <DisplayOptions />}

        {selectedPage === "fast pay" && <FastPay />}

        {selectedPage === "blitz stats" && <ExploreUsers />}

        {selectedPage === "backup wallet" && <ViewMnemoinc />}
        {selectedPage === "spark info" && <SparkInformation />}

        {selectedPage === "delete wallet" && <ResetPage />}
      </div>
    </SafeAreaComponent>
  );
}
