<script lang="ts">
import { iPhoneModels } from './lib/iosModels';
import {
  type IOSMajorVersion,
  type IPhoneModel,
  iOSVersions,
} from './lib/iosTypes';

type SelectableIOSMajorVersion = Exclude<IOSMajorVersion, 'supported'>;

let selectedVersion: SelectableIOSMajorVersion = $state(iOSVersions[iOSVersions.length - 1]);
let supportedModels = $derived(iPhoneModels.filter((model) => isModelSupported(model, selectedVersion)));

function isModelSupported(
  model: IPhoneModel,
  selectedVersion: SelectableIOSMajorVersion,
): boolean {
  if (model.maxOS === 'supported') return true;
  return selectedVersion <= model.maxOS;
}

let minWidthModel = $derived(supportedModels.reduce(
  (min, m) => (m.screen.width < min.screen.width ? m : min),
  supportedModels[0],
));
let minHeightModel = $derived(supportedModels.reduce(
  (min, m) => (m.screen.height < min.screen.height ? m : min),
  supportedModels[0],
));
let maxWidthModel = $derived(supportedModels.reduce(
  (max, m) => (m.screen.width > max.screen.width ? m : max),
  supportedModels[0],
));
let maxHeightModel = $derived(supportedModels.reduce(
  (max, m) => (m.screen.height > max.screen.height ? m : max),
  supportedModels[0],
));
</script>

<main>
  <div class="container">
    <h1>iOS Screen Range Checker</h1>
    <div class="card">
      <label for="os-version">iOS Version</label>
      <select id="os-version" bind:value={selectedVersion}>
        {#each iOSVersions as version}
          <option value={version}>{version}</option>
        {/each}
      </select>
    </div>
    {#if supportedModels && supportedModels.length > 0}
      <div class="screen-summary">
        <h2>Supported Device Screen Sizes</h2>
        <ul>
          <li>Min Width: {minWidthModel.name} ({minWidthModel.screen.width}px)</li>
          <li>Min Height: {minHeightModel.name} ({minHeightModel.screen.height}px)</li>
          <li>Max Width: {maxWidthModel.name} ({maxWidthModel.screen.width}px)</li>
          <li>Max Height: {maxHeightModel.name} ({maxHeightModel.screen.height}px)</li>
        </ul>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Inter", "Segoe UI", "Helvetica Neue", Arial, "Liberation Sans",
      sans-serif;
    background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
    min-height: 100vh;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #2d3748;
    margin-bottom: 0.5em;
    text-shadow: 0 2px 8px #e0e7ff;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7em;
    padding: 2em 2.5em;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow:
      0 4px 24px #a5b4fc33,
      0 1.5px 6px #0001;
    min-width: 260px;
    max-width: 350px;
  }

  label {
    font-size: 1.1rem;
    font-weight: 500;
    color: #6366f1;
    margin-bottom: 0.2em;
    letter-spacing: 0.01em;
  }

  select {
    font-size: 1.1rem;
    padding: 0.5em 1.2em 0.5em 0.7em;
    border-radius: 8px;
    border: 1.5px solid #c7d2fe;
    background: #f1f5ff;
    color: #373a47;
    outline: none;
    box-shadow: 0 1px 4px #a5b4fc22;
    transition: border 0.2s;
  }
  select:focus {
    border: 1.5px solid #6366f1;
    background: #fff;
  }

  .screen-summary {
    width: 100%;
    padding: 1.5em 2em;
    border-radius: 12px;
    background: rgba(229, 231, 235, 0.9);
    box-shadow: 0 2px 10px #0001;
    margin-top: 1.5em;
  }

  .screen-summary h2 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1em;
  }

  .screen-summary ul {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #4b5563;
    font-size: 1.1rem;
  }

  .screen-summary li {
    margin-bottom: 0.5em;
  }
</style>
