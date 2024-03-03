import {
    doc,
    addDoc,
    collection,
    setDoc,
    updateDoc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { firebaseDB } from "../../../FirebaseConfig";
import { getUserId, useUserId } from "./globalStorage";
import { useEffect, useState } from "react";
import { Dependent } from "../../lib/members";
import { AppointmentType } from "../../lib/appointments";

export interface Symptom {
    activeSymptoms?: string[];
    date: {
        nanoseconds: number;
        seconds: number;
    };
    notes?: string;
    time: string;
}

export interface Medication {
    name: string;
    dose?: string;
    date: {
        nanoseconds: number;
        seconds: number;
    };
    time: string;
    notes?: string;
}

export interface Dependent {
    icon: string;
    firstName: string;
    dateOfBirth: string;
    gender: string;
    notes: string;
    symptoms?: {
        [symptomId: string]: Symptom;
    };
    appointments?: Object;
    medications?: {
        [medicationId: string]: Medication;
    };
}

export interface JoinMeds {
    icon: string;
    medications?: Medication[];
}

export const createDependent = async (
    firstName: string,
    dateOfBirth: string,
    gender: string,
    notes: string,
    icon: string
) => {
    try {
        const userId = await getUserId();
        if (userId === null) {
            return;
        }
        const resp = await addDoc(collection(firebaseDB, "Dependents"), {
            firstName,
            dateOfBirth,
            gender,
            notes,
            icon,
        });
        const newDepId = resp["_key"]["path"]["segments"][1];
        console.log(newDepId);
        addFullPermissions(userId, newDepId);
        return resp;
    } catch (e) {
        console.log(e);
    }
};

export const addFullPermissions = async (
    userId: string,
    dependentId: string
) => {
    try {
        const userRef = doc(firebaseDB, "Users", userId);
        const resp = await setDoc(
            userRef,
            { permissions: { [dependentId]: "full" } },
            { merge: true }
        );
        return resp;
    } catch (e) {
        console.log(e);
    }
};

export const editDependent = async (
    dependentId: string,
    firstName: string,
    dateOfBirth: string,
    gender: string,
    notes: string,
    icon: string
) => {
    try {
        await updateDoc(doc(firebaseDB, "Dependents", dependentId), {
            firstName,
            dateOfBirth,
            gender,
            notes,
            icon,
        });
        console.log("Dependent edited successfully.");
    } catch (e) {
        console.error("Error editing dependent:");
    }
};

export const removeUserFromPermissions = async (
    userId: string,
    dependentId: string
) => {
    try {
        // Fetch the user document
        const userDocRef = doc(firebaseDB, "Users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // Get the existing permissions object
            const permissions = userDoc.data()?.permissions || {};

            // Remove the dependent ID from the permissions object
            delete permissions[dependentId];

            // Update the user document with the modified permissions object
            await updateDoc(userDocRef, { permissions });
            console.log(
                `User ${userId} removed from permissions for dependent ${dependentId}.`
            );
        } else {
            console.warn(`User document with ID ${userId} does not exist.`);
        }
    } catch (e) {
        console.error("Error removing user from permissions:");
    }
};

export const useDependentIds = (userId: string) => {
    const [depIds, setDepIds] = useState<string[]>([]);

    useEffect(() => {
        const getData = async () => {
            const userRef = doc(firebaseDB, "Users", userId);
            const resp = await getDoc(userRef);
            if (resp.exists()) {
                const data = resp.data().permissions;
                setDepIds(data);
                console.log(data);
            } else {
                console.log("no data exists");
            }
        };
        getData();
    }, [userId]);

    return depIds;
};

export const getDependents = async (userId: string) => {
    // returns permissions object for the code
    try {
        const userRef = doc(firebaseDB, "Users", userId);
        const resp = await getDoc(userRef);
        if (resp.exists()) {
            const data = resp.data().permissions;
            console.log("Document data:", Object.keys(data));
            return data;
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.log(e);
    }
};

export const useDependentIcons = (deps: string[] | null) => {
    const [icons, setIcons] = useState<{ [_: string]: string }>({});
    useEffect(() => {
        const gatherData = async () => {
            for (const dependentId in deps) {
                const dependentRef = doc(firebaseDB, "Dependents", dependentId);
                const resp = await getDoc(dependentRef);
                const name: string = resp.data()?.firstName;
                const icon: string = resp.data()!.icon;
                setIcons({ ...icons, [name]: icon });
            }
        };
        gatherData();
    }, [deps]);
    return icons;
};

export const useDependents = (deps: string[] | null) => {
    const [dependents, setDependents] = useState<{ [_: string]: Dependent }>(
        {}
    );
    useEffect(() => {
        const gatherData = async () => {
            let newDependents = { ...dependents };
            for (const dependentId in deps) {
                const dependentRef = doc(firebaseDB, "Dependents", dependentId);
                const resp = await getDoc(dependentRef);
                newDependents = {
                    ...newDependents,
                    [dependentId]: { ...(resp.data() as Dependent) },
                };
            }
            setDependents({ ...newDependents });
        };
        gatherData();
    }, [deps]);
    return dependents;
};

export const getDependentIcons = async (dependentsArray: string[] | null) => {
    const userId = await getUserId();
    const dependentsData: { [_: string]: Dependent } = {};
    if (dependentsArray === null) {
        return;
    } else {
        for (let i = 0; i < dependentsArray.length; i++) {
            const dependentId = dependentsArray[i];
            let reference;
            if (userId && userId == dependentId) {
                reference = doc(firebaseDB, "Users", dependentId);
            } else {
                reference = doc(firebaseDB, "Dependents", dependentId);
            }
            const resp = await getDoc(reference);

            console.log("=======================");
            console.log("DATA FOR ", dependentId, resp.data());
            const name: string = resp.data()?.firstName;
            const icon: string = resp.data()!.icon;
            dependentsData[dependentId] = { ...resp.data(), id: dependentId };
        }
        console.log(dependentsData);
        return dependentsData;
    }
};

export const getDependentById = async (depId: string) => {
    const reference = doc(firebaseDB, "Dependents", depId);

    const response = await getDoc(reference);
};

export const storeUser = async (userId: string, email: string) => {
    try {
        const resp = await setDoc(doc(firebaseDB, "Users", userId), {
            email,
            permissions: {},
        });
        return resp;
    } catch (e) {
        console.log(e);
    }
};

export const addAppointments = async (appointment: AppointmentType) => {
    const documentId = await getUserId();

    const documentRef = doc(firebaseDB, "Users", documentId as string);

    try {
        const existingDoc = await getDoc(documentRef);

        if (existingDoc.exists()) {
            const existingAppointments = existingDoc.data()?.appointments || {};

            const appointmentKey = `app_${Date.now()}`;

            const updatedAppointments = {
                ...existingAppointments,
                [appointmentKey]: { ...appointment, _id: appointmentKey },
            };

            await updateDoc(documentRef, {
                appointments: updatedAppointments,
            });

            console.log("New Appointment Created");
        } else {
            console.warn("This User dont exits, your problem not mines!");
        }
    } catch (err) {
        console.warn("Failed to add Appointment");
    }
};

export const getAppointments = async () => {
    const documentId = await getUserId();

    const documentRef = doc(firebaseDB, "Users", documentId as string);

    try {
        const response = await getDoc(documentRef);

        if (response.exists()) {
            console.log(response.data());
            return response.data()?.appointments || {};
        } else {
            console.warn("Appointments dont exist as yet!");
            return {};
        }
    } catch (err) {
        console.warn("Something bad happended... oopps");
    }
};

export const getAppointmentById = async (appointmentId: string) => {
    const documentId = await getUserId();

    const documentRef = doc(firebaseDB, "Users", documentId as string);

    try {
        const response = await getDoc(documentRef);

        if (response.exists()) {
            const appointments = response.data()?.appointments || {};

            // Check if the appointment with the given ID exists
            if (appointments[appointmentId]) {
                console.log("Found appointment:", appointments[appointmentId]);
                return appointments[appointmentId];
            } else {
                console.warn(
                    `Appointment with ID ${appointmentId} does not exist.`
                );
                return null;
            }
        } else {
            console.warn("Appointments don't exist as yet!");
            return null;
        }
    } catch (err) {
        console.warn("Something bad happened... oops");
        return null;
    }
};

// ====================== SYMPTOMS ===========================
export const addSymptoms = async (
    uuid: string,
    accountId: string,
    date: Date,
    time: string,
    symptoms: string[],
    notes: string
) => {
    console.log(accountId);
    const userId = await getUserId();
    if (accountId === userId) {
        try {
            const userRef = doc(firebaseDB, "Users", accountId);
            const resp = await setDoc(
                userRef,
                {
                    symptoms: {
                        [uuid]: {
                            ["date"]: date,
                            ["time"]: time,
                            ["symptoms"]: symptoms,
                            ["notes"]: notes,
                        },
                    },
                },
                { merge: true }
            );
            return resp;
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log(accountId);
        try {
            const userRef = doc(firebaseDB, "Dependents", accountId);
            const resp = await setDoc(
                userRef,
                {
                    symptoms: {
                        [uuid]: {
                            ["date"]: date,
                            ["time"]: time,
                            ["activeSymptoms"]: symptoms,
                            ["notes"]: notes,
                        },
                    },
                },
                { merge: true }
            );
            return resp;
        } catch (e) {
            console.log(e);
        }
    }
};

// ====================== MEDICATIONS ===========================
export const addOneTimeMed = async (
    uuid: string,
    accountId: string,
    name: string,
    date: Date,
    time: string,
    notes?: string,
    dose?: string
) => {
    console.log(accountId);
    const userId = await getUserId();
    if (accountId === userId) {
        try {
            const userRef = doc(firebaseDB, "Users", accountId);
            const resp = await setDoc(
                userRef,
                {
                    medications: {
                        [uuid]: {
                            ["name"]: name,
                            ["date"]: date,
                            ["time"]: time,
                            ["notes"]: notes,
                            ["dose"]: dose,
                        },
                    },
                },
                { merge: true }
            );
            return resp;
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log(accountId);
        try {
            const userRef = doc(firebaseDB, "Dependents", accountId);
            const resp = await setDoc(
                userRef,
                {
                    medications: {
                        [uuid]: {
                            ["name"]: name,
                            ["date"]: date,
                            ["time"]: time,
                            ["notes"]: notes,
                            ["dose"]: dose,
                        },
                    },
                },
                { merge: true }
            );
            return resp;
        } catch (e) {
            console.log(e);
        }
    }
};
export const getAllMedicationsForDependents = async (
    dependentsArray: string[] | null
) => {
    const medicationsData: { [_: string]: Medication } = {};
    try {
        if (dependentsArray === null) {
            return medicationsData;
        }

        for (let i = 0; i < dependentsArray.length; i++) {
            const dependentId = dependentsArray[i];
            const medicationsRef = collection(
                firebaseDB,
                "Dependents",
                dependentId,
                "medications"
            );
            const medicationsSnapshot = await getDocs(medicationsRef);

            if (!medicationsSnapshot.empty) {
                medicationsSnapshot.forEach((medicationDoc) => {
                    console.log(
                        "-___________--------------------",
                        medicationDoc
                    );
                    const medicationId = medicationDoc.id;
                    const medicationData = medicationDoc.data() as Medication;
                    medicationsData[medicationId] = {
                        ...medicationData,
                        // dependentId,
                    };
                });
            }
        }

        console.log("All Medications Data:", medicationsData);
        return medicationsData;
    } catch (e) {
        console.error(
            "Error getting all medications for dependents:"
            // e.message
        );
        return medicationsData;
    }
};

export const getAllMeds = async (userId: string) => {
    const medsArray: JoinMeds[] = [];
    try {
        const ids = await getDependents(userId);
        const deps = await getDependentIcons(Object.keys(ids));

        if (deps) {
            Object.values(deps).forEach((dep) => {
                if (dep.medications) {
                    medsArray.push({ ...dep.medications, icon: dep.icon });
                }
                console.log(dep);
            });

            return medsArray;
        }
    } catch (err) {
        console.log("ERROR");
    }

    return [];
};

// ============================ GET HISTORY ==================================
// export const useSymptoms = (dependentId: string | null) => {
//   const [dependents, setDependents] = useState<{ [_: string]: Dependent }>({});
//   useEffect(() => {
//     const gatherData = async () => {
//       let newDependents = { ...dependents };
//       for (const dependentId in deps) {
//         const dependentRef = doc(firebaseDB, "Dependents", dependentId);
//         const resp = await getDoc(dependentRef);
//         newDependents = {
//           ...newDependents,
//           [dependentId]: { ...(resp.data() as Dependent) },
//         };
//       }
//       setDependents({ ...newDependents });
//     };
//     gatherData();
//   }, [deps]);
//   return dependents;
// };
