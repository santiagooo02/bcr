# BCR Barber Shop — site com solicitação pelo WhatsApp

Site responsivo (celular, tablet e computador) para a BCR Barber Shop. O cliente escolhe o serviço, informa os dados e envia uma solicitação pronta pelo WhatsApp.

## Antes de publicar: personalize os dados

1. Abra `config.js`.
2. Troque `whatsapp` pelo número oficial da barbearia, com código do país e DDD, somente números. Exemplo: `5513998765432`.
3. Confira endereço, dias/horários e intervalo de agendamento.
4. Confira os serviços e preços em `config.js` **e também no HTML** (`index.html`), pois os cards e opções do formulário aparecem no HTML.
5. Salve e teste o site no celular e no computador.

> Os preços, endereço e horários que vieram no projeto são exemplos editáveis. Confirme tudo com a barbearia antes de publicar.

## Como funciona o agendamento

O site não usa banco de dados e não bloqueia horários ocupados. Ele apenas envia uma **solicitação** pelo WhatsApp com os dados preenchidos. A barbearia precisa conferir a agenda e confirmar o horário diretamente com o cliente.

## Publicar pelo GitHub Pages

1. Entre em https://github.com e crie um repositório público, por exemplo `bcr-barber-shop`.
2. Envie os arquivos `index.html`, `style.css`, `config.js`, `script.js` e `README.md` para a raiz do repositório.
3. No repositório, entre em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Em **Branch**, escolha `main` e pasta `/ (root)`, depois clique em **Save**.
6. Aguarde alguns minutos. O GitHub mostrará o endereço público do site na própria página Pages.

## Arquivos

- `index.html` — conteúdo e estrutura do site.
- `style.css` — visual e adaptação para telas menores.
- `config.js` — WhatsApp, endereço, horários e intervalo.
- `script.js` — menu, horários e envio da solicitação ao WhatsApp.

## Observações

- Não é necessário Supabase, banco de dados, painel administrativo ou login.
- O site precisa de internet para carregar a fonte externa e abrir o WhatsApp.
- O número de WhatsApp deve estar ativo e aceitar mensagens.
