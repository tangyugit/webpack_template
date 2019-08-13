import 'babel-polyfill' //引入ES6/ES7垫片

import '@/css/base.css'
import '@/css/test.css'
import test from '@/js/test'

$(document).ready(()=> {
    $('body').append(test.createDom());
});