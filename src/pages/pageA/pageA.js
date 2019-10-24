import '@babel/polyfill' //引入ES6/ES7垫片

import '@/css/base.css'
import '@/css/test.css'
import '@/css/test2.css'

import test from '@/js/test'
import request from '@/utils/request.js'

$(document).ready(()=> {
    $('body').append(test.createDom());
});