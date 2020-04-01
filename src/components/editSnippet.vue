<template>
    <div id="editSnippet">
        <button :disabled="isDisabled" @click="removeSnippet('delete')">Delete</button>
        <button :disabled="isDisabled" @click="removeSnippet('report')" v-if="!showUnreport">Report</button>
        <button :disabled="isDisabled" @click="removeSnippet('unreport')" v-if="showUnreport">Unreport</button>
        <button :disabled="isDisabled" @click="removeSnippet('upvote')">Upvote</button>
        <button :disabled="isDisabled" @click="removeSnippet('downvote')">Downvote</button>
    </div>
</template>

<script>
    export default {
        name: 'editSnippet',
        props: {
            identifier:Number,
            showUnreport:Boolean,
            isDisabled: Boolean,
        },
        components: {
        },
        data: () => ({
        }),
        methods: {
            removeSnippet(param){
                let editSnippet = {
                    id: this.identifier,
                    func: param,
                };
                this.$emit('manageSnippet', editSnippet);
            },
        },
    }
</script>

<style scopes>
    #editSnippet {
        display:grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap:0.3em;
    }
    .snippet div{
        text-align: start;
        padding: 0.3em;
    }
    #editSnippet :first-child{
        grid-column: 1/ -1;
    }
    #editSnippet :nth-child(2){
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
