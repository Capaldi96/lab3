<template>
    <div id="editSnippet">
        <button @click="removeSnippet('delete')">Delete</button>
        <button @click="removeSnippet('report')">Report</button>
        <button @click="removeSnippet('unreport')">Unreport</button>
        <button @click="removeSnippet('upvote')">Upvote</button>
        <button @click="removeSnippet('downvote')">Downvote</button>
    </div>
</template>

<script>
    export default {
        props: {
            identifier:Number,
        },
        name: 'editSnippet',
        components: {
        },
        data: () => ({
        }),
        methods: {
            removeSnippet(param){
                let editSnippet = {
                    id: this.identifier,
                    func: param,
                }
                this.$emit('manageSnippet', editSnippet)
            },
         //   voteSnippet(param){},
           // reportSnippet(param){}
        },
    }
</script>

<style scopes>
    #editSnippet {
        display:grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap:0.3em;

    }
    #editSnippet :first-child{
        grid-column: 1/ -1;
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
