<template>
    <div id="list">
        <addSnippet @newSnippet="addSnippet"></addSnippet>
        <button @click="fetchLatest">Get latest snippets</button>
        <button @click="fetchBest">Get best snippets</button>
        <button @click="fetchReported">Get reported snippets</button>
        <div v-show="!loading">{{shownList}}</div>
        <div v-show="loading">{{errormsg}}</div>
        <div class="snippets">
            <div class="snippet" v-for="snippet in snippets" :key="snippet.id">
                <div>Title:{{snippet.title}}</div>
                <div>Content:{{snippet.content}}</div>
                <div>Score: {{snippet.score}}</div>
                <div v-show="snippet.is_reported">Reported</div>
                <editSnippet @deleteSnippet="removeSnippet"  v-bind:identifier="snippet.id"></editSnippet>
            </div>
        </div>
    </div>
</template>

<script>
import addSnippet from './addSnippet.vue';
import editSnippet from './editSnippet.vue';


    export default {
        name: 'list',
        components: {
            addSnippet,
            editSnippet,
        },
        data: () => ({
            loading: Boolean,
            errormsg: String,
            shownList: 'Latest snippets are shown below',
            snippets:[]
        }),
        methods:{
            waitingForApi(param){
                let elems = document.getElementsByTagName('button');
                if(param == true){
                    this.loading=true;
                    this.errormsg = 'The API i loading please wait'
                    for(let i = 0; i < elems.length; i++){
                        elems[i].disabled = true;
                    }
                } else{
                    for(let i = 0; i < elems.length; i++){
                        elems[i].disabled = false;
                    }
                    this.loading=false;
                }
            },
            fetchLatest(){
                this.waitingForApi(true);
                this.errormsg = 'The API i loading please wait'
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?latest', {
                    method: 'GET',
                })
                .then(response => response.json())
                .then((data) => {
                    this.waitingForApi(false);
                    this.shownList = 'Latest snippets are listed below';
                    this.snippets = data;
                })
                .catch((error) => {
                    this.errormsg = 'Fetching "latest" from API failed, please try again.';
                    console.log(error);
                })
            },
            fetchReported(){
                this.waitingForApi(true);
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?reported', {
                    method: 'GET',
                })
                .then(response => response.json())
                .then((data) => {
                    this.waitingForApi(false);
                    this.shownList = 'Reported snippets are listed below';
                    this.snippets = data;
                })
                .catch((error) => {
                    this.errormsg = 'Fetching "reported" from API failed, please try again.';
                    console.log(error);
                })
            },
            fetchBest(){
                this.waitingForApi(true);
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?best', {
                    method: 'GET',
                })
                .then(response => response.json())
                .then((data) => {
                    this.waitingForApi(false);
                    this.shownList = 'Best snippets are listed below';
                    this.snippets = data;
                })
                .catch((error) => {
                    this.errormsg = 'Fetching "best" from API failed, please try again.';
                    console.log(error);
                })
            },
            addSnippet(snippet){
                console.log(snippet);
                this.fetchLatest();
                // console.log(snippet);
                // this.snippets.push(snippet);
            },
            removeSnippet(identifier){
                this.waitingForApi(true);
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?delete&id=' + identifier, {
                    method: 'POST',
                })
                .then((response) => {
                    this.waitingForApi(false);
                    this.snippets = this.snippets.filter(
                        snippet => snippet.id != identifier,
                    );
                    console.log(response);
                })
                .catch((error) => {
                    this.errormsg = 'Removing from API failed, please try again.';
                    console.log(error);
                })
            },
        },
        mounted(){
            this.fetchLatest();
        }
    }
</script>

<style scopes>
    #list {

    }
    .snippets{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10em;
    }
    .snippet{
        border: 1px solid #cccc;
        padding:0.5em;
        
    }
</style>
