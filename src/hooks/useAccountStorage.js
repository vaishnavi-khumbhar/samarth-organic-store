import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

// FIX: cart / wishlist / addresses used to live under ONE fixed
// localStorage key shared by every account on the same browser (e.g.
// "samarth_cart"). Log in as a different account and you'd see the
// previous account's cart and wishlist. This hook scopes the key to the
// current account (falling back to a shared "guest" bucket while logged
// out), and reloads the right data whenever the active account changes
// (login / logout / switching accounts) instead of carrying over
// whatever was in state a moment ago.
export const useAccountStorage = (baseKey, defaultValue) => {
  const { user } = useAuth();
  const bucket = user?.id ? String(user.id) : "guest";
  const storageKey = `${baseKey}_${bucket}`;

  const readBucket = (key) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [value, setValue] = useState(() => readBucket(storageKey));

  // Tracks which account's data is currently loaded into state, and
  // whether the very next "save" effect run is actually just the reload
  // caused by switching accounts (not a real change to save) — without
  // this guard, switching accounts would immediately overwrite the new
  // account's saved data with whatever was in state from the previous
  // account.
  const loadedBucket = useRef(bucket);
  const skipNextSave = useRef(false);

  useEffect(() => {
    if (loadedBucket.current === bucket) return;
    loadedBucket.current = bucket;
    skipNextSave.current = true;
    setValue(readBucket(storageKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket]);

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* storage full / disabled — ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, storageKey]);

  return [value, setValue];
};