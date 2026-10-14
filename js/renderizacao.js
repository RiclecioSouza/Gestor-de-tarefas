import {tarefas} from "./dados.js";

let filtroAtual = "todas";

export function aplicarFiltro(filtro) {
    filtroAtual = filtro;
    renderizarTarefas();
}

const inptSearch = document.getElementById("search");
inptSearch.addEventListener("input", () => {
    renderizarTarefas();
});

export function renderizarTarefas() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    
    const search = inptSearch.value.toLowerCase().trim();

    const tarefasFiltradas = tarefas.filter(tarefa =>{
        const correspondeBusca = tarefa.titulo
            .toLowerCase()
            .includes(search);

        const correspondeFiltro = 
            filtroAtual === "todas" || 
            (filtroAtual === "pendentes" && !tarefa.concluida) || 
            (filtroAtual === "concluidas" && tarefa.concluida);

        return correspondeBusca && correspondeFiltro;
    });

    tarefasFiltradas.forEach((tarefa) => {
        const index = tarefas.indexOf(tarefa);
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="campoContent">
                <div class="campoTarefas">
                    <h3 class="${tarefa.concluida ? "concluida" : ""}">
                        ${tarefa.titulo}
                    </h3>

                    <p class="${tarefa.concluida ? "concluida" : ""}">
                        📁 ${tarefa.categoria}
                    </p>

                    <p class="${tarefa.concluida ? "concluida" : ""}">
                        📅 ${tarefa.data}
                    </p>

                    <p class="${tarefa.concluida ? "concluida" : ""}">
                        🔥 ${tarefa.prioridade}
                    </p>
                </div>

                <div class="actions">
                    <span class="iconConcluido">
                        ✔
                    </span>

                    <span class="iconEdit">
                        ✎
                    </span>

                    <span class="iconRemover">
                        X
                    </span>
                </div>
            <div/>
        `;

        const btnConcluir = li.querySelector(".iconConcluido");
        btnConcluir.addEventListener("click", () => {
            tarefas[index].concluida = !tarefas[index].concluida;

            localStorage.setItem(
                "tarefas",
                JSON.stringify(tarefas)
            );

            renderizarTarefas();
        });

        const btnEdit = li.querySelector(".iconEdit");
        btnEdit.addEventListener("click", () => {
            let novoTitulo = prompt(`Editar título`, tarefas[index].titulo);
            if(!novoTitulo || novoTitulo.trim() === "") {
                return;
            }

            let novaCategoria = prompt(`Editar categoria`, tarefas[index].categoria);
            if(!novaCategoria || novaCategoria.trim() === "") {
                return;
            }

            let novaPrioridade = prompt(`Editar prioridade`, tarefas[index].prioridade);
            if(!novaPrioridade || novaPrioridade.trim() === "") {
                return;
            }

            tarefas[index].titulo = novoTitulo;
            tarefas[index].categoria = novaCategoria;
            tarefas[index].prioridade = novaPrioridade;

            localStorage.setItem(
                "tarefas",
                JSON.stringify(tarefas)
            );

            renderizarTarefas();
        });

        const btnRemover = li.querySelector(".iconRemover");
        btnRemover.addEventListener("click", () => {
            tarefas.splice(index, 1);

            localStorage.setItem(
                "tarefas",
                JSON.stringify(tarefas)
            );

            renderizarTarefas();
        });

        list.appendChild(li);
    });

    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

    document.getElementById("total").innerText = tarefas.length;
    document.getElementById("concluido").innerText = concluidas;
    document.getElementById("pendente").innerText = tarefas.length - concluidas;
}