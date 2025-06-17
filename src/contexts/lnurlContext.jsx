import { useEffect, useRef, useState, useCallback } from "react";

import { useGlobalContextProvider } from "./masterInfoObject";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../db/initializeFirebase";
import { batchDeleteLnurlPayments, getLnurlPayments } from "../../db";
import { useSpark } from "./sparkContext";
import { addSingleUnpaidSparkLightningTransaction } from "../functions/spark/transactions";

export default function HandleLNURLPayments() {
  const {
    // setBlockedIdentityPubKeys,
    sparkInformation,
    setNumberOfIncomingLNURLPayments,
  } = useSpark();
  const { masterInfoObject } = useGlobalContextProvider();
  const sparkAddress = sparkInformation.sparkAddress;

  // Initialize refs
  const loadListener = useRef(false); // Changed to boolean for clarity
  const didRunSavedlNURL = useRef(false);
  //   const didCreateSessionPrivateKey = useRef(false);
  const timeoutRef = useRef(null);
  const isProcessingRef = useRef(false);

  // Use ref for payment queue to avoid dependency cycles
  const paymentQueueRef = useRef([]);
  //   const tempWalletCacheRef = useRef(new Map());
  const deleteActiveLNURLPaymentsRef = useRef([]);

  // Load saved LNURL payments once
  useEffect(() => {
    if (!sparkAddress) return;
    if (didRunSavedlNURL.current) return;

    didRunSavedlNURL.current = true;

    async function getSavedLNURLPayments() {
      try {
        const payments = await getLnurlPayments(masterInfoObject.uuid);
        if (!payments.length) return;

        console.log(`Restoring ${payments.length} offline lnurl payments`);

        for (let index = 0; index < payments.length; index++) {
          const payment = payments[index];
          paymentQueueRef.current.push({
            ...payment,
            id: payment.id,
            shouldNavigate: false,
            runCount: 0,
          });
        }

        processQueue();
      } catch (error) {
        console.error("Error loading saved LNURL payments:", error);
      }
    }

    getSavedLNURLPayments();
  }, [sparkAddress, masterInfoObject.uuid]);

  // Set up Firebase listener once
  useEffect(() => {
    if (!sparkAddress || loadListener.current) {
      return;
    }

    console.log(masterInfoObject.uuid, "Setting up Firebase listener");
    loadListener.current = true;

    const setupListener = () => {
      try {
        const paymentsRef = collection(
          db,
          "blitzWalletUsers",
          masterInfoObject.uuid,
          "lnurlPayments"
        );

        // Consider if you want documents from now or from a specific time
        const now = new Date().getTime();
        const q = query(paymentsRef, where("timestamp", ">", now));

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            let hasNewPayments = false;
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const payment = change.doc.data();
                console.log(payment, "Added to payment queue");
                paymentQueueRef.current.push({
                  ...payment,
                  id: change.doc.id,
                  shouldNavigate: true,
                  runCount: 0,
                });
                hasNewPayments = true;
              }
            });
            if (hasNewPayments) {
              processQueue();
            }
          },
          (error) => {
            console.error("Error in Firebase listener:", error);
            // loadListener.current = false;
            // Optionally retry after delay
            // setTimeout(setupListener, 5000);
          }
        );

        // Store unsubscribe function for cleanup
        return unsubscribe;
      } catch (error) {
        console.error("Error setting up Firebase listener:", error);
        loadListener.current = false;
        return null;
      }
    };

    const unsubscribe = setupListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      loadListener.current = false;
    };
  }, [sparkAddress, masterInfoObject.uuid]);

  // Process payment queue
  const processQueue = useCallback(async () => {
    if (!sparkAddress) return;
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    try {
      const currentQueue = [...paymentQueueRef.current];
      console.log(`Processing ${currentQueue.length} LNURL payments`);
      if (currentQueue.length === 0) return;

      const newQueue = [];
      const processedIds = [];

      for (const payment of currentQueue) {
        console.log(`Processing LNURL payment ${payment.id}`, payment);
        await addSingleUnpaidSparkLightningTransaction({
          id: payment.sparkID,
          amount: payment.amountSats,
          expiration: payment.expiredTime,
          description: payment.description,
          shouldNavigate: payment.shouldNavigate,
          details: {
            sharedPublicKey: payment.sharedPublicKey,
            sparkPubKey: payment.sparkPubKey,
          },
        });
        processedIds.push(payment.id);
        deleteActiveLNURLPaymentsRef.current.push(payment.id);
      }

      // Update queue and clean up processed payments
      paymentQueueRef.current = paymentQueueRef.current
        .filter(
          (item) =>
            !processedIds.includes(item.id) &&
            !currentQueue.some((processed) => processed.id === item.id)
        )
        .concat(newQueue);

      // setNumberOfIncomingLNURLPayments(paymentQueueRef.current.length);

      if (deleteActiveLNURLPaymentsRef.current.length > 0) {
        try {
          await batchDeleteLnurlPayments(
            masterInfoObject.uuid,
            deleteActiveLNURLPaymentsRef.current
          );
          deleteActiveLNURLPaymentsRef.current = [];
        } catch (error) {
          console.error("Error deleting processed payments:", error);
        }
      }

      if (newQueue.length > 0) {
        timeoutRef.current = setTimeout(() => {
          processQueue();
        }, 10000);
      }
    } catch (error) {
      console.error("Error in processQueue:", error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [
    sparkAddress,
    masterInfoObject.uuid,
    setNumberOfIncomingLNURLPayments,
    // setBlockedIdentityPubKeys,
  ]);

  return null;
}
