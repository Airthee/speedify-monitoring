<script>
  export let speedifyData = {};

  // Manage usage display
  const displayUsage = (usage) => {
    const unitValues = new Map([
      ["GB", Math.pow(2, 30)],
      ["MB", Math.pow(2, 20)],
      ["kB", Math.pow(2, 10)],
      ["B", 1],
    ]);

    for (const [sizeKey, sizeValue] of unitValues) {
      if (usage >= sizeValue) {
        const readableUsage = (usage / sizeValue).toLocaleString();
        return `${readableUsage} ${sizeKey}`;
      }
    }
    return "-";
  };

  // Calculate monthly and daily
  let daily = 0;
  let monthly = 0;
  $: if (speedifyData.adapters) {
    speedifyData.adapters.forEach((adapter) => {
      daily += adapter?.dataUsage?.usageDaily || 0;
      monthly += adapter?.dataUsage?.usageMonthly || 0;
    });
  }

  // Get total from user
  let total = 0;
  $: if (speedifyData.user?.bytesUsed) {
    total = speedifyData.user.bytesUsed;
  }

  // Data to display
  let data;
  $: data = [
    {
      title: "Daily",
      value: daily,
    },
    {
      title: "Monthly",
      value: monthly,
    },
    {
      title: "Total",
      value: total,
    },
  ];
</script>

<div class="level">
  {#each data as item}
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">{item.title}</p>
        <p class="title">{displayUsage(item.value)}</p>
      </div>
    </div>
  {/each}
</div>
