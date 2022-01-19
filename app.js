const cityName = document.querySelector(".city-name");
const search = document.querySelector(".btn");
const gifBox = document.querySelector(".gif-box");
const data = document.querySelector(".data");

const addDetails = (name, temp, des) => {
  data.innerHTML = "";
  const city = document.createElement("p");
  const degree = document.createElement("p");
  const descrip = document.createElement("p");
  city.textContent = `City: ${name}`;
  degree.textContent = `Temperature: ${temp} °C`;
  descrip.textContent = `Description: ${des}`;
  data.appendChild(city);
  data.appendChild(degree);
  data.appendChild(descrip);
};

const gifViewer = (toView) => {
  gifBox.innerHTML = "";
  gifBox.style.backgroundImage = `url(${toView})`;
  gifBox.style.backgroundSize = "100%";
  gifBox.style.backgroundRepeat = "no-repeat";
  gifBox.style.backgroundPosition = "center";
};

//fetch gif
const newGif = async (toSearch) => {
  try {
    const x = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=qitEkyx467x7JYS6uzAKpLLN7AQ7oCju&s=${toSearch}`,
      { mode: "cors" }
    );
    const y = await x.json();
    gifViewer(y.data.images.original.url);
  } catch (err) {
    console.log(err);
  }
};

// fetch weather details
const getData = async (toSearch) => {
  cityName.value = "";
  try {
    const x = await fetch(
      `//api.openweathermap.org/data/2.5/weather?q=${toSearch}&units=metric&appid=636f4682cd659892b6d96f20829b82df`,
      { mode: "cors" }
    );
    const y = await x.json();
    if (y.cod === "404") {
      data.innerHTML = "";
      const notFound = document.createElement("p");
      notFound.classList.add("error");
      notFound.textContent = y.message;
      data.appendChild(notFound);
      newGif("not found");
    } else {
      addDetails(y.name, y.main.temp, y.weather[0].description);
      newGif(y.weather[0].main);
    }
  } catch (err) {
    console.log(err);
  }
};

search.addEventListener("click", (e) => {
  e.preventDefault();
  if (cityName.value === "") {
    data.innerHTML = "";
    const err = document.createElement("p");
    err.textContent = "Please enter a city";
    err.classList.add("error");
    data.appendChild(err);
  } else {
    getData(cityName.value);
  }
});
