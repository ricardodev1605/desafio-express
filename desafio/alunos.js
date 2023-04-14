const alunos = [
    { nome: "Ricardo", media: 3.5},
    { nome: "Karoline" , media: 9.5},
    { nome: "Eduardo" , media: 4.5},
    { nome: "Gustavo" , media: 4.5},
    { nome: "Rodolfo" , media: 6.5},
];

const filtraPorNome = (nome) => {
    return alunos.filter(aluno => aluno.nome.toLowerCase().includes(nome.toLowerCase()))
}
const filtraPorMedia = (media) => {
    return alunos.filter(aluno => aluno.media >= media);
}

module.exports = { alunos, filtraPorMedia, filtraPorNome };