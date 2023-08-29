<script>
import axios from 'axios';
import dayjs from 'dayjs';
dayjs.locale('ru');
export default {
    data() {
        return {
            products: [],
            isAdmin: false
        }
    },
    mounted() {
        this.loadProducts();
        this.loadAdmin();
    },
    methods: {
        async loadProducts() {
            let response = await axios.get(`/products/all`);
            this.products = response.data;
        },
        loadAdmin() {
            if (this.$route.name == 'AdminProducts') {
                this.isAdmin = true;
            }
        },
        goProduct(product) {
            this.$router.push({
                name: 'ProductPage',
                params: {
                    _id: product._id
                }
            })
        },
        async likeProduct(item) {
            let response = await axios.get (`/product/like`, {
                params: {
                    id: item._id
                }
            });
            this.loadProducts();
        },
        async dislikeProduct(item){
            let response = await axios.get (`/product/dislike`, {
                params: {
                    id: item._id
                }
            });
            this.loadProducts();
        },
        async deleteProduct(item) {
            let response = await axios.post(`/admin/remove/product`, {
                id: item._id
            });
            this.loadProducts()
        },
        getDate(item) {
            return dayjs(item.createdAt).format('DD MMMM, YYYY');
        },
    }
}
</script>

<template>
    <main class="container">
        <div class="row mt-2 products">
            <div class="col-xl-3 col-mx-6 col-12 product mx-xl-3 mt-3 mb-3" v-for="(item, index) in products"
                style="width: 18rem;">
                <img :src="item.image" @click="goProduct(item)" class="img-product mt-2" alt="">

                <h4 @click="goProduct(item)" class="mx-1 mt-2 btn-title"> {{ item.title }} </h4>
                <p class="mx-1 info-product">{{ item.category }}</p>
                <p class="mx-1 info-product">{{ item.price }} ₽</p>
                <p class="mx-1 info-product">{{ getDate(item) }}</p>
                <div class="btns-reaction mt-3">
                    <button class="btn btn-success like" @click="likeProduct(item)">👍🏻 {{ item.likes }}</button>
                    <button class="btn btn-danger dislike" @click="dislikeProduct(item)">👎🏻 {{ item.dislikes }}</button>
                </div>
                <button class="btn btn-danger mt-2" v-if="isAdmin" @click="deleteProduct(item)">Удалить</button>
            </div>
        </div>
    </main>
</template>


<style scoped>
.img-product {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
    cursor: pointer;

}
.btns-reaction {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 5px;
    justify-content: start;
    grid-row-gap: 5px;
}
.img-product:hover {
    transform: rotateX(10deg);
    transition: transform 0.5s;
}
.product {
    outline: 1px solid rgb(31, 31, 31);
    border-radius: 15px;
    background-color: #222222;
    height: 590px;
}

.info-product {
    color: rgb(209, 209, 209);
}

.btn-title {
    cursor: pointer;
    color: rgb(255, 255, 255);
}

.btn-title:hover {
    color: rgb(209, 209, 209);
    transition: color 0.5s;
}

.product p {
    margin: 0;
}

@media screen and (max-width: 768px) {
    .products {
        display: flex;
        justify-content: center;
    }
}
</style>