import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7WJLDoEdgEj-T5MEJenQ1a7bku1tHAT4",
  authDomain: "water-bill-splitter-21a7d.firebaseapp.com",
  databaseURL: "https://water-bill-splitter-21a7d-default-rtdb.firebaseio.com",
  projectId: "water-bill-splitter-21a7d",
  storageBucket: "water-bill-splitter-21a7d.appspot.com",
  messagingSenderId: "521997984039",
  appId: "1:521997984039:web:3edbac6596d3a42f664902",
  measurementId: "G-6YDMDBXW9T"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const members = ["Prantik", "Arnab", "Azam", "Rial"];
let totalBill = 0;
let purchaseCount = 0;

const membersDiv = document.getElementById("members");
const messageDiv = document.getElementById("message");
const addBillBtn = document.getElementById("addBillBtn");
const resetBtn = document.getElementById("resetBtn");
const purchaseCountDiv = document.getElementById("purchaseCount");

addBillBtn.addEventListener("click", () => {
  const newTotal = totalBill + 110;
  const newCount = purchaseCount + 1;

  set(ref(db, "billData"), {
    totalBill: newTotal,
    purchaseCount: newCount
  });
});

resetBtn.addEventListener("click", () => {
  set(ref(db, "billData"), {
    totalBill: 0,
    purchaseCount: 0
  });
});

onValue(ref(db, "billData"), (snapshot) => {
  const data = snapshot.val();
  if (data) {
    totalBill = data.totalBill;
    purchaseCount = data.purchaseCount;
  } else {
    totalBill = 0;
    purchaseCount = 0;
  }

  messageDiv.textContent = `Updated: ৳${totalBill} total`;
  messageDiv.style.display = "block";
  purchaseCountDiv.textContent = `Purchases: ${purchaseCount}`;
  renderMembers();
});

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
