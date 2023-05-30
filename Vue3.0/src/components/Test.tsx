// 函数式组件
// export default (props, ctx) => <div>tree</div>

import { defineComponent } from 'vue';
export default defineComponent({
    name: 'STest',
    props: {
        title: String,
        condition: String,
        list: Array
    },
    setup(props, {slots}) {
        return () =><div>
                <div>{props.title}</div>
                <p>condition</p>
                <p>{ props.condition === 'A' ? <span>A</span>: <span>other</span>}</p>
                <ul>{ props.list.map(res => (<li>{res}</li>))}</ul>
                <p>{ slots.default()}</p>
            </div>
    }
})