import { doc, setDoc, deleteDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

const ADMINS_COLLECTION = 'admins';
const USERS_COLLECTION = 'users';

export async function makeAdmin(userId: string): Promise<void> {
  try {
    const docRef = doc(db, ADMINS_COLLECTION, userId);
    await setDoc(docRef, {
      createdAt: new Date().toISOString(),
    });

    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await setDoc(userRef, { role: 'Admin' }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${ADMINS_COLLECTION}/${userId}`);
    throw error;
  }
}

export async function removeAdmin(userId: string): Promise<void> {
  try {
    const docRef = doc(db, ADMINS_COLLECTION, userId);
    await deleteDoc(docRef);

    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await setDoc(userRef, { role: 'Member' }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${ADMINS_COLLECTION}/${userId}`);
    throw error;
  }
}

export async function getAdmins(): Promise<string[]> {
  try {
    const snapshot = await getDocs(collection(db, ADMINS_COLLECTION));
    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, ADMINS_COLLECTION);
    throw error;
  }
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const docRef = doc(db, ADMINS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${ADMINS_COLLECTION}/${userId}`);
    throw error;
  }
}
