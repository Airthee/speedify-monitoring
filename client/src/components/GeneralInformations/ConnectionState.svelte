<script>
  // Props
  export let state;

  // All possible states
  const states = {
    LOGGED_OUT: { label: 'Logged out', color: 'danger', },
    LOGGING_IN: { label: 'Logging in', color: 'warning', },
    LOGGED_IN: { label: 'Logged in', color: 'info', },
    AUTO_CONNECTING: { label: 'Auto connecting', color: 'warning', },
    CONNECTING: { label: 'Connecting', color: 'warning', },
    DISCONNECTING: { label: 'Disconnecting', color: 'warning', },
    CONNECTED: { label: 'Connected', color: 'success', },
    OVERLIMIT: { label: 'Overlimit', color: 'danger', },
    UNKNOWN: { label: 'Unknown', color: 'danger', },
  }

  // State label management
  let stateLabel = 'Loading...';
  $: stateLabel = states[state]?.label;

  // State color management
  let stateColor = 'default';
  $: stateColor = states[state]?.color;
</script>

<span title={stateLabel} class="has-text-white has-background-{stateColor}">{stateLabel}</span>

<style>
  span {
    padding: 0.5em;
    border-radius: 1em;
  }
</style>