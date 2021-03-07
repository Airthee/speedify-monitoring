<script>
  import ConnectionState from "./ConnectionState.svelte";
  import Version from "./Version.svelte";

  // Props
  export let speedifyData = {};

  const cards = [
    {
      title: "Connection state",
      component: {
        constructor: ConnectionState,
        props: (data) => ({ state: data.state }),
      },
    },
    {
      title: "Current server",
      render: (data) => data.currentServer?.friendlyName,
    },
    {
      title: "Connected user",
      render: (data) => data.user?.email,
    },
    {
      title: "Bonding mode",
      render: (data) => data.settings?.bondingMode,
    },
    {
      title: "Encryption",
      render: (data) => (data.settings?.encrypted ? "Yes" : "No"),
    },
    {
      title: "Version",
      component: {
        constructor: Version,
        props: (data) => ({ version: data.version }),
      },
    },
  ];
</script>

<div class="cards-container">
  {#each cards as card}
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">{card.title}</div>
      </div>
      <div class="card-content">
        {#if speedifyData}
          {#if card.component}
            <svelte:component
              this={card.component.constructor}
              {...card.component.props(speedifyData)}
            />
          {:else if card.render}
            {card.render(speedifyData) || "-"}
          {/if}
        {:else}
          Loading...
        {/if}
      </div>
    </div>
  {/each}
</div>

<style type="text/scss">
  .cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .card {
    width: fit-content;
    display: inline-block;
    margin: 5px;
  }
</style>
