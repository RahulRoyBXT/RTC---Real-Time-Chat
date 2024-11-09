import { db } from "../firebase"; // Import your Firestore instance
import { collection, getDocs, deleteDoc } from "firebase/firestore"; // Firestore functions

const checkAndDeleteExpiredRooms = async () => {
  const roomsRef = collection(db, "rooms");
  const roomSnapshot = await getDocs(roomsRef);

  const currentTime = Date.now();
  roomSnapshot.forEach(async (doc) => {
    const roomData = doc.data();
    const roomCreationTime = roomData.createdAt;
    const roomExpireTime = roomData.expireAt;

    if (currentTime - roomCreationTime >= roomExpireTime) {
      // Room has expired, delete it
      await deleteDoc(doc.ref);
    }
  });
};

export default checkAndDeleteExpiredRooms;
