
// access element of html // 
const form = document.querySelector("form");
const resultOut = document.querySelector(".result");

// addeventlistener on form for submit data // 
form.addEventListener("submit", (e)=> {
  e.preventDefault();
  // call a function // 
  getWordinfo(form.elements[0].value)
})


// define a function for getword to fetch api // 
const getWordinfo = async (word)=> {
  // fech api form server so declare a varaiable for that //
  try {
    const respnose =  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const data = await respnose.json();
  // console.log(data);
  let definitions = data[0].meanings[0].definitions[0];
  resultOut.innerHTML = `
  <h1> <strong>Word:</strong>${data[0].word}</h1>
    <p class="partofspeech"> <strong>PartofSpeech:</strong> ${data[0].meanings[0].partOfSpeech}</p>
   <p>  <strong>Meanings:</strong>${definitions.definition === undefined ? "not found" : definitions.definition }</p>
    <p>  <strong>Example:</strong>${definitions.example === undefined ? "not found" : definitions.example }</p>
  <p><strong>Antonyms:</strong>${definitions.antonyms === undefined ? "not found" : definitions.antonyms }</p>
  `;

  if(definitions.antonyms.length === 0){
        resultOut.innerHTML += `<span>Not found</span>`;
     }
     else {
     // create for loop for fetchign antonyms //
        for( let i = 0; i<definitions.antonyms.length; i++){
            resultOut.innerHTML += `<li>${definitions.antonyms[i]}</li>`
          }
     }

    //  readmore page to show more meanings
     resultOut.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read more</a></div>`
  } 
  // catch error
  catch (error) {
    resultOut.innerHTML = `<span>Sorry this word is not found</span>`
  }
}


