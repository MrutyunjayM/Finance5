// Function to print passbook with header
function printPassbook() {
    const printContent = document.body.innerHTML;
    const header = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h1>🔖 ಶ್ರೀ ಗಾಯತ್ರಿ ದೇವಿ ಸ್ವ ಸಹಾಯ ಸಂಘ</h1>
            <h2>📖 Finance Passbook</h2>
        </div>
    `;
    
    const passbookContent = document.querySelector("main").innerHTML;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>Print Passbook</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; }
                h1 { color: #007bff; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: center; }
                th { background: #007bff; color: white; }
            </style>
        </head>
        <body>
            ${header}
            ${passbookContent}
        </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
}

// Expose function globally
window.printPassbook = printPassbook;
