<template>
    <div id="list">
        <addSnippet v-bind:isDisabled="isDisabled" @newSnippet="addSnippet"></addSnippet>
        <button :disabled="isDisabled" @click="listSnippets('latest')">Get latest snippets</button>
        <button :disabled="isDisabled" @click="listSnippets('best')">Get best snippets</button>
        <button :disabled="isDisabled" @click="listSnippets('reported')">Get reported snippets</button>
        <h3 class="shownList">{{message}}</h3>
        <div class="snippets">
            <div class="snippet" v-for="snippet in snippets" :key="snippet.id">
                <div>Title:{{snippet.title}}</div>
                <div>Content:{{snippet.content}}</div>
                <div>Score: {{snippet.score}}</div>
                <div v-show="snippet.is_reported">Reports:{{snippet.is_reported}}</div>
                <editSnippet class="editSnippet" @manageSnippet="editSnippet" v-bind:identifier="snippet.id" v-bind:showUnreport="showUnreport" v-bind:isDisabled="isDisabled"></editSnippet>
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
            message: 'Latest snippets are shown below',
            currentList: String,
            showUnreport: false,
            isDisabled: false,
            snippets:[]
        }),
        methods:{
            waitingForApi(waiting){
                if(waiting == true){
                    this.message = 'The API is loading please wait'
                    this.isDisabled = true;
                } else{
                    this.isDisabled = false;
                }
            },
            // list snippets properly
            listSnippets(param){
                this.waitingForApi(true);
                this.fetchSnippets(param);
            },
            //Get Snippets
            fetchSnippets(param){
                this.currentList = param;
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?'+ param, {
                    method: 'GET',
                })
                .then(response => response.json())
                .then((data) => {
                    if(param == 'reported'){
                        this.showUnreport = true;
                    }
                    else{
                        this.showUnreport = false;
                    }
                    this.waitingForApi(false);
                    this.message = param + ' snippets are listed below';
                    this.snippets = data;
                })
                .catch(() => {
                    this.waitingForApi(false);
                    this.message = 'Fetching "'+ param +'" from API failed, please try again.';
                })
            },
            // Add a new snippet
            addSnippet(newSnippet){
                this.waitingForApi(true)
                fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                    method: 'POST',
                    body: new URLSearchParams('add&title=' + newSnippet.formTitle + '&content=' + newSnippet.formContent + '&tags=' + newSnippet.formTag),
                })                
                .then((data) => {
                    console.log(data)
;                    this.fetchSnippets(this.currentList)
                })
                .catch(() => {
                    this.waitingForApi(false),
                    this.errorMsg = 'Failed to add snippet, please try again';
                    this.error = true;
                })
            },
            //delete & upvote/downvote && report/unreport
            editSnippet(editSnippet){
                if(editSnippet.func == 'delete'){
                    this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('delete&id=' + editSnippet.id),
                    })
                    .then(() => {
                        this.snippets = this.snippets.filter(
                            snippet => snippet.id != editSnippet.id,
                        );
                        this.waitingForApi(false);

                    })
                    .catch(() => {
                        this.waitingForApi(false);
                        this.message = 'Removing snippet failed, please try again.';
                    })
                }
                else{
                   this.waitingForApi(true);
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams(editSnippet.func + '&id=' + editSnippet.id),
                    })
                    .then(() => {
                        this.fetchSnippets(this.currentList);
                    })
                    .catch(() => {
                        this.message = editSnippet.func + ' snippet failed, please try again.';
                        this.waitingForApi(false);
                    })    
                }
            },
        },
        mounted(){
            this.listSnippets('latest');
        }
    }
</script>

<style>
    .snippets{
        display: grid;
        margin-top: 1em;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1em;
    }
    .shownList{
        margin:1em;
    }
    .snippet{
        border: 1px solid #cccc;
        padding:0.5em;
        word-wrap: break-word;
        max-width:30em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

</style>
