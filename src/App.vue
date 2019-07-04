<template>
  <div id="app">
		<Header/>
    <router-view></router-view>
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