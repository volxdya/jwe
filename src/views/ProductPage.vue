<script>
import axios from 'axios';
import dayjs from 'dayjs';
dayjs.locale('ru');
export default {
    data() {
        return {
            products: [],
            comments: [],
            text: '',
            author: '',
            isBasket: false
        }
    },
    mounted() {
        this.loadProducts();
        this.loadComments();
    },
    watch: {
        $route() {
            this.loadProducts();
        }
    },
    methods: {
        async loadProducts() {
            let response = await axios.get(`/product`, {
                params: {
                    id: this.$route.params._id
                }
            });
            this.products.push(response.data);
            console.log(this.products[0])
        },
        async loadComments(){
            let response = await axios.get (`/load/comments/product`, {
                params: {
                    id: this.$route.params._id
                }
            });
            this.comments = response.data;
        },
        /*
        async loadViews(item) {
            let response = await axios.get (`/product/view`, {
                params: {
                    id: item._id
                }
            })
            /basket-add-product?product_id={{product._id}}"
        },*/
        async addBasket(item) {
            let response = await axios.post(`/basket-add-product`, {
                id: item._id
            });
            this.isBasket = true;
        },
        getDate(item) {
            return dayjs(item.createdAt).format('DD MMMM, YYYY');
        },
        async addComment(evt){
            evt.preventDefault();
            await axios.post(`/create/comment`, {
                text: this.text,
                author: this.author,
                id: this.$route.params._id
            });
        }
    }
}
</script>

<template>
    <main class="container">
        <div class="product mt-4" v-for="(item, index) in products">
            <h2>{{ item.title }}</h2>
            <div class="row mt-3">
                <div class="col-xl-4">
                    <img :src="item.image" class="img-product" alt="" srcset="">
                </div>
                <div class="col-xl-4 col-12 mx-0 info-product mt-xl-0 mt-3">
                    <ul class="list-group dark-group-list">
                        <li class="list-group-item dark-group-item">
                            <span class="info-item">
                                Просмотров:
                            </span>
                            <span>
                                {{ item.views }}
                            </span>
                        </li>
                        <li class="list-group-item dark-group-item">
                            <span class="info-item">
                                Категория:
                            </span>
                            <span>
                                {{ item.category }}
                            </span>
                        </li>
                        <li class="list-group-item dark-group-item">
                            <span class="info-item">
                                Цвет:
                            </span>
                            <span>
                                {{ item.color }}
                            </span>
                        </li>
                        <li class="list-group-item dark-group-item">
                            <span class="info-item">
                                Понравилось:
                            </span>
                            <span>
                                {{ item.likes }}
                            </span>
                        </li>
                        <li class="list-group-item dark-group-item">
                            <span class="info-item">
                                Не понравилось:
                            </span>
                            <span>
                                {{ item.dislikes }}
                            </span>
                        </li>
                        <li class="list-group-item dark-group-item">
                            <span class="info-item">
                                Добавлено:
                            </span>
                            <span>
                                {{ getDate(item) }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="col-xl-3 col-12 price mx-xl-3 mx-0 mt-xl-0 mt-3">
                    <h3 class="mx-3 mt-3">{{ item.price }} руб.</h3>
                    <hr>
                    <button @click="addBasket(item)" class="btn-add-basket btn-primary btn mt-2 mb-4">Добавить в
                        корзину</button>
                    <div class="alert alert-success" role="alert" v-if="isBasket">
                        Вы успешно добавили товар в корзину!
                    </div>
                </div>
                <h3 class="mt-3">О товаре</h3>
                <h5>Описание</h5>
                <div class="row">
                    <div class="col-xl-6 col-12">
                        <h5 class="description mb-3">{{ item.description }}</h5>
                    </div>
                </div>
                <h3>Добавить комментарий к товару</h3>
                <form @submit="addComment">
                    <div class="mb-3">
                        <label for="name" class="form-label">Имя</label>
                        <input type="text" v-model="author" class="form-control" id="name" aria-describedby="emailHelp"
                            placeholder="Введите имя">
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Текст</label>
                        <input type="text" v-model="text" class="form-control" id="text" placeholder="Введите текст">
                    </div>
                    <button type="button" class="btn btn-primary">Добавить</button>
                </form>
                <h3 class="mt-3">Комментарии о товаре</h3>
                <div class="comments">
                    <div class="row comment" v-for="(item, index) in comments">
                        <div class="col-12">
                            <h5>{{item.author}}</h5>
                        </div>
                        <div class="col-12">
                            {{item.text}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped>
.img-product-order {
    border-radius: 10px;
    object-fit: cover;
    outline: 1px solid #252525;
}

.product-info {
    color: rgb(63, 63, 63);
}

.dark-group-item:hover {
    background-color: #212121;
    transition: background-color 0.3s;
}

.form-control {
    background: none;
    color: aliceblue;
    border: 1px solid rgb(55, 55, 55);
}

.comments {
    outline: 1px solid #262626;
    background-color: #2a2a2a;
    border-radius: 11px;
}

.comment {
    padding: 5px;
}

.description {
    color: rgb(220, 220, 220);
}

.info-item {
    color: rgb(212, 212, 212);
}

.dark-group-item {
    background-color: #252525;
    color: aliceblue;
    border-bottom: 1px solid rgb(65, 65, 65);
}

.dark-group-list {
    border-radius: 12px;
    outline: 1px solid #313131;
}

.card-img-top {
    object-fit: cover;
    height: 300px;
}

h5 {
    margin: 5px 0 0 0;
}

.price {
    outline: 1px solid rgb(43, 43, 43);
    border-radius: 15px;
    background-color: #252525;
    height: 100%;
}

.btn-add-basket {
    width: 100%;
    height: 50px;
    border-radius: 15px;
}

.img-product {
    height: 370px;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
}

.product {
    border-radius: 15px;
    background-color: #252525;
}

.product h5 {
    color: rgb(220, 220, 220);
}</style>