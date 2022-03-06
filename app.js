//create the object for the app
const app = {};

// create a property for the api key
app.key = '44a39cc0de8d484d9fd0d044bf2f090e'
app.id = '7d175d88'


app.getRandomResult = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index]
}


app.displayResults = (hits) => {
    
    const randomResult = app.getRandomResult(hits);

    const markUp =     
        `
        <li class="gallery-item">
            <div class="image-container">
                <img src="${randomResult.recipe.images.REGULAR.url}" alt="${randomResult.recipe.label}">
            </div>
            <div class="overlay">
                    <a href="${randomResult.recipe.url}">
                        <p>Click to make</p>
                    </a>
            </div>
            <p>${randomResult.recipe.label}</p>
        </li>
        `    
    
    $('.gallery').append(markUp)    
    
    $('.recipe-result').removeClass( "animate__animated animate__headShake");

}

app.getResults = function (query, diet) {
    
    $.ajaxSetup({ traditional: true });

    $.ajax({
        url: 'https://api.edamam.com/api/recipes/v2',
        method: 'GET',
        dataType: 'json',
        data: {
            app_key: app.key,
            app_id: app.id,
            q: query,
            health : diet,
            type: 'public',
            traditional: true
        },
    }).then(function(results) {
        
        $('.gallery').empty();
        app.displayResults(results.hits)
        $('.results').fadeIn();
        $('html').animate({scrollTop:$(document).height()});

    })
}

app.init = function() {
    // Submit the users search
    $('form').on('submit', function(event) {
        // prevents refresh
        event.preventDefault();

        searchTerm = $('#search-input').val()

        document.querySelector('.dietary').scrollIntoView({
            behavior: 'smooth'
        });

        // ANIMATIONS
        $('.dietary-sub-heading').addClass( "animate__animated animate__fadeInDown animate__slow" );
        $('.dietary-main').addClass( "animate__animated animate__fadeInDown animate__delay-1s" );

        // Save dietary restrictions to an array
        $('.choiceButton').on('click', function(){

            const diet = []

            $('input[name="deitary"]:checked').each(function(i){
                diet[i] = $(this).val();
            })
        
            app.getResults(searchTerm, diet)
            
            $('.results-header').addClass( "animate__animated animate__fadeInDown" );
            
            $('.reset').on('click', function(){

                // $('.recipe-result').addClass( "animate__animated animate__slideOutRight" );
                // $('.gallery').empty();

                app.getResults(searchTerm, diet)
                $('.recipe-result').addClass( "animate__animated animate__headShake");
            }) 
            
        })
    
    })
};

$(function() {
    app.init();
});









