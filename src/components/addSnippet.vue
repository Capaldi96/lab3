<template>
    <div id="addSnippet">
        <h1>Add a snippet!</h1>
        <label for="title">Title:</label>
        <input @blur="titleIsTouched = true" placeholder="Enter title here..." type="text" id="title" v-model="model.formTitle" :class="titleClass"/>
        <div class="error" v-show="titleIsTouched && !titleIsValid">{{ titleError }}</div>

        <label for="tag">Tag:</label>
        <input @blur="tagIsTouched = true" placeholder="Enter a tag here..." type="text" id="tag" v-model="model.formtag" :class="tagClass"/>
        <div class="error" v-show="tagIsTouched && !tagIsValid">{{ tagError }}</div>


        <label for="content">Content:</label>
        <textarea @blur="contentIsTouched = true" placeholder="Enter content here..." id="content" v-model="model.formContent" :class="contentClass"></textarea>
        <div class="error" v-show=" contentIsTouched && !contentIsValid">{{ contentError }}</div>
        <button type="submit" @click="entireFormIsValid">Add Snippet</button>
        <div v-show="error" class="">{{errorMsg}}</div>
    </div>
</template>

<script>
    export default {
        name: 'addSnippet',
        components: {
        },
        data: () => ({
            model:{
                formTitle: '',
                formContent: '',
                formTag: '',
            },
            error: false,
            errorMsg: String,
            titleIsTouched:false,
            tagIsTouched:false,
            contentIsTouched:false,
        }),
        computed:{
            titleIsValid(){
                return this.model.formTitle != '';
            },
            titleClass(){
                if( !this.titleIsTouched) return 'pristine';
                return this.titleIsValid ? 'valid' : 'invalid';
            },
            titleError(){
                return 'Empty title input is not valid.';
            },
            tagIsValid(){
                return this.model.formTag != '';
            },
            tagClass(){
                if( !this.tagIsTouched) return 'pristine';
                return this.tagIsValid ? 'valid' : 'invalid';
            },
            tagError(){
                return 'Empty tag input is not valid.';
            },
            contentIsValid(){
                return this.model.formContent != '';
            },
            contentClass(){
                if( !this.contentIsTouched) return 'pristine';
                return this.contentIsValid ? 'valid' : 'invalid';
            },
            contentError(){
                return 'Empty content input is not valid.';
            },
        },
        
        methods:{
            waitingForApi(param){
                let elems = document.getElementsByTagName('button');
                if(param == true){
                    this.error=true;
                    this.errorMsg = 'The API i loading please wait'
                    for(let i = 0; i < elems.length; i++){
                        elems[i].disabled = true;
                    }
                } else{
                    for(let i = 0; i < elems.length; i++){
                        elems[i].disabled = false;
                    }
                    this.error=false;
                }
            },
            entireFormIsValid(){
                if(this.titleIsValid && this.contentIsValid && this.tagIsValid){
                    if(this.errorMsg != null) this.errorMsg = null
                    this.waitingForApi(true)
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php', {
                        method: 'POST',
                        body: new URLSearchParams('add&title=' + this.model.formTitle + '&content=' + this.model.formContent + '&tags=' + this.model.formTag),
                    })                
                    .then((response) => {
                        this.waitingForApi(false),
                        this.$emit('newSnippet', response)
                    })

                    .catch((error) => {
                        this.waitingForApi(false),
                        this.errorMsg = 'Failed to add snippet, please try again';
                        this.error = true;
                        console.log(error);
                    })
                }
                else{
                    this.errorMsg = 'Enter the form properly';
                    this.error = true;
                }
            }
        }
    }
</script>

<style scoped>
    #addSnippet {
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        width:20em;
        min-height:15em;
        margin:0 auto;
        margin-bottom:3em;
    }
    .error{
        color:rgba(201, 19, 19, 0.788);
        border:rgba(201, 19, 19, 0.788) 1px solid;
        padding:0.3em;
    }
    .valid{
        border:1px solid rgb(18, 151, 18);
    }
    .invalid{
        border:rgba(201, 19, 19, 0.788) 1px solid;

    }
</style>
