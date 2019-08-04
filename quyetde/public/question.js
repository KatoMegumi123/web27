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
            reciveData = JSON.parse(data.data);
            let questionName = document.getElementById("question-name");
            let voteCount = document.getElementById("vote-count");
            let like = document.getElementById("like");
            let dislike = document.getElementById("dislike");
            questionName.innerText = reciveData.questionContent;
            voteCount.innerText = `So luot vote: ${reciveData.like + reciveData.dislike}`;
            like.innerText = `Like: ${reciveData.like}`;
            dislike.innerText = `Dislike: ${reciveData.dislike}`;
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