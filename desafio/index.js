const express = require("express");
const alunos = require("./alunos.js");
const app = express();

app.use(express.json());

app.get("/alunos/", (req, res) => {
    const { nome, media } = req.query;
    let resultado = alunos;

    if (nome) {
        resultado = alunos.filtraPorNome(nome);
    }
    if (media) {
        resultado = alunos.filtraPorMedia(media);
    }
    res.json(resultado);
});

// Rota para adicionar alunos

app.post("/alunos/novo", (req, res) => {
    const { nome, matricula, media } = req.body;
    console.log(req.params.index)

    if (!nome || !matricula || !media) {
        return res.status(400).json({ error: "Nome, matrícula e média são campos obrigatórios." });
    }
    const novoAluno = { nome, matricula, media };
    alunos.push(novoAluno);
})
// Rota para deletar alunos

app.post("/alunos/deletar/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index)) {
        return res.status(400).json({ error: "O índice deve ser um número válido." });
    }    
    if (index < 0 || index >= alunos.length) {
        return res.status(404).json({ error: "Aluno não encontrado." });
    }
    const alunoRemovido = alunos.splice(index, 1)[0];

    res.json({ success: "Aluno removido com sucesso.", aluno: alunoRemovido });
});

// Rota para atualizar alunos

app.post("/alunos/atualizar/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const { nome, media } = req.body;

    if (isNaN(index)) {
        return res.status(400).json({ error: "O índice deve ser um número válido." });
    }    
    if (index < 0 || index >= alunos.length) {
        return res.status(404).json({ error: "Aluno não encontrado." });
    }

    if (!nome && !media) {
        return res.status(400).json({ error: "Pelo menos um campo (nome ou média) deve ser informado para atualização." });
    }

    const aluno = alunos[index];

    if (nome) {
        aluno.nome = nome;
    }

    if (media) {
        aluno.media = media;
    }

    res.json({ success: "Aluno atualizado com sucesso.", aluno: aluno });
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta http://localhost:3000")
})


