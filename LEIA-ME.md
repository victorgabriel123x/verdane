# VERDANT HOUSE — Landing Page

Site estático, sem build. Abra `index.html` no navegador ou suba a pasta inteira em qualquer hospedagem.

> Este projeto foi adaptado a partir de um template anterior (The Green Gastrobar) para o
> restaurante Verdant House, em São Paulo. Estrutura, layout, animações e sistema de design
> foram preservados — apenas conteúdo, imagens e informações de contato foram atualizados.
> Fotos novas em `assets/img/` vieram da pasta `NOVO/` (recortadas via `sharp`, mantendo os
> nomes de arquivo originais). Logo e ícones foram recriados em Bodoni Moda com `satori`.

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

## Estado atual (Verdant House)

- **Nome**: Verdant House.
- **Localização**: São Paulo, SP — sem endereço de rua (não foi fornecido; não inventado).
  O card de endereço e o mapa estilizado usam uma busca genérica no Google Maps
  (`google.com/maps/search/?api=1&query=Verdant+House+São+Paulo+SP`).
- **Instagram**: [@vldsdigital](https://www.instagram.com/vldsdigital/).
- **Cardápio**: o botão "Cardápio" foi mantido visualmente em todos os 6 lugares onde aparecia,
  mas não tem mais link — foi convertido de `<a href=...>` para `<button type="button">` sem
  destino (não há PDF/link de cardápio fornecido para este projeto).
- **Horário**: mantido igual ao template original (quarta a domingo, a partir das 17h) — não foi
  solicitada alteração e não há nova informação confirmada para substituí-lo.
- **Pratos**: renomeados para combinar com as fotos novas da pasta `NOVO/` — Filé Mignon ao Molho
  de Ervas, Robalo Grelhado, Risoto de Cogumelos e Trufa Negra, além de duas harmonizações
  (Carta de Vinhos / Brancos e Espumantes) e um card "Para Compartilhar".

**Não entrou no site** por não ter confirmação: endereço de rua, telefone, WhatsApp, reserva,
avaliações/aggregateRating, link de cardápio.

## Onde alterar as informações que mudam

Tudo em `index.html`, em texto puro:

- **Horário** — seção `<!-- HORÁRIO -->` (dois campos: dias e horário) + o rodapé + o
  bloco `openingHoursSpecification` no JSON-LD do topo + a linha no rodapé da hero.
- **Cardápio** — botão sem link em 6 lugares (busque por `Cardápio`/`cardápio`). Para reativar um
  link, troque o `<button type="button">` correspondente de volta para `<a href="..." target="_blank" rel="noopener">`.
- **Endereço / Google Maps** — busque por `maps/search` (3 ocorrências) e `São Paulo`.
- **Instagram** — busque por `vldsdigital`.

## Trocar fotos

Substitua os arquivos em `assets/img/` mantendo os nomes, ou aponte o `src`/`srcset` para os novos.
As imagens atuais vieram das 9 fotos em `NOVO/01.png`–`09.png` (ambiente/bar, pratos e drinks),
recortadas com `sharp` (`fit: cover` + crop inteligente por saliência) direto nos tamanhos e
proporções que cada slot já usava, e exportadas em WebP em dois tamanhos. A pasta `NOVO/` foi
mantida no projeto (não apagada). Como só há 3 fotos de prato para 6 cards de "Gastronomia",
cada foto é reaproveitada em duas colunas diferentes do grid (nunca na mesma coluna, pra não
duplicar visualmente) — ao trocar fotos de prato, mantenha esse cuidado.

O ideal, quando houver material novo: mais fotos de pratos e drinks, para não precisar
reaproveitar as mesmas 3 fotos de comida em 6 cards.

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
  com localidade e horário (sem `hasMenu`, já que não há link de cardápio).

## Pendências para o cliente decidir

1. **Cardápio**: o botão está no site mas sem destino. Assim que houver um link (PDF, Drive,
   cardápio digital), volte o `<button>` correspondente para `<a href="..." target="_blank"
   rel="noopener">` nos 6 lugares listados acima.
2. **Endereço**: nenhum endereço de rua foi informado. Se o cliente quiser um endereço completo
   no card "Onde estamos", no rodapé e no link do Google Maps, é só me passar.
3. **Horário**: mantido do template anterior (quarta a domingo, a partir das 17h). Confirmar se
   é o horário real do Verdant House ou se precisa ser atualizado.
4. Se existir WhatsApp, canal de reserva ou avaliações reais (Google/Instagram), dá para
   acrescentar um botão de reserva e/ou repor o `aggregateRating` no JSON-LD.
