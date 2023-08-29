<script>
import axios from 'axios';
import dayjs from 'dayjs';
dayjs.locale('ru');
export default {
    data() {
        return {
            products: [],
            count: 0
        }
    },
    mounted() {
        this.loadProducts();
    },
    methods: {
        async loadProducts() {
            let response = await axios.get(`/basket`);
            this.products = response.data;
        },
        goProduct(product) {
            this.$router.push({
                name: 'ProductPage',
                params: {
                    _id: product._id
                }
            })
        },
        async deleteProduct(item) {
            let response = await axios.post(`/basket/remove/product`, {
                id: item._id
            });
            this.loadProducts();
        }
    }
}
</script>

<template>
    <main class="container">
        <div class="row mt-3">
            <div class="col-xl-8 col-12 basket mb-3">
                <h3 class="mx-3 mt-2">Корзина</h3>
                <div class="row product mt-2 mb-2" v-for="(item, index) in products">
                    <div class="col-2">
                        <img :src="item.image" class="img-product-order mb-2 mt-2 mx-xl-3" alt="" @click="goProduct(item)">
                    </div>
                    <div class="col-6 info-product-in-basket">
                        <h5 class="text-product-order mt-2 mx-5" @click=goProduct(item)>{{ item.title }}</h5>
                        <p class="mx-5 info-product-text">{{ item.category }}</p>
                        <p class="mx-5 info-product-text">{{ item.color }}</p>
                    </div>
                    <div class="col-4">
                        <h4 class="mt-2">{{ item.price }}р</h4>
                        <button class="btn btn-secondary" @click="deleteProduct(item)">Удалить</button>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-12 mx-xl-5 order mb-3">
                <button class="btn-add-basket btn-order btn">Заказать</button>

            </div>
        </div>

    </main>
</template>


<style scoped>
.product {
    border-radius: 15px;
    background-color: #292929;
}

.btn-order {
    background-color: #494949;
    color: aliceblue;
}

.img-product-order {
    border-radius: 10px;
    height: 150px;
    width: 150px;
    object-fit: cover;
    outline: 1px solid rgb(65, 65, 65);
    cursor: pointer;
}

.text-product-order {
    cursor: pointer;
}

.card {
    background-color: #2a2a2a;
    height: 680px;
}

.info-product-in-basket p {
    margin: 0;
}

.card-img-top {
    object-fit: cover;
    height: 300px;
}

.price {
    outline: 1px solid rgb(43, 43, 43);
    border-radius: 15px;
    background-color: #222222;
    height: 100%;
}

.btn-add-basket {
    width: 100%;
    height: 50px;
    border-radius: 15px;
}

.info-product p {
    color: #e4e4e4;
    font-size: 20px;
}

.basket {
    border-radius: 15px;
    background-color: #292929;
}

.order {
    border-radius: 15px;
    background-color: #292929;
    height: 80px;
    display: flex;
    align-items: center;
}

@media screen and (max-width: 768px) {
    .img-product-order {
        height: 100px;
        width: 100px;
    }

    .text-product-order {
        font-size: 16px;
    }

    .info-product-text {
        font-size: 15px;
    }
}</style>