<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import TodayRecommend from '@/pages/Home/TodayRecommend/TodayRecommend.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from '@/pages/Home/Like/Like.vue'
import Floor from '@/pages/Home/Floor/Floor.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'

import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  components: { ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState('home', ['floorList']),
  },
}
</script>

<style></style>
