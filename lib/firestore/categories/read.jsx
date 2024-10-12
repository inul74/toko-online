"use client";

import useSWRSubscription from "swr/subscription";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

export function useCategories() {
  const { data, error } = useSWRSubscription(
    ["categories"],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data())
          ),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return { data, error: error?.message, isLoading: data === undefined };
}
