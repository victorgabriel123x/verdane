# THE GREEN — Landing Page

Site estático, sem build. Abra `index.html` no navegador ou suba a pasta inteira em qualquer hospedagem.

```
site/
├── index.html
├── favicon.ico
├── LEIA-ME.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/            (WebP otimizados + logo + favicon + og-image)
```

## Publicar

Arraste a pasta `site` para **Netlify Drop** (app.netlify.com/drop) ou **Vercel** — sobe em segundos, com HTTPS.
Em hospedagem tradicional (cPanel/FTP), envie o conteúdo de `site/` para a raiz do domínio (`public_html`).

Depois de ter um domínio, no `index.html`:

1. Descomente a linha `<link rel="canonical" ...>` no topo e troque pela URL real.
2. Troque `assets/img/og-image.jpg` em `og:image` / `twitter:image` pela URL absoluta
   (`https://seudominio.com.br/assets/img/og-image.jpg`) — o WhatsApp e o Instagram
   exigem URL completa para gerar a prévia do link.

## Informações confirmadas antes de escrever qualquer texto

Nada no site foi inventado. Cada dado veio de:

| Dado | Fonte |
|---|---|
| Nome, "gastronomia autoral", "drinks especiais" | Bio do Instagram [@thegreen.gastrobar](https://www.instagram.com/thegreen.gastrobar/) |
| **Quarta a domingo, a partir das 17h** | Bio do Instagram + Google Maps ("Abre qua. às 17:00") |
| Av. Vale do Pimenta, 3 — Olho D'Água, São Luís – MA, 65066-160 | Google Maps |
| "Ao lado do Viciu" | Material de identidade fornecido |
| Salada Vivaldi, Porção de Bruschetta, Carpaccio de Filé Mignon, Ceviche de Salmão, Spaghetti ao Pesto de Vinagreira | Posts oficiais da casa (imagens da pasta) |
| Cardápio | PDF no Google Drive fornecido |

**Não entrou no site** por não ter confirmação: telefone, WhatsApp, reserva, música ao vivo,
eventos com data e qualquer preço.

> O card de horário da identidade original trazia "Quarta e Quinta 18h–23h / Sexta e Sábado
> 18h–00h". A bio do Instagram e o Google Maps trazem informação mais recente
> (quarta a domingo, a partir das 17h) — foi essa que entrou no site.

## Onde alterar as informações que mudam

Tudo em `index.html`, em texto puro:

- **Horário** — seção `<!-- HORÁRIO -->` (dois campos: dias e horário) + o rodapé + o
  bloco `openingHoursSpecification` no JSON-LD do topo + a linha no rodapé da hero.
- **Cardápio** — o link do Drive aparece em 5 lugares. Busque por `drive.google.com` e troque todos.
- **Endereço / Google Maps** — busque por `maps/dir` (4 ocorrências) e `Vale do Pimenta`.
- **Instagram** — busque por `thegreen.gastrobar`.

## Trocar fotos

Substitua os arquivos em `assets/img/` mantendo os nomes, ou aponte o `src`/`srcset` para os novos.
As imagens atuais foram recortadas (para tirar os textos gravados nas artes),
tratadas (contraste, tom quente, vinheta) e exportadas em WebP em dois tamanhos.

O ideal, quando houver material novo: fotos noturnas do salão, do bar aceso e dos drinks —
é o que a identidade da marca pede e o que o site valoriza.

## Design system aplicado

| | |
|---|---|
| Fundo | `#081611` Shadow Green · `#0F1E18` Deep · `#14261F` Forest |
| Dourado | `#C8A85E` linhas e labels · `#D4AF37` brilhos |
| Texto | `#F4F1E7` Champagne |
| Display | Bodoni Moda |
| Texto / UI | Montserrat |

Todos os tokens estão no `:root` do `style.css` — trocar uma cor ali muda o site inteiro.

**Contraste:** os alfas de `--muted` (.62) e `--faint` (.50) foram calculados para passar
WCAG AA (≥4.5:1) tanto sobre o fundo quanto sobre os cards. Não baixe esses valores.

## Técnico

- HTML/CSS/JS puro. GSAP + ScrollTrigger + Lenis via CDN.
- Se o JavaScript ou o CDN falhar, o site aparece inteiro, sem animação — nada some.
- `prefers-reduced-motion` respeitado: quem desativou animações no sistema vê a página estática.
- Imagens em WebP com `srcset`, `lazy loading` abaixo da dobra e `width`/`height` declarados
  (sem layout shift).
- SEO: title, description, Open Graph, Twitter Card, favicon e JSON-LD `BarOrPub`
  com endereço, horário e link do cardápio.

## Pendências para o cliente decidir

1. **Foto 02** (cliente no balcão) está na galeria. Confirme a autorização de uso de imagem
   ou me avise para trocar.
2. Se existir WhatsApp ou canal de reserva oficial, dá para acrescentar um botão.
3. Se houver música ao vivo (o destaque "Couvert" no Instagram sugere), dá para criar a seção —
   preciso da confirmação de dias e formato.
