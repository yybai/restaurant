$(document).ready(function() {
	$.ajax({
		url:"https://imhungry-app.herokuapp.com/restaurant",
		success: function(result){
			result.forEach(function(restaurant){
				var foodBox = '<div class = "container" id="'+restaurant._id+'">';
				foodBox += '<div class="food-box row-2"';
				foodBox += 'style = "background-image:url('+restaurant.image+')"';
				foodBox += '>';
				foodBox += '<h5>' + restaurant.name +'</h5>';
				foodBox += '<h6>' + restaurant.type +'</h6>';
				foodBox += '<p>' + restaurant.address +'</p>';
				foodBox += '</div>';
				foodBox += '<div class = "btn edit">EDIT</div>';
				foodBox += '<div class="btn delete">DELETE</div>';
				foodBox += '</div>';
				$(".food-container").append(foodBox);


			});
		}


	});

	$("div").on("click",".edit",function(){
		console.log(  $(this).parent().attr('id')  );
	
		window.location.href ='update.html?id=' + $(this).parent().attr('id');
	});



	$("div").on("click",".delete",function(){
		console.log(  $(this).parent().attr('id')  );
		var id = $(this).parent().attr('id');
		$.ajax({
			url:"https://imhungry-app.herokuapp.com/restaurant/"+id,
			type:"DELETE",
			success:function(result){
				console.log("hi");
				$('#'+id).remove();
			}
		})
	});



	$('.add').click(function(){
        
        if(         $.trim($("input[name='name']").val())
                &&  $.trim($("input[name='address']").val())
                &&  $.trim($("input[name='type']").val())
                &&  $.trim($("input[name='url']").val())
            ){

            var restaurant = {
                name:$("input[name='name']").val(),
                address:$("input[name='address']").val(),
                type: $("input[name='type']").val(),
                image:$("input[name='url']").val()
            };

            var data = JSON.stringify(restaurant);
            


            $.ajax({
                url:"https://imhungry-app.herokuapp.com/restaurant/",
                type:"POST",
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

