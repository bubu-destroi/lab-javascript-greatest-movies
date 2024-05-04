// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directorsArray  = moviesArray.map((movie) => {
        return movie.director
    } )
    return directorsArray
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {

    const drama = moviesArray.filter((i) => i.genre.includes('Drama'));

    const berg = drama.filter((movie) => movie.director === "Steven Spielberg");
    
    return berg.length



}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0){ return 0}
    let rounded

    const movSum = moviesArray.reduce((acc, val) => {
       if (val.score){
       return acc + val.score}
        else return acc
    } , 0);
 

    let average = movSum / moviesArray.length;
    rounded = Math.round(average * 100) / 100
   
    
    return rounded
}


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let drama = moviesArray.filter((i) => i.genre.includes('Drama'));

   return scoresAverage(drama) 
}


// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

if (moviesArray.length === 1){return moviesArray}

let sorted = [...moviesArray]
sorted.sort((a, b) =>  { 
      if (a.year !== b.year){return a.year - b.year}
      else {
        return a.title.localeCompare(b.title)
      }
    }
);
return sorted
}


// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    let sstring = []
    /* let order  =  [...moviesArray].sort((a, b) => {
        a.title.localeCompare(b.title)
        return a.title - b.title
    } ) */
    moviesArray.forEach(element => {
        sstring.push(element.title)
    });

    sstring.sort()

    return sstring.slice(0,20)
}

//let result
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    let result = JSON.parse(JSON.stringify(moviesArray))

    let resultMinutes = result.map(i => {
        let hourIndex = i.duration.indexOf('h ')
        let minuteIndex = i.duration.indexOf('min')

        let hourNr = parseInt(i.duration.substring(0, hourIndex))
        hourNr *= 60
        let minNr = parseInt(i.duration.substring(hourIndex +2, minuteIndex))

        let newObj  = {}

        if (i.duration.includes('min')){
            newObj = {... i, duration: hourNr + minNr}
       }
        else if (!minNr) {
            newObj = {... i, duration: hourNr }
        }

        //i.duration = hourNr + minNr
        /* newObj = {... i, duration: hourNr + minNr} */
        return newObj

        }); 
   console.log(resultMinutes)
    return resultMinutes
}


//turnHoursToMinutes(mov)

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
/* function bestYearAvg(moviesArray) {

    if (!moviesArray.length){return null}

    if (moviesArray.length === 1){ return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`}

    let byScore = JSON.parse(JSON.stringify(moviesArray))

    byScore.sort((a, b) =>  { 
      if (a.score !== b.score){ 
        a.score-b.score
        byScore.splice(a, 1)
    }
        return b
    
    })
    let byYear = JSON.parse(JSON.stringify(byScore))

    byYear.sort((a, b) =>  { 
        if (a.year !== b.year){return a.year - b.year}
      }
  );

  let avg = scoresAverage(byYear)

return `The best year was ${byYear[0].year} with an average score of ${avg}`
    

}

bestYearAvg(mov) */


function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
      return null;
    }
  
    const averageScoresByYear = {};
    const numberOfMoviesByYear = {};
  
    moviesArray.forEach(movie => {
      const releaseYear = movie.year;
      if (!averageScoresByYear[releaseYear]) {
        averageScoresByYear[releaseYear] = movie.score;
        numberOfMoviesByYear[releaseYear] = 1;
      } else {
        averageScoresByYear[releaseYear] += movie.score;
        numberOfMoviesByYear[releaseYear]++;
      }
    });
  
    for (const year in averageScoresByYear) {
      averageScoresByYear[year] /= numberOfMoviesByYear[year];
    }

    console.log(averageScoresByYear)
  
    let bestYear = null;
    let bestAvg = 0;
  
    for (const year in averageScoresByYear) {
      if (averageScoresByYear[year] > bestAvg || (averageScoresByYear[year] === bestAvg && year < bestYear)) {
        bestYear = year;
        bestAvg = averageScoresByYear[year];
      }
    }
  
    return `The best year was ${bestYear} with an average score of ${bestAvg}`;
  }