<template>
    <div id="list">
        <addSnippet v-bind:isDisabled="isDisabled" @newSnippet="addSnippet"></addSnippet>
        <div class="buttonList">
            <button :disabled="isDisabled" @click="listSnippets('latest')">Get latest snippets</button>
            <button :disabled="isDisabled" @click="listSnippets('best')">Get best snippets</button>
            <button :disabled="isDisabled" @click="listSnippets('reported')">Get reported snippets</button>
        </div>
        <h3 class="shownList">{{message}}</h3>
        <div class="snippets">
            <div class="snippet" v-for="snippet in snippets" :key="snippet.id">
                <div>Title:{{snippet.title}}</div>
                <div>Content:{{snippet.content}}</div>
                <div>Score: {{snippet.score}}</div>
                <div v-show="snippet.is_reported">Reported</div>
                <editSnippet class="editSnippet" @manageSnippet="editSnippet" v-bind:identifier="snippet.id" v-bind:showUnreport="showUnreport" v-bind:isDisabled="isDisabled"></editSnippet>
            </div>
        </div>
    </div>
</template>

<script>
import addSnippet from './addSnippet.vue';
import editSnippet from './editSnippet.vue';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/api-snippets.php?';
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
            async fetchSnippets(param){
                this.currentList = param;
                try{
                    let response = await fetch(baseUrl + param, {
                        method: 'GET',
                    })
                    let data = await response.json();
                    if(param == 'reported'){
                        this.showUnreport = true;
                    }
                    else{
                        this.showUnreport = false;
                    }
                    this.waitingForApi(false);
                    this.message = param + ' snippets are listed below';
                    this.snippets = data;
                }
                catch {
                    this.waitingForApi(false);
                    this.message = 'Fetching "'+ param +'" from API failed, please try again.';
                }
            },
            // Add a new snippet
            // Axios för att visa att jag kan använda det, vanligtvis hade jag hållt mig till ett sätt att göra ajax anrop
            async addSnippet(newSnippet){
                this.waitingForApi(true)
                try{
                    let response = await this.$http.post(baseUrl,{
                        add: "",
                        title: newSnippet.formTitle,
                        content: newSnippet.formContent,
                        tags: newSnippet.formTag, 
                    })
                    this.message = response.data.message + ', reloading list!';
                    this.fetchSnippets(this.currentList)
                }
                catch(error){
                    this.message = error.data.message
                }
            },
            //delete & upvote/downvote && report/unreport
            async editSnippet(editSnippet){
                if(editSnippet.func == 'delete'){
                    this.waitingForApi(true);
                    try{
                        await fetch(baseUrl, {
                            method: 'POST',
                            body: new URLSearchParams('delete&id=' + editSnippet.id),
                        })
                        this.snippets = this.snippets.filter(
                            snippet => snippet.id != editSnippet.id,
                        );
                        this.waitingForApi(false);
                        this.message = this.currentList + ' snippets are listed below';
                    }
                    catch{
                        this.waitingForApi(false);
                        this.message = 'Removing snippet failed, please try again.';
                    }
                }
                else{
                   this.waitingForApi(true);
                    try{
                        await fetch(baseUrl, {
                            method: 'POST',
                            body: new URLSearchParams(editSnippet.func + '&id=' + editSnippet.id),
                        })
                        this.listSnippets(this.currentList);
                    }
                    catch{
                        this.message = editSnippet.func + ' snippet failed, please try again.';
                        this.waitingForApi(false);
                    } 
                }
            },
        },
        mounted(){
            this.listSnippets('latest');
        }
    }
</script>

<style scoped>
    #list{
        margin-bottom:3em;
    }
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
    .buttonList{
        display:flex;
        width:40em;
        margin: 0 auto;
        justify-content: space-between;
        
    }
    .buttonList > button{
        width:15em
    }
</style>
