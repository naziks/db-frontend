<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRoute} from 'vue-router';
import {useUIStore} from "@/store";

let uiStore = useUIStore();

let isMenuOpen = ref(false);
let dropNavbarShadow = ref(false);
let menuItems = ref([
  {
    type: 'item', name: "Dashboard", link: "/", icon: 'dashboard', aliases: [/\/run\/(\d+)/]
  },

  {type: "divider", title: 'People'},
  {type: 'item', name: "Alcoholics", link: "/alcoholics", icon: 'user'},
  {type: 'item', name: "Inspectors", link: "/inspectors", icon: 'user-shield'},

  {type: "divider", title: 'Entites'},
  {type: 'item', name: "Alco Groups", link: "/alco_groups", icon: 'users'},
  {type: 'item', name: "Beds", link: "/beds", icon: 'bed'},
  {type: 'item', name: "Drinks", link: "/drinks", icon: 'beer'},

  {type: "divider", title: 'Events'},
  {type: 'item', name: "Join", link: "/event/join", icon: 'right-to-bracket'},
  {type: 'item', name: "Bed change", link: "/event/bed_change", icon: 'arrow-right-arrow-left'},
  {type: 'item', name: "Faint", link: "/event/faint", icon: 'skull-crossbones'},
  {type: 'item', name: "Leave", link: "/event/leave", icon: 'right-from-bracket'},
  {type: 'item', name: "Escape", link: "/event/escape", icon: 'person-running'},

  {type: "divider", title: 'Other'},
  {type: 'item', name: "About", link: "/other/about", icon: 'circle-info'},
  {type: 'item', name: "Developers", link: "/other/developers", icon: 'circle-info'},


]);
let currentRoute = useRoute();

let scrollHandler = () => dropNavbarShadow.value = window.scrollY > 40
onMounted(() => {
  window.addEventListener('scroll', scrollHandler);
});
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
});

watch(isMenuOpen, (value) => {
  let body = document.body.classList;
  let className = "menu-open-move";
  uiStore.setMenuStatus(value);

  if (value) {
    body.add(className);

  } else {
    body.remove(className);
  }
});

const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
const isActive = (item: any) => {
  return item.type === 'item' && (
      currentRoute.path === item.link ||
      (item.aliases || []).some((alias: string | RegExp) => {
          if (typeof alias === 'string') {
            return alias === currentRoute.path;
          } else {
            return alias.test(currentRoute.path);
          }
      })
  )
}

</script>

