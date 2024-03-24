<template>
    <nav class="navbar">
        <router-link to="/">
            <img src="../assets/logo.png" alt="Logo" class="navbar-logo" @click="navigateToHome">
        </router-link>
        <ul class="navbar-list">
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/createquiz">CREATE NEW QUIZ</router-link></li>
            <li><router-link to="/search">SEARCH</router-link></li>
        </ul>
        <div class="navbar-settings-container">
            <img src="../assets/settings.png" alt="Settings" class="navbar-settings" @click="toggleDropdown">
            <div v-if="showDropdown" class="dropdown-menu" ref="dropdownMenu">
                <button @click="handleSettings">Settings</button>
                <button @click="handleLogout">Log out</button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showDropdown = ref(false);
const router = useRouter();

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const handleSettings = () => {
    // Handle settings click
};

const handleLogout = () => {
    // Handle logout click
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
}

.navbar-logo {
    width: 40px;
    height: auto;
    margin-right: 20px;
    cursor: pointer;
}

.navbar-settings {
    width: 40px;
    height: auto;
    cursor: pointer;
}

.navbar-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-right: auto;
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
    background-color: #f7567C;
    border: 1px solid #6320EE;
    z-index: 1;
    border-radius: 8px;
}

.dropdown-menu button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 12px;
    font-size: 16px;
    color: white;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.dropdown-menu button:hover {
    background-color: #f3899e;
    border-radius: 8px;
}
</style>
