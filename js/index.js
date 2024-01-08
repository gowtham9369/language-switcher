document.addEventListener("DOMContentLoaded", function (data) {
    console.log("Data", data);
    console.log("i18next data", i18next);
    i18next
        .use(i18nextBrowserLanguageDetector)
        .use(i18nextXHRBackend)
        .init({
            backend: {
                loadPath: 'locales/{{lng}}/{{lng}}.json',
            },
            detection: {
                order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
                caches: ['localStorage', 'cookie'],
            },
            fallbackLng: 'en',
            debug: true,
            ns: ['translation'],
            defaultNS: 'translation',
            keySeparator: false,
            interpolation: {
                escapeValue: false,
                formatSeparator: ',',
            },
        }).then(data=>{
            console.log("qwerty",data);
        });

    function updateContent(data) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            // console.log('selectedLanguage Element', element);
            const key = element.getAttribute('data-i18n');
            // console.log('i18next language ---- updateContent', i18next.language);
            // console.log('i18next store data------ updateContent', i18next.store['data'][data]);
            const output = i18next.store['data'][data];
            // console.log('i18next output', output.translation);
            const { translation } = output.translation;
            // console.log('i18next lang_data', translation[key]);
            element.textContent = i18next.t(translation[key]);
        });
    }

    document.getElementById('languageSelector').addEventListener('change', function (event) {
        const selectedLanguage = event.target.value;
        const report = i18next.store['data'][selectedLanguage];
        i18next.changeLanguage(selectedLanguage, (err, t) => {
            updateContent(selectedLanguage);
        });
    });
});
