import TransactionContanier from "../../components/transactionContainer/transactionContianer";
import UserBalance from "./components/balanceContainer/userBalanceContainer";
import WalletNavBar from "./components/nav/nav";
import SendAndRequestBtns from "./components/sendAndRequestBTNS/sendAndRequstBtns";

export default function WalletHome() {
  return (
    <div>
      <WalletNavBar />
      <UserBalance />
      <SendAndRequestBtns />
      <TransactionContanier />
    </div>
  );
}
