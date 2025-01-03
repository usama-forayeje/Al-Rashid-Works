import {
    getDatabase,
    ref,
    onValue,
    get,
    push,
    set,
    remove,
    off,
} from "firebase/database";
import app from "./firebaseConfig";

export const db = getDatabase(app);

// ******************************* Firebase CRUD Helper Functions *************************** //

// Read/Get data from database (single read)
export const getFirebaseData = async (tableName) => {
    const starCountRef = ref(db, tableName);

    try {
        const snapshot = await get(starCountRef);
        const updateCategoryList = [];

        snapshot.forEach((item) => {
            updateCategoryList.push({
                id: item.key,
                ...item.val(),
            });
        });

        return updateCategoryList;
    } catch (error) {
        throw new Error(error);
    }
};

// Read/Get data from database for edit (single read)
export const getFirebaseDataForEdit = async (tableName) => {
    const starCountRef = ref(db, tableName);

    try {
        const snapshot = await get(starCountRef);
        return snapshot.val();
    } catch (error) {
        throw new Error(error);
    }
};

// Real-time data subscription
export const getRealTimeData = (tableName, callback) => {
    const starCountRef = ref(db, tableName);

    const unsubscribe = onValue(starCountRef, (snapshot) => {
        const data = [];
        snapshot.forEach((item) => {
            data.push({
                id: item.key,
                ...item.val(),
            });
        });

        callback(data);
    });

    // Return an unsubscribe function to call later
    return () => off(starCountRef);
};

// Write/Set/Push data to database
export const setDataToFirebase = (tableName, data) => {
    return push(ref(db, tableName), data);
};

// Update data in database
export const updateDataFromFirebase = (tableName, data) => {
    return set(ref(db, tableName), data);
};

// Remove data from firebase
export const removeDataFromFirebase = (tableName) => {
    return remove(ref(db, tableName));
};

// ******************************* User Profile *************************** //

// Create or update user profile
export const createUserProfile = async (data) => {
    const { id, name, role, email } = data;
    try {
        await set(ref(db, "userProfile/" + id), {
            name,
            role,
            email,
        });
    } catch (error) {
        throw new Error(error);
    }
};

// Get user profile
export const getProfile = async (id) => {
    const profileRef = ref(db, "userProfile/" + id);

    try {
        const snapshot = await get(profileRef);
        return snapshot.val();
    } catch (error) {
        throw new Error(error);
    }
};


