<template>
  <nav class="navbar">
    <router-link to="/home">
      <img src="../assets/logo.png" alt="Logo" class="navbar-logo" @click="navigateToHome">
    </router-link>
    <ul class="navbar-list" v-if="!showMobileMenu">
      <li><router-link to="/home">
        <font-awesome-icon class="icon" icon="house" />HOME</router-link></li>
      <li><router-link to="/createquiz">
        <font-awesome-icon class="icon" icon="plus" />CREATE NEW QUIZ</router-link></li>
      <li><router-link to="/search">
        <font-awesome-icon class="icon" icon="magnifying-glass" />SEARCH</router-link></li>
    </ul>
    <div class="navbar-settings-container" v-if="!showMobileMenu">
      <font-awesome-icon icon="cog" class="navbar-settings" @click="toggleSettingsDropdown" />
      <div v-if="showSettingsDropdown" class="dropdown-menu" ref="dropdownMenu">
        <button @click="toggleSettings">Settings</button>
        <button @click="handleLogout">Log out</button>
      </div>
      <div v-if="showProfileDropdown" class="dropdown-menu" ref="dropdownMenu">
        <button @click="handleProfile">Profile</button>
        <button @click="handleColorMode">Lightmode / darkmode</button>
        <button @click="toggleSettings" class="back-button">Back</button>
      </div>
    </div>
    <div class="hamburger-menu-container" v-if="isMobileMenuVisible" @click="toggleMobileMenu">
      <font-awesome-icon icon="bars" class="hamburger-menu" />
    </div>
    <div v-if="showMobileMenu" class="mobile-dropdown-menu" ref="mobileDropdownMenu">
      <router-link to="/home" @click="toggleMobileMenu">
        <font-awesome-icon class="icon" icon="home" />HOME
      </router-link>
      <router-link to="/createquiz" @click="toggleMobileMenu">
        <font-awesome-icon class="icon" icon="plus" />CREATE NEW QUIZ
      </router-link>
      <router-link to="/search" @click="toggleMobileMenu">
        <font-awesome-icon class="icon" icon="search" />SEARCH
      </router-link>
      <button @click="toggleSettingsDropdown" class="mobile-settings-button">
        <font-awesome-icon icon="cog" class="icon" />SETTINGS
      </button>
      <div v-if="showSettingsDropdown" class="dropdown-menu-mobile" ref="dropdownMenu">
        <button @click="toggleSettings">Settings</button>
        <button @click="handleLogout">Log out</button>
        <div v-if="showProfileDropdown" class="dropdown-menu" ref="dropdownMenu">
          <button @click="handleProfile">Profile</button>
          <button @click="handleColorMode">Lightmode / darkmode</button>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/store.js';

const showMobileMenu = ref(false);
const showSettingsDropdown = ref(false);
const showProfileDropdown = ref(false);
const router = useRouter();
const store = useStore();

const toggleSettingsDropdown = () => {
  showSettingsDropdown.value = !showSettingsDropdown.value;
  showProfileDropdown.value = false;
};

const toggleSettings = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

const handleProfile = () => {
};

const handleColorMode = () => {
};

const handleLogout = () => {
    console.log("Logging out...");
    store.clearToken();
    router.push('/login');
};

const navigateToHome = () => {
  router.push('/');
};

const checkWidth = () => window.innerWidth >= 800;
const isMobileMenuVisible = ref(checkWidth());

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const handleResize = () => {
  const currentWidthIsMobile = window.innerWidth < 800;
  isMobileMenuVisible.value = currentWidthIsMobile;

  if (!currentWidthIsMobile && showMobileMenu.value) {
    showMobileMenu.value = false;
    showSettingsDropdown.value = false;
    showProfileDropdown.value = false;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
});

</script>

<style scoped>
.navbar {
  background-color: #6320EE;
  justify-content: space-between;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 60px;
}

.navbar-logo {
  width: 130px;
  margin-left: -40px;
  cursor: pointer;
  transform: translateY(20px);
}

.navbar-logo img {
  max-height: 100%;
  vertical-align: middle;
}

.navbar-list {
  list-style-type: none;
  padding: 0;
  margin-right: auto;
}

.icon {
  margin-right: 7px;
  font-size: 18px;
  color: white;
  cursor: pointer;
}

.navbar-settings {
  font-size: 40px;
  color: white;
  cursor: pointer;
}

.navbar-list li {
  display: inline;
  margin-right: 40px;
}

.navbar-list li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
}

.navbar-list li a:hover {
  text-decoration: underline;
}

.navbar-settings-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ef8354;
  border: 1px solid #6320EE;
  z-index: 1;
  border-radius: 8px;
  width: 200px;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px;
  margin: 0;
  font-size: 14px;
  color: white;
  border: none;
  background-color: transparent;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-menu button:hover {
  background-color: #EF9C76FF;
  border-radius: 8px;
}

.back-button {
  font-weight: bolder;
  color: #6320EE !important;
}

@media screen and (max-width: 800px) {
  .navbar-list, .navbar-settings-container {
    display: none;
  }

  .hamburger-menu-container {
    display: block !important;
  }

  .dropdown-menu-mobile {
    position: absolute;
    top: calc(100% + 5px);
    right: 10px;
    background-color: #ef8354;
    border: 1px solid #6320EE;
    z-index: 1;
    border-radius: 8px;
    width: 200px;
    font-size: 18px;
  }
}

.hamburger-menu-container {
  display: block;
  position: absolute;
  right: 20px;
  top: 20px;
}

.mobile-dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 0;
  width: 45%;
  background-color: #6320EE;
  z-index: 100;
  padding: 10px 0;
  border-radius: 20px;
}

.mobile-dropdown-menu a,
.mobile-dropdown-menu button {
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
}

.mobile-dropdown-menu button {
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger-menu {
  font-size: 40px;
  color: white;
  cursor: pointer;
}
</style>