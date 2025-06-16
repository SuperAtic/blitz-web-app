import BackArrow from "../../../../components/backArrow/backArrow";
import SettingsIcon from "../../../../assets/settings.png";
import "./myProfilePage.css";
import ContactProfileImage from "../../components/profileImage/profileImage";
import { useGlobalContacts } from "../../../../contexts/globalContacts";
import { useAppStatus } from "../../../../contexts/appStatus";
import { useImageCache } from "../../../../contexts/imageCacheContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import MaxHeap from "../../../../functions/maxHeap";
import imagesIcon from "../../../../assets/imagesDark.png";
import ThemeText from "../../../../components/themeText/themeText";
import { Colors } from "../../../../constants/theme";

export default function MyProfilePage() {
  const { cache } = useImageCache();

  const { globalContactsInformation, decodedAddedContacts, contactsMessags } =
    useGlobalContacts();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = new Date();

  const myContact = globalContactsInformation.myProfile;

  const createdPayments = useMemo(() => {
    const messageHeap = new MaxHeap();
    const MAX_MESSAGES = 50;

    for (let contact of Object.keys(contactsMessags)) {
      if (contact === "lastMessageTimestamp") continue;
      const data = contactsMessags[contact];
      const selectedAddedContact = decodedAddedContacts.find(
        (contactElement) => contactElement.uuid === contact
      );

      for (let message of data.messages) {
        const timestamp = message.timestamp;

        const messageObj = {
          transaction: message,
          selectedProfileImage: selectedAddedContact?.profileImage || null,
          name:
            selectedAddedContact?.name ||
            selectedAddedContact?.uniqueName ||
            "Unknown",
          contactUUID: selectedAddedContact?.uuid || contact,
          time: timestamp,
        };

        messageHeap.add(messageObj);
      }
    }

    const result = [];
    while (!messageHeap.isEmpty() && result.length < MAX_MESSAGES) {
      result.push(messageHeap.poll());
    }

    console.log(result.length, "LENGTH OF RESULT ARRAY");

    return result;
  }, [decodedAddedContacts, contactsMessags]);

  return (
    <div id="myProfilePageContainer">
      <div className="pageNavbar">
        <BackArrow />
        <img
          className="settingsIcon"
          onClick={() =>
            navigate("/edit-profile", {
              state: { pageType: "myProfile", fromSettings: false },
            })
          }
          src={SettingsIcon}
          alt="Settings icon"
        />
      </div>
      <div
        onClick={() => {
          navigate("/error", {
            state: {
              errorMessage: "Feture coming soon...",
              background: location,
            },
          });
        }}
        className="profileImageBackground"
        style={{ backgroundColor: Colors.light.backgroundOffset }}
      >
        <ContactProfileImage
          updated={cache[myContact.uuid]?.updated}
          uri={cache[myContact.uuid]?.localUri}
        />
        <div
          style={{ backgroundColor: Colors.dark.text }}
          className="scanProfileImageContianer"
        >
          <img src={imagesIcon} alt="Open scan profile modal" />
        </div>
      </div>
      <ThemeText
        className={"uniqueNameText"}
        textContent={myContact.uniqueName}
      />
      {myContact?.name && (
        <ThemeText className={"nameText"} textContent={myContact?.name} />
      )}
      <div
        style={{ backgroundColor: Colors.dark.text }}
        className="bioContainer"
      >
        <ThemeText textContent={myContact?.bio || "No bio set"} />
      </div>
      {createdPayments?.length != 0 ? (
        <p>Transactions go here</p>
      ) : (
        <ThemeText
          className={"noTxText"}
          textStyles={{ marginTop: 20 }}
          textContent={"No transaction history"}
        />
      )}
    </div>
  );
}
