const members = ["Prantik", "Arnab", "Azam", "Rial"];
let totalBill = 0;
let purchaseCount = 0;

const membersDiv = document.getElementById("members");
const messageDiv = document.getElementById("message");
const addBillBtn = document.getElementById("addBillBtn");
const resetBtn = document.getElementById("resetBtn");
const purchaseCountDiv = document.getElementById("purchaseCount");

addBillBtn.addEventListener("click", addWaterBill);
resetBtn.addEventListener("click", resetAll);

function addWaterBill() {
  totalBill += 110;
  purchaseCount++;
  messageDiv.textContent = `৳110 added to the water bill.`;
  messageDiv.style.display = "block";
  purchaseCountDiv.textContent = `Purchases: ${purchaseCount}`;
  renderMembers();
}

function resetAll() {
  totalBill = 0;
  purchaseCount = 0;
  messageDiv.textContent = "All values have been reset.";
  messageDiv.style.display = "block";
  purchaseCountDiv.textContent = `Purchases: 0`;
  renderMembers();
}

function renderMembers() {
  membersDiv.innerHTML = "";
  const individualShare = totalBill / members.length;

  members.forEach(name => {
    const card = document.createElement("div");
    card.className = `card ${name.toLowerCase()}`;

    const title = document.createElement("h2");
    title.textContent = name;

    const amount = document.createElement("div");
    amount.className = "amount";
    amount.textContent = `৳${individualShare.toFixed(2)}`;

    card.appendChild(title);
    card.appendChild(amount);
    membersDiv.appendChild(card);
  });
}

// Initial UI
renderMembers();
