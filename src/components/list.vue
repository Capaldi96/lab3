<template>
    <div id="list">
        <addSnippet @newSnippet="addSnippet"></addSnippet>
        <button @click="fetchSnippets('latest')">Get latest snippets</button>
        <button @click="fetchSnippets('best')">Get best snippets</button>
        <button @click="fetchSnippets('reported')">Get reported snippets</button>
        <div v-show="!loading">{{shownList}}</div>
        <div v-show="loading">{{loadingMsg}}</div>
        <div class="snippets">
            <div class="snippet" v-for="snippet in snippets" :key="snippet.id">
                <div>Title:{{snippet.title}}</div>
                <div>Content:{{snippet.content}}</div>
                <div>Score: {{snippet.score}}</div>
                <div v-show="snippet.is_reported">Reports:{{snippet.is_reported}}</div>
                <editSnippet @manageSnippet="editSnippet" v-bind:identifier="snippet.id" v-bind:showUnreport="showUnreport"></editSnippet>
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
            loadingMsg: String,
            showUnreport:false,
            shownList: 'Latest snippets are shown below',
            snippets:[]
        }),
        methods:{
            waitingForApi(param){
                let elems = document.getElementsByTagName('button');
                if(param == true){
                    this.loading=true;
                    this.loadingMsg = 'The API i loading please wait'
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
            fetchSnippets(param){
                this.waitingForApi(true);
                this.showUnreport = false;
                this.loadingMsg = 'The API i loading please wait'
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?'+ param, {
                    method: 'GET',
                })
                .then(response => response.json())
                .then((data) => {
                    this.waitingForApi(false);
                    this.shownList = param + ' snippets are listed below';
                    this.snippets = data;
                })
                .catch((error) => {
                    this.waitingForApi(false);
                    this.loadingMsg = 'Fetching "'+ param +'" from API failed, please try again.';
                    console.log(error);
                })
            },
            addSnippet(){
                this.fetchSnippets('latest');
            },
            editSnippet(editSnippet){
                if(editSnippet.func == 'delete'){
                    this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('delete&id=' + editSnippet.id),
                    })
                    .then((response) => {
                        this.waitingForApi(false);
                        this.snippets = this.snippets.filter(
                            snippet => snippet.id != editSnippet.id,
                        );
                        console.log(response);
                    })
                    .catch((error) => {
                        this.waitingForApi(false);
                        this.loadingMsg = 'Removing snippet failed, please try again.';
                        console.log(error);
                    })
                }
                //report
                if(editSnippet.func == 'report'){
                    this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('report&id=' + editSnippet.id),
                    })
                    .then(() => {
                        this.waitingForApi(false);
                    })
                    .catch((error) => {
                        this.waitingForApi(false);
                        this.loadingMsg = 'Reporting snippet failed, please try again.';
                        console.log(error);
                    })
                }
                //unreport
                if(editSnippet.func == 'unreport'){
                    this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('unreport&id=' + editSnippet.id),
                    })
                    .then((response) => {
                        this.waitingForApi(false);
                        console.log(response);
                    })
                    .catch((error) => {
                        this.waitingForApi(false);
                        this.loadingMsg = 'Unreporting snippet failed, please try again.';
                        console.log(error);
                    })
                }
                //upvote
                if(editSnippet.func == 'upvote'){
                    this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('upvote&id=' + editSnippet.id),
                    })
                    .then((response) => {
                        this.waitingForApi(false);
                        console.log(response);
                    })
                    .catch((error) => {
                        this.waitingForApi(false);
                        this.loadingMsg = 'Upvoting snippet failed, please try again.';
                        console.log(error);
                    })
                }
                //downvote
                if(editSnippet.func == 'downvote'){
                    this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('downvote&id=' + editSnippet.id),
                    })
                    .then((response) => {
                        this.waitingForApi(false);
                        console.log(response);
                    })
                    .catch((error) => {
                        this.waitingForApi(false);
                        this.loadingMsg = 'Downvoting snippet failed, please try again.';
                        console.log(error);
                    })
                }
            },
        },
        mounted(){
            this.fetchSnippets('latest');
        }
    }
</script>

<style scopes>
    #list {

    }
    .snippets{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1em;
    }
    .snippet{
        border: 1px solid #cccc;
        padding:0.5em;
        
    }
</style>
