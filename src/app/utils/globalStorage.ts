import  AsyncStorage, { useAsyncStorage} from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const getUserId = async () => await AsyncStorage.getItem("@userId");

export const useUserId = () => {
    const { getItem, setItem } = useAsyncStorage("@userId");
    const  [returnedItem, setReturnedItem] = useState<string | null>(null);
    useEffect(() => {
        const wait = async () => {
            setReturnedItem(await getItem())
        }
        wait();
    }, []);
    return { userId: returnedItem, setUserId: setItem };
};

export const useDependentId = (dependantId: string) => {
    const { getItem, setItem } = useAsyncStorage(`@dep-${dependantId}`);
    const  [returnedItem, setReturnedItem] = useState<string | null>(null);
    useEffect(() => {
        const wait = async () => {
            setReturnedItem(await getItem())
        }
        wait();
    }, []);
    return { dependentId: returnedItem, setDependentId: setItem };
};