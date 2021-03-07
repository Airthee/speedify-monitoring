<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import MainCards from "./components/GeneralInformations/MainCards.svelte";
	import DataUsage from "./components/DataUsage.svelte";
	import AdaptersList from "./components/AdaptersList.svelte";
	import { useWebSocketConnection } from "./hooks/useWebSocketConnection";

	// Speedify data management
	let speedifyData = {};
	const ws = useWebSocketConnection();
	ws.addEventListener("jsonmessage", ({ data }) => {
		switch (data.type) {
			case "initialData":
				speedifyData = data.data || {};
				break;
			case "updatedState":
				speedifyData[data.attributeName] = data.newValue;
				break;
		}
	});
</script>

<Header />
<main class="container">
	<section class="section">
		<h1 class="title">General informations</h1>
		<MainCards {speedifyData} />
	</section>

	<section class="section">
		<h1 class="title">Advanced informations</h1>

		<div class="subsection">
			<h2 class="subtitle">Adapters</h2>
			<AdaptersList {speedifyData} />
		</div>

		<div class="subsection">
			<h2 class="subtitle">Data usage</h2>
			<DataUsage {speedifyData} />
		</div>
	</section>
</main>
<Footer />

<style>
	.subsection:not(:first-child) {
		margin-bottom: 2rem;
	}
</style>
