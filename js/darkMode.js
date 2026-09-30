export const btnDark = document.getElementById("btnDark");
btnDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
        btnDark.textContent = "☀️";
    } else {
        btnDark.textContent = "🌙";
    }
});
