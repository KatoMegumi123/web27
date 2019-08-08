window.onload = () => {
    fetch(`/vote`,{
        method: 'GET',
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(data.success)
        {
            var reciveData = data.data;
            let questionContent = document.getElementById("question-content");
            var questionId = reciveData._id;
            let like = document.getElementById("like");
            let dislike = document.getElementById("dislike");
            questionContent.innerText = reciveData.content;
            like.addEventListener("click",(event)=>{
                fetch(`/vote/${questionId}/like`,{
                    method: 'PUT',
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    window.location.href = `/questions/${questionId}`;
                })
                .catch((error)=>{
                    console.log(error);
                    window.alert(error.message);
                });
            });
            dislike.addEventListener("click",(event)=>{
                fetch(`/vote/${questionId}/dislike`,{
                    method: 'PUT',
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    window.location.href = `/questions/${questionId}`;
                })
                .catch((error)=>{
                    console.log(error);
                    window.alert(error.message);
                });
            });
            let voteResult = document.getElementById("vote-result");
            voteResult.addEventListener("click",(event)=>{
                window.location.href = `/questions/${questionId}`;
            });

        }
        else
        {  
            window.alert("Do not exist");
        }
    })
    .catch((error)=>{
        console.log(error);
        window.alert(error.message);
    });
}