<script lang="ts">
import { iOSVersions } from './lib/iosTypes';

let selectedVersion: string = iOSVersions[iOSVersions.length - 1];
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
    <div class="selected-version">
      Selected: <span>{selectedVersion}</span>
    </div>
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

  .selected-version {
    font-size: 1.1rem;
    color: #6366f1;
    background: #eef2ff;
    border-radius: 8px;
    padding: 0.5em 1.2em;
    box-shadow: 0 1px 4px #a5b4fc22;
    margin-top: -1.2em;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
</style>
