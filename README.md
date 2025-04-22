# 🌟 React GitHub Repo Explorer

Bem-vindo ao **React GitHub Repo Explorer**! 🚀 Este é um projeto incrível construído com **React** que permite aos usuários buscar e explorar repositórios no GitHub de forma simples e intuitiva. Com uma interface limpa e moderna, você pode adicionar repositórios, visualizar detalhes como nome, descrição e avatar do dono, além de explorar issues públicas com filtros e paginação.

## 🎯 Funcionalidades
- **Busca de Repositórios:** Adicione repositórios pelo nome (ex.: `vercel/next.js`) e os salve no `localStorage`.
- **Detalhes do Repositório:** Veja informações como nome, descrição e avatar do dono.
- **Exploração de Issues:** Liste issues públicas com filtros (Todas, Abertas, Fechadas) e navegação por páginas.
- **Design Responsivo:** Interface estilizada com `styled-components` para uma experiência fluida.

## 🛠️ Tecnologias Utilizadas
- **React** com Hooks (`useState`, `useEffect`, `useCallback`)
- **React Router** para navegação entre páginas
- **Styled-Components** para estilização
- **Axios** para chamadas à API do GitHub
- **React-Icons** para ícones modernos

## 🚀 Como Rodar o Projeto
1. Clone o repositório:
   git clone https://github.com/seu-usuario/react-github-repo-explorer.git
2. Entre na pasta do projeto:
  cd react-github-repo-explorer
3. Instale as dependências:
  npm install
4. Inicie o projeto:
    npm start
5. Abra http://localhost:3000 no navegador e comece a explorar! 🌐

📝 Notas

    API do GitHub: O projeto usa a API pública do GitHub para buscar repositórios e issues. Pode haver limites de requisição (60 por hora para usuários não autenticados). Para evitar isso, configure um token de acesso no services/api.js.
    Problemas Conhecidos: Alguns repositórios podem não carregar corretamente devido a renomeações (ex.: angular/angular) ou limites de taxa. Use repositórios ativos como vercel/next.js ou nodejs/node.

🌱 Como Contribuir

    Faça um fork do projeto.
    Crie uma branch para sua feature (git checkout -b minha-feature).
    Commit suas mudanças (git commit -m "Adiciona nova feature").
    Envie para o repositório remoto (git push origin minha-feature).
    Abra um Pull Request e descreva suas alterações. 🚀

📜 Licença

Este projeto está licenciado sob a licença minha, eu acredito. Pode usar!

Feito com paciência por EllyanL! Sinta-se à vontade para explorar, contribuir ou abrir uma issue se encontrar algum problema.
