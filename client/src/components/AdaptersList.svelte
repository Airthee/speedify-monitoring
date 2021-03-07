<script>
  export let speedifyData = {};

  let adapters = [];
  $: if (speedifyData.adapters) {
    adapters = speedifyData.adapters;
  }
</script>

<div>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Name</th>
        <th>Priority</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      {#each adapters as adapter}
        <tr>
          <td>{adapter.name} ({adapter.type})</td>
          <td>{adapter.priority}</td>
          <td>{adapter.state}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
