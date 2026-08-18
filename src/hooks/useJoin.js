import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { getAllUsers } from "../utils/dataUser";

function useJoin(targetList) {
  const { user } = useAuth();
  const currentUserEmail = user?.email;
  
  function saveAllUsers(users) {
    localStorage.setItem("dataUser", JSON.stringify(users));
  }

  const fetchUserList = useCallback(
    (email) => {
      if (!email) return [];
      const allUsers = getAllUsers();
      const currentUser = allUsers.find((user) => user.email === email);
      return currentUser?.[targetList] || [];
    },
    [targetList],
  );

  const [joinedItems, setJoinedItems] = useState(() =>
    fetchUserList(currentUserEmail),
  );

  useEffect(() => {
    (() => {
      const currentList = fetchUserList(currentUserEmail);
      setJoinedItems(currentList);
    })();
  }, [currentUserEmail, fetchUserList]);

  const updateUserStorage = (updateFn) => {
    if (!currentUserEmail) return null;

    const allUsers = getAllUsers();
    const userIndex = allUsers.findIndex((u) => u.email === currentUserEmail);
    if (userIndex === -1) return null;

    const currentList = allUsers[userIndex][targetList] || [];
    const updatedList = updateFn(currentList);

    if (updatedList === null) return currentList;

    allUsers[userIndex] = {
      ...allUsers[userIndex],
      [targetList]: updatedList,
    };
    saveAllUsers(allUsers);
    setJoinedItems(updatedList);
    return updatedList;
  };

  const addItem = (itemToAdd) =>
    updateUserStorage((currentList) => { 
      const isAlreadyAdded = currentList.some(
        (item) => String(item.id ?? item) === String(itemToAdd.id ?? itemToAdd),
      );
      if (isAlreadyAdded) return null;
      return [...currentList, itemToAdd];
    });

  const removeItem = (itemIdToRemove) =>
    updateUserStorage((currentList) =>
      currentList.filter(
        (item) => String(item.id ?? item) !== String(itemIdToRemove),
      ),
    );

  const isInList = (itemId) =>
    joinedItems.some((item) => String(item.id ?? item) === String(itemId));

  return {
    list: joinedItems,
    addItem,
    removeItem,
    isInList,
  };
}

export default useJoin;
