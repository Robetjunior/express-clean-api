
# API Node.js com Clean Architecture

Uma API RESTful robusta construída com Node.js, Express e TypeScript seguindo os princípios da Clean Architecture, projetada para manutenibilidade, testabilidade e escalabilidade.

## 🚀 Tecnologias

O projeto utiliza as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript server-side
- **TypeScript**: Superset JavaScript com tipagem estática
- **Express**: Framework web rápido e minimalista para Node.js
- **Zod**: Biblioteca de validação de esquemas com inferência de tipos
- **Jest**: Framework de testes JavaScript
- **Supertest**: Biblioteca para testes de requisições HTTP

## 🏗 Arquitetura

Este projeto implementa os princípios da **Clean Architecture**, proposta por Robert C. Martin, que visa criar sistemas com alta testabilidade, independência de frameworks e bancos de dados, e com responsabilidades bem definidas.

### Estrutura de Diretórios

```
src/
├── application/use_cases/        # Casos de uso da aplicação
│   └── UseUserCases.ts           # Caso de uso principal com todas as operações de usuário
│
├── domain/                       # Entidades e contratos do domínio
│   ├── entities/                 
│   │   └── User.ts               # Entidade User com atributos e comportamentos
│   └── repositories/             
│       └── IUserRepository.ts    # Contrato da interface do repositório de usuário
│
├── infrastructure/database/      # Implementações concretas de acesso a dados
│   └── UserRepository.ts         # Implementação em memória do repositório de usuários
│
├── interfaces/http/              # Interface de entrada da aplicação (camada de apresentação)
│   ├── controllers/              
│   │   └── UserController.ts     # Responsável por receber requisições e delegar para os Use Cases
│   │
│   ├── middlewares/             
│   │   ├── auth.ts               # Middleware de autenticação JWT
│   │   └── validate.ts           # Middleware genérico de validação de dados usando Zod
│   │
│   ├── routes/                  
│   │   ├── index.ts              # Arquivo central de rotas
│   │   └── user.routes.ts        # Rotas relacionadas aos usuários: registro, login, CRUD
│   │
│   └── validators/              
│       └── user.validator.ts     # Schemas Zod para validação de entrada (ex.: registro de usuário)
│
├── shared/utils/                 # Funções utilitárias e helpers reutilizáveis
│   ├── hash.ts                   # Funções de hash e comparação de senha usando bcrypt
│   └── jwt.ts                    # Funções de geração e verificação de token JWT
│
├── server.ts                     # Arquivo principal que inicia a aplicação e configura middlewares
│
└── test/                         
    └── user.test.ts              # Testes automatizados de integração do CRUD de usuários
```

### Camadas da Arquitetura

1. **Domain**: Define as entidades e regras de negócio centrais da aplicação, independentes de qualquer framework ou tecnologia externa.

2. **Application**: Contém os casos de uso que orquestram o fluxo de dados entre as entidades e as interfaces externas.

3. **Infrastructure**: Implementa interfaces técnicas como persistência de dados, serviços externos, etc.

4. **Interfaces**: Lida com a entrada e saída de dados, incluindo controladores HTTP, middlewares e serialização.

5. **Main**: Responsável pela inicialização e configuração da aplicação, conectando todas as camadas.

## 💻 Instalação

Siga os passos abaixo para configurar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/node-clean-architecture-api.git

# Entre no diretório do projeto
cd node-clean-architecture-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute o projeto em modo de desenvolvimento
npm run dev
```

## 🔍 Como Usar

Abaixo estão alguns exemplos de como utilizar a API:

### Criar um Usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "José Roberto",
    "email": "jose@example.com",
  }'
```

### Listar Usuários

```bash
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer seu-token-aqui"
```

### Validação com Zod

A API utiliza o Zod para validar automaticamente todas as entradas:

```typescript
// Exemplo de validação de requisição
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
  })
});
```

## 🧪 Testes

O projeto possui testes automatizados utilizando Jest e Supertest:

```bash
# Rodar todos os testes
npm test

# Rodar testes com cobertura
npm run test:coverage

# Rodar testes em modo watch
npm run test:watch
```

## 👥 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Envie para o branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Por favor, certifique-se de atualizar os testes conforme apropriado e seguir o padrão de código do projeto.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**José Roberto**

Desenvolvedor com experiência em criação de aplicações web modernas e responsivas, especializado em React e TypeScript.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/josé-roberto-dev/)
