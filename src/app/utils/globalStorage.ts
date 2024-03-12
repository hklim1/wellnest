import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const getUserId = async () => await AsyncStorage.getItem("@userId");

export const useUserId = () => {
  const { getItem, setItem } = useAsyncStorage("@userId");
  const [returnedItem, setReturnedItem] = useState<string | null>(null);
  useEffect(() => {
    const wait = async () => {
      setReturnedItem(await getItem());
    };
    wait();
  }, []);
  return { userId: returnedItem, setUserId: setItem };
};

export const useDependentId = (dependentId: string) => {
  const { getItem, setItem } = useAsyncStorage(`@dep-${dependentId}`);
  const [returnedItem, setReturnedItem] = useState<string | null>(null);
  useEffect(() => {
    const wait = async () => {
      setReturnedItem(await getItem());
    };
    wait();
  }, []);
  return { dependentId: returnedItem, setDependentId: setItem };
};

export const useUserFirstName = () => {
  const { getItem, setItem } = useAsyncStorage("@firstName");
  const [returnedItem, setReturnedItem] = useState<string | null>(null);
  useEffect(() => {
    const wait = async () => {
      setReturnedItem(await getItem());
    };
    wait();
  }, []);
  return { firstName: returnedItem, setFirstName: setItem };
};

export const useUserBirthday = () => {
  const { getItem, setItem } = useAsyncStorage("@birthday");
  const [returnedItem, setReturnedItem] = useState<string | null>(null);
  useEffect(() => {
    const wait = async () => {
      setReturnedItem(await getItem());
    };
    wait();
  }, []);
  return { birthday: returnedItem, setBirthday: setItem };
};

export const useUserGender = () => {
  const { getItem, setItem } = useAsyncStorage("@gender");
  const [returnedItem, setReturnedItem] = useState<string | null>(null);
  useEffect(() => {
    const wait = async () => {
      setReturnedItem(await getItem());
    };
    wait();
  }, []);
  return { gender: returnedItem, setGender: setItem };
};
