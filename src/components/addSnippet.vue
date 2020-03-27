<template>
    <div id="addSnippet">
        <label for="title">Title:</label>
        <input @blur="titleIsTouched = true" placeholder="Enter title here..." type="text" id="title" v-model="model.formTitle" :class="titleClass"/>
        <div class="error" v-show="titleIsTouched && !titleIsValid">{{ titleError }}</div>
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
            },
            error: false,
            errorMsg: String,
            titleIsTouched:false,
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
                return 'Empty title is not valid.';
            },
            contentIsValid(){
                return this.model.formContent != '';
            },
            contentClass(){
                if( !this.contentIsTouched) return 'pristine';
                return this.contentIsValid ? 'valid' : 'invalid';
            },
            contentError(){
                return 'Empty content is not valid.';
            },
        },
        methods:{
            entireFormIsValid(){
                if(this.titleIsValid && this.contentIsValid){
                    fetch('https://www.forverkliga.se/JavaScript/api/api-snippets.php?add&title=' + this.model.formTitle + '&content=' + this.model.formContent , {
                        method: 'POST'
                    })                
                    .then((response) => {
                        this.$emit('newSnippet', response)
                    })
                    .catch((error) => {
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
        justify-content: space-between;
        width:20em;
        height:10em;
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
