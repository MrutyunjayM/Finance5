// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuSKstc9p_nhqLrqZKY_VHsr8pISLlKTY",
    authDomain: "financeportal-63336.firebaseapp.com",
    projectId: "financeportal-63336",
    storageBucket: "financeportal-63336.firebasestorage.app",
    messagingSenderId: "503084246152",
    appId: "1:503084246152:web:1c254a1d032e15655aab3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch member details
async function fetchMemberDetails() {
    const nameInput = document.getElementById("nameInput").value.trim();
    const accNumInput = document.getElementById("accountNumberInput").value.trim();

    if (!nameInput || !accNumInput) {
        alert("Please enter both Name and Account Number.");
        return;
    }

    // Reference the document in Firestore
    const docRef = doc(db, "members", accNumInput);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();

        // Check if the name matches (for additional verification)
        if (data.Name.toLowerCase() !== nameInput.toLowerCase()) {
            alert("No matching records found for this Name and Account Number.");
            return;
        }

        // Update the UI with fetched details
        document.getElementById("savings").innerText = `💰 Savings: ₹${data.Savings}`;
        document.getElementById("loanInterest").innerText = `📊 Loan Interest: ₹${data.LoanInterest}`;
        document.getElementById("loanPaid").innerText = `✅ Loan Paid: ₹${data.LoanPaid}`;
        document.getElementById("penalty").innerText = `⚠️ Penalty: ₹${data.Penalty}`;
        document.getElementById("loanTaken").innerText = `💳 Loan Taken: ₹${data.LoanTaken}`;

    } else {
        alert("No member found with the given Account Number.");
    }
}

// Attach event listener to the Fetch button
document.getElementById("fetchButton").addEventListener("click", fetchMemberDetails);
