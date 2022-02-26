<template>
<h1>姓名:{{ $store.state.username }}</h1>
<h2>新名字:{{$store.getters['newName']}}</h2>
<h2>新名字:{{$store.getters.newName}}</h2>
<button @click="$store.dispatch('updateName','55555')" >改变姓名</button>
<hr>
<h1>体重:{{ $store.state.user.userWeight }}</h1>
<h1>身高:{{ $store.state.user.userHeight }}</h1>
<h2>新体重:{{ $store.getters['user/newWeight'] }}</h2>
<div><button @click="$store.commit('user/changeWeight')" >使用带模块名的Mutations方法</button></div>
<button @click="$store.dispatch('user/updateWeight')"> 改变体重</button>
</template>

<script>

export default {

}
</script>

<style>

</style>
