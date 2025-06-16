import { useNavigate } from "react-router-dom";
import { useGlobalContacts } from "../../../../contexts/globalContacts";
import { useKeysContext } from "../../../../contexts/keysContext";
import ThemeText from "../../../../components/themeText/themeText";
import navigateToExpandedContact from "../../../../functions/contacts/navigateToExpandedContact";

export default function PinnedContactElement(props) {
  const { contactsPrivateKey, publicKey } = useKeysContext();
  const {
    decodedAddedContacts,
    globalContactsInformation,
    toggleGlobalContactsInformation,
    contactsMessags,
  } = useGlobalContacts();
  //   const { backgroundOffset } = GetThemeColors();
  const contact = props.contact;
  const navigate = useNavigate();
  const hasUnlookedTransaction =
    contactsMessags[contact.uuid]?.messages.length &&
    contactsMessags[contact.uuid]?.messages.filter(
      (savedMessage) => !savedMessage.message.wasSeen
    ).length > 0;
  return (
    <div
      className="pinnedContactOuterContainer"
      //   onLongPress={() => {
      //     if (!contact.isAdded) return;
      //     navigate("/ContactsPageLongPressActions", {
      //       contact: contact,
      //     });
      //   }}
      key={contact.uuid}
      onPress={() =>
        navigateToExpandedContact(
          contact,
          decodedAddedContacts,
          globalContactsInformation,
          toggleGlobalContactsInformation,
          contactsPrivateKey,
          publicKey,
          navigate
        )
      }
    >
      <div className="pinnedContactInnerContainer">
        <div className="imageContainer">
          {/* <ContactProfileImage
            updated={props.cache[contact.uuid]?.updated}
            uri={props.cache[contact.uuid]?.localUri}
            darkModeType={darkModeType}
            theme={theme}
          /> */}
        </div>

        <div
          className="textContainer"
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {hasUnlookedTransaction && <div className="activeMessageDot" />}
          <ThemeText
            CustomEllipsizeMode={"tail"}
            CustomNumberOfLines={1}
            styles={{ textAlign: "center", fontSize: SIZES.small, flex: 1 }}
            content={
              !!contact.name.length
                ? contact.name.trim()
                : contact.uniqueName.trim()
            }
          />
        </div>
      </div>
    </div>
  );
}
