<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { triggerRef } from 'vue';
dayjs.locale('ru');
export default {
    data() {
        return {
            products: [],
            title: '',
            price: 0,
            description: '',
            image: '',
            category: '',
            color: '',
            weight: 0,
            textNews: '',
            authorNews: '',
            isDoneNews: false,
            isDoneProduct: false
        }
    },
    mounted() {
        this.loadProducts();
    },
    watch: {
        $route() {
            this.loadData();
        }
    },
    methods: {
        async loadData() {
            await this.loadProducts();
        },
        async loadProducts() {
            let response = await axios.get(`/products/all`);
            this.products = response.data;
        },
        goNews() {
            this.$router.push({
                name: 'AdminNewsPage'
            })
        },
        goProductAdmin() {
            this.$router.push({
                name: 'AdminProducts'
            })
        },
        async add(evt) {
            this.isDoneProduct = true;
            evt.preventDefault();
            await axios.post(`/admin/product/create`, {
                title: this.title,
                description: this.description,
                price: this.price,
                category: this.category,
                image: this.image,
                weight: this.weight,
                color: this.color,
            });
            this.title = ''
            this.loadProducts()
        },
        async addNews(evt) {
            this.isDoneNews = true;
            evt.preventDefault();
            await axios.post(`/create/news`, {
                text: this.textNews,
                author: this.authorNews
            });
            this.textNews = '';
            this.authorNews = '';
        },
        getDate(item) {
            return dayjs(item.createdAt).format('DD MMMM, YYYY');
        },
    }
}
</script>

<template>
    <div class="container">
        <button class="btn btn-primary" @click="goNews">Новости</button>
        <button class="btn btn-primary mx-2" @click="goProductAdmin">Товары</button>
    </div>
    <main class="container">
        <h2 class="mt-4">Добавить новый товар</h2>
        <form @submit="add">
            <div class="mb-3">
                <label for="title" class="form-label">Название товара</label>
                <input type="text" class="form-control" id="title" aria-describedby="emailHelp" v-model="title">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Описание товара</label>
                <input type="text" class="form-control" id="description" aria-describedby="emailHelp" v-model="description">
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Имага товара</label>
                <input type="text" class="form-control" id="image" aria-describedby="emailHelp" v-model="image">
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Цена товара</label>
                <input type="number" class="form-control" id="price" aria-describedby="emailHelp" v-model="price">
            </div>
            <div class="mb-3">
                <label for="color" class="form-label">Цвет товара</label>
                <input type="text" class="form-control" id="color" aria-describedby="emailHelp" v-model="color">
            </div>
            <div class="mb-3">
                <label for="weight" class="form-label">Вес товара</label>
                <input type="text" class="form-control" id="weight" aria-describedby="emailHelp" v-model="weight">
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Категория товара</label>
                <input type="text" class="form-control" id="category" aria-describedby="emailHelp" v-model="category">
            </div>
            <button type="submit" class="btn btn-primary mb-3">Submit</button>
            <div class="alert alert-success" role="alert" v-if="isDoneProduct">
                Вы успешно добавили товар!
            </div>
        </form>
        <h2 class="mt-4">Добавить новую новость</h2>
        <form @submit="addNews">
            <div class="mb-3">
                <label for="textNews" class="form-label">Текст новости</label>
                <input type="text" class="form-control" id="textNews" aria-describedby="emailHelp" v-model="textNews">
            </div>
            <div class="mb-3">
                <label for="authorNews" class="form-label">Автор новости</label>
                <input type="text" class="form-control" id="authorNews" aria-describedby="emailHelp" v-model="authorNews">
            </div>
            <button type="submit" class="btn btn-primary mb-3">Submit</button>
            <div class="alert alert-success" role="alert" v-if="isDoneNews">
                Вы успешно опубликовали новость!
            </div>
        </form>
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

.product {
    outline: 1px solid rgb(31, 31, 31);
    border-radius: 15px;
    background-color: #222222;
    height: 600px;
}

.btn-title {
    cursor: pointer;
}

.product p {
    margin: 0;
}

.form-control {
    background: none;
    border: none;
    outline: 1px solid gray;
    color: aliceblue;
}

@media screen and (max-width: 768px) {
    .products {
        display: flex;
        justify-content: center;
    }
}
</style>