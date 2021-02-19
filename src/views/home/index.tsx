import {defineComponent, ref} from "vue";


const Home = defineComponent({

    setup() {
        const count = ref(0);

        const handleClick = () => count.value++;
        return () => (
                <div onClick={handleClick}>{count.value}</div>
        );
    },
});
export default Home;