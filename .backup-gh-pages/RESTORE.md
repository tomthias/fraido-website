# GitHub Pages Configuration Backup

Questo backup contiene le modifiche necessarie per GitHub Pages.

## File salvati:
- `vite.config.ts` - con `base: '/fraido-website/'`
- `index.html` - con `<script type="module" src="/index.tsx"></script>`
- `.github/workflows/deploy.yml` - workflow per deploy automatico

## Per ripristinare dopo un pull:

### Opzione 1: Copia manuale
```bash
cp .backup-gh-pages/vite.config.ts ./
cp .backup-gh-pages/index.html ./
cp -r .backup-gh-pages/.github ./
```

### Opzione 2: Chiedi a Claude
Basta dire: "ripristina la configurazione GitHub Pages dal backup"

## Modifiche chiave da applicare:

### 1. vite.config.ts
Aggiungere `base: '/fraido-website/',` nel return:
```ts
return {
  base: '/fraido-website/',
  // ... resto config
};
```

### 2. index.html
Aggiungere prima di `</body>`:
```html
<script type="module" src="/index.tsx"></script>
```

### 3. .github/workflows/deploy.yml
Creare il file con il workflow di deploy (vedi copia salvata)
