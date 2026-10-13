# Vértice Barbearia — Landing Page

Landing page moderna, responsiva e de alta performance desenvolvida para a **Vértice Barbearia** (São Bento do Sul, SC).

---

## Como fazer o deploy na Vercel

O projeto foi configurado com `vercel.json` contendo cabeçalhos de segurança (HTTP security headers), compressão, cache imutável de imagens/fontes e revalidação de assets estáticos.

### Opção 1: Via Git (Recomendado)

1. Envie o projeto para um repositório no seu **GitHub**, **GitLab** ou **Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page completa Vértice Barbearia"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/vertice-barbearia.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e faça login.
3. Clique em **"Add New..."** → **"Project"**.
4. Importe o repositório que você acabou de criar.
5. Em **Framework Preset**, deixe como **"Other"** (site estático).
6. Clique em **"Deploy"**. Em segundos o site estará no ar com HTTPS automático e CDN global.

---

### Opção 2: Via Vercel CLI (Direto do Terminal)

Se preferir publicar diretamente pela linha de comando sem criar repositório Git:

1. No terminal, dentro da pasta do projeto, execute:
   ```bash
   npx vercel
   ```
2. Siga as instruções interativas:
   - *Set up and deploy?* → `y`
   - *Which scope?* → Selecione sua conta
   - *Link to existing project?* → `n`
   - *Project name?* → `vertice-barbearia`
   - *In which directory is your code located?* → `./`
3. Para publicar diretamente em produção:
   ```bash
   npx vercel --prod
   ```

---

## Visualização Local

Para rodar localmente com um servidor web estático:

```bash
npm start
```
Ou abra diretamente o arquivo `index.html` em qualquer navegador moderno.
