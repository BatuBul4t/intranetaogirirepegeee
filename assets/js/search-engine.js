function norm(value){
    return String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
}

function articleText(article){
    return norm([
        article.title,
        article.category,
        article.site,
        article.summary,
        article.body,
        ...(article.keywords||[])
    ].join(" "))
}

function searchArticles(query){
    const words=norm(query).split(/\s+/).filter(Boolean);
    if(!words.length) return ARTICLES.slice();
    return ARTICLES
        .map(article=>{
            const text=articleText(article);
            let score=0;
            words.forEach(word=>{
                if(norm(article.title).includes(word)) score+=6;
                if(norm((article.keywords||[]).join(" ")).includes(word)) score+=4;
                if(text.includes(word)) score+=1
            });
            return {article,score}
        })
        .filter(item=>item.score>0)
        .sort((a,b)=>b.score-a.score)
        .map(item=>item.article)
}

function searchSuggestions(query){
    const q=norm(query);
    if(!q) return [];
    return SEARCH_HISTORY_SEED
        .map(item=>item.query)
        .filter((value,index,array)=>array.indexOf(value)===index)
        .filter(value=>norm(value).includes(q))
        .slice(0,8)
}