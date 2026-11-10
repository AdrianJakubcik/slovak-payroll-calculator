<script lang="ts">
  import { calculatePayroll } from './lib/calculator/payroll'
  import type { PayrollInput } from './lib/calculator/types'

  let input = $state<PayrollInput>({ grossMonthly: 2500, claimNczd: true, disability: false, childrenUnder15: 0, children15To17: 0 })
  let result = $derived(calculatePayroll(input))
  const euro = new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' })
  const copy = async () => navigator.clipboard?.writeText(`Hrubá mzda: ${euro.format(result.gross)}\nČistá mzda: ${euro.format(result.net)}\nCena práce: ${euro.format(result.employerCost)}`)
</script>

<svelte:head><title>Kalkulačka mzdy 2026 | Mzda.sk</title><meta name="description" content="Prehľadný odhad čistej mzdy a ceny práce na Slovensku v roku 2026." /></svelte:head>

<main class="shell">
  <header><a class="brand" href="/" aria-label="Mzda.sk domov"><span class="brand-mark">m</span> mzda<span class="brand-dot">.</span>sk</a><span class="year">SLOVENSKO · 2026</span></header>
  <section class="hero"><div><span class="eyebrow">VÝPLATA BEZ HÁDANIA</span><h1>Koľko vám<br /><em>zostane?</em></h1><p>Prepočítajte si čistú mzdu aj celkovú cenu práce. Všetko prehľadne, bez drobného písma.</p></div><div class="hero-note"><span class="note-icon">✳</span><span>Prehľad zákonných odvodov,<br />ktorý dáva zmysel.</span></div></section>
  <div class="layout">
    <section class="card inputs"><div class="section-head"><div><span class="eyebrow">VÁŠ VÝPOČET</span><h2>Vstupné údaje</h2></div><span class="step">01 <i>/ 02</i></span></div>
      <label class="field-label" for="gross">Hrubá mesačná mzda</label><div class="money-input"><input id="gross" type="number" min="0" step="50" bind:value={input.grossMonthly} /><span>€ <small>EUR</small></span></div>
      <div class="presets" aria-label="Rýchle sumy">{#each [1000, 1500, 2000, 2500, 3000] as preset}<button class:active={Number(input.grossMonthly) === preset} onclick={() => input.grossMonthly = preset}>{preset.toLocaleString('sk-SK')} €</button>{/each}</div>
      <div class="rule"></div><label class="toggle-row"><span><b>Uplatňujem nezdaniteľnú časť</b><small>NČZD na daňovníka, najviac 497,23 € mesačne</small></span><input type="checkbox" bind:checked={input.claimNczd} /><i class="switch"></i></label>
      <label class="toggle-row"><span><b>Som osoba so ZŤP</b><small>Znížená sadzba zdravotného poistenia</small></span><input type="checkbox" bind:checked={input.disability} /><i class="switch"></i></label>
      <div class="rule"></div><div class="children-title"><span><b>Daňový bonus na deti</b><small>Orientačný vek dieťaťa</small></span><span class="kid-icon">✳</span></div>
      <div class="child-inputs"><label>Do 15 rokov<input type="number" min="0" max="10" bind:value={input.childrenUnder15} /></label><label>15 až 17 rokov<input type="number" min="0" max="10" bind:value={input.children15To17} /></label></div>
      <p class="fine-print">Nárok a výška bonusu závisia aj od ďalších zákonných podmienok. Tento orientačný výpočet bonus zatiaľ nezapočítava.</p>
    </section>
    <section class="card result"><div class="section-head"><div><span class="eyebrow">VÝSLEDOK ODHADU</span><h2>Vaša výplata</h2></div><span class="live"><i></i> AKTUÁLNE</span></div>
      <div class="net-label">ČISTÁ MESAČNÁ MZDA</div><div class="net-number">{euro.format(result.net)}</div><div class="net-caption">Toľko vám ostane po odvodoch a dani.</div>
      <div class="cost-viz" role="img" aria-label={`Rozdelenie hrubej mzdy: čistá mzda ${euro.format(result.net)}, odvody zamestnanca ${euro.format(result.employeeContributions)}, daň ${euro.format(result.incomeTax)}`}><div class="viz-segment take" style={`width:${Math.max(0, result.net / Math.max(result.gross, 1) * 100)}%`}></div><div class="viz-segment contrib" style={`width:${result.employeeContributions / Math.max(result.gross, 1) * 100}%`}></div><div class="viz-segment tax" style={`width:${result.incomeTax / Math.max(result.gross, 1) * 100}%`}></div></div>
      <div class="legend"><span><i class="dot take-dot"></i>Čistá mzda <b>{euro.format(result.net)}</b></span><span><i class="dot contrib-dot"></i>Odvody <b>{euro.format(result.employeeContributions)}</b></span><span><i class="dot tax-dot"></i>Daň <b>{euro.format(result.incomeTax)}</b></span></div>
      <details class="breakdown"><summary>Detailný rozpis výpočtu <span>＋</span></summary><dl><dt>Hrubá mzda</dt><dd>{euro.format(result.gross)}</dd><dt>Sociálne odvody zamestnanca</dt><dd>− {euro.format(result.employeeSocial)}</dd><dt>Zdravotné odvody zamestnanca</dt><dd>− {euro.format(result.employeeHealth)}</dd><dt>Nezdaniteľná časť</dt><dd>{euro.format(result.nczd)}</dd><dt>Preddavok na daň</dt><dd>− {euro.format(result.incomeTax)}</dd><dt>Odvody zamestnávateľa</dt><dd>{euro.format(result.employerSocial + result.employerHealth)}</dd></dl></details>
      <div class="employer-cost"><span><small>CELKOVÁ CENA PRÁCE</small><b>{euro.format(result.employerCost)}</b></span><span class="employer-icon">↗</span></div>
      <button class="copy-button" onclick={copy}><span>▣</span> Skopírovať súhrn</button>
    </section>
  </div>
  <footer><span>© 2026 MZDA.SK <i>·</i> VYTVORENÉ PRE ĽUDÍ</span><span>Výpočet je orientačný. Mesačné preddavky sa môžu líšiť od ročného zúčtovania.</span></footer>
</main>
