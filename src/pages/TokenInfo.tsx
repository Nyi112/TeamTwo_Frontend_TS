/** @format */

import { useEffect, useState, type JSX } from "react";
import {
  getAccessTokenExpirationDate,
  getAccessTokenRemainingTime,
  getRefreshTokenExpirationDate,
  getRefreshTokenRemainingTime,
} from "../auth.js";

// Define state types
type NullableDate = Date | null;

const TokenInfo = (): JSX.Element => {
  const [accessExp, setAccessExp] = useState<NullableDate>(null);
  const [refreshExp, setRefreshExp] = useState<NullableDate>(null);
  const [accessRemaining, setAccessRemaining] = useState<number>(0);
  const [refreshRemaining, setRefreshRemaining] = useState<number>(0);

  useEffect(() => {
    // Initialize expiration dates
    setAccessExp(getAccessTokenExpirationDate());
    setRefreshExp(getRefreshTokenExpirationDate());

    // Function to update remaining time
    const updateRemaining = () => {
      setAccessRemaining(getAccessTokenRemainingTime());
      setRefreshRemaining(getRefreshTokenRemainingTime());
    };

    updateRemaining(); // initial call
    const interval = setInterval(updateRemaining, 1000); // update every second
    return () => clearInterval(interval); // cleanup
  }, []);

  // Format milliseconds to HH:mm:ss
  const formatTime = (ms: number): string => {
    if (ms <= 0) return "Expired";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  if (!accessExp && !refreshExp) {
    return (
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <p>No tokens found or tokens are invalid.</p>
      </div>
    );
  }

  return (
    <div
      style={{ padding: "10px", background: "#f9f9f9", borderRadius: "8px" }}
    >
      <h3 style={{ marginBottom: "10px" }}>🕒 Token Info</h3>

      {accessExp ? (
        <>
          <p>
            <strong>Access Token Expires At:</strong>{" "}
            {accessExp.toLocaleString()}
          </p>
          <p>
            <strong>Remaining Time:</strong> {formatTime(accessRemaining)}
          </p>
        </>
      ) : (
        <p>Access token not found or invalid.</p>
      )}

      <hr />

      {refreshExp ? (
        <>
          <p>
            <strong>Refresh Token Expires At:</strong>{" "}
            {refreshExp.toLocaleString()}
          </p>
          <p>
            <strong>Remaining Time:</strong> {formatTime(refreshRemaining)}
          </p>
        </>
      ) : (
        <p>Refresh token not found or invalid.</p>
      )}
    </div>
  );
};

export default TokenInfo;
