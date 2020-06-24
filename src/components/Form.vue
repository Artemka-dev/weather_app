<template lang="pug">
    .search-box
        input(type="text" placeholder="City name" v-model="city" @keyup.enter="keyHandler" autofocus).search-bar
        
</template>

<script>
export default {
    data: () => ({
        city: ""
    }),
    methods: {
        keyHandler() {
            // console.log(this.city)
            this.$emit("open_weather", this.city)
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-box {
        width: 100%;
        margin-bottom: 30px;
    }

    .search-bar {
        display: block;
        width: 100%;
        padding: 15px;

        color: #313131;
        font-size: 20px;

        appearance: none;
        border: none;
        outline: none;
        background: none; 

        background-color: rgba(255, 255, 255, .5); 

        border-radius: 0 16px 0 16px;

        transition: .4s;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
</style>