...: Browser ... Game on Three, Vue and Blender.
===========================================================================

![First screen](https://github.com/Boeny/robot-game/raw/master/public/start.jpg)

Играть: http://....ru/


Deploy
------

Установка зависимостей npm packages

    npm install / yarn

Запуск сервера для разработки
-----------------------------

    npm run serve / yarn serve

    http://localhost:3000/

Cборка
------

Сборка проекта в продакшен, в папку /build

    npm run build / yarn build

Тесты
-----

Запуск статического анализатора ES

    npm run lint / yarn lint

Запуск статического анализатора стиоей

    npm run stylelint / yarn stylelint


Структура проекта
-----------------

```
.
└─ /public // статические ресурсы
│  ├─ /audio // аудио
│  │  └─ ...
│  ├─ /images // изображения
│  │  ├─ /favicons // дополнительные фавиконки для браузеров
│  │  │  └─ ...
│  │  ├─ /modals // картинки для информационных панелей
│  │  │  ├─ /level1 // для уровня 1
│  │  │  │  └─ ...
│  │  │  └─ ...
│  │  ├─ /models
│  │  │  ├─ /Levels
│  │  │  │  ├─ /level0 // модель-схема Песочницы (скрытый уровень 0 - тестовая арена)
│  │  │  │  │  └─ Scene.glb
│  │  │  │  └─ ...
│  │  │  └─ /Objects
│  │  │     ├─ Element.glb
│  │  │     └─ ...
│  │  └─ /textures
│  │     ├─ texture1.jpg
│  │     └─ ...
│  ├─ favicon.ico // основная фавиконка 16 на 16
│  ├─ index.html // статичный индекс
│  ├─ manifest.json // файл манифеста
│  └─ start.jpg // картинка для репозитория )
├─ /src
│  ├─ /assets // ассеты сорцов
│  │  └─ optical.png // у меня один такой )))
│  ├─ /components // компоненты, миксины и модули
│  │  ├─ /Layout // компоненты и миксины UI-обертки над игрой
│  │  │  ├─ Component1.vue // копонент 1
│  │  │  ├─ mixin1.js // миксин 1
│  │  │  └─ ...
│  │  └─ /Three // сама игра
│  │     ├─ /Modules // готовые полезные модули из библиотеки
│  │     │  └─ ...
│  │     └─ /Scene
│  │        ├─ /Enemies // модули врагов
│  │        │  ├─ Enemy1.js
│  │        │  └─ ...
│  │        ├─ /Weapon // модули оружия
│  │        │  ├─ Explosions.js // взрывы
│  │        │  ├─ HeroWeapon.js // оружие персонажа
│  │        │  └─ Shots.js // выстрелы врагов
│  │        ├─ /World // модули различных элементов мира
│  │        │  ├─ Element1.js
│  │        │  └─ ...
│  │        ├─ Atmosphere.js // модуль с общими для всех уровней объектами (общий свет, небо, звук ветра) и проверками-взаимодействия между другими модулями
│  │        ├─ AudioBus.js // аудио-шина
│  │        ├─ Enemies.js // модуль всех врагов
│  │        ├─ EventsBus.js // шина событий
│  │        ├─ Hero.js // модуль персонажа
│  │        ├─ Scene.vue // основной компонент игры
│  │        └─ World.js // мир
│  ├─ /store // стор Vuex
│  │  └─ ...
│  ├─ /styles // стилевая база препроцессора
│  │  └─ ...
│  ├─ /utils // набор утилитарных js-модулей для различных функциональностей
│  │  ├─ api.js // интерфейсы для связи с бэкендом
│  │  ├─ constants.js // вся конфигурация игры и тексты-переводы
│  │  ├─ i18n.js // конфигурация переводчика
│  │  ├─ screen-helper.js // модуль "экранный помощник"
│  │  ├─ storage.js // модуль для взаимодействия с браузерным хранилищем
│  │  └─ utilities.js // набор полезных функций-атомов
│  ├─ App.vue // "верхний" компонент
│  └─ main.js // эндпоинт сорцов Vue
└─ ... // все остальное на верхнем уровне проекта, как обычно: конфиги, gitignore, README.md и прочее
