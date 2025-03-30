document.getElementById("billForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get values
    const registerNo = document.getElementById("registerNo").value;
    const studentName = document.getElementById("studentName").value;
    const department = document.getElementById("department").value;
    const billType = document.getElementById("billType").value;
    const billAmount = document.getElementById("billAmount").value;
    const billDate = document.getElementById("billDate").value;

    // Clear previous receipt
    const receipt = document.getElementById("receipt");
    receipt.innerHTML = "";

    // Generate Receipt
    receipt.innerHTML = `
        <img src='download.jpeg' alt='College Logo' width='80'>
        <h3>A.V.V.M. Sri Pushpam College</h3>
        <p><strong>Register No:</strong> ${registerNo}</p>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Bill Type:</strong> ${billType}</p>
        <p><strong>Amount:</strong> ₹${billAmount}</p>
        <p><strong>Date:</strong> ${billDate}</p>
    `;

    receipt.classList.remove("hidden");
    document.getElementById("printBill").classList.remove("hidden");

    // Store in history
    const history = document.getElementById("billHistory");
    const newHistoryItem = document.createElement("div");
    newHistoryItem.classList.add("history-item");
    newHistoryItem.innerHTML = `
        <span>${studentName} - ₹${billAmount} (${billType})</span>
        <button onclick="removeHistoryItem(this)">X</button>
    `;
    history.appendChild(newHistoryItem);
});

// Print Bill
document.getElementById("printBill").addEventListener("click", function() {
    const receiptContent = document.getElementById("receipt").innerHTML;
    const printWindow = window.open("", "", "width=600,height=600");

    const receiptHTML = `
        <html>
        <head>
            <title>Bill Receipt</title>
            <style>
                body { font-family: 'Poppins', sans-serif; text-align: center; background: #f4f7fc; }
                .receipt-container { width: 90%; max-width: 400px; margin: auto; padding: 20px; background: white;
                    border-radius: 12px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); border: 3px solid #6a11cb; text-align: left; }
                .receipt-header { text-align: center; border-bottom: 2px solid #6a11cb; padding-bottom: 10px; margin-bottom: 15px; }
                .receipt-header img { width: 70px; }
                .receipt-header h2 { color: #6a11cb; font-size: 22px; margin-top: 5px; }
                .receipt-details p { font-size: 16px; margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 6px; font-weight: 500; }
                .receipt-footer { text-align: center; margin-top: 15px; font-size: 14px; color: #555; font-style: italic; }
            </style>
        </head>
        <body>
            <div class="receipt-container">
                <div class="receipt-header">
                    <img src='download.jpeg' alt='College Logo'>
                    <h2>A.V.V.M. Sri Pushpam College</h2>
                </div>
                ${receiptContent}
                <div class="receipt-footer">
                    Thank you for your payment! <br> A.V.V.M. Sri Pushpam College
                </div>
            </div>
            <script>
                window.print();
                window.close();
            <\/script>
        </body>
        </html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();
});

// Clear History
function removeHistoryItem(element) {
    element.parentElement.remove();
}
