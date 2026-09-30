import {tarefas} from "./dados.js";
import { renderizarTarefas } from "./renderizacao.js";

export const btnPush = document.getElementById("btnPush");

const inputTarefa = document.getElementById("tarefa");
const inputPrioridade = document.getElementById("prioridade");
const inputData = document.getElementById("data");
const inputCategoria = document.getElementById("categoria");

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