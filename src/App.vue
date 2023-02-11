<template>
    <div><NavBar/></div>
    <div><router-view/></div> 
</template> 

<script>
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import NavBar from './components/NavBar.vue'

export default {
    setup () {},
    components: {
        NavBar
    }
}
</script>