
# Описание проекта

Этот проект представляет собой веб-приложение, предназначенное для работы с графическим редактором и управления профилями пользователей. Он построен на основе Flask и использует различные библиотеки для работы с формами, аутентификацией, базой данных и графикой.

## Навигация
- [Структура проекта](файловая-структура)
- [База данных](#1-база-данных)
- [Статические файлы](#2-статические-файлы)
- [Шаблоны (HTML файлы)](#3-шаблоны-html-файлы)
- [Основные файлы](#4-основные-файлы)
- [Установка зависимостей](#установка-зависимостей)
- [Запуск проекта](#запуск-проекта)
- [Авторские права и лицензия](#авторские-права-и-лицензия)

## Структура проекта

```
PhotoPainter/
├── instance/
│   └── profile.db          # Хранит все данные пользователей и пути к их изображениям
├── static/
│   ├── css/
│   │   ├── about.css       # Стили для страницы "О нас"
│   │   ├── form.css        # Стили для страниц авторизации и регистрации
│   │   ├── helper.css      # Стили для страницы помощи
│   │   ├── menu.css        # Стили для всего меню
│   │   ├── page.css        # Стили для фона, отображаемого на всём сайте
│   │   ├── profile.css     # Стили для профиля и портфолио
│   │   ├── slider.css      # Стили для слайдера в главном меню
│   │   └── work.css        # Стили на странице рабочей области
│   ├── EDITOR/             # Папка для сохранения файлов пользователей
│   ├── img/                # Хранит изображения для сайта
│   └── slider/             # Хранит изображения, используемые в слайдере
├── templates/
│   ├── about.html          # Страница "О нас"
│   ├── base_menu.html      # Шаблон меню, который вставляется в каждую страницу
│   ├── base.html           # Базовый шаблон HTML-страницы, используемый в каждой странице
│   ├── confirm.html        # Шаблон письма для подтверждения почты
│   ├── contacts.html       # Страница с контактами
│   ├── helper.html         # Страница помощи и функций PhotoPainter
│   ├── index.html          # Главная страница сайта
│   ├── log.html            # Страница авторизации
│   ├── premier.html        # Страница портфолио
│   ├── profile.html        # Страница профиля пользователя
│   ├── reg.html            # Страница регистрации
│   ├── reset_password_request.html # Ввод почты для сброса пароля
│   ├── reset_password.html # Страница для ввода нового пароля
│   └── workplace.html      # Страница рабочей области графического редактора
├── app.py                  # Основной файл сайта, в котором осуществляется вся логика сервера
├── forms.py                # Файл с формами для приложения
├── models.py               # Файл с моделями для базы данных
├── ReadMe.md               # Файл с описанием проекта
└── requirements.txt        # Список необходимых зависимостей
```

### 1. База данных

- **`instance/profile.db`**: Хранит все данные пользователей и пути к их изображениям.

### 2. Статические файлы

- **`static/css/`**: Стили для различных страниц.
  - `about.css`: Стили для страницы "О нас".
  - `form.css`: Стили для страниц авторизации и регистрации.
  - `helper.css`: Стили для страницы помощи.
  - `menu.css`: Стили для всего меню.
  - `page.css`: Стили для фона, отображаемого на всём сайте.
  - `profile.css`: Стили для профиля и портфолио.
  - `slider.css`: Стили для слайдера в главном меню.
  - `work.css`: Стили на странице рабочей области.

- **`static/EDITOR/`**: Папка, куда сохраняются файлы пользователей.
  
- **`static/img/`**: Хранит изображения для сайта.

- **`static/slider/`**: Хранит изображения, используемые в слайдере.

### 3. Шаблоны (HTML файлы)

- **`/about.html`**: Страница "О нас".
- **`/base_menu.html`**: Шаблон меню, который вставляется в каждую страницу.
- **`/base.html`**: Базовый шаблон HTML страницы, используемый на всех страницах.
- **`/confirm.html`**: Шаблон письма для подтверждения почты.
- **`/contakts.html`**: Страница с контактами.
- **`/helper.html`**: Страница с помощью и функциями PhotoPainter.
- **`/index.html`**: Главная страница сайта.
- **`/log.html`**: Страница авторизации.
- **`/premier.html`**: Страница портфолио.
- **`/profile.html`**: Страница профиля пользователя.
- **`/reg.html`**: Страница регистрации.
- **`/reset_password_request.html`**: Ввод почты для сброса пароля.
- **`/reset_password.html`**: Страница для ввода нового пароля.
- **`/workplace.html`**: Страница с рабочей областью графического редактора.

### 4. Основные файлы

- **`app.py`**: Основной файл сайта, в котором осуществляется вся логика сервера.
- **`forms.py`**: Файл с формами для `app.py`.
- **`models.py`**: Файл с моделями для базы данных.

## Установка зависимостей

Для установки зависимостей проекта используйте команду:

```bash
pip install -r requirements.txt
```

### Список зависимостей:

- **blinker** 1.8.2
- **captcha** 0.6.0
- **cffi** 1.17.0
- **click** 8.1.7
- **colorama** 0.4.6
- **cryptography** 43.0.0
- **dnspython** 2.6.1
- **email_validator** 2.2.0
- **Flask** 3.0.3
- **Flask-Login** 0.6.3
- **Flask-Mail** 0.10.0
- **Flask-SQLAlchemy** 3.1.1
- **Flask-WTF** 1.2.1
- **greenlet** 3.0.3
- **idna** 3.7
- **itsdangerous** 2.2.0
- **Jinja2** 3.1.4
- **MarkupSafe** 2.1.5
- **pillow** 10.4.0
- **pip** 24.2
- **pycparser** 2.22
- **PyJWT** 2.9.0
- **setuptools** 63.2.0
- **SQLAlchemy** 2.0.32
- **typing_extensions** 4.12.2
- **Werkzeug** 3.0.4
- **WTForms** 3.1.2

## Запуск проекта

Для запуска проекта выполните следующие команды:

```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

Проект будет доступен по адресу `http://127.0.0.1:5000/`.

## Авторские права и лицензия

Если у вас есть вопросы или предложения, свяжитесь со мной по:
- **Электронной почте:** `lighttolight228@gmail.com`;
- **Telegram:** [Inrigt](https://t.me/Inrigt)