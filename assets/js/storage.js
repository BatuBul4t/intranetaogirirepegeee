const Store={
    get(key,fallback){
        try{
            const value=localStorage.getItem(key);
            return value===null?fallback:JSON.parse(value)
        }catch(e){return fallback}
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }
};

function getHistory(){
    const saved=Store.get("aogiri.history",null);
    if(saved) return saved;
    Store.set("aogiri.history",SEARCH_HISTORY_SEED);
    return SEARCH_HISTORY_SEED
}

function addHistory(query,engine="Aogiri Search"){
    if(!query.trim()) return;
    const history=getHistory();
    history.unshift({
        id:Date.now(),
        query:query.trim(),
        engine,
        date:new Date().toLocaleString("pt-BR")
    });
    Store.set("aogiri.history",history.slice(0,300))
}

function getFavorites(){
    return Store.get("aogiri.favorites",[])
}

function toggleFavorite(articleId){
    const favs=getFavorites();
    const index=favs.indexOf(articleId);
    if(index>=0) favs.splice(index,1);
    else favs.push(articleId);
    Store.set("aogiri.favorites",favs)
}

function getUserThreads(){
    return Store.get("aogiri.forum.threads",[])
}

function saveUserThreads(threads){
    Store.set("aogiri.forum.threads",threads)
}