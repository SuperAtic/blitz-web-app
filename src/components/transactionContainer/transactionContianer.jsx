import { useRef, useState } from "react";
import { useSpark } from "../../contexts/sparkContext";
import {
  TransferFilter,
  TransferStatus,
  TransferType,
} from "@buildonspark/spark-sdk/proto/spark";
import { TransferDirection } from "@buildonspark/spark-sdk/types";
import "./style.css";
import arrow from "../../assets/arrow-left-blue.png";
import pendingTx from "../../assets/pendingTx.png";
import { useNavigate } from "react-router-dom";
import {
  useIsSparkPaymentPending,
  useSparkPaymentType,
} from "../../functions/spark";

export default function TransactionContanier({ frompage }) {
  const { sparkInformation } = useSpark();
  const includedDonations = useRef(null);
  const currentTime = new Date();
  const navigate = useNavigate();

  if (frompage === "home" && !sparkInformation.isConnected) {
    return (
      <div className="transactionContainer">
        <p className="noTxText">
          {sparkInformation.isConnected === null
            ? "Connecting..."
            : "Error connecting to spark."}
        </p>
      </div>
    );
  }

  const transfers = sparkInformation?.trasactions;

  const transferElements = transfers

    .map((tx, index) => {
      console.log(tx);
      const currnetTxTime = new Date(tx.created_at_time).getTime();

      const isDonation =
        tx.transfer_direction === "OUTGOING" &&
        tx.type === "TRANSFER" &&
        tx.receiver_identity_pubkey === import.meta.env.VITE_BLITZ_SPARK_PUBKEY;

      if (includedDonations.current) {
        includedDonations.current = isDonation;
      }
      if (tx?.type === "PREIMAGE_SWAP" && tx?.status === "INVOICE_CREATED")
        return;

      if (isDonation) return;

      return (
        <TxItem
          key={index}
          isDonation={isDonation}
          tx={tx}
          index={index}
          currentTime={currentTime}
          currnetTxTime={currnetTxTime}
        />
      );
    })
    .filter((item) => item);

  if (!transferElements?.length) {
    return (
      <div className="transactionContainer">
        <p className="noTxText">
          Send or receive a transaction for it to show up here.
        </p>
      </div>
    );
  }
  return (
    <div className="transactionContainer">
      {transferElements.slice(0, frompage === "home" ? 20 : undefined)}
      {transferElements?.length >= 20 && frompage === "home" && (
        <p
          onClick={() => navigate("/viewAllTransactions")}
          className="viewAllTxText"
        >
          View all transactions
        </p>
      )}
    </div>
  );
}

function TxItem({ tx, index, isDonation, currentTime, currnetTxTime }) {
  const isLightningPayment = tx.type === "PREIMAGE_SWAP";
  const isBitcoinPayment = tx.type == "COOPERATIVE_EXIT";
  const isSparkPayment = tx.type === "TRANSFER";

  const timeDifferenceMs = currentTime - tx.updated_at_time;

  const minutes = timeDifferenceMs / (1000 * 60);
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;
  const paymentType = useSparkPaymentType(tx);
  const isPending = useIsSparkPaymentPending(tx, paymentType);

  // BITCOIN PENDING = TRANSFER_STATUS_SENDER_KEY_TWEAK_PENDING
  // BITCOIN CONFIRMED = TRANSFER_STATUS_COMPLETED
  // BITCOIN FAILED = TRANSFER_STATUS_RETURNED

  // SPARK PENDING = TRANSFER_STATUS_SENDER_KEY_TWEAKED
  // SPARK CONFIRMED = TRANSFER_STATUS_COMPLETED

  // LIGHTING PENDING = LIGHTNING_PAYMENT_INITIATED
  // LIGHTNING CONFIRMED = TRANSFER_STATUS_COMPLETED

  const description = tx.description;

  return (
    <div className="transaction" key={index}>
      <img
        style={{
          transform: `rotate(${
            isPending
              ? "0deg"
              : tx.transfer_direction === "INCOMING"
              ? "310deg"
              : "130deg"
          })`,
        }}
        src={isPending ? pendingTx : arrow}
        alt=""
      />
      <div className="textContainer">
        <p>
          {description
            ? description
            : tx.transfer_direction === "INCOMING"
            ? "Received"
            : "Sent"}
        </p>
        <p className="dateText">
          {`${
            minutes <= 1
              ? `Just now`
              : minutes <= 60
              ? Math.round(minutes) || ""
              : hours <= 24
              ? Math.round(hours)
              : days <= 365
              ? Math.round(days)
              : Math.round(years)
          } ${
            minutes <= 1
              ? ""
              : minutes <= 60
              ? "minute" + (Math.round(minutes) === 1 ? "" : "s")
              : hours <= 24
              ? "hour" + (Math.round(hours) === 1 ? "" : "s")
              : days <= 365
              ? "day" + (Math.round(days) === 1 ? "" : "s")
              : Math.round(years) === 1
              ? "year"
              : "years"
          } ${minutes < 1 ? "" : "ago"}`}
        </p>
      </div>
      <p className="amountText">
        {tx.transfer_direction === TransferDirection.OUTGOING ? "-" : "+"}
        {tx.total_sent + (tx.fee || 0)} sats
      </p>
    </div>
  );
}
