import React from 'react';
  
  const Checkingit = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default Checkingit;
  import { collection, getDocs } from "firebase/firestore";

async function testConnection() {
  try {
    const querySnapshot = await getDocs(collection(db, "your-collection-name")); // Replace with your collection name
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Call the test function to check Firestore connection
testConnection();
