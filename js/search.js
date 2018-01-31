$(document).ready(function() {
    let querystring = window.location.search.substring(1);
    let id = querystring.substring(3);
    console.log(id);

	$.ajax({
		url:"https://imhungry-app.herokuapp.com/restaurant/"+id,
		success: function(result){

            $("input[name='name']").val(result.name);
            $("input[name='address']").val(result.address);
            $("input[name='type']").val(result.type);
            $("input[name='url']").val(result.image);

            // $(".prelook").attr("src",result.image);

            $(".pre-image").css("background-image","url("+result.image+")") ;
		}


    });
    
    $("input[name='url']").keyup(function(){
        // $(".prelook").hide();
        $(".pre-image").hide();
        let newURL = $("input[name='url']").val();
        // $(".prelook2").attr("src",newURL);
        $(".pre-image2").css("background-image","url("+newURL+")") ;
    })
 


	$('.submit-button').click(function(){
        
        if(         $.trim($("input[name='name']").val())
                &&  $.trim($("input[name='address']").val())
                &&  $.trim($("input[name='type']").val())
                &&  $.trim($("input[name='url']").val())
            ){

            var restaurant = {
                id:id,
                name:$("input[name='name']").val(),
                address:$("input[name='address']").val(),
                type: $("input[name='type']").val(),
                image:$("input[name='url']").val()
            };

            var data = JSON.stringify(restaurant);
            


            $.ajax({
                url:"https://imhungry-app.herokuapp.com/restaurant/"+id,
                type:"PUT",
                data:data,
                contentType:'application/json',
                success:function(result){

                    window.location.replace("about.html");
                }

            })

        }else{
            alert("invalid input");
        }

    })

});
