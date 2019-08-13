window.onload = () => {
    const pathName = window.location.pathname;
    const pathNameParts = pathName.split('/');
    const questionId = pathNameParts[pathNameParts.length - 1];
    fetch(`/get-question-by-id/${questionId}`,{
        method: 'GET',
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(data.success)
        {
            reciveData = data.data;
            let questionName = document.getElementById("question-name");
            let voteCount = document.getElementById("vote-count");
            let like = document.getElementById("like");
            let dislike = document.getElementById("dislike");
            questionName.innerText = reciveData.content;
            voteCount.innerText = `So luot vote: ${reciveData.like + reciveData.dislike}`;
            if(reciveData.like !== 0)
                like.innerText = `Like: ${reciveData.like}`;
            if(reciveData.dislike !== 0)
                dislike.innerText = `Dislike: ${reciveData.dislike}`;
            if(reciveData.like + reciveData.dislike==0)
            {
                like.style.width = "50%";
                dislike.style.width = "50%";
            }
            else
            {
                like.style.width = `${reciveData.like/(reciveData.like + reciveData.dislike)*100}%`;
                dislike.style.width = `${reciveData.dislike/(reciveData.like + reciveData.dislike)*100}%`;
            }
        }
        else
        {  
            window.alert(data.message);
        }
    })
    .catch((error)=>{
        console.log(error);
        window.alert(error.message);
    });
}