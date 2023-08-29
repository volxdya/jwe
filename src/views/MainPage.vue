

<script>

export default {
    data() {

    },
    methods: {
        goProducts() {
            this.$router.push ({
                name: 'AllProducts'
            })
        }
    }
}
</script>


<template>
    <main class="container mb-5 main-page-app mt-2">
        <h2 class="text-center">Просто вещи — это пространство, где люди могут объединиться и закрыть свои
            потребности в
            детских товарах, бытовой технике, медицинском оборудовании, спортивном инвентаре и других вещах, не тратя
            лишних
            средств.</h2>
        <div class="btn-main">
            <button class="btn btn-light btn-gomain mb-4 mt-3" @click="goProducts">Перейти к просмотру товаров</button>
        </div>
       
    </main>
</template>


<style scoped>
.btn-main {
    display: flex;
    justify-content: center;
}
.btn-gomain {
    height: 50px;
    border-radius: 12px;
}
.main-page-app {
    height: 250px;
}
@media screen and (max-width: 768px) {
    .main-page-app {
        height: 375px;
    }
}
</style>