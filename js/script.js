import "./darkMode.js";
import "./eventos.js";
import {renderizarTarefas, aplicarFiltro} from "./renderizacao.js";

document.querySelectorAll(".nav-item").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".nav-item.ativo")
            ?.classList.remove("ativo");

        botao.classList.add("ativo");
        aplicarFiltro(botao.dataset.filtro);
    });
});

renderizarTarefas();
