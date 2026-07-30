import { createContext, useContext } from "react";
import { useAccountStorage } from "../hooks/useAccountStorage";

const AddressContext = createContext();
export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  // FIX: was two fixed keys ("samarth_addresses", "samarth_selected_address")
  // shared by every account on this browser. Now scoped per logged-in
  // account (see hooks/useAccountStorage.js). Note: this still stores
  // addresses in the browser only — it isn't synced with the
  // /api/addresses/* endpoints on the backend, so addresses won't follow
  // you to a different browser/device. Happy to wire that up too if useful.
  const [addresses, setAddresses] = useAccountStorage("samarth_addresses", []);
  const [selectedAddressId, setSelectedAddressId] = useAccountStorage(
    "samarth_selected_address",
    null
  );

  const addAddress = (address) => {
    const newAddr = { ...address, id: Date.now().toString() };
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    return newAddr;
  };

  const updateAddress = (id, updates) => {
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setSelectedAddressId((prevId) => (prevId === id ? null : prevId));
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || null;

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        selectedAddressId,
        setSelectedAddressId,
        selectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};