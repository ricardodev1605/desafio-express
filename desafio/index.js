const express = require("express");
const alunos = require("./alunos.js");
const app = express();

app.use(express.json());

app.get("/alunos/", (req, res) =>{
    const {nome, media} = req.query;
    let resultado = alunos;

    if (nome) {
        resultado = alunos.filtraPorNome(nome);
    }
    if (media) {
        resultado = alunos.filtraPorMedia(media);
    }
    res.json(resultado);
});

app.post("alunos/novo", ( req, res ) =>{
    const { nome, matricula, media } = req.body;
    console.log(req.params.index)

    if(!nome || !matricula || !media) {
        return res.status(400).json({ error: "Nome, matrícula e média são campos obrigatórios." });
    }
    const novoAluno = { nome, matricula, media };
    alunos.push(novoAluno);
    })

app.listen(3000, () => {
    console.log("Servidor iniciado na porta http://localhost:3000")
})


