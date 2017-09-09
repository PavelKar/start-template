**Start-template** - шаблон для верстки веб сайтов использует библиотеки jquery, bootstrap-4(grid only). Gulp modules: sass, autoprefixer, clean-css,uglifyjs, concat, browser-sync, rename, del, htmlhint, util, vinyl-ftp. .htaccess - правила кэширования для веб сервера.

В структуре шаблона исходники находятся в директории src/, сайт готовый к отправке на сервер - prod/.

## **Использование start-template:**

 1. Скачать шаблон с GitHub
 2. **npm i**: установка gulp tasks
 3. **gulp**: запуск шаблона 

## **Gulp tasks:** 
 
 * **sass** - препроцессор 
 * **autoprefixer** - вендорные префиксы для кроссбраузерности
 * **clean-css** - сжатие css
 * **uglifyjs** - сжатие js
 * **concat** - конкатенация файлов
 * **browser-sync** - livereload 
 * **rename** - переименование файлов
 * **del** - удаление папки prod
 * **htmlhint** - проверка синтаксиса html 
 * **vinyl-ftp** - deploy проекта на сервере

## **Структура start-template**

 1. **gulpfile.js** - подключение gulp плагинов
 2. **package.json** - список gulp плагинов
 3. В директории src находятся index.html, стили, скрипты, шрифты, изображения, библиотеки, sass файлы, **.htaccess**
 4. Директория sass: **src/sass/main.sass** - стили, **src/sass/_variables.sass** - sass переменные, **src/sass/_media.sass** - медиа       запросы, **src/libs/_fonts.sass** - подключение шрифтов в одкну строку с помощью миксина в папке _mixins, **src/libs/_default.sass** -     сброс некоторых дефолтных стилей браузера
