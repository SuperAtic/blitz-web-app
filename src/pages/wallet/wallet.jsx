import TransactionContanier from "../../components/transactionContainer/transactionContianer";
import UserBalance from "./components/balanceContainer/userBalanceContainer";
import WalletNavBar from "./components/nav/nav";
import SendAndRequestBtns from "./components/sendAndRequestBTNS/sendAndRequstBtns";
import "./wallet.css";

export default function WalletHome() {
  return (
    <div id="walletHomeContainer">
      <WalletNavBar />
      <UserBalance />
      <SendAndRequestBtns />
      <TransactionContanier frompage={"home"} />
    </div>
  );
}
