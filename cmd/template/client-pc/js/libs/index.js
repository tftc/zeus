zeus = {
    page: function(pageObj){
        $(function(){
            var initMethods = ['initDatas','initParts','bindEvent'];
            window['self'] = pageObj;
            var methodHasSet = true;
            $.each(initMethods, function(i, methodName){
                if(typeof self[methodName] !== 'function'){
                    methodHasSet = false;
                    return false;
                }
            });
            if(!methodHasSet){
                throw '初始化page出错，需要有完整的initDatas，initParts，bindEvent方法';
            }else{
                self['initDatas']();
                self['initParts']();
                self['bindEvent']();
            }
        })
    }
}