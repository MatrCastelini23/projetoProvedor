
## Changelog
- **feature** (2026-10-17 · 1f76a2c): Versionamento de API aplicado as rotas já existentes #8

  <details>
  <summary>Arquivos alterados</summary>

  ```
  backend/src/routes/healthRoute.ts                 | 2 +-
   backend/src/routes/planosRoute.ts                 | 8 ++++----
   backend/src/routes/provedorRoute.ts               | 6 +++---
   backend/src/routes/providerClientRoute.ts         | 2 +-
   backend/src/routes/userRoute.ts                   | 4 ++--
   frontend/src/api/Planos/Plans.ts                  | 4 ++--
   frontend/src/api/Provedores/Provedores.ts         | 2 +-
   frontend/src/api/ProviderClient/ProviderClient.ts | 2 +-
   frontend/src/api/Users/User.ts                    | 2 +-
   frontend/src/hooks/Planos/Plans.ts                | 4 ++--
   frontend/src/hooks/Provedores/Provetores.ts       | 4 ++--
   11 files changed, 20 insertions(+), 20 deletions(-)
  ```

  </details>
- **fix** (2026-10-16 · d514106): adição de duas condicionais para tratar o valor a cobrar

  <details>
  <summary>Arquivos alterados</summary>

  ```
  backend/src/services/ProviderService.ts | 7 ++++++-
   1 file changed, 6 insertions(+), 1 deletion(-)
  ```

  </details>
- **fix** (2026-10-16 · 6fe85a6): novo ajuste na regra de valores a serem cobrados, valor do plano só prevalecerá sobre o valor a ser cobrado se o provedor não estourar o valor de DIDs na base e não contratar canais adicionais

  <details>
  <summary>Arquivos alterados</summary>

  ```
  backend/src/services/ProviderService.ts              | 20 +++++++++++++-------
   frontend/src/hooks/Provedores/Provetores.ts          |  1 +
   .../src/pages/Providers/ProviderDetails/index.tsx    | 13 +++++++------
   3 files changed, 21 insertions(+), 13 deletions(-)
  ```

  </details>
- **fix** (2026-10-16 · 9491e8f): valor a cobra corrido para mostrar valor exato

  <details>
  <summary>Arquivos alterados</summary>

  ```
  frontend/src/pages/Providers/ProviderDetails/index.tsx | 2 +-
   1 file changed, 1 insertion(+), 1 deletion(-)
  ```

  </details>
- **fix** (2026-10-16 · cb04897): valores a serem cobrados e excedentes tratados no frontend

  <details>
  <summary>Arquivos alterados</summary>

  ```
  frontend/src/pages/Providers/ProviderDetails/index.tsx | 6 ++++--
   1 file changed, 4 insertions(+), 2 deletions(-)
  ```

  </details>
- **feature** (2026-10-16 · 9dc8eb7): alguns detalhes do sistema descritos no README.md

  <details>
  <summary>Arquivos alterados</summary>

  ```
  README.md | 22 +++++++++++++++++++++-
   1 file changed, 21 insertions(+), 1 deletion(-)
  ```

  </details>

- **feature** (2026-10-16 · 16b07be): adição de workflow para changelog

  <details>
  <summary>Arquivos alterados</summary>

  ```
  .github/workflows/changelog.yml | 110 ++++++++++++++++++++++++++++++++++++++++
   Changelog.md                    |   0
   2 files changed, 110 insertions(+)
  ```

  </details>
