        // Função para buscar a unidade
        function buscarUnidade() {
            const searchInput = document.getElementById("searchInput").value;
            const unidades = document.querySelectorAll('#vagasIndividuais li, #vagasDuplas li, #vagasTriplas li');

            for (let i = 0; i < unidades.length; i++) {
                const unidadeText = unidades[i].textContent;
                if (unidadeText.includes(searchInput)) {
                    unidades[i].style.display = "block";
                } else {
                    unidades[i].style.display = "none";
                }
            }
        }

        //Função do sorteio
        function realizarSorteio() {
            const vagasIndividuais = [];
            const vagasDuplas = [];
            const vagasTriplas = [];
            const unidades = [];

            for (let i = 4; i <= 73; i += 2) {
                vagasDuplas.push([i, i + 1]);
            }

            for (let i = 74; i <= 223; i += 3) {
                vagasTriplas.push([i, i + 1, i + 2]);
            }

            for (let i = 1; i <= 223; i++) {
                unidades.push(`Unidade ${i}`);
            }

            unidades.sort(() => Math.random() - 0.5);

            const vagasIndividuaisList = document.getElementById("vagasIndividuais");
            const vagasDuplasList = document.getElementById("vagasDuplas");
            const vagasTriplasList = document.getElementById("vagasTriplas");
            const sorteioDataHora = document.getElementById("sorteioDataHora");

            vagasIndividuaisList.innerHTML = "<li></li>";
            vagasDuplasList.innerHTML = "<li></li>";
            vagasTriplasList.innerHTML = "<li></li>";

            const dataHoraSorteio = new Date();
            sorteioDataHora.textContent = `Data e Hora do Sorteio: ${dataHoraSorteio.toLocaleString()}`;

            for (let i = 1; i <= 3; i++) {
                if (unidades.length > 0) {
                    vagasIndividuaisList.innerHTML += `<li>Vaga Individual ${i}: ${unidades.shift()}</li>`;
                }
            }

            vagasDuplas.forEach((vagas, index) => {
                const unidadesSorteadas = unidades.splice(0, vagas.length);
                vagasDuplasList.innerHTML += `<li>Vaga Dupla ${vagas[0]} e ${vagas[1]}: ${unidadesSorteadas.join(', ')}</li>`;
            });

            vagasTriplas.forEach((vagas, index) => {
                const unidadesSorteadas = unidades.splice(0, vagas.length);
                vagasTriplasList.innerHTML += `<li>Vaga Tripla ${vagas[0]}, ${vagas[1]}, e ${vagas[2]}: ${unidadesSorteadas.join(', ')}</li>`;
            }
            );
        }

        //Função para exportação do pdf
        function exportarParaPDF() {
            const vagasIndividuaisList = document.getElementById("vagasIndividuais");
            const vagasDuplasList = document.getElementById("vagasDuplas");
            const vagasTriplasList = document.getElementById("vagasTriplas");
            const sorteioDataHora = document.getElementById("sorteioDataHora").textContent; // Pega a data e hora do sorteio
        
            const resultados = {
                "Vagas Individuais": [],
                "Vagas Duplas": [],
                "Vagas Triplas": []
            };
        
            // Função para adicionar os resultados a um objeto
            function adicionarResultados(lista, categoria) {
                for (let i = 0; i < lista.children.length; i++) {
                    resultados[categoria].push(lista.children[i].textContent);
                }
            }
        
            adicionarResultados(vagasIndividuaisList, "Vagas Individuais");
            adicionarResultados(vagasDuplasList, "Vagas Duplas");
            adicionarResultados(vagasTriplasList, "Vagas Triplas");
        
            const centeredText = { alignment: 'center' };
        
            // Gerar o documento PDF
            const docDefinition = {
                content: [
                    { text: "Sorteio de Vagas de Garagem com Unidades de Apartamento", style: "header" },
                    { text: `${sorteioDataHora}`, style: "subheader" }, // Adiciona a data e hora do sorteio
                    { text: "Vagas Individuais", style: "subheader" },
                    resultados["Vagas Individuais"],
                    { text: "Vagas Duplas", style: "subheader" },
                    resultados["Vagas Duplas"],
                    { text: "Vagas Triplas", style: "subheader" },
                    resultados["Vagas Triplas"]
                ],
                styles: {
                    header: { fontSize: 18, bold: true, alignment: 'center' },
                    subheader: { fontSize: 14, bold: true, alignment: 'center' },
                },defaultStyle: centeredText // Aplica a centralização como estilo padrão
            };
        
            pdfMake.createPdf(docDefinition).download("resultado_sorteio.pdf");
        }