import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Storage from "../functions/localStorage";
import { useAuth } from "../contexts/authContext";

const TWO_HOURS = 2 * 60 * 60 * 1000;

export default function AuthGate({ children }) {
  const navigate = useNavigate();
  const { updateSession, setAuthState, mnemoinc } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const walletKey = Storage.getItem("walletKey");
    const lastSession = Storage.getItem("lastSession");
    const now = Date.now();

    if (!walletKey) {
      navigate("/");
    } else if (
      !lastSession ||
      now - Number(lastSession) > TWO_HOURS ||
      !mnemoinc
    ) {
      navigate("/login");
    } else {
      updateSession();

      navigate("/wallet");
    }

    // only run on first load
    setReady(true);
  }, []);

  if (!ready) return null;

  return children;
}
