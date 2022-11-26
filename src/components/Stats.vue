<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useUIStore} from "@/store";
import {ref} from "vue";
import {makeStatsRequest} from "@/helpers/api/endpoints/stats";

let uiconf = useUIStore();

let stats = ref<object>({
  last_joined_alcoholic: {
    full_name: '?',
    dob: ''
  },
  total_alcoholics: '?',
  today_joined: '?',
  beds_remaining: '?'
});

(async () => {
  let res = await makeStatsRequest();

  if(res) {
    stats.value = res;
  }
})()

</script>

<template>
  <div class="stats shadow flex flex-wrap" :class="{'menu-open': uiconf.isMenuOpen}">
    <div class="stat last-joined">
      <div class="stat-figure text-primary">
        <font-awesome-icon icon="user" class="inline-block w-8 h-8 stroke-current"/>
      </div>
      <div class="stat-title">Last joined</div>
      <div class="stat-value text-primary">
          {{ stats.last_joined_alcoholic.full_name }}
      </div>
      <div class="stat-desc">{{ stats.last_joined_alcoholic.dob }}</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <font-awesome-icon icon="users" class="inline-block w-8 h-8 stroke-current"/>
      </div>
      <div class="stat-title">Total alcoholics</div>
      <div class="stat-value text-secondary">{{ stats.total_alcoholics }}</div>
      <div class="stat-desc"></div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <font-awesome-icon icon="right-to-bracket" class="inline-block w-8 h-8 stroke-current"/>
      </div>
      <div class="stat-title">Today joined</div>
      <div class="stat-value">{{  stats.today_joined }}</div>
      <div class="stat-desc text-secondary">{{ stats.beds_remaining }} bed(s) remaining</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles';
.stats {
  scroll-snap-type: y mandatory;

  .stat {
    scroll-snap-align: start;
    width: 100%;
  }

  @mixin screen-menu($name) {
    @screen #{$name} {
      &:not(.menu-open) {
        @content
      }
    }

    @media (min-width: calc(theme("screens.#{$name}") + 300px)) {
      &.menu-open {
        @content
      }
    }
  }

  @include screen-menu(sm) {
    .stat:not(.last-joined) {
      width: 50%;
    }
  }

  @include screen-menu(md) {
    .stat:not(.last-joined) {
      width: 25%;
    }

    .last-joined {
      width: 50%;
    }
  }

  @include screen-menu(lg) {
    .stat {
      width: calc(100% / 3) !important;
    }
  }

  // animation
  @for $i from 1 through 3 {
    .stat:nth-child(#{$i}) {
      @include fadeslideup($i * 0.2);
    }
  }
}

</style>
