<template>
    <div id="addSnippet">
        
        <h1>Add a snippet!</h1>
        <label for="title">Title:</label>
        <input @blur="titleIsTouched = true" placeholder="Enter title here..." type="text" id="title" v-model="model.formTitle" :class="titleClass"/>
        <div class="error" v-show="titleIsTouched && !titleIsValid">{{ titleError }}</div>

        <label for="tag">Tag:</label>
        <input @blur="tagIsTouched = true" placeholder="Enter a tag here..." type="text" id="tag" v-model="model.formTag" :class="tagClass"/>
        <div class="error" v-show="tagIsTouched && !tagIsValid">{{ tagError }}</div>

        <label for="content">Content:</label>
        <textarea @blur="contentIsTouched = true" placeholder="Enter content here..." id="content" v-model="model.formContent" :class="contentClass"></textarea>
        <div class="error" v-show=" contentIsTouched && !contentIsValid">{{ contentError }}</div>

        <button :disabled="isDisabled" type="submit" @click="entireFormIsValid">Add Snippet</button>
        <h3 class="errorMessageBox" v-show="error">{{errorMsg}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'addSnippet',
        props: {
            isDisabled: Boolean,
        },
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
            entireFormIsValid(){
                if(this.titleIsValid && this.contentIsValid && this.tagIsValid){
                    if(this.errorMsg != null) this.errorMsg = null;
                    this.$emit('newSnippet', this.model);
                    this.model.formTitle = '';
                    this.model.formContent = '';
                    this.model.formTag = '';
                    this.titleIsTouched = false;
                    this.tagIsTouched = false;
                    this.contentIsTouched = false;
                }
                else{
                    this.errorMsg = 'Enter the form properly';
                    this.error = true;
                    this.titleIsTouched = true;
                    this.tagIsTouched = true;
                    this.contentIsTouched = true;
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
        height:30em;
        margin:0 auto;
        margin-bottom:3em;
    }
    #content{
        height:10em;
        padding:0.3em;
    }
    .error{
        color:rgba(201, 19, 19, 0.788);
        padding:0.3em;
    }
    .errorMessageBox{
        color:rgba(201, 19, 19, 0.788);
    }
    .valid{
        border:1px solid rgb(18, 151, 18);
    }
    .invalid{
        border:rgba(201, 19, 19, 0.788) 1px solid;

    }
</style>
