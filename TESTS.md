# 🧪 Testes do ContaZoom

Guia completo de testes para validar o sistema de sincronização Mercado Livre.

## 📋 Checklist de Testes

### ✅ Autenticação JWT

#### Login
- [ ] Página de login carrega corretamente
- [ ] Formulário valida campos obrigatórios
- [ ] Login com credenciais corretas funciona
- [ ] Login com credenciais incorretas mostra erro
- [ ] Cookie de sessão é criado (HTTP-only)
- [ ] Redirecionamento após login funciona

#### Sessão
- [ ] Usuário permanece logado após refresh
- [ ] Token expira após 7 dias
- [ ] Logout limpa cookie de sessão
- [ ] Rotas protegidas redirecionam para login

### ✅ OAuth Mercado Livre

#### Conexão
- [ ] Botão "Conectar ML" redireciona para OAuth
- [ ] Callback processa code corretamente
- [ ] Conta ML é salva no banco
- [ ] Token de acesso é armazenado

#### Refresh Token
- [ ] Token expira automaticamente
- [ ] Refresh é chamado automaticamente
- [ ] Novo token é salvo no banco
- [ ] Sincronização continua funcionando

#### Renovação Concorrente
- [ ] Múltiplas sincronizações não quebram refresh
- [ ] Mutex impede refresh duplicado
- [ ] Apenas uma renovação por conta simultânea

### ✅ Sincronização de Vendas

#### Modo Básico
- [ ] Botão "Sincronizar" inicia processo
- [ ] SSE conecta imediatamente
- [ ] Progresso aparece em tempo real
- [ ] Vendas são salvas no banco
- [ ] Status final é mostrado

#### Paginação
- [ ] Contas com >50 vendas funcionam
- [ ] Contas com >2500 vendas funcionam
- [ ] Offset aumenta corretamente
- [ ] Não há vendas duplicadas

#### Rate Limiting
- [ ] API do ML não retorna 429
- [ ] Backoff funciona em erros temporários
- [ ] Retry automático funciona
- [ ] Sincronização não falha por rate limit

#### Deduplicação
- [ ] Vendas duplicadas são ignoradas
- [ ] UPDATE funciona para vendas existentes
- [ ] Não há registros duplicados no banco

### ✅ Server-Sent Events (SSE)

#### Conexão
- [ ] EventSource conecta automaticamente
- [ ] Header correto: `text/event-stream`
- [ ] CORS headers presentes
- [ ] Cookie de sessão é enviado

#### Progresso
- [ ] Evento `connected` é recebido
- [ ] Progresso é atualizado em tempo real
- [ ] Porcentagem calcula corretamente
- [ ] Mensagens são claras

#### Reconexão
- [ ] SSE reconecta automaticamente
- [ ] Tentativas de reconexão funcionam
- [ ] Estado é mantido após reconexão
- [ ] Não há loops infinitos

#### Timeout
- [ ] Conexão não cai em 60s
- [ ] Heartbeat mantém viva
- [ ] Frontend não perde conexão

### ✅ Dashboard e UI

#### Carregamento
- [ ] Dados carregam do banco
- [ ] Gráficos renderizam corretamente
- [ ] Tabelas paginam corretamente
- [ ] Filtros funcionam

#### Performance
- [ ] Queries não demoram >2s
- [ ] UI não fica travada
- [ ] Memória não vaza
- [ ] CPU permanece baixo

### ✅ Segurança

#### Headers
- [ ] Cookies HTTP-only
- [ ] HTTPS em produção
- [ ] CSP headers presentes
- [ ] X-Frame-Options correto

#### Autenticação
- [ ] JWT não pode ser alterado
- [ ] Refresh token seguro
- [ ] Logout limpa tudo
- [ ] Sessões expiradas são rejeitadas

## 🐛 Cenários de Erro

### Autenticação
- [ ] JWT_SECRET não configurado → erro claro
- [ ] Token malformado → rejeitado
- [ ] Token expirado → refresh automático

### Mercado Livre
- [ ] Conta desconectada → erro 401 tratado
- [ ] Rate limit → backoff funciona
- [ ] API ML fora → retry funciona
- [ ] Token inválido → refresh automático

### SSE
- [ ] Rede cai → reconexão automática
- [ ] Servidor restart → reconexão funciona
- [ ] CORS bloqueia → headers corretos
- [ ] Timeout → heartbeat mantém vivo

### Database
- [ ] Conexão cai → erro tratado
- [ ] Query falha → rollback funciona
- [ ] Dados corrompidos → validação funciona
- [ ] Concurrent access → mutex funciona

## 🚀 Testes de Performance

### Sincronização
- [ ] 100 vendas: < 10 segundos
- [ ] 1000 vendas: < 30 segundos
- [ ] 10000 vendas: < 3 minutos
- [ ] Memória: < 200MB durante sync

### SSE
- [ ] Latência: < 100ms
- [ ] Throughput: 1000 mensagens/minuto
- [ ] Conexões simultâneas: 100+

### Database
- [ ] Query vendas: < 500ms
- [ ] Insert batch: < 2s para 1000 registros
- [ ] Índices funcionando corretamente

## 🔧 Scripts de Teste

### Setup Teste Local

```bash
# Banco de teste
createdb contazoom_test
export DATABASE_URL="postgresql://user:pass@localhost/contazoom_test"

# Migrar
npx prisma migrate deploy

# Seeds (se existir)
npm run db:seed
```

### Teste SSE

```javascript
// No browser console
const eventSource = new EventSource('/api/meli/vendas/sync-progress');
eventSource.onmessage = (e) => console.log('SSE:', e.data);
eventSource.onerror = (e) => console.error('SSE Error:', e);
```

### Teste Sincronização

```bash
# Via API
curl -X POST http://localhost:3000/api/meli/vendas/sync \
  -H "Cookie: session=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"accountIds": ["ACCOUNT_ID"]}'
```

### Teste OAuth

```bash
# Simular callback
curl "http://localhost:3000/api/meli/callback?code=TEST_CODE&state=TEST_STATE"
```

## 📊 Métricas de Qualidade

### Code Coverage (Futuro)
- [ ] API Routes: > 80%
- [ ] Lib functions: > 90%
- [ ] Components: > 70%

### Performance Budget
- [ ] First Contentful Paint: < 1.5s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] First Input Delay: < 100ms

### Error Rate
- [ ] 500 errors: < 0.1%
- [ ] 400 errors: < 1%
- [ ] Timeout rate: < 0.5%

## 🎯 Checklist Final

- [ ] Todos os testes manuais passaram
- [ ] Performance dentro do budget
- [ ] Segurança auditada
- [ ] Documentação completa
- [ ] Deploy funciona em produção
- [ ] Monitoramento configurado
- [ ] Rollback plan existe

---

**Status**: ✅ Pronto para produção