<template>
  <div class="navbar bg-base-100" :class="[dropNavbarShadow ? 'shadow-md shadow-black' : '']">
    <svg class="hidden">
      <defs>
        <filter id="gooeyness">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                         result="gooeyness"/>
          <feComposite in="SourceGraphic" in2="gooeyness" operator="atop"/>
        </filter>
      </defs>
    </svg>

    <div class="navbar-drawer" :class="{shown: isMenuOpen}">
      <div class="navbar-drawer-title">DetoXer</div>
      <div class="navbar-drawer-divider"></div>
      <div class="navbar-drawer-content">
        <div class="navbar-drawer-item"
             v-for="(item, index) in menuItems" :key="index.name || index"
             :class="{
               divider: item.type === 'divider',
               active: isActive(item)
             }">
          <template v-if="item.type === 'item'">
            <router-link :to="item.link">
              <font-awesome-icon :icon="item.icon" class="navbar-drawer-icon"/>
              {{ item.name }}
            </router-link>
          </template>
          <div v-else-if="item.type === 'divider'" class="navbar-drawer-item-divider">{{ item.title || '' }}</div>
        </div>
      </div>
    </div>

    <div class="navbar-start">
      <label tabindex="0" class="btn btn-ghost btn-circle menu-toggler">
        <button class="menu-button" :class="{active: isMenuOpen}" @click="toggleMenu">
          <svg class="burger" height="100" width="100" viewBox="0 0 100 100">
            <path class="line line1"
                  d="M 50,65 H 70 C 70,65 75,65.198488 75,70.762712 C 75,73.779026 74.368822,78.389831 66.525424,78.389831 C 22.092231,78.389831 -18.644068,-30.508475 -18.644068,-30.508475"/>
            <path class="line line2"
                  d="M 50,35 H 70 C 70,35 81.355932,35.300135 81.355932,25.635593 C 81.355932,20.906215 78.841706,14.830508 72.881356,14.830508 C 35.648232,14.830508 -30.508475,84.322034 -30.508475,84.322034"/>
            <path class="line line3"
                  d="M 50,50 H 30 C 30,50 12.288136,47.749959 12.288136,60.169492 C 12.288136,67.738339 16.712974,73.305085 40.677966,73.305085 C 73.791674,73.305085 108.47458,-19.915254 108.47458,-19.915254"/>
            <path class="line line4"
                  d="M 50,50 H 70 C 70,50 81.779661,50.277128 81.779661,36.607372 C 81.779661,28.952694 77.941689,25 69.067797,25 C 39.95532,25 -16.949153,119.91525 -16.949153,119.91525"/>
            <path class="line line5"
                  d="M 50,65 H 30 C 30,65 17.79661,64.618439 17.79661,74.152543 C 17.79661,80.667556 25.093813,81.355932 38.559322,81.355932 C 89.504001,81.355932 135.59322,-21.186441 135.59322,-21.186441"/>
            <path class="line line6"
                  d="M 50,35 H 30 C 30,35 16.525424,35.528154 16.525424,24.152542 C 16.525424,17.535987 22.597755,13.559322 39.40678,13.559322 C 80.617882,13.559322 94.067797,111.01695 94.067797,111.01695"/>
          </svg>
          <svg class="x" height="100" width="100" viewBox="0 0 100 100">
            <path class="line" d="M 34,32 L 66,68"/>
            <path class="line" d="M 66,32 L 34,68"/>
          </svg>
        </button>
      </label>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl">DetoXer</a>
    </div>
    <div class="navbar-end">

    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  transition: box-shadow 0.2s ease-in-out;


  .menu-toggler {
    z-index: 10;
  }

  .navbar-start {
    z-index: 200;
  }

  .menu-button {
    --size: 100px;
    position: relative;

    svg {
      top: -27px;
      left: -27px;
      scale: 0.5;
      height: var(--size, 0) !important;
      position: absolute;
      width: var(--size, 0) !important;
    }

    height: var(--size, 0);
    width: var(--size, 0);

    .burger {
      filter: url(#gooeyness);
    }

    .x {
      transform: scale(0);
      transition: transform 400ms;
    }

    .line {
      fill: none;
      stroke: white;
      stroke-width: 6px;
      stroke-linecap: round;
      stroke-linejoin: round;
      transform-origin: 50%;
      transition: stroke-dasharray 500ms 200ms, stroke-dashoffset 500ms 200ms, transform 500ms 200ms;
    }

    .x .line {
      stroke-width: 5.5px;
    }

    .line1 {
      stroke-dasharray: 21 185.62753295898438;
      transition-delay: 0ms;
    }

    .line2 {
      stroke-dasharray: 21 178.6514129638672;
      transition-delay: 30ms;
    }

    .line3 {
      stroke-dasharray: 21 197.92425537109375;
      transition-delay: 60ms;
    }

    .line4 {
      stroke-dasharray: 21 190.6597137451172;
      transition-delay: 90ms;
    }

    .line5 {
      stroke-dasharray: 21 208.52874755859375;
      transition-delay: 120ms;
    }

    .line6 {
      stroke-dasharray: 21 186.59703063964844;
      transition-delay: 150ms;
    }

    &.active {

      .line {
        transition: stroke-dasharray 500ms, stroke-dashoffset 500ms, transform 500ms;
      }

      .x {
        transform: scale(1);
        transition: transform 400ms 350ms;
      }

      .line1 {
        stroke-dasharray: 5 185.62753295898438;
        stroke-dashoffset: -141px;
      }

      .line2 {
        stroke-dasharray: 5 178.6514129638672;
        stroke-dashoffset: -137px;
      }

      .line3 {
        stroke-dasharray: 5 197.92425537109375;
        stroke-dashoffset: -176px;
      }

      .line4 {
        stroke-dasharray: 5 190.6597137451172;
        stroke-dashoffset: -159px;
      }

      .line5 {
        stroke-dasharray: 5 208.52874755859375;
        stroke-dashoffset: -139px;
      }

      .line6 {
        stroke-dasharray: 5 186.59703063964844;
        stroke-dashoffset: -176px;
      }

      .x {
        transition: transform 400ms 250ms;
      }
    }

  }

  .navbar-drawer {
    --size: 100vw;

    display: flex;
    position: absolute;
    top: 0;
    left: -100%;
    max-width: var(--size, 0);

    height: 100vh;
    width: 100vw;
    background-color: theme('colors.neutral');
    transition: left 0.3s ease-in-out;
    z-index: 100;
    @screen sm {
      --size: 300px;
      left: -300px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px 0 rgba(0, 0, 0, 0.1);
    }


    &.shown {
      left: 0;
      @screen sm {
        left: -300px;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      min-height: calc(100% - 64px);
      max-height: calc(100% - 64px);
      width: 100%;
      padding: 1rem;
      margin-top: 64px;
      gap: 5px;
      overflow: auto;

      @screen sm {
        justify-content: flex-start;
      }
    }

    &-title {
      user-select: none;
      position: fixed;
      top: 0;
      height: 64px;
      line-height: 64px;
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      width: 100%;
      color: theme('colors.primary-focus');

      @screen sm {
        display: none;
      }
    }

    &-divider {
      position: fixed;
      top: 64px;
      margin: 0;
      width: 100%;
      height: 1px;
      background-color: theme('colors.primary');
      user-select: none;
      @screen sm {
        display: none;
      }
    }

    &-item {
      &:not(.divider) {
        display: flex;
        user-select: none;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 500;
        color: theme('colors.secondary');
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
        border-radius: 10px;

        @screen sm {
          font-size: 1rem;
        }

        a {
          display: flex;
          width: 100%;
          gap: 10px;
          padding: 10px calc(10px + 1rem);
          outline: none !important;
          align-items: center;
        }

        .navbar-drawer-icon {
          width: 1rem;
        }

        &:hover {
          background-color: theme('colors.secondary-focus');
          color: theme('colors.neutral');
        }

        &.active {
          text-decoration: underline;
          background-color: theme('colors.accent-focus');
          color: theme('colors.neutral');

          &:hover {
            opacity: 0.8;
          }
        }
      }

      &.divider {
        user-select: none;
        height: 1px;
        background-color: theme('colors.primary');
        margin: 30px auto 15px auto;
        @apply bg-neutral;

        @media (max-width: theme('screens.sm')) {
          width: 80% !important;
          @apply bg-neutral;
        }

        @screen sm {
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@screen sm {
  body {
    max-width: 100%;
    transition: transform 0.3s ease-in-out, max-width 0.3s ease-in-out;

    #app > .navbar .navbar-start {
      transition: transform 0.3s ease-in-out;
    }


    &.menu-open-move {
      overflow-x: hidden;
      overflow-y: auto;
      max-width: calc(100vw - 300px) !important;
      transform: translateX(300px);

      #app > .navbar .navbar-start {
        transform: translateX(-300px);
      }
    }
  }
}
</style>