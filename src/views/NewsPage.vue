<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { setTransitionHooks, toHandlers } from 'vue';
dayjs.locale('ru');
export default {
    data() {
        return {
            news: [],
            author: '',
            isAdmin: false
        }
    },
    mounted() {
        this.loadNews();
        this.loadAdmin();
        this.sortLikes();
        this.oldNews();
        this.loadAuthor();
    },
    methods: {
        async loadNews() {
            let response = await axios.get(`/news/all`);
            this.news = response.data;
            console.log(this.news);
        },
        async deleteNews(item) {
            let response = await axios.post(`/delete/news`, {
                id: item._id
            });
            this.loadNews();
        },

        loadAdmin() {
            if (this.$route.name == 'AdminNewsPage') {
                this.isAdmin = true;
            }
        },
        async newsViews(item) {
            let response = await axios.post(`/news/views`, {
                id: item._id
            });
        },
        async likeNews(item) {
            let response = await axios.post(`/like/news`, {
                id: item._id
            });
            this.loadNews();
        },
        async sortLikes() {
            let response = await axios.get(`/news/likes`);
            this.news = response.data;
        },
        async oldNews() {
            let response = await axios.get(`/news/old`);
            this.news = response.data;
        },
        async loadAuthor(item) {
            let response = await axios.get (`/author`, {
                params: {
                    id: item._id
                }
            });
            console.log (response.data);
            this.loadNews();
        },  
        getTime(item) {
            return dayjs(item.createdAt).format('DD MMMM, hh:mm, YYYY');
        }
    }
}
</script>

<template>
    <div class="btns-sort">
        <button class="btn btn-light" @click="sortLikes">По лайкам</button>
        <button class="btn btn-light" @click="loadNews">Сначала новые</button>
        <button class="btn btn-light" @click="oldNews">Сначала старые</button>
    </div>
    <main class="container">
        <div class="row news mt-3" v-for="(item, index) in news">
            <div class="col-12 new-info" @click="newsViews(item)">
                <h5>{{ item.text }}</h5>
                <li class="list-group-item">
                    <span class="info-item" @click="loadAuthor(item)">
                        Автор:
                    </span>
                    <span>
                        {{ item.author }}
                    </span>
                </li>
                <li class="list-group-item">
                    <span class="info-item">
                        Добавлено:
                    </span>
                    <span>
                        {{ getTime(item) }}
                    </span>
                    <button class="btn btn-danger mx-3" v-if="isAdmin" @click="deleteNews(item)">Удалить</button>
                </li>
                <button class="btn btn-like" @click="likeNews(item)">🤍 {{ item.likes }}</button>
                <button class="btn btn-like">👁️ {{ item.views }}</button>
            </div>
        </div>
    </main>
</template>


<style scoped>
.news {
    outline: 1px solid #262626;
    background-color: #2a2a2a;
    border-radius: 11px;
}

.new-info {
    padding: 12px;
}

.info-item {
    color: rgb(212, 212, 212);
}

.btns-sort {
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-column-gap: 15px;
    justify-content: center;
}

.btn-like {
    color: aliceblue;
    font-size: 13px;
}

@media screen and (max-width: 768px) {
    .btns-sort {
        grid-template-columns: 120px 120px 120px;
    }

}</style>