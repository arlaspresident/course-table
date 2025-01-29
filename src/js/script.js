//funktion för att hämta data
async function fetchCourses() {
    try {
      const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json'); //hämta data från url
      const courses = await response.json(); //omvandla till json
  
      renderTable(courses);
      addEventListeners(courses);
    } catch (error) {
      console.error('kunde inte hämta data', error); //hantera fel
    }
  }
  
  //funktion för att visa datan i en tabell
  function renderTable(courses) {
   
    const tableBody = document.querySelector('#table-body');
  
    //skapar rader i tabellen baserat på det vi har
    tableBody.innerHTML = courses
      .map(course => `
        <tr>
          <td>${course.code}</td>          
          <td>${course.coursename}</td>    
          <td>${course.progression}</td>  
        </tr>
      `)
      .join(''); //slår ihop alla rader till en html sträng
  }
  
  //funktion för att lägga till filtrering och sortering
  function addEventListeners(courses) {
    const searchInput = document.querySelector('#search');

    //tabellens rubriker (<th>)
    const tableHeaders = document.querySelectorAll('th');
  
    //filtrering varje gång användaren skriver i sökfältet
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase(); //gör sökfrasen till lower case
      const filtered = courses.filter(course =>
        course.code.toLowerCase().includes(query) || //kontrollera om kurskod matchar
        course.coursename.toLowerCase().includes(query) //kontrollera om kursnamn matchar
      );
      renderTable(filtered); //visa bara de kurser som matchar
    });
  
    //sortering
    tableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const key = header.dataset.key; //vilken kolumn som ska sorteras
        const sorted = courses.sort((a, b) => (a[key] > b[key] ? 1 : -1)); //sortera stigande
        renderTable(sorted); //visa det man har sorterat
      });
    });
  }
  
  //starta hela grejen
  fetchCourses();
  