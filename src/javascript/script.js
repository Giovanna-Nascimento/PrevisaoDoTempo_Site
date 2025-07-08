// o comportamento padrão de um formulário, é de atualizar a página sempre que uma pesquisa é feita
// para alterar esse comportamento:

document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    // pegar o valor do input da cidade
    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector('#weather').classList.remove('show');
        showAlert('Você precisa digitar uma cidade! <img src="src/images/not_found.png"></img>');
        return;
    }

    // integração da api openweather (current data)
    const apiKey = '704adb086dfc53f142cccdd229747709';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br` // utilizando o acento `` para conseguir passar a variável
    // encodeURI = para cidades com acentos
    // units=metric = para temperatura em celsius

    const results = await fetch(apiUrl);
    const json = await results.json();

    // o status do código exibe o número 200 quando está funcionando
    // verificação de erro:
    if (json.cod == 200) { // essas informações da api estão disponíveis no console.log e no network
         showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp, 
            tempMax: json.main.temp_max, 
            tempMin: json.main.temp_min, 
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity
         })
    } else {
        document.querySelector('#weather').classList.remove('show');
        showAlert(`Não foi possível localizar... <img src="src/images/not_found.png"></img>`)
    }

});

// função para passar as informações
function showInfo(json){
    showAlert('')

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`; // toFixed = uma casa decimal
    document.querySelector('#temp_desc').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} Km/H`;
}

// função para criar alerta de erro com uma mensagem como parâmetro
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg; // alterar o conteúdo do html
}