/** @format */

import React, { useEffect, useState } from "react";
import API from "../api/api";

const ActiveContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [invoices, setInvoices] = useState({});
  const [loading, setLoading] = useState(false);
  const [nextInvoiceTime, setNextInvoiceTime] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [highlightedInvoices, setHighlightedInvoices] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch active contracts
  const fetchContracts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/contracts/active");
      if (Array.isArray(res.data)) setContracts(res.data);
      else setContracts([]);
    } catch (err) {
      console.error("Error fetching contracts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch invoices for each contract
  const fetchInvoices = async (contractsList) => {
    setIsGenerating(true); // show generating message
    const allInvoices = {};
    const newHighlights = {};

    for (let contract of contractsList) {
      try {
        const res = await API.get(`/api/invoices/byContract/${contract.id}`);
        const currentInvoices = invoices[contract.id] || [];
        const fetchedInvoices = res.data || [];

        // Detect new invoices
        const newInvoiceIds = fetchedInvoices
          .filter((inv) => !currentInvoices.find((c) => c.id === inv.id))
          .map((inv) => inv.id);

        if (newInvoiceIds.length > 0) {
          newHighlights[contract.id] = newInvoiceIds;
          // remove highlight after 5 seconds
          setTimeout(() => {
            setHighlightedInvoices((prev) => {
              const copy = { ...prev };
              newInvoiceIds.forEach((id) => {
                if (copy[contract.id]) {
                  copy[contract.id] = copy[contract.id].filter((x) => x !== id);
                  if (copy[contract.id].length === 0) delete copy[contract.id];
                }
              });
              return copy;
            });
          }, 5000);
        }

        allInvoices[contract.id] = fetchedInvoices;
      } catch (err) {
        console.error(
          `Error fetching invoices for contract ${contract.id}:`,
          err
        );
        allInvoices[contract.id] = [];
      }
    }
    setInvoices(allInvoices);
    setHighlightedInvoices((prev) => ({ ...prev, ...newHighlights }));

    // hide generating after 3 seconds
    setTimeout(() => setIsGenerating(false), 3000);
  };

  // Initial fetch + auto-refresh every 10s
  useEffect(() => {
    const fetchAll = async () => {
      await fetchContracts();
    };
    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch invoices whenever contracts change
  useEffect(() => {
    if (contracts.length > 0) fetchInvoices(contracts);
  }, [contracts]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!nextInvoiceTime) return;

      const now = new Date();
      const diff = nextInvoiceTime - now;

      if (isGenerating) {
        setCountdown("Generating invoices now...");
      } else if (diff <= 0) {
        setCountdown("Generating invoices soon...");
      } else {
        const hours = Math.floor(diff / 1000 / 3600);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [nextInvoiceTime, isGenerating]);

  // Set next invoice time (every 60s for demo)
  useEffect(() => {
    const updateNext = () => {
      setNextInvoiceTime(new Date(new Date().getTime() + 60000));
    };
    updateNext();
    const timer = setInterval(updateNext, 60000);
    return () => clearInterval(timer);
  }, []);

  // Download invoice PDF
  const downloadInvoice = async (invoiceId) => {
    try {
      const res = await API.get(`/api/invoices/download/${invoiceId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading invoice:", err);
      alert("Failed to download invoice");
    }
  };

  if (loading)
    return <div className="p-6 text-gray-600">Loading contracts...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Active Contracts</h2>

      {nextInvoiceTime && (
        <div className="mb-4 text-blue-600 font-medium">{countdown}</div>
      )}

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Contract ID</th>
            <th className="py-2 px-4 border">Tenant Name</th>
            <th className="py-2 px-4 border">Room No</th>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">Monthly Rent (MMK)</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Invoices</th>
          </tr>
        </thead>
        <tbody>
          {contracts.length > 0 ? (
            contracts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{c.id}</td>
                <td className="py-2 px-4 border">{c.tenantName}</td>
                <td className="py-2 px-4 border text-center">{c.roomNo}</td>
                <td className="py-2 px-4 border text-center">{c.startDate}</td>
                <td className="py-2 px-4 border text-right">
                  {c.monthlyRent.toLocaleString()}
                </td>
                <td className="py-2 px-4 border text-center">{c.status}</td>
                <td className="py-2 px-4 border text-center">
                  {invoices[c.id] && invoices[c.id].length > 0 ? (
                    invoices[c.id].map((inv) => {
                      const isNew =
                        highlightedInvoices[c.id]?.includes(inv.id) ?? false;
                      return (
                        <button
                          key={inv.id}
                          className={`px-2 py-1 rounded m-1 ${
                            isNew
                              ? "bg-yellow-400 text-black"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                          onClick={() => downloadInvoice(inv.id)}
                        >
                          Invoice {inv.invoiceDate}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-gray-500 italic">No invoices</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                No active contracts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveContracts;
