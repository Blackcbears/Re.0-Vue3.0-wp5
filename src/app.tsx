import {defineComponent} from "vue";

const App = defineComponent({
    setup() {
        return ()=> (
                <div id="app">
                    <router-view />
                </div>
        );
    },
});
export default App;