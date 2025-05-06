import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Storage from "../functions/localStorage";

export default function SessionRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const walletKey = Storage.getItem("walletKey");
    const lastSession = Storage.getItem("lastSession");

    if (!walletKey) {
      // No walletKey, go to onboarding
      navigate("/disclaimer");
      return;
    }

    if (lastSession) {
      const hoursPassed =
        (Date.now() - parseInt(lastSession, 10)) / (1000 * 60 * 60);

      if (hoursPassed > 2) {
        navigate("/login");
      } else {
        navigate("/wallet"); // Or wherever your main app is
      }
    } else {
      // walletKey exists but no session time — assume login is needed
      navigate("/login");
    }
  }, [navigate]);

  return null; // Nothing visible needed
}
