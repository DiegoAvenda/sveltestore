<script>
	import '../app.css';
	let { data, children } = $props();
	import Navbar from '../lib/components/Navbar.svelte';
</script>

<Navbar userPicture={data.userPicture} />
{@render children()}
