import { useState } from "react";
import { useSpark } from "../../contexts/sparkContext";
import {
  TransferFilter,
  TransferStatus,
  TransferType,
} from "@buildonspark/spark-sdk/proto/spark";
import { TransferDirection } from "@buildonspark/spark-sdk/types";
import "./style.css";
import arrow from "../../assets/arrow-left-blue.png";

export default function TransactionContanier({}) {
  const { sparkInformation } = useSpark();

  if (!sparkInformation?.trasactions?.length) {
    return (
      <div className="transactionContainer">
        <p className="noTxText">
          Send or receive a transaction for it to show up here.
        </p>
      </div>
    );
  }

  const transfers = sparkInformation?.trasactions;

  console.log(transfers, "TRANSFERS");

  const transferElements = transfers.map((tx, index) => {
    // console.log(tx, index);
    const lastTransaction = transfers[index + 1];
    // console.log(lastTransaction);
    const currnetTxTime = new Date(tx.createdTime).getTime();
    const lastTxTime = lastTransaction
      ? new Date(lastTransaction.createdTime).getTime()
      : 0;

    const BUFFER_TIME = 1000 * 10; //10 second buffer time
    const differnce = Math.abs(currnetTxTime - lastTxTime);

    const isDonation =
      differnce <= BUFFER_TIME &&
      tx?.receiverIdentityPublicKey ===
        "02121157144443ea2d94f5527688adb062b944edec54c21f6f943dc7d5cdfcdbe2";

    if (tx.status === "INVOICE_CREATED") return;

    return <TxItem isDonation={isDonation} tx={tx} index={index} />;
  });
  return <div className="transactionContainer">{transferElements}</div>;
}

function TxItem({ tx, index, isDonation }) {
  const isLightningPayment = tx.type === "PREIMAGE_SWAP";
  const isBitcoinPayment = tx.type == "COOPERATIVE_EXIT";
  const isSparkPayment = tx.type === "TRANSFER";

  // BITCOIN PENDING = TRANSFER_STATUS_SENDER_KEY_TWEAK_PENDING
  // BITCOIN CONFIRMED = TRANSFER_STATUS_COMPLETED
  // BITCOIN FAILED = TRANSFER_STATUS_RETURNED

  // SPARK PENDING = TRANSFER_STATUS_SENDER_KEY_TWEAKED
  // SPARK CONFIRMED = TRANSFER_STATUS_COMPLETED

  // LIGHTING PENDING = LIGHTNING_PAYMENT_INITIATED
  // LIGHTNING CONFIRMED = TRANSFER_STATUS_COMPLETED

  return (
    <div className="transaction" key={index}>
      <img
        style={{
          transform: `rotate(${
            tx.transfer_direction === "INCOMING" ? "310deg" : "130deg"
          })`,
        }}
        src={arrow}
        alt=""
      />
      <div className="textContainer">
        <p>
          {isDonation
            ? "Donation"
            : tx.transfer_direction === "INCOMING"
            ? "Received"
            : "Sent"}
        </p>
        <p>{new Date(tx.updated_at_time).toDateString()}</p>
      </div>
      <p>
        {tx.transferDirection === TransferDirection.OUTGOING ? "-" : "+"}
        {tx.total_sent}
      </p>
    </div>
  );
}
