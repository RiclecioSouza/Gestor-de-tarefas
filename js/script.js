let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

const inputTarefa = document.getElementById("tarefa");
const inputPrioridade = document.getElementById("prioridade");
const inputData = document.getElementById("data");
const inputCategoria = document.getElementById("categoria");
const inptSearch = document.getElementById("search");

const btnPush = document.getElementById("btnPush");
btnPush.addEventListener("click", () => {
    if(inputTarefa.value === ""){
        alert("Preencha os campos!");
        return;
    }

    tarefas.push({
        titulo: inputTarefa.value,
        prioridade: inputPrioridade.value,
        data: inputData.value,
        categoria: inputCategoria.value,
        concluida: false
    });

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    inputTarefa.value = "";
    inputTarefa.focus();
    inputData.value = "";
    inputPrioridade.value = "Baixa";
    inputCategoria.value = "";

    renderizarTarefas();
});

inptSearch.addEventListener("input", () => {
    renderizarTarefas();
});

// Função que renderiza as tarefas
function renderizarTarefas() {
    const status = document.getElementById("status");
    const list = document.getElementById("list");
    list.innerHTML = "";

    const search = inptSearch.value.toLowerCase().trim();
    const tarefasFiltradas = tarefas.filter(tarefa => 
        tarefa.titulo.toLowerCase().includes(search)
    );

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
                        📁${tarefa.categoria}
                    </p>

                    <p class="${tarefa.concluida ? "concluida" : ""}">
                        📅${tarefa.data}
                    </p>

                    <p class="${tarefa.concluida ? "concluida" : ""}">
                        🔥${tarefa.prioridade}
                    </p>
                </div>

                <div class="actions">
                    <span class="iconConcluido" onclick="concluirTarefa(${index})">✔</span>
                    <span class="iconEdit" onclick="editTarefa(${index})">✎</span>
                    <span class="iconRemover" onclick="deleteTarefa(${index})">X</span>
                </div>
            <div/>
        `;
        list.appendChild(li);
    });

    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

    document.getElementById("total").innerText = tarefas.length;
    document.getElementById("concluido").innerText = concluidas;
    document.getElementById("pendente").innerText = tarefas.length - concluidas;
}

// Função para editar uma tarefa
function editTarefa(index) {

    let novoTitulo = prompt(`Editar tarefa: `, tarefas[index].titulo);

    if(!novoTitulo) return;

    tarefas[index].titulo = novoTitulo;

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    renderizarTarefas();
}

// Função para remover uma tarefa
function deleteTarefa(index) {
    tarefas.splice(index, 1);

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    renderizarTarefas();
}

// Função para marcar uma tarefa como concluida
function concluirTarefa(index) {
    tarefas[index].concluida = true;

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    renderizarTarefas();
}

// Função para mudar o tema da interfaçe
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const button = document.querySelector("button");

    if(document.body.classList.contains("dark-mode")) {
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
}