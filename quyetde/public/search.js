window.onload = ()=>{
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click',()=>{
        let pattern = document.getElementById('pattern').value;
        console.log(pattern);
        fetch(`/search-by-pattern/${pattern}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            const results = document.getElementById('results');
            results.innerHTML='';
            var para;
            var t;
            for(let items of data.data)
            {
                para = document.createElement("P");
                para.innerText = items.content;
                results.appendChild(para);
            }
        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);
        });
    });
    
};
