import TransactionContanier from "../../components/transactionContainer/transactionContianer";
import { useSpark } from "../../contexts/sparkContext";
import UserBalance from "./components/balanceContainer/userBalanceContainer";
import WalletNavBar from "./components/nav/nav";
import SendAndRequestBtns from "./components/sendAndRequestBTNS/sendAndRequstBtns";

export default function WalletHome() {
  return (
    <>
      <WalletNavBar />
      <UserBalance />
      <SendAndRequestBtns />
      <TransactionContanier frompage={"home"} />
    </>
  );
}
