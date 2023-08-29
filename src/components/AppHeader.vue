<script>
export default {
    data() {

    },
    methods: {
        goMain() {
            this.$router.push({
                name: 'MainPage'
            })
        },
        goBasket() {
            this.$router.push({
                name: 'BasketPage'
            })
        },
        goAdmin() {
            this.$router.push({
                name: 'AdminPage'
            })
        },
        goProducts() {
            this.$router.push({
                name: 'AllProducts'
            })
        },
        goNews() {
            this.$router.push({
                name: 'NewsPage'
            })
        }
    }
}
</script>
<template>
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom container">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            @click="goMain">
            <span class="fs-4">JweStore</span>
        </a>

        <ul class="nav nav-pills">
            <li class="nav-item me-2"><a href="#" :class="{
                'active-btn': this.$route.name == 'AllProducts' || this.$route.name == 'ProductPage'
            }" class="nav-link" aria-current="page" @click="goProducts">Все товары</a>
            </li>
            <li class="nav-item me-2"><a href="#" :class="{
                'active-btn': this.$route.name == 'BasketPage'
            }" class="nav-link" @click="goBasket">Корзина</a></li>
            <li class="nav-item"><a href="#" class="nav-link" :class="{
                'active-btn': this.$route.name == 'NewsPage'
            }" @click="goNews">Новости</a></li>
            <li class="nav-item"><a href="#" class="nav-link" :class="{
                'active-btn': this.$route.name == 'AdminPage' || this.$route.name == 'AdminProductPage' || this.$route.name == 'AdminProducts'  || this.$route.name == 'AdminNewsPage' 
            }" @click="goAdmin">Админка</a></li>
        </ul>
    </header>
</template>

<style scoped>
.btn-basket {
    background-color: #1d1d1d;
    color: aliceblue;
    border: none;
    font-size: 17px;
}

a {
    color: aliceblue;
}

a:hover {
    color: rgb(160, 160, 160);
    transition: color 0.5s;
}

a:focus {
    color: rgb(255, 255, 255);
    transition: color 0.5s;
}

.active-btn {
    background-color: #2a2a2a;
    color: aliceblue;
}
</style>