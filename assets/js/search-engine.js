function norm(value){
    return String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
}

function articleText(article){
    return norm([article.title,article.category,article.site,article.summary,article.body,...(article.keywords||[])].join(" "))
}

function searchArticles(query,category=""){
    const words=norm(query).split(/\s+/).filter(Boolean);
    return ARTICLES.map(article=>{
        if(category && article.category!==category) return {article,score:-1};
        const text=articleText(article);
        let score=words.length?0:1;
        words.forEach(word=>{
            if(norm(article.title).includes(word)) score+=8;
            if(norm((article.keywords||[]).join(" ")).includes(word)) score+=4;
            if(norm(article.summary).includes(word)) score+=2;
            if(text.includes(word)) score+=1;
        });
        return {article,score}
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.article)
}

function getSuggestions(query){
    const q=norm(query);
    if(!q) return [];
    const sources=[...SEARCH_SUGGESTIONS,...ARTICLES.map(a=>a.title)];
    return [...new Set(sources)].filter(x=>norm(x).includes(q)).slice(0,10)
}