import "babel-polyfill";
import test from '@/test'
import '@/test1.css'
import '@/test2.css'

(async ()=>{
    let qq = await Promise.resolve(2222);
    console.log(qq);
    test.show()
})()