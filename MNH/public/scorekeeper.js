window.onload=function(){
    const newGameBtn= document.querySelector('.newGameBtn');
    newGameBtn.addEventListener('click',function(event){
        event.preventDefault();
        let player1=document.querySelector('.player1').value;
        let player2=document.querySelector('.player2').value;
        let player3=document.querySelector('.player3').value;
        let player4=document.querySelector('.player4').value;
        let playersArr=[player1,player2,player3,player4];
        console.log(playersArr);
        fetch(`/newGames?players=${playersArr}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            window.location.href=`/games/${data.id}`
        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);
        });
    })


}