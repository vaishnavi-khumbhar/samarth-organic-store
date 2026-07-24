import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();
export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("samarth_addresses");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    return localStorage.getItem("samarth_selected_address") || null;
  });

  useEffect(() => {
    localStorage.setItem("samarth_addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (selectedAddressId) {
      localStorage.setItem("samarth_selected_address", selectedAddressId);
    }
  }, [selectedAddressId]);

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
