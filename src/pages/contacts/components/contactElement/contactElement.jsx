import { useNavigate } from "react-router-dom";
import { useAppStatus } from "../../../../contexts/appStatus";
import { useGlobalContacts } from "../../../../contexts/globalContacts";
import { useKeysContext } from "../../../../contexts/keysContext";
import ThemeText from "../../../../components/themeText/themeText";
import navigateToExpandedContact from "../../../../functions/contacts/navigateToExpandedContact";
import {
  createFormattedDate,
  formatMessage,
} from "../../../../functions/contacts/formats";

export function ContactElement(props) {
  const { contactsPrivateKey, publicKey } = useKeysContext();
  const { isConnectedToTheInternet } = useAppStatus();
  //   const { theme, darkModeType } = useGlobalThemeContext();
  //   const { backgroundOffset } = GetThemeColors();
  const {
    decodedAddedContacts,
    globalContactsInformation,
    toggleGlobalContactsInformation,
    contactsMessags,
  } = useGlobalContacts();

  const contact = props.contact;
  const navigate = useNavigate();
  const hasUnlookedTransaction =
    contactsMessags[contact.uuid]?.messages.length &&
    contactsMessags[contact.uuid]?.messages.filter(
      (savedMessage) => !savedMessage.message.wasSeen
    ).length > 0;

  return (
    <div
      className="contactElementOuterContainer"
      onLongPress={() => {
        // if (!contact.isAdded) return;
        // if (!isConnectedToTheInternet) {
        //   navigate(".ErrorScreen", {
        //     errorMessage:
        //       "Please reconnect to the internet to use this feature",
        //   });
        //   return;
        // }
        // navigate("ContactsPageLongPressActions", {
        //   contact: contact,
        // });
      }}
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
      <div className="contactElementInnerContainer">
        <div className="contactRowContainer">
          <div className="contactImageContainer">
            {/* <ContactProfileImage
              updated={props.cache[contact.uuid]?.updated}
              uri={props.cache[contact.uuid]?.localUri}
              darkModeType={darkModeType}
              theme={theme}
            /> */}
          </div>
          <div
            className="contactTextContainer"
            style={{
              flex: 1,
            }}
          >
            <div
              className="topTextContainer"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ThemeText
                // CustomEllipsizeMode={"tail"}
                // CustomNumberOfLines={1}
                textStyles={{
                  flex: 1,
                  width: "100%",
                  marginRight: 5,
                }}
                textContent={
                  !!contact.name.length ? contact.name : contact.uniqueName
                }
              />
              {hasUnlookedTransaction && (
                <div
                  className="hasActiveTxDot"
                  style={[
                    // styles.hasNotification,
                    {
                      marginRight: 5,
                      //   backgroundColor:
                      //     darkModeType && theme
                      //       ? COLORS.darkModeText
                      //       : COLORS.primary,
                    },
                  ]}
                />
              )}
              <div
                className="bottomTextContainer"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ThemeText
                  textStyles={{
                    // fontSize: SIZES.small,
                    marginRight: 5,
                  }}
                  textContent={
                    !!contactsMessags[contact.uuid]?.messages?.length
                      ? createFormattedDate(
                          contactsMessags[contact.uuid].lastUpdated
                        )
                      : ""
                  }
                />
                {/* <ThemeImage
                  styles={{
                    width: 20,
                    height: 20,
                    transform: [{ rotate: "180deg" }],
                  }}
                  darkModeIcon={ICONS.leftCheveronIcon}
                  lightModeIcon={ICONS.leftCheveronIcon}
                  lightsOutIcon={ICONS.left_cheveron_white}
                /> */}
              </div>
            </div>
            <div
              className="contactBottomText"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ThemeText
                // CustomNumberOfLines={2}
                textStyles={
                  {
                    //   fontSize: SIZES.small,
                  }
                }
                textContent={
                  !!contactsMessags[contact.uuid]?.messages?.length
                    ? formatMessage(
                        contactsMessags[contact.uuid]?.messages[0]
                      ) || " "
                    : " "
                }
              />
              {!contact.isAdded && (
                <ThemeText
                  textStyles={{
                    // fontSize: SIZES.small,
                    // color:
                    //   darkModeType && theme
                    //     ? COLORS.darkModeText
                    //     : COLORS.primary,
                    marginLeft: "auto",
                  }}
                  textContent={"Unknown sender"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
