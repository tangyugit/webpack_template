export default {
    createDom() {
        let str = '<div class="main">' + 
                        `<div class="down" style="background: url(${require('@/img/down.gif')}) no-repeat"></div>` +
                        `<img src="${require('@/img/icon.png')}" />` +
                  '</div>';
        return str;
    }
}