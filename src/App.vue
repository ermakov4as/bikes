<template>
  <div id="app">
		<!--<p>AAA</p>-->
		<Header/>
    <router-view/>
    <notifications group="main"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  data: () => {
    return {
      uploaded: false
    }
	},

	components: {
		Header
	}
}
</script>