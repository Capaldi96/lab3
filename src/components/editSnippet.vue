<template>
    <div id="editSnippet">
        <button @click="removeSnippet">Delete</button>
        <button>Report</button>
        <button>Unreport</button>
        <button>Upvote</button>
        <button>Downvote</button>
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
            removeSnippet(){
                this.$emit('deleteSnippet', this.identifier)
            },
         //   voteSnippet(param){},
           // reportSnippet(param){}
        }
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
