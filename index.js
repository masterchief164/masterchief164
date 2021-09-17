const Mustache = require('mustache');
const axios = require('axios');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';

let DATA = {}

function generateReadMe() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}

const init = async () => {
    const data = (await axios.get('https://api.github.com/users/masterchief164/events')).data[0].repo.name;
    const joke = (await axios.get("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single")).data.joke

    const d = new Date()
    DATA = {
        name: 'Shaswat',
        date: d.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata',
        }),
        time: d.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
        }),
        repoName: data.substring(data.indexOf('/') + 1),
        repoURL: data,
        joke: joke
    };
    generateReadMe();
}
init();