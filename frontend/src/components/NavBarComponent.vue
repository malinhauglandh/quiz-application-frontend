<template>
    <nav class="navbar">
        <router-link to="/home">
            <img src="../assets/logo.png" alt="Logo" class="navbar-logo" @click="navigateToHome">
        </router-link>
        <ul class="navbar-list">
            <li><router-link to="/home">
                <font-awesome-icon class="icon" icon="house" />HOME</router-link></li>
            <li><router-link to="/createquiz">
                <font-awesome-icon class="icon" icon="plus" />CREATE NEW QUIZ</router-link></li>
            <li><router-link to="/search">
                <font-awesome-icon class="icon" icon="magnifying-glass" />SEARCH</router-link></li>
        </ul>
        <div class="navbar-settings-container">
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
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/store.js';

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

.navbar-settings {
    width: 40px;
    height: auto;
    cursor: pointer;
}

.navbar-list {
    list-style-type: none;
    padding: 0;
    margin-right: auto;
}

.icon {
    margin-right: 7px;
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
    font-size: 16px;
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
    font-size: 16px;
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
</style>
