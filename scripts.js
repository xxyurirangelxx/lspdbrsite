document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Impede o envio tradicional do formulário

        // Coleta os dados do formulário
        const nome = form.querySelector("input[name='nome']").value;
        const email = form.querySelector("input[name='email']").value;
        const discord = form.querySelector("input[name='discord']").value;
        const mensagem = form.querySelector("textarea[name='mensagem']").value;

        // Cria a embed para o webhook
        const embed = {
            title: "Nova Mensagem de Contato",
            fields: [
                {
                    name: "Nome",
                    value: nome,
                    inline: true
                },
                {
                    name: "E-mail",
                    value: email,
                    inline: true
                },
                {
                    name: "Discord",
                    value: discord,
                    inline: true
                },
                {
                    name: "Mensagem",
                    value: mensagem,
                    inline: false
                }
            ],
            color: 3447003,  // Cor da embed (ex: #ff0000 para vermelho)
            timestamp: new Date()
        };

        // Envia os dados para o Webhook do Discord
        fetch("https://discord.com/api/webhooks/1324242138048888913/sx3uyBdeIHqj7ESoi3tzdKoaR8G1TTKaFIEils6VaPTgZdsljHb34RwTaxEYF10OCWJ1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        })
        .then(response => {
            // Verifica se a resposta foi bem-sucedida (status 2xx)
            if (response.ok) {
                displaySuccessMessage("Mensagem enviada com sucesso!");
                form.reset();  // Limpa o formulário após o envio
            } else {
                // Se a resposta não for bem-sucedida, exibe uma mensagem de erro
                console.error("Erro ao enviar a mensagem. Status: " + response.status);
                displayErrorMessage("Erro ao enviar a mensagem. Tente novamente.");
            }
        })
        .catch(error => {
            // Log do erro real para depuração
            console.error("Erro ao enviar a mensagem: ", error);
            displayErrorMessage("Erro ao enviar a mensagem. Tente novamente.");
        });
    });

    // Função para exibir a mensagem de sucesso
    function displaySuccessMessage(message) {
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.textContent = message;

        // Adiciona o elemento de mensagem ao corpo do documento
        document.body.appendChild(successMessage);

        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    // Função para exibir a mensagem de erro
    function displayErrorMessage(message) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;

        // Adiciona o elemento de mensagem ao corpo do documento
        document.body.appendChild(errorMessage);

        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
});