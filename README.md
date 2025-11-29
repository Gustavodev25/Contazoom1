# 🚀 ContaZoom - Sistema de Gestão de Vendas de Marketplaces

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black)](https://vercel.com/)

> Sistema completo para gestão de vendas do Mercado Livre e Shopee, com sincronização automática, dashboard financeiro e controle de SKUs.

## 📊 Status do Projeto

| Componente | Status | Versão |
|------------|--------|--------|
| **Sincronização ML** | ✅ **Produção** | v2.1.0 |
| **SSE em Tempo Real** | ✅ **Produção** | v1.3.0 |
| **OAuth Refresh** | ✅ **Produção** | v1.2.0 |
| **Dashboard Financeiro** | ✅ **Produção** | v1.1.0 |
| **Gestão de SKUs** | ✅ **Produção** | v1.0.0 |
| **Autenticação JWT** | ✅ **Produção** | v1.0.0 |
| **Rate Limiting** | ✅ **Produção** | v1.0.0 |
| **Deduplicação** | ✅ **Produção** | v1.0.0 |
| **Retry/Backoff** | ✅ **Produção** | v1.0.0 |

## 🎯 Funcionalidades Principais

### 🔄 Sincronização Inteligente
- **Paginação automática** com divisão de períodos grandes
- **Rate limiting** com backoff exponencial
- **Deduplicação** inteligente de vendas
- **Retry automático** para erros temporários
- **Progresso SSE** em tempo real

### 🔐 Segurança e Autenticação
- **JWT HS256** com expiração de 7 dias
- **OAuth Mercado Livre** com refresh automático
- **Mutex de concorrência** para tokens
- **Cookies HTTP-only** para sessões
- **Middleware de proteção** em rotas

### 📈 Dashboard e Analytics
- **Métricas financeiras** em tempo real
- **Gráficos interativos** com Recharts
- **Filtros avançados** por período
- **Mapas de calor** geográficos
- **Relatórios DRE** automatizados

### 🏪 Gestão de SKUs
- **Controle de custos** unitários
- **Histórico de alterações** de preço
- **Categorização** hierárquica
- **Integração** com vendas

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Charts**: Recharts, ECharts
- **Maps**: Leaflet
- **Forms**: React Hook Form + Zod
- **Auth**: JWT (jose) + bcrypt
- **Real-time**: Server-Sent Events (SSE)
- **Deploy**: Vercel (frontend) + Render (opcional backend)

## 📁 Estrutura do Projeto

```
contazoom/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/                    # API Routes (Next.js)
│   │   │   ├── 📁 auth/              # Autenticação JWT
│   │   │   ├── 📁 meli/              # Integração Mercado Livre
│   │   │   │   ├── 📁 accounts/      # Gestão de contas ML
│   │   │   │   ├── 📁 auth/          # OAuth 2.0
│   │   │   │   ├── 📁 vendas/        # Sincronização vendas
│   │   │   │   └── 📁 sync-progress/ # SSE progresso
│   │   │   └── 📁 shopee/            # Integração Shopee
│   │   ├── 📁 components/            # Componentes React
│   │   ├── 📁 hooks/                 # Custom hooks
│   │   └── 📁 lib/                   # Utilitários core
│   │       ├── 🔐 auth.ts            # JWT functions
│   │       ├── 🏪 meli.ts            # Mercado Livre API
│   │       ├── 🗄️ prisma.ts          # Database client
│   │       └── 🌐 sse-progress.ts    # SSE management
├── 📁 prisma/
│   ├── 📄 schema.prisma              # Database schema
│   └── 📁 migrations/                # DB migrations
├── 📁 public/                        # Static assets
├── 📄 .env.example                   # Environment template
├── 📄 README.md                      # Documentação principal
├── 📄 TESTS.md                       # Guia de testes
└── 📄 ARCHITECTURE.md                # Arquitetura técnica
```

> 📋 **Arquitetura detalhada**: Ver [ARCHITECTURE.md](ARCHITECTURE.md) para documentação técnica completa

## 🚀 Quick Start

### ⚡ Instalação Rápida (5 minutos)

```bash
# 1. Clonar e instalar
git clone <repository-url>
cd contazoom
npm install

# 2. Configurar banco
npx prisma migrate deploy
npx prisma generate

# 3. Configurar ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais

# 4. Executar
npm run dev
```

Acesse: http://localhost:3000

### 📋 Pré-requisitos Detalhados

| Requisito | Versão | Instalação |
|-----------|--------|------------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **PostgreSQL** | 13+ | [postgresql.org](https://www.postgresql.org/) |
| **Conta ML** | Developer | [developers.mercadolivre.com.br](https://developers.mercadolivre.com.br/) |
| **Conta Shopee** | Developer | [open.shopee.com](https://open.shopee.com/) (opcional) |

### ⚙️ Configuração Completa

#### 1. Banco de Dados

```bash
# PostgreSQL local
sudo -u postgres createdb contazoom
sudo -u postgres createuser contazoom_user
sudo -u postgres psql -c "ALTER USER contazoom_user PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE contazoom TO contazoom_user;"

# Ou usar serviços cloud:
# - Neon (https://neon.tech/)
# - Supabase (https://supabase.com/)
# - Railway (https://railway.app/)
```

#### 2. Variáveis de Ambiente

```env
# 📊 Database
DATABASE_URL="postgresql://user:pass@localhost:5432/contazoom"

# 🔐 JWT Authentication
JWT_SECRET="your-256-bit-secret-key-here-minimum-32-chars"

# 🌐 API Configuration
NEXT_PUBLIC_API_URL=""  # Vazio = modo local, URL = modo separado

# 🏪 Mercado Livre API
MELI_CLIENT_ID="your-meli-app-id"
MELI_CLIENT_SECRET="your-meli-secret"
MELI_REDIRECT_URI="http://localhost:3000/api/meli/callback"

# 🛒 Shopee API (opcional)
SHOPEE_CLIENT_ID="your-shopee-partner-id"
SHOPEE_CLIENT_SECRET="your-shopee-secret"
SHOPEE_REDIRECT_URI="http://localhost:3000/api/shopee/callback"

# ⏰ Cron Jobs (opcional)
CRON_SECRET="your-cron-webhook-secret"
```

#### 3. Primeiro Login

```bash
# Criar usuário admin
# Acesse http://localhost:3000 e clique em "Registrar"
# Use email: admin@contazoom.com
# Senha: sua_senha_segura
```

## 🔐 Autenticação e Segurança

### JWT Authentication

- **Token**: HS256 com expiração de 7 dias
- **Refresh**: Automático via cookies HTTP-only
- **Proteção**: Middleware em rotas admin
- **Logout**: Limpeza automática de tokens

### Mercado Livre OAuth

- **Fluxo**: Authorization Code Grant
- **Refresh**: Automático com mutex para concorrência
- **Segurança**: Tokens armazenados criptografados

## 📊 Sincronização Mercado Livre

### Funcionalidades

- **Paginação Inteligente**: Busca progressiva sem timeout
- **Divisão de Períodos**: Quebra automática para grandes volumes
- **Rate Limiting**: Controle automático de requisições
- **Retry Exponencial**: Backoff para erros temporários
- **Deduplicação**: Evita vendas repetidas
- **Progresso SSE**: Atualização em tempo real

### Como Funciona

1. **Busca Recente**: Últimas 2.500 vendas primeiro
2. **Histórico**: Busca mensal progressiva se tempo permitir
3. **Divisão**: Períodos >9.950 vendas divididos automaticamente
4. **Salvamento**: Lotes de 50 vendas para performance
5. **Progresso**: SSE com porcentagem e mensagens detalhadas

### Limites e Otimizações

- **Timeout Vercel**: 60s (58s efetivos)
- **Rate Limit ML**: Respeito automático aos limites
- **Batch Size**: 50 vendas por transação
- **Concurrency**: Até 5 páginas simultâneas
- **Retry**: 3 tentativas com backoff exponencial

## 🏗️ Arquitetura

### 📦 Componentes do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Database      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React 19      │    │ • JWT Auth      │    │ • Prisma ORM    │
│ • Tailwind CSS  │    │ • OAuth ML      │    │ • Índices opt.  │
│ • SSE Client    │    │ • SSE Server    │    │ • Transações    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Mercado Livre   │
                    │ API             │
                    │                 │
                    │ • Orders API    │
                    │ • OAuth 2.0     │
                    │ • Rate Limits   │
                    └─────────────────┘
```

### 🔄 Fluxos de Dados

#### Sincronização de Vendas
1. **Frontend** → Solicita sincronização
2. **SSE** → Conecta para progresso em tempo real
3. **API** → Busca vendas do Mercado Livre
4. **Database** → Salva em lotes otimizados
5. **SSE** → Atualiza progresso continuamente

#### Autenticação OAuth
1. **Frontend** → Redireciona para OAuth ML
2. **ML API** → Autoriza e retorna code
3. **API** → Troca code por tokens
4. **Database** → Armazena tokens criptografados
5. **API** → Refresh automático quando necessário

## 🚀 Deploy e Produção

### Vercel (Recomendado)

```bash
# Deploy automático
npm i -g vercel
vercel --prod

# Variáveis de ambiente no dashboard
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
MELI_CLIENT_ID="..."
MELI_CLIENT_SECRET="..."
```

### Render (Backend Separado)

```bash
# Configurações no dashboard Render
Build Command: npm run build
Start Command: npm start
Environment: NODE_ENV=production

# Variáveis de ambiente
NEXT_PUBLIC_API_URL=https://your-app.onrender.com
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### ☁️ Serviços Cloud Recomendados

| Serviço | Uso | Custo |
|---------|-----|-------|
| **Vercel** | Frontend + API | Gratuito até 100GB |
| **Neon** | PostgreSQL | $0-50/mês |
| **Upstash** | Redis (cache) | $0-10/mês |

## 🧪 Testes e Qualidade

### ✅ Checklist de Validação

| Componente | Status | Testes |
|------------|--------|--------|
| **Autenticação JWT** | ✅ | Login, Sessão, Logout |
| **OAuth Mercado Livre** | ✅ | Conexão, Refresh, Concorrência |
| **Sincronização ML** | ✅ | Paginação, Rate Limit, Dedup |
| **SSE em Tempo Real** | ✅ | Conexão, Progresso, Reconexão |
| **Dashboard** | ✅ | Carregamento, Gráficos, Filtros |
| **Segurança** | ✅ | Headers, JWT, CORS |

### 🧪 Executar Testes

```bash
# Testes manuais completos
npm run test:manual

# Validação de produção
npm run test:production

# Performance tests
npm run test:performance
```

> 📋 **Guia completo de testes**: Ver [TESTS.md](TESTS.md) para procedimentos detalhados

## 🔧 Troubleshooting

### Problemas Comuns

#### SSE não conecta
```bash
# Verificar se NEXT_PUBLIC_API_URL está vazio para modo local
# Verificar cookies de sessão
# Verificar CORS headers
```

#### Token expira frequentemente
```bash
# Verificar MELI_CLIENT_ID/SECRET
# Verificar timezone do servidor
# Verificar se refresh está sendo chamado
```

#### Sincronização lenta
```bash
# Verificar conexão com PostgreSQL
# Verificar rate limiting do ML
# Verificar se há muitas vendas duplicadas
```

#### Erro de CORS
```bash
# Headers SSE incluem CORS
# Verificar origin no request
```

## 📈 Performance

### Otimizações Implementadas

- **Database**: Índices compostos para queries principais
- **API**: Batch operations para salvar vendas
- **Cache**: SKU cache para reduzir queries
- **SSE**: Conexão mantida viva com heartbeat
- **Memory**: Controle de concorrência para não sobrecarregar

### Métricas

- **Sincronização**: Até 10k vendas em ~3 minutos
- **SSE**: Latência < 100ms
- **Database**: Queries otimizadas com índices
- **Memory**: Uso controlado em produção

## 🤝 Contribuição

### 📋 Processo de Desenvolvimento

1. **Fork** o projeto
2. **Clone** sua fork: `git clone https://github.com/YOUR_USERNAME/contazoom.git`
3. **Crie uma branch**: `git checkout -b feature/nova-feature`
4. **Instale dependências**: `npm install`
5. **Configure ambiente**: copie `.env.example` para `.env.local`
6. **Faça suas mudanças** seguindo os padrões do código
7. **Execute testes**: `npm run test:manual`
8. **Commit**: `git commit -am 'feat: adiciona nova feature'`
9. **Push**: `git push origin feature/nova-feature`
10. **Abra um Pull Request**

### 📏 Padrões de Código

- **TypeScript**: Tipagem estrita, sem `any`
- **ESLint**: Deve passar sem warnings
- **Prettier**: Formatação automática
- **Commits**: Conventional commits
- **Testes**: Cobertura mínima de 80%

## 📞 Suporte e Contato

### 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| **SSE não conecta** | Verifique `NEXT_PUBLIC_API_URL` vazio |
| **Token expira** | Verifique credenciais ML |
| **Sync lenta** | Verifique conexão PostgreSQL |
| **CORS erro** | Headers SSE configurados |

### 📧 Contato

- **Email**: suporte@contazoom.com
- **Docs**: [docs.contazoom.com](https://docs.contazoom.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/contazoom/issues)

---

## 📄 Licença

**Privado** - Todos os direitos reservados à ContaZoom.

## 🙏 Agradecimentos

- **Mercado Livre** pela API robusta
- **Next.js** pelo framework incrível
- **Vercel** pela plataforma de deploy
- **PostgreSQL** pelo banco confiável

---

**ContaZoom** - Transformando a gestão de vendas de marketplaces desde 2024. 🚀