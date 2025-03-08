// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

/**
 * Fetch member details and transaction history
 */
async function fetchDetails() {
    const name = document.getElementById("nameInput").value.trim();
    const accountNumber = document.getElementById("accountInput").value.trim();

    if (!name || !accountNumber) {
        alert("Please enter both Name and Account Number.");
        return;
    }

    try {
        // Fetch member details
        const memberRef = doc(db, "members", accountNumber);
        const memberSnap = await getDoc(memberRef);

        if (memberSnap.exists()) {
            const memberData = memberSnap.data();
            document.getElementById("savings").innerText = memberData.Savings || "0";
            document.getElementById("loanInterest").innerText = memberData.LoanInterest || "0";
            document.getElementById("loanPaid").innerText = memberData.LoanPaid || "0";
            document.getElementById("penalty").innerText = memberData.Penalty || "0";
            document.getElementById("loanTaken").innerText = memberData.LoanTaken || "0";

            // Fetch transaction history
            await fetchTransactions(accountNumber);
        } else {
            alert("No member found with this Account Number.");
        }
    } catch (error) {
        console.error("❌ Error fetching details:", error);
        alert("Error fetching details. Please try again.");
    }
}

/**
 * Fetch transaction history for a member
 */
async function fetchTransactions(accountNumber) {
    const transactionsTable = document.getElementById("transactionTable");
    transactionsTable.innerHTML = "<tr><td colspan='4'>Loading transactions...</td></tr>";

    try {
        const transactionsRef = collection(db, "transactions");
        const q = query(transactionsRef, where("AccountNumber", "==", accountNumber));
        const querySnapshot = await getDocs(q);

        transactionsTable.innerHTML = "";

        if (querySnapshot.empty) {
            transactionsTable.innerHTML = "<tr><td colspan='4'>No transactions found.</td></tr>";
        } else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = `
                    <tr>
                        <td>${data.date || "--"}</td>
                        <td>${data.description || "--"}</td>
                        <td>${data.amount || "--"}</td>
                        <td>${data.type || "--"}</td>
                    </tr>`;
                transactionsTable.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("❌ Error fetching transactions:", error);
        transactionsTable.innerHTML = "<tr><td colspan='4'>Error loading transactions.</td></tr>";
    }
}

/**
 * Print the passbook
 */
function printPassbook() {
    window.print();
}

// Expose functions globally
window.fetchDetails = fetchDetails;
window.printPassbook = printPassbook;
