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
  (min, m) => {
    if (m.screen.width < min.screen.width) {
      return m;
    } else if (m.screen.width === min.screen.width) {
      return m.screen.height < min.screen.height ? m : min;
    } else {
      return min;
    }
  },
  supportedModels[0],
));
let minHeightModel = $derived(supportedModels.reduce(
  (min, m) => {
    if (m.screen.height < min.screen.height) {
      return m;
    } else if (m.screen.height === min.screen.height) {
      return m.screen.width < min.screen.width ? m : min;
    } else {
      return min;
    }
  },
  supportedModels[0],
));
let maxWidthModel = $derived(supportedModels.reduce(
  (max, m) => {
    if (m.screen.width > max.screen.width) {
      return m;
    } else if (m.screen.width === max.screen.width) {
      return m.screen.height > max.screen.height ? m : max;
    } else {
      return max;
    }
  },
  supportedModels[0],
));
let maxHeightModel = $derived(supportedModels.reduce(
  (max, m) => {
    if (m.screen.height > max.screen.height) {
      return m;
    } else if (m.screen.height === max.screen.height) {
      return m.screen.width > max.screen.width ? m : max;
    } else {
      return max;
    }
  },
  supportedModels[0],
));

function isSameSizeDevice(widthModel: IPhoneModel, heightModel: IPhoneModel) {
  return (
    widthModel.screen.width === heightModel.screen.width &&
    widthModel.screen.height === heightModel.screen.height
  );
}
</script>

<main>
  <div class="container">
    <h1>iOS Screen Range Checker</h1>
    <div class="card">
      <label for="os-version">Minimum Deployments</label>
      <select id="os-version" bind:value={selectedVersion}>
        {#each iOSVersions as version}
          <option value={version}>{version}</option>
        {/each}
      </select>
    </div>
    <div class="screen-blocks">
      <div class="screen-block min-block">
        <div class="block-label">Min</div>
        {#if isSameSizeDevice(minWidthModel, minHeightModel)}
          <div class="block-pixel">{minWidthModel.screen.width} × {minWidthModel.screen.height}<span class="block-unit">px</span></div>
          <div class="block-device">{minWidthModel.name}</div>
        {:else}
          <div class="block-pixel">{minWidthModel.screen.width} × {minWidthModel.screen.height}<span class="block-unit">px</span></div>
          <div class="block-device">{minWidthModel.name}</div>
          <div class="block-pixel">{minHeightModel.screen.width} × {minHeightModel.screen.height}<span class="block-unit">px</span></div>
          <div class="block-device">{minHeightModel.name}</div>
        {/if}
      </div>
      <div class="screen-block max-block">
        <div class="block-label">Max</div>
        {#if isSameSizeDevice(maxWidthModel, maxHeightModel)}
          <div class="block-pixel">{maxWidthModel.screen.width} × {maxWidthModel.screen.height}<span class="block-unit">px</span></div>
          <div class="block-device">{maxWidthModel.name}</div>
        {:else}
          <div class="block-pixel">{maxWidthModel.screen.width} × {maxWidthModel.screen.height}<span class="block-unit">px</span></div>
          <div class="block-device">{maxWidthModel.name}</div>
          <div class="block-pixel">{maxHeightModel.screen.width} × {maxHeightModel.screen.height}<span class="block-unit">px</span></div>
          <div class="block-device">{maxHeightModel.name}</div>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Inter", "Segoe UI", "Helvetica Neue", Arial, "Liberation Sans",
      sans-serif;
    background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  }

  .container {
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
    align-items: center;
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

  .screen-blocks {
    display: flex;
    gap: 2.5em;
    justify-content: center;
    margin-top: 2em;
  }
  .screen-block {
    background: #f8fafc;
    border-radius: 16px;
    box-shadow: 0 2px 10px #a5b4fc22;
    padding: 2em 2.5em 1.5em 2.5em;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2.5px solid #e0e7ff;
  }
  .min-block {
    border-color: #38bdf8;
  }
  .max-block {
    border-color: #a78bfa;
  }
  .block-label {
    font-size: 1.05rem;
    font-weight: 600;
    color: #6366f1;
    margin-bottom: 0.7em;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  .block-pixel {
    font-size: 2.2rem;
    font-weight: 700;
    color: #22223b;
    margin-bottom: 0.3em;
    letter-spacing: 0.01em;
    text-align: center;
  }
  .block-unit {
    font-size: 1.1rem;
    color: #6366f1;
    margin-left: 0.2em;
  }
  .block-device {
    font-size: 0.98rem;
    color: #7c7c8a;
    margin-top: 0.2em;
    text-align: center;
    opacity: 0.7;
  }
</style>
