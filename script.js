const config = window.BCR_CONFIG || {};
const $ = (id) => document.getElementById(id);

$("year").textContent = new Date().getFullYear();
$("hoursText").textContent = config.hoursText || "Consulte os horários";
$("addressText").textContent = config.address || "Santos – SP";

const menuToggle = $("menuToggle");
const nav = $("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const dateInput = $("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

const timeSelect = $("time");
function buildTimes() {
  const [openH, openM] = (config.openingTime || "09:00").split(":").map(Number);
  const [closeH, closeM] = (config.closingTime || "19:00").split(":").map(Number);
  const interval = Number(config.intervalMinutes) || 30;
  const start = openH * 60 + openM;
  const end = closeH * 60 + closeM;
  for (let mins = start; mins < end; mins += interval) {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    const option = document.createElement("option");
    option.value = `${h}:${m}`;
    option.textContent = `${h}:${m}`;
    timeSelect.appendChild(option);
  }
}
buildTimes();

const waNumber = String(config.whatsapp || "").replace(/\D/g, "");
const floating = $("floatingWhatsapp");
if (waNumber && !waNumber.endsWith("9999999999")) {
  floating.href = `https://wa.me/${waNumber}?text=${encodeURIComponent("Olá! Gostaria de informações sobre os serviços da BCR Barber Shop.")}`;
} else {
  floating.style.display = "none";
}

$("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const error = $("formError");
  error.textContent = "";
  if (!waNumber || waNumber === "5513999999999") {
    error.textContent = "O WhatsApp da barbearia ainda não foi configurado. Atualize o número no arquivo config.js.";
    return;
  }
  const name = $("customerName").value.trim();
  const phone = $("customerPhone").value.trim();
  const service = $("service").value;
  const date = dateInput.value;
  const time = timeSelect.value;
  const notes = $("notes").value.trim();
  if (!name || !phone || !service || !date || !time) {
    error.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }
  if (date < localToday) {
    error.textContent = "Escolha uma data de hoje em diante.";
    return;
  }
  const [year, month, day] = date.split("-");
  const dateBR = `${day}/${month}/${year}`;
  const message = [
    "Olá! Gostaria de solicitar um agendamento na BCR Barber Shop.",
    "",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Serviço: ${service}`,
    `Data desejada: ${dateBR}`,
    `Horário desejado: ${time}`,
    notes ? `Observação: ${notes}` : "",
    "",
    "Aguardo a confirmação da disponibilidade. Obrigado!"
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
