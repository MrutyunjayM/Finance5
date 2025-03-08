// Firebase configuration (Replace with your actual Firebase details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch Member Details
async function fetchDetails() {
    const name = document.getElementById("nameInput").value.trim();
    const accountNumber = document.getElementById("accountInput").value.trim();

    if (!name || !accountNumber) {
        alert("⚠️ Please enter both Name and Account Number.");
        return;
    }

    try {
        const memberRef = db.collection("members").doc(accountNumber);
        const memberSnap = await memberRef.get();

        if (memberSnap.exists) {
            const memberData = memberSnap.data();
            document.getElementById("savings").innerText = memberData.Savings || "0";
            document.getElementById("loanInterest").innerText = memberData.LoanInterest || "0";
            document.getElementById("loanPaid").innerText = memberData.LoanPaid || "0";
            document.getElementById("penalty").innerText = memberData.Penalty || "0";
            document.getElementById("loanTaken").innerText = memberData.LoanTaken || "0";

            fetchTransactions(accountNumber);
        } else {
            alert("❌ No member found with this Account Number.");
        }
    } catch (error) {
        console.error("❌ Error fetching details:", error);
        alert("⚠️ Error fetching details. Please try again.");
    }
}

// Fetch Transaction History
async function fetchTransactions(accountNumber) {
    const transactionsTable = document.getElementById("transactionTable");
    transactionsTable.innerHTML = "<tr><td colspan='4'>🔄 Loading transactions...</td></tr>";

    try {
        const transactionsRef = db.collection("transactions").where("AccountNumber", "==", accountNumber);
        const querySnapshot = await transactionsRef.get();

        transactionsTable.innerHTML = "";

        if (querySnapshot.empty) {
            transactionsTable.innerHTML = "<tr><td colspan='4'>❌ No transactions found.</td></tr>";
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
        transactionsTable.innerHTML = "<tr><td colspan='4'>⚠️ Error loading transactions.</td></tr>";
    }
}

// Print Passbook
function printPassbook() {
    window.print();
}

// Attach functions to window (to be accessible from HTML)
window.fetchDetails = fetchDetails;
window.printPassbook = printPassbook;